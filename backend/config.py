import  os

class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@localhost/jobportal"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    API_KEY = os.getenv("FINDWORK_API_KEY", "68dbcd62d29afb6c21b5caf27077c86fa131c8bc")
    JOB_TITLES = ["Python Developer", "Java Developer", "React Developer", "Data Scientist"]