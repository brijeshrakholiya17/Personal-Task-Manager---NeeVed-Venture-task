const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/tasks', taskRoutes);

//Test Route
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to Task Manager API');
});

//Connecting to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB Connected');
        //Starting Server
        app.listen(PORT, () => {
            console.log(`Server started on port http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });