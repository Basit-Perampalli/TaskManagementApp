
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { ArcElement, Chart as ChartJS, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskCompletionChart = ({ totalTasks, completedTasks }) => {
    const pendingTasks = totalTasks - completedTasks;

    const data = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                data: [completedTasks, pendingTasks],
                backgroundColor: ['#ff6384', '#ffcc00'],
                hoverBackgroundColor: ['#ff4d73', '#ffc107'],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: '85%', // Creates the "gauge" style by cutting out the center
        rotation: -90, // Start the gauge at the bottom
        circumference: 180, // Create a half-circle chart
        plugins: {
            legend: {
                display: false, // Hides the legend
            },
        },
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}
        >
            <Typography variant="h6" component="div" gutterBottom>
                Completed vs Pending Tasks
            </Typography>
            <Doughnut data={data} options={options} />
            <Typography
                variant="h4"
                component="div"
                sx={{ marginTop: '-140px', color: '#000' }}
            >
                {completedTasks}
            </Typography>
            <Typography
                variant="body2"
                sx={{ marginTop: '-5px', color: '#666' }}
            >
                Tasks
            </Typography>
            <Typography variant="body2" sx={{ color: '#888' }}>
                Task completion status.
            </Typography>
        </Box>
    );
};

export default TaskCompletionChart;
