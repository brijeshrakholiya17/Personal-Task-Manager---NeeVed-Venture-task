const Task = require('../models/Task');

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: 1 });
        res.json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const task = new Task({
            title: title,
            description: description || '',
            status: status || 'pending',
            priority: priority || 'medium'
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const { title, description, status, priority } = req.body;

        if (title) task.title = title;
        if (description !== undefined) task.description = description;
        if (status) task.status = status;
        if (priority) task.priority = priority;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};
