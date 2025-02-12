import { useNavigate } from "react-router-dom";
import Button from "./Button";

const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-lg font-semibold">{job.title} at {job.company}</h3>
      <p className="text-gray-600">{job.location}</p>
      <div className="flex gap-2 mt-2">
        <Button onClick={() => navigate(`/jobs/${job.id}`)}>View</Button>
        <Button onClick={() => navigate(`/edit/${job.id}`)} className="bg-green-600 hover:bg-green-700">Edit</Button>
        <Button onClick={() => onDelete(job.id)} className="bg-red-600 hover:bg-red-700">Delete</Button>
      </div>
    </div>
  );
};

export default JobCard;
