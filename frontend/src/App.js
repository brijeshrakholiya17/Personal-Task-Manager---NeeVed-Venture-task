import React, { useState, useEffect } from 'react';
import { getAllTasks, createTask, updateTask, deleteTask } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  // Initial fetch on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const response = await getAllTasks();
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to connect to the server';
      setErrorMessage(`Error fetching tasks: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  // 1. Create Task
  const handleCreate = async (taskData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      const response = await createTask(taskData);
      // Immediately add the new task to the local state
      setTasks((prev) => [response.data, ...prev]);
    } catch (err) {
      console.error('Error creating task:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to create task';
      setErrorMessage(`Create failed: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Update Task (Status or Details)
  const handleUpdate = async (id, updatedFields) => {
    // Optimistically update local UI state immediately
    const previousTasks = [...tasks];
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, ...updatedFields } : task))
    );

    try {
      setErrorMessage('');
      const response = await updateTask(id, updatedFields);
      // Ensure local state matches server response
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data : task))
      );
    } catch (err) {
      console.error('Error updating task:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to update task';
      setErrorMessage(`Update failed: ${msg}`);
      // Revert back to previous tasks on failure
      setTasks(previousTasks);
    }
  };

  // 3. Delete Task
  const handleDelete = async (id) => {
    const previousTasks = [...tasks];
    // Immediately remove from local UI state
    setTasks((prev) => prev.filter((task) => task._id !== id));

    try {
      setErrorMessage('');
      await deleteTask(id);
    } catch (err) {
      console.error('Error deleting task:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to delete task';
      setErrorMessage(`Delete failed: ${msg}`);
      // Revert back if delete fails
      setTasks(previousTasks);
    }
  };

  // Filter tasks by status and search keyword
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === 'all' ? true : task.status === filterStatus;
    const matchesSearch =
      task.title?.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate task counts for status badges
  const totalCount = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, color: '#1a202c', fontSize: '1.8rem' }}>Personal Task Manager</h1>
        <p style={{ margin: '4px 0 0 0', color: '#718096' }}>Organize, filter, and track your daily tasks</p>
      </header>

      {/* Error alert banner */}
      {errorMessage && (
        <div
          style={{
            backgroundColor: '#fed7d7',
            border: '1px solid #feb2b2',
            color: '#9b2c2c',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage('')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9b2c2c',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Task Creation Form */}
      <TaskForm onCreate={handleCreate} isSubmitting={isSubmitting} />

      {/* Search and Status Filter Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#edf2f7',
          padding: '12px 16px',
          borderRadius: '8px',
          marginTop: '20px'
        }}
      >
        {/* Search input */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #cbd5e0',
            flex: '1',
            minWidth: '180px'
          }}
        />

        {/* Filter buttons / tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterStatus('all')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: filterStatus === 'all' ? '#2b6cb0' : '#fff',
              color: filterStatus === 'all' ? '#fff' : '#2d3748',
              fontWeight: filterStatus === 'all' ? 'bold' : 'normal'
            }}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: filterStatus === 'pending' ? '#718096' : '#fff',
              color: filterStatus === 'pending' ? '#fff' : '#2d3748',
              fontWeight: filterStatus === 'pending' ? 'bold' : 'normal'
            }}
          >
            To Do ({pendingCount})
          </button>
          <button
            onClick={() => setFilterStatus('in-progress')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: filterStatus === 'in-progress' ? '#3182ce' : '#fff',
              color: filterStatus === 'in-progress' ? '#fff' : '#2d3748',
              fontWeight: filterStatus === 'in-progress' ? 'bold' : 'normal'
            }}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: filterStatus === 'completed' ? '#38a169' : '#fff',
              color: filterStatus === 'completed' ? '#fff' : '#2d3748',
              fontWeight: filterStatus === 'completed' ? 'bold' : 'normal'
            }}
          >
            Done ({completedCount})
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '30px', color: '#4a5568' }}>
          <p>Loading tasks from server...</p>
        </div>
      )}

      {/* Task List Component */}
      {!loading && (
        <TaskList
          tasks={filteredTasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
