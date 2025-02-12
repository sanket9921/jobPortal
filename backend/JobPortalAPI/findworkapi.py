import requests

API_KEY = "68dbcd62d29afb6c21b5caf27077c86fa131c8bc"
BASE_URL = "https://findwork.dev/api/jobs/"

def search_jobs(params):
    headers = {
        "Authorization": f"Token {API_KEY}"
    }

    response = requests.get(BASE_URL, headers=headers, params=params)
    if response.status_code == 200:
        jobs = response.json().get("results", [])
        return  jobs
    else:
        return f"Error: {response.status_code}, {response.text}"

