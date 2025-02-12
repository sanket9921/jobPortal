import axios from "axios";
import { API_URL } from "./api";

export const getJobs = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getJobById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createJob = async (jobData) => {
    const response = await axios.post(API_URL, jobData);
    return response.data;
};

export const updateJob = async (id, jobData) => {
    const response = await axios.put(`${API_URL}/${id}`, jobData);
    return response.data;
};

export const deleteJob = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
