import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobService";
import Button from "../components/Button";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const data = await getJobById(id);
    setJob(data);
  };

  if (!job) return <h2 className="text-center">Loading...</h2>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-gray-700"><strong>Company:</strong> {job.company}</p>
      <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
      <p className="mt-4">{job.description}</p>
      <Button onClick={() => navigate(-1)} className="mt-4">Back</Button>
    </div>
  );
};

export default JobDetails;
