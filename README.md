# Personal Task Manager

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, update, filter, search, and manage tasks with priority levels and statuses.

---

## Features

- **Full CRUD Operations**: Create, view, edit, and delete tasks.
- **Task Statuses**: Manage workflow with `Pending`, `In Progress`, and `Completed` statuses.
- **Priority Levels**: Tag tasks by urgency (`Low`, `Medium`, `High`) with clear visual badges.
- **Quick Status Toggling**: Change status directly from the task list.
- **Filter & Search**: Instant client-side search by title/description and status tab filtering.
- **Optimistic UI Updates**: Fast and responsive UI with proper error handling and fallback states.
- **RESTful API**: Clean backend architecture with Express controllers and Mongoose schema validation.

---

## Tech Stack

- **Frontend**: React (Hooks, functional components), Axios, Vanilla CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Environment Management**: `dotenv`

---

## Project Structure

```text
Personal Task Manager/
├── backend/
│   ├── controllers/
│   │   └── taskController.js   # Route controller handlers
│   ├── models/
│   │   └── Task.js             # Mongoose Task schema
│   ├── routes/
│   │   └── tasks.js            # Express router definitions
│   ├── .env.example            # Environment variable template
│   ├── package.json
│   └── server.js               # Entry point and DB connection
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.js     # Form to create new tasks
│   │   │   └── TaskList.js     # List, item views, and inline edit
│   │   ├── api.js              # Axios API service
│   │   ├── App.js              # Main application state & UI
│   │   ├── App.css
│   │   └── index.js
│   ├── .env.example            # Frontend env template
│   └── package.json
├── .gitignore
├── NOTES.md                    # Technical write-up & discussion
└── README.md                   # Setup guide & documentation
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- **MongoDB** (local MongoDB instance or a free MongoDB Atlas cluster connection URI)

---

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file from `.env.example`:
   ```bash
   # On Windows PowerShell / Command Prompt:
   copy .env.example .env

   # On macOS / Linux:
   cp .env.example .env
   ```

4. Configure your `.env` file with your MongoDB connection string and port:
   ```env
   PORT=5000
   MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

5. Start the backend server:
   ```bash
   # Development mode with auto-reload:
   npm run dev

   # Or standard production start:
   npm start
   ```

The backend server should start running at `http://localhost:5000`.

---

### 2. Frontend Setup

1. Open a second terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file if you want to override the default API endpoint:
   ```bash
   # On Windows:
   copy .env.example .env

   # On macOS / Linux:
   cp .env.example .env
   ```
   *Default fallback is `http://localhost:5000/tasks`.*

4. Start the React development server:
   ```bash
   npm start
   ```

The frontend app will open automatically in your browser at `http://localhost:3000`.

---

## API Documentation

Base URL: `http://localhost:5000/tasks`

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Fetch all tasks | *None* |
| `POST` | `/tasks` | Create a new task | `{"title": "Task name", "description": "Details", "status": "pending", "priority": "medium"}` |
| `GET` | `/tasks/:id` | Fetch task by ID | *None* |
| `PUT` | `/tasks/:id` | Update task details | `{"status": "completed"}` |
| `DELETE` | `/tasks/:id` | Delete a task | *None* |

### Task Schema

| Field | Type | Required | Allowed Values / Default |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Non-empty string |
| `description` | String | No | Default: `""` |
| `status` | String | No | `'pending'` (default), `'in-progress'`, `'completed'` |
| `priority` | String | No | `'low'`, `'medium'` (default), `'high'` |
| `createdAt` | Date | Auto | ISO timestamp |
| `updatedAt` | Date | Auto | ISO timestamp |

---

## Write-Up & Discussion

See [NOTES.md](NOTES.md) for detailed responses regarding:
1. Multi-user architecture & authentication strategy
2. Scaling to thousands of tasks (pagination & virtualized rendering)
3. AI tool refinement & real-world debugging decisions
