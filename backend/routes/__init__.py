from flask import Blueprint, Flask

from routes.findworkapi_routes import findworkapi_routes
from routes.job_routes import job_routes


# Create a Blueprint for all routes
def register_routes(app):
    app.register_blueprint(job_routes)
    app.register_blueprint(findworkapi_routes)