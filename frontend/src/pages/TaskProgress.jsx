
import React from 'react';
import TaskCompletionChart from '../components/TaskCompletionChart';

const TaskProgress = () => {
    const totalTasks = 5; 
    const completedTasks = 2; 

    return (
        <div style={{ padding: '20px' }}>
            <TaskCompletionChart totalTasks={totalTasks} completedTasks={completedTasks} />
        </div>
    );
};

export default TaskProgress;
