import requests
from datetime import datetime, timedelta
from config import Config
from models import JobPosting
from db import  db
def parse_date(date_str):
    """Dynamically parse a date string with or without microseconds."""
    try:
        return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%S.%fZ")  # With microseconds
    except ValueError:
        return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")  # Without microseconds

def fetch_jobs(title):
    """Fetch jobs from Findwork API for a given title."""
    headers = {"Authorization": f"Token {Config.API_KEY}"}
    params = {"search": title, "limit": 10}
    response = requests.get("https://findwork.dev/api/jobs/", headers=headers, params=params)

    if response.status_code == 200:
        return response.json().get("results", [])
    return []

def store_jobs(jobs):
    """Store jobs in the database, avoiding duplicates."""
    saved_jobs = []

    for job in jobs:
        existing_job = JobPosting.query.filter_by(url=job["url"]).first()
        if not existing_job:
            date_posted = parse_date(job["date_posted"])  # ✅ Auto-detect format
            new_job = JobPosting(
                title=job["role"],
                company=job["company_name"],
                location=job["location"] or "Remote",
                description=job.get("text", ""),
                skills=",".join(job.get("keywords", [])),
                url=job["url"],
                date_posted=date_posted
            )
            db.session.add(new_job)
            saved_jobs.append(job["role"])

    db.session.commit()
    return saved_jobs

def delete_old_jobs():
    """Delete jobs that are older than 30 days."""
    one_month_ago = datetime.utcnow() - timedelta(days=30)
    old_jobs = JobPosting.query.filter(JobPosting.date_posted < one_month_ago).all()

    for job in old_jobs:
        db.session.delete(job)

    db.session.commit()
    return len(old_jobs)
