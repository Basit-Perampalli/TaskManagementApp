import React, { useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { motion } from 'framer-motion';
import TaskDetailModal from './TaskDetailModal';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';


const TaskTable = ({ tasks,setTasks, onEdit}) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {getnewtoken} = useContext(AuthContext)
    
    // for opening and closing the detailed view of task
    const handleRowClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    const handleDeleteTask = async(taskId) => {
        var token = localStorage.getItem('refreshToken')
        if (token){
            token = await getnewtoken(token)
        }else{
            console.log('no token found')
            localStorage.removeItem('refreshToken')
            return
        }
        const response = await fetch(`http://localhost:8000/task/delete/${taskId}/`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
            },
        });

        if (response.ok) {
            toast.success('Task deleted successfully!');
            setTasks(tasks.filter((task) => task.id !== taskId));
        } else {
            toast.error('Failed to delete task');
        }
    };


    const handleToggleStatus = async(t) => {
        const currTask = { ...t, status: !t.status }
        var token = localStorage.getItem('refreshToken')
        if (token){
            token = await getnewtoken(token)
        }else{
            console.log('no token found')
            localStorage.removeItem('refreshToken')
            return
        }
        try {
            const response = await fetch(`http://localhost:8000/task/update/${t.id}/`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(currTask),
            });
    
            if (response.ok) {
                toast.success('Task updated successfully!');
                setTasks(tasks.map((task) => (task.id === t.id ? { ...task, status: !task.status } : task)));
            } else {
                toast.error('Failed to update task');
            }
        } catch (error) {
            toast.error('Failed to update task');
            // console.log('Failed to update task:', response);
        }
    };


    return (
        <>

            {/* Task Table */}
            <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: 2, marginTop: 2, height: '73vh' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#1e3c72' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Task Title</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Priority</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Due Date</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task, index) => (
                            <motion.tr
                                key={task.id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{ cursor: 'pointer', backgroundColor: task.status ? '#e0f7fa' : '#fff' }}
                                whileHover={{ backgroundColor: '#f1f1f1' }}
                                onClick={() => handleRowClick(task)}
                            >
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.priority}</TableCell>
                                <TableCell>{task.due_date.slice(0, 10)}</TableCell>
                                <TableCell>{task.status ? 'Completed' : 'Incomplete'}</TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                onClick={() => onEdit(task)}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#1e3c72',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: '#162a54',
                                                    },
                                                    marginRight: 1,
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                onClick={() => handleDeleteTask(task.id)}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#e53935',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: '#c62828',
                                                    },
                                                    marginRight: 1,
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                onClick={() => handleToggleStatus(task)} // Pass task ID here
                                                variant="contained"
                                                sx={{minWidth:"200px",
                                                    backgroundColor: task.status ? '#2e7d32' : '#43a047',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: task.status ? '#1b5e20' : '#388e3c',
                                                    },
                                                }}
                                            >
                                                {task.status ? 'Mark as Incomplete' : 'Mark as Done'}
                                            </Button>
                                        </motion.div>
                                    </Box>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        
            <TaskDetailModal task={selectedTask} open={isModalOpen} handleClose={handleCloseModal} />
        </>
    );
};

export default TaskTable;
