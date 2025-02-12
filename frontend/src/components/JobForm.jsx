import { useState } from "react";
import Button from "./Button";

const JobForm = ({ initialData, onSubmit }) => {
  const [job, setJob] = useState(initialData || {
    title: "", company: "", location: "", description: "", category: "", apply_link: "",source:"", Date:""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(job);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
      <input name="title" value={job.title} onChange={handleChange} placeholder="Job Title" className="input" required />
      <input name="company" value={job.company} onChange={handleChange} placeholder="Company" className="input" required />
      <input name="location" value={job.location} onChange={handleChange} placeholder="Location" className="input" required />
      <textarea name="description" value={job.description} onChange={handleChange} placeholder="Description" className="input" required />
      <input name="category" value={job.category} onChange={handleChange} placeholder="Category" className="input" required />
      <input name="apply_link" value={job.apply_link} onChange={handleChange} placeholder="Apply Link" className="input" required />
      <input name = "source" value={job.source} onChange={handleChange} placeholder="Source" className="input" required/>
      <input name="Date" value={job.Date} onChange={handleChange} placeholder="Date" className="input" required/>
      <Button type="submit" className="mt-4 w-full">Submit</Button>
    </form>
  );
};

export default JobForm;
