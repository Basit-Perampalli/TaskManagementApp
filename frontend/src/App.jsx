import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import ViewTasks from './pages/ViewTasks';
import NavBar from './components/Navbar';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; 
import AdminLogin from './pages/Login';
import AdminRegi from './pages/Registration';
import TaskProgress from './components/TaskProgress'; 
import { AuthContext } from './context/AuthContext';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Router>
            <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Routes>
                        <Route
                            path="/add-task"
                            element={
                                <TaskForm
                                    isEditing={isEditing}
                                    selectedTask={selectedTask}
                                    setSelectedTask={setSelectedTask}
                                    setIsEditing={setIsEditing}
                                />}
                        />
                        <Route
                            path="/view-tasks"
                            element={
                                <ViewTasks
                                    tasks={tasks}
                                    setTasks={setTasks}
                                    setSelectedTask={setSelectedTask}
                                    setIsEditing={setIsEditing}
                                />}
                        />
                        {/* <Route
                            path="/task-progress"
                            element={
                                <TaskProgress totalTasks={tasks.length} completedTasks={tasks.filter(task => task.status).length} />}
                        /> */}
                        <Route
                            path="/"
                            element={<AdminLogin/>}
                        />
                        <Route path="/registration" element={<AdminRegi />} />
                    </Routes>
                </motion.div>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;
