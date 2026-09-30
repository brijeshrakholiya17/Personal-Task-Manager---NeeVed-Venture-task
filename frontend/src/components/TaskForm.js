import React, { useState } from 'react';

const TaskForm = ({ onCreate, isSubmitting }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [priority, setPriority] = useState('medium');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || isSubmitting) return;

        onCreate({
            title: title.trim(),
            description: description.trim(),
            status,
            priority
        });

        // Reset form inputs
        setTitle('');
        setDescription('');
        setStatus('pending');
        setPriority('medium');
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                marginBottom: '20px'
            }}
        >
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#2d3748' }}>Create New Task</h3>
            
            <input
                type="text"
                placeholder="Task title (required)..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e0',
                    fontSize: '1rem'
                }}
            />

            <input
                type="text"
                placeholder="Description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e0',
                    fontSize: '0.95rem'
                }}
            />

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                    <label style={{ marginRight: '6px', fontSize: '0.9rem', color: '#4a5568' }}>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                    >
                        <option value="pending">To Do / Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed / Done</option>
                    </select>
                </div>

                <div>
                    <label style={{ marginRight: '6px', fontSize: '0.9rem', color: '#4a5568' }}>Priority:</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !title.trim()}
                    style={{
                        marginLeft: 'auto',
                        padding: '8px 18px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: isSubmitting ? '#a0aec0' : '#2b6cb0',
                        color: '#fff',
                        fontWeight: '600',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSubmitting ? 'Adding...' : '+ Add Task'}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;