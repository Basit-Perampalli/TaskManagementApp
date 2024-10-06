
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import ViewTasks from './pages/ViewTasks';
import NavBar from './components/NavBar';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; 
import TaskProgress from './pages/TaskProgress'; // Import TaskProgress component

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    
    const handleEditTask = (updatedTask) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        setIsEditing(false);
        setSelectedTask(null);
    };


    const handleDeleteTask = async(taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`, 
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Task deleted:', data);
            toast.success('Task deleted successfully!');
        } else {
            toast.error('Failed to delete task');
            console.log('Failed to delete task:', response);
        }
    };

    
    const handleToggleComplete = (taskId) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
    };

    return (
        <Router>
            <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
                <NavBar setSelectedTask={setSelectedTask} setIsEditing={setIsEditing}/>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Routes>
                        <Route
                            path="/add-task"
                            element={
                                <TaskForm
                                    isEditing={isEditing}
                                    onEditTask={handleEditTask}
                                    selectedTask={selectedTask}
                                    setSelectedTask={setSelectedTask}
                                    setIsEditing={setIsEditing}
                                />
                            }
                        />
                        <Route
                            path="/view-tasks"
                            element={
                                <ViewTasks
                                    setTasks={setTasks}
                                    tasks={tasks}
                                    onEditTask={(task) => {
                                        setSelectedTask(task);
                                        setIsEditing(true);
                                    }}
                                    onDeleteTask={handleDeleteTask}
                                    onToggleComplete={handleToggleComplete}
                                    setSelectedTask={setSelectedTask}
                                    setIsEditing={setIsEditing}
                                />
                            }
                        />
                        
                        <Route
                            path="/task-progress"
                            element={<TaskProgress totalTasks={tasks.length} completedTasks={tasks.filter(task => task.completed).length} />}
                        />
                    
                        <Route path="*" element={<Navigate to="/add-task" />} />
                    </Routes>
                </motion.div>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;
