from flask import Blueprint, request, jsonify
from datetime import datetime
from db import  db
from models import JobPosting
from JobPortalAPI import findworkapi

findworkapi_routes = Blueprint("findworkapi_routes", __name__)

@findworkapi_routes.route("/search_jobs",methods=["GET"])
def search_job():
    params = {}
    # Add filters only if they are provided by the user
    if request.args.get("title"):
        params["search"] = request.args.get("title")
    if request.args.get("location"):
        params["location"] = request.args.get("location")
    if request.args.get("remote"):  # Convert "true"/"false" string to boolean
        params["remote"] = request.args.get("remote").lower() == "true"
    if request.args.get("employment_type"):
        params["employment_type"] = request.args.get("employment_type")

    job = findworkapi.search_jobs(params)

    return jsonify(job)

@findworkapi_routes.route('/save_jobs', methods=['POST'])
def save_jobs():
    """Save selected jobs in the database"""
    data = request.json  # Get list of selected jobs
    saved_jobs = []

    for job in data:
        # FIX: Use Job.query.filter_by() instead of db.Query
        existing_job = JobPosting.query.filter_by(url=job['url']).first()
        if not existing_job:
            new_job = JobPosting(
                title=job["role"],  # Updated to match JSON response
                company=job["company_name"],
                location=job["location"] or "Remote",
                description=job.get("text", ""),
                skills=",".join(job.get("keywords", [])),  # Convert list to string
                url=job["url"]
            )
            db.session.add(new_job)
            saved_jobs.append(job["role"])

    db.session.commit()
    return jsonify({"message": "Jobs saved successfully", "jobs_saved": saved_jobs})