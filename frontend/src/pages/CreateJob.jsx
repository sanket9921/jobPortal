import { useNavigate } from "react-router-dom";
import { createJob } from "../services/jobService";
import JobForm from "../components/JobForm";

const CreateJob = () => {
  const navigate = useNavigate();

  const handleSubmit = async (jobData) => {
    await createJob(jobData);
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a New Job</h2>
      <JobForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateJob;
