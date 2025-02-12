import React, { useState } from "react";
import axios from "axios";
import "./JobSearch.css"; // Import CSS for styling

const JobSearch = () => {
  const [searchParams, setSearchParams] = useState({
    skills: "",
    location: "",
    company: "",
    date: "",
  });

  const [jobs, setJobs] = useState([]);

  // Handle Input Change
  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/search_jobs", {
        params: searchParams,
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="job-search-container">
      <h2>Job Search</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          name="skills"
          placeholder="Enter skills (e.g., Python, React)"
          value={searchParams.skills}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location (e.g., Remote, New York)"
          value={searchParams.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company (e.g., Google, Microsoft)"
          value={searchParams.company}
          onChange={handleInputChange}
        />
        <select name="date" value={searchParams.date} onChange={handleInputChange}>
          <option value="">Any Time</option>
          <option value="1">Last 1 Day</option>
          <option value="3">Last 3 Days</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
        <button onClick={fetchJobs}>Search</button>
      </div>
      <p className="result-count">{jobs.length} jobs found</p>

      {/* Job Results */}
      {jobs.length > 0 ? (
        <table className="job-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Skills</th>
              <th>Date Posted</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.skills}</td>
                <td>{job.date_posted}</td>
                <td>
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    View Job
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No jobs found. Try different filters.</p>
      )}
    </div>
  );
};

export default JobSearch;
