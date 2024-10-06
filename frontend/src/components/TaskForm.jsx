
import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Select, InputLabel, FormControl } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ isEditing, onEditTask, selectedTask, setSelectedTask, setIsEditing }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    
    useEffect(() => {
        if (isEditing && selectedTask) {
            setTitle(selectedTask.title);
            setDescription(selectedTask.description);
            setPriority(selectedTask.priority);
            setDueDate(selectedTask.due_date.slice(0,10));
        }
    }, [isEditing, selectedTask]);

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const task = { title, description, priority, due_date:dueDate };

        if (isEditing) {
            onEditTask({ ...selectedTask, ...task });
            toast.success('Task edited successfully!');
            console.log(selectedTask.id)
            const response = await fetch(`http://localhost:8000/api/tasks/${selectedTask.id}/`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(task),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Task updated:', data);
                toast.success('Task updated successfully!');
            } else {
                toast.error('Failed to update task');
                console.log('Failed to update task:', response);
            }
            
        } else {
            const response = await fetch('http://localhost:8000/api/tasks/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(task),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Task created:', data);
                toast.success('Task added successfully!');
            } else {
                toast.error('Failed to create task');
                console.log('Failed to create task:', response);
            }
            
        }
        clearFields();
    };


    
    const clearFields = () => {
        setTitle('');
        setDescription('');
        setPriority('Medium');
        setDueDate('');
        setIsEditing(false);
        setSelectedTask(null);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 600,
                margin: '40px auto',
                padding: 4,
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: '600' }}>
                {isEditing ? 'Edit Task' : 'Add New Task'}
            </Typography>
            <TextField
                label="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                required
                fullWidth
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                required
                multiline
                rows={4}
                fullWidth
            />
            <FormControl variant="outlined" required fullWidth>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                    labelId="priority-label"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    label="Priority"
                >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
            />
<Button
    type="submit"
    variant="contained"
    size="large"
    sx={{
        backgroundColor: '#1e3c72',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#162a54', 
        },
        transition: 'background-color 0.3s ease',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
    }}
>
    {isEditing ? 'Update Task' : 'Add Task'}
</Button>

<Button
    variant="outlined"
    size="large"
    onClick={clearFields}
    sx={{
        color: '#1e3c72', 
        borderColor: '#1e3c72', 
        '&:hover': {
            backgroundColor: 'rgba(30, 60, 114, 0.1)', 
            borderColor: '#162a54', 
        },
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
    }}
>
    Clear Fields
</Button>

        </Box>
    );
};

export default TaskForm;
