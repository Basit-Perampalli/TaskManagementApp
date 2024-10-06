import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import ViewTasks from './pages/ViewTasks';
import NavBar from './components/NavBar';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import TaskProgress from './pages/TaskProgress';
import AdminRegi from './pages/Registration';  
import Login from './pages/Login';           

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleAddTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    };

    const handleEditTask = (updatedTask) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        setIsEditing(false);
        setSelectedTask(null);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const handleToggleComplete = (taskId) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
    };

    return (
        <Router>
            <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
                <NavBar />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Routes>
                        <Route
                            path="/add-task"
                            element={
                                <TaskForm
                                    onAddTask={handleAddTask}
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
                        <Route path="/register" element={<AdminRegi />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </motion.div>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;
