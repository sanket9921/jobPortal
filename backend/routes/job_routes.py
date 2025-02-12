from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from db import  db
from models import JobPosting
from sqlalchemy import or_, and_

job_routes = Blueprint("job_routes", __name__)

# Create a new job posting
@job_routes.route("/", methods=["POST"])
def create_job():
    data = request.json
    new_job = JobPosting(
        title=data["title"],
        company=data["company"],
        location=data["location"],
        description=data["description"],
        category=data["category"],
        apply_link=data["apply_link"],
        source=data.get("source", "manual"),
        date_posted=datetime.utcnow().date(),
    )
    db.session.add(new_job)
    db.session.commit()
    return jsonify({"message": "Job created successfully", "job_id": new_job.id}), 201

# Get all job postings
@job_routes.route("/", methods=["GET"])
def get_jobs():
    jobs = JobPosting.query.all()
    job_list = [
        {
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "description": job.description,
            "category": job.category,
            "apply_link": job.apply_link,
            "source": job.source,
            "date_posted": job.date_posted.strftime("%Y-%m-%d"),
        }
        for job in jobs
    ]
    return jsonify(job_list), 200

# Get a single job by ID
@job_routes.route("/<int:job_id>", methods=["GET"])
def get_job(job_id):
    job = JobPosting.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify({
        "id": job.id,
        "title": job.title,
        "company": job.company,
        "location": job.location,
        "description": job.description,
        "category": job.category,
        "apply_link": job.apply_link,
        "source": job.source,
        "date_posted": job.date_posted.strftime("%Y-%m-%d"),
    }), 200

# Update a job posting
@job_routes.route("/<int:job_id>", methods=["PUT"])
def update_job(job_id):
    job = JobPosting.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    data = request.json
    job.title = data.get("title", job.title)
    job.company = data.get("company", job.company)
    job.location = data.get("location", job.location)
    job.description = data.get("description", job.description)
    job.category = data.get("category", job.category)
    job.apply_link = data.get("apply_link", job.apply_link)
    job.source = data.get("source", job.source)

    db.session.commit()
    return jsonify({"message": "Job updated successfully"}), 200

# Delete a job posting
@job_routes.route("/<int:job_id>", methods=["DELETE"])
def delete_job(job_id):
    job = JobPosting.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted successfully"}), 200

@job_routes.route('/search_jobs', methods=['GET'])
def search_jobs():
    """Fetch jobs from the database based on skills, location, company, and date filters."""
    skills = request.args.get("skills", "").strip()
    location = request.args.get("location", "").strip()
    company = request.args.get("company", "").strip()
    date_filter = request.args.get("date", "").strip()  # Last 1, 3, 7, or 30 days

    # Base query
    query = JobPosting.query

    # ✅ 1. Filter by Skills (Check both `skills` column and `description`)
    if skills:
        skill_list = [skill.strip() for skill in skills.replace(",", " ").split()]
        skill_conditions = [JobPosting.skills.ilike(f"%{skill}%") for skill in skill_list]
        description_conditions = [JobPosting.description.ilike(f"%{skill}%") for skill in skill_list]
        query = query.filter(or_(*skill_conditions, *description_conditions))

    # ✅ 2. Filter by Location
    if location:
        query = query.filter(JobPosting.location.ilike(f"%{location}%"))

    # ✅ 3. Filter by Company Name
    if company:
        query = query.filter(JobPosting.company.ilike(f"%{company}%"))

    # ✅ 4. Filter by Date Posted
    if date_filter:
        try:
            days = int(date_filter)
            if days in [1, 3, 7, 30]:
                date_threshold = datetime.utcnow() - timedelta(days=days)
                query = query.filter(JobPosting.date_posted >= date_threshold)
        except ValueError:
            return jsonify({"error": "Invalid date filter. Use 1, 3, 7, or 30."}), 400

    # Execute the Query
    jobs = query.all()

    # Format Response
    job_list = [{
        "id": job.id,
        "title": job.title,
        "company": job.company,
        "location": job.location,
        "description": job.description,
        "skills": job.skills,
        "url": job.url,
        "date_posted": job.date_posted.strftime("%Y-%m-%d")
    } for job in jobs]

    return jsonify(job_list)