
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import ViewTasks from './pages/ViewTasks';
// import NavBar from './components/NavBar';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import TaskProgress from './pages/TaskProgress'; // Import TaskProgress component
import AdminLogin from './pages/Login';
import AdminRegi from './pages/Registration';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    

    
    const handleEditTask = (updatedTask) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        setIsEditing(false);
        setSelectedTask(null);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    
    const handleToggleComplete = async(t) => {
        const currTask = { ...t, status: !t.status }
        setTasks(tasks.map((task) => (task.id === t.id ? { ...task, status: !task.status } : task)));
        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${t.id}/`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(currTask),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Task updated:', data);
                // toast.success('Task updated successfully!');
            } else {
                // toast.error('Failed to update task');
                console.log('Failed to update task:', response);
            }
        } catch (error) {
            // toast.error('Failed to update task');
            console.log('Failed to update task:', response);
        }
    };

    return (
        <Router>
            <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Routes>
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
                        
                        
                        {/* <Route
                            path="/task-progress"
                            element={<TaskProgress totalTasks={tasks.length} completedTasks={tasks.filter(task => task.completed).length} />*/}
                        

                        <Route path="/" element={<AdminLogin />} />
                        <Route path="/registration" element={<AdminRegi />} />
                    </Routes>
                </motion.div>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;
