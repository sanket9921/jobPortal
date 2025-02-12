from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from apscheduler.schedulers.background import BackgroundScheduler
from config import Config
from utils.job_service import fetch_jobs, store_jobs, delete_old_jobs
from db import  db
app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

def automated_job_fetch():
    """Fetch and store jobs for predefined job titles."""
    with app.app_context():
        for title in Config.JOB_TITLES:
            print(f"Fetching jobs for: {title}")
            jobs = fetch_jobs(title)
            stored = store_jobs(jobs)
            print(f"Stored {len(stored)} jobs for: {title}")

def automated_job_cleanup():
    """Delete jobs older than 30 days."""
    with app.app_context():
        deleted = delete_old_jobs()
        print(f"Deleted {deleted} old jobs.")

def start_scheduler():
    """Schedule job fetching and cleanup tasks."""
    scheduler = BackgroundScheduler()
    scheduler.add_job(automated_job_fetch, "interval", hours=6)  # Run every 6 hours
    scheduler.add_job(automated_job_cleanup, "interval", days=1)  # Run daily
    scheduler.start()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    start_scheduler()
    print("Job Scheduler Running...")

    try:
        while True:
            pass
    except (KeyboardInterrupt, SystemExit):
        print("Scheduler stopped.")
