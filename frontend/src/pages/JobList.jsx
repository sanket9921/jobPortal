import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import Button from "../components/Button";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    fetchJobs();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <Button onClick={() => navigate("/create")} className="mb-4">Add Job</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
