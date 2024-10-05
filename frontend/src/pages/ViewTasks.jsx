
import React from 'react';
import TaskTable from '../components/TaskTable';
import { useNavigate } from 'react-router-dom';

const ViewTasks = ({ tasks, onEditTask, onDeleteTask, onToggleComplete, setSelectedTask, setIsEditing }) => {
    const navigate = useNavigate();

    const handleEditClick = (task) => {
        setSelectedTask(task);      
        setIsEditing(true);         
        navigate('/add-task');     
    };

    return (
        <TaskTable 
            tasks={tasks}
            onEdit={handleEditClick}    
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
        />
    );
};

export default ViewTasks;
