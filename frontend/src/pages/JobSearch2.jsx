import React, { useState } from "react";
import axios from "axios";
import "./JobSearch2.css";

const JobSearch2 = () => {
    const [searchParams, setSearchParams] = useState({
        skills: "",
        location: "",
        company: "",
        date: "",
    });

    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

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
            setSelectedJob(null); // Reset selected job
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

            {/* Job Listing & Details Section */}
            <div className="job-results">
                {/* Left Column: Job List */}
                <div className="job-list">
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div
                                key={job.id}
                                className={`job-card ${selectedJob?.id === job.id ? "selected" : ""}`}
                                onClick={() => setSelectedJob(job)}
                            >
                                {/* Job Title & Date (Top Section) */}
                                <div className="job-card-header">
                                    <h3>{job.title}</h3>
                                    <p className="date-posted">{job.date_posted}</p>
                                </div>

                                {/* Company & Location (Middle Section) */}
                                <p className="company-location">
                                    {job.company}, {job.location}
                                </p>

                                {/* Skills Section (Bottom) */}
                                <div className="skills">
                                    {job.skills.split(",").map((skill, index) => (
                                        <span key={index} className="skill-tag">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        ))
                    ) : (
                        <p>No jobs found.</p>
                    )}
                </div>

                {/* Right Column: Job Details */}
                <div className="job-details">
                    {selectedJob ? (
                        <>
                            <div className="details-header">
                                <h2>{selectedJob.title}</h2>
                                <p className="date-posted">Posted on: {selectedJob.date_posted}</p>
                            </div>
                            <p className="company-location">
                                {selectedJob.company}, {selectedJob.location}
                            </p>
                            <div className="skills">
                                {selectedJob.skills.split(",").map((skill, index) => (
                                    <span key={index} className="skill-tag">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>

                            <div
                                className="description"
                                dangerouslySetInnerHTML={{ __html: selectedJob.description }}
                            ></div>

                            <a href={selectedJob.url} target="_blank" rel="noopener noreferrer" className="apply-btn">
                                Apply Now
                            </a>


                        </>
                    ) : (
                        <p className="no-selection">Click on a job to see details</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobSearch2;


