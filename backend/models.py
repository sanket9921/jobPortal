from datetime import datetime

from db import  db
from sqlalchemy.sql import func


class JobPosting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    skills = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, server_default=func.now())



