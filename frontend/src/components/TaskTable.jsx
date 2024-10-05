import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import TaskDetailModal from './TaskDetailModal';

const TaskTable = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: 2, marginTop: 4 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#1e3c72' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Task Title</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Description</TableCell>
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
                                style={{ cursor: 'pointer', backgroundColor: task.completed ? '#e0f7fa' : '#fff' }}
                                whileHover={{ backgroundColor: '#f1f1f1' }}
                                onClick={() => handleRowClick(task)}
                            >
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.priority}</TableCell>
                                <TableCell>{task.dueDate}</TableCell>
                                <TableCell>{task.completed ? 'Completed' : 'Incomplete'}</TableCell>
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
                                                onClick={() => onDelete(task.id)}
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
                                                onClick={() => onToggleComplete(task.id)}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: task.completed ? '#2e7d32' : '#43a047',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: task.completed ? '#1b5e20' : '#388e3c',
                                                    },
                                                }}
                                            >
                                                {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
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
