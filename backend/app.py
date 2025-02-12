from flask import Flask
from config import Config
from db import db
from routes import register_routes
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

# Initialize Database
db.init_app(app)
migrate = Migrate(app, db)  # Attach Flask-Migrate

# Register Routes
register_routes(app)

# Create Tables if not exist
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
