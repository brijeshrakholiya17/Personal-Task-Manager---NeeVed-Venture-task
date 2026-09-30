import React, { useState } from 'react';

function TaskList({ tasks, onUpdate, onDelete }) {
    if (tasks.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>
                <p>No tasks found.</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 15 }}>
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

function TaskItem({ task, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);

    // Save full edits
    const handleSave = () => {
        if (!title.trim()) return;
        onUpdate(task._id, { title, description, status, priority });
        setEditing(false);
    };

    // Quick status change handler
    const handleQuickStatusChange = (newStatus) => {
        setStatus(newStatus);
        onUpdate(task._id, { status: newStatus });
    };

    const getPriorityColor = (p) => {
        if (p === 'high') return '#e53e3e';
        if (p === 'medium') return '#dd6b20';
        return '#38a169';
    };

    const getStatusColor = (s) => {
        if (s === 'completed') return '#2f855a';
        if (s === 'in-progress') return '#2b6cb0';
        return '#718096';
    };

    return (
        <div
            style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '14px',
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.2s'
            }}
        >
            {!editing ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <strong style={{ fontSize: '1.1rem', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                                {task.title}
                            </strong>
                            <span
                                style={{
                                    fontSize: '0.75rem',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    backgroundColor: getPriorityColor(task.priority),
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {task.priority}
                            </span>
                        </div>

                        {task.description && (
                            <p style={{ margin: '4px 0 10px 0', color: '#4a5568', fontSize: '0.95rem' }}>
                                {task.description}
                            </p>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                            <span style={{ fontSize: '0.85rem', color: '#718096' }}>Status:</span>
                            {/* Quick status dropdown */}
                            <select
                                value={task.status}
                                onChange={(e) => handleQuickStatusChange(e.target.value)}
                                style={{
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    border: `1px solid ${getStatusColor(task.status)}`,
                                    backgroundColor: '#f7fafc',
                                    color: getStatusColor(task.status),
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="pending">To Do / Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed / Done</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                            onClick={() => {
                                setTitle(task.title);
                                setDescription(task.description || '');
                                setStatus(task.status);
                                setPriority(task.priority);
                                setEditing(true);
                            }}
                            style={{
                                padding: '6px 12px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                border: '1px solid #cbd5e0',
                                backgroundColor: '#edf2f7'
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(task._id)}
                            style={{
                                padding: '6px 12px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                border: '1px solid #feb2b2',
                                backgroundColor: '#fff5f5',
                                color: '#e53e3e'
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                /* Edit Mode */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task Title"
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task Description"
                        rows={2}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                    />
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                        >
                            <option value="pending">To Do / Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed / Done</option>
                        </select>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                        <button
                            onClick={handleSave}
                            style={{
                                padding: '6px 14px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#3182ce',
                                color: '#fff'
                            }}
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            style={{
                                padding: '6px 12px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                border: '1px solid #cbd5e0',
                                backgroundColor: '#edf2f7'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskList;