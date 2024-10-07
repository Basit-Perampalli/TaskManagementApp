
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const TaskProgress = ({ totalTasks, completedTasks }) => {
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <Box sx={{ maxWidth: 600, margin: '40px auto', padding: 4, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: '600' }}>
                Task Progress
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {completedTasks} out of {totalTasks} tasks completed
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
            <Typography variant="body2" sx={{ mt: 1 }}>
                {Math.round(progress)}%
            </Typography>
        </Box>
    );
};

export default TaskProgress;
