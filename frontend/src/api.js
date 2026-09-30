import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/tasks",
});

export const getAllTasks = () => API.get('/');
export const createTask = (data) => API.post('/', data);
export const updateTask = (id, data) => API.put(`/${id}`, data);
export const deleteTask = (id) => API.delete(`/${id}`);