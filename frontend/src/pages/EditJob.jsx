import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";
import JobForm from "../components/JobForm";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const data = await getJobById(id);
    setJob(data);
  };

  const handleSubmit = async (updatedJob) => {
    await updateJob(id, updatedJob);
    navigate("/");
  };

  if (!job) return <h2 className="text-center">Loading...</h2>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
      <JobForm initialData={job} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditJob;
