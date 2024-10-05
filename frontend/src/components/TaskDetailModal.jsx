
import React from 'react';
import { Modal, Box, Typography, Button, Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const style = {
    position: 'absolute',
    top: '50%',
    left: '30%',
    transform: 'translate(4%, 4%)',
    width: { xs: '90%', sm: 500 },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    outline: 'none',
};

const priorityColor = {
    High: 'error',
    Medium: 'warning',
    Low: 'success',
};

const TaskDetailModal = ({ task, open, handleClose }) => {
    if (!task) return null;

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'High':
                return <PriorityHighIcon />;
            case 'Medium':
                return <AssignmentTurnedInIcon />;
            case 'Low':
                return <LowPriorityIcon />;
            default:
                return null;
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="task-detail-title"
            aria-describedby="task-detail-description"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <Box sx={style}>
                    
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography id="task-detail-title" variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                {task.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleClose} sx={{ minWidth: 'auto', padding: 0 }}>
                                <CloseIcon />
                            </Button>
                        </Grid>
                    </Grid>

                    
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                    
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                                    Description:
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 0.5 }}>
                                    {task.description}
                                </Typography>
                            </Grid>

                        
                            <Grid item xs={12} sm={6} display="flex" alignItems="center">
                                {getPriorityIcon(task.priority)}
                                <Typography variant="subtitle1" sx={{ fontWeight: '600', ml: 1 }}>
                                    Priority:
                                </Typography>
                                <Chip
                                    label={task.priority}
                                    color={priorityColor[task.priority] || 'default'}
                                    size="small"
                                    sx={{ ml: 1 }}
                                />
                            </Grid>

                            
                            <Grid item xs={12} sm={6} display="flex" alignItems="center">
                                <DateRangeIcon />
                                <Typography variant="subtitle1" sx={{ fontWeight: '600', ml: 1 }}>
                                    Due Date:
                                </Typography>
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    {task.dueDate}
                                </Typography>
                            </Grid>

                            
                            <Grid item xs={12} sm={6} display="flex" alignItems="center">
                                <AssignmentTurnedInIcon />
                                <Typography variant="subtitle1" sx={{ fontWeight: '600', ml: 1 }}>
                                    Status:
                                </Typography>
                                <Chip
                                    label={task.completed ? 'Completed' : 'Incomplete'}
                                    color={task.completed ? 'success' : 'default'}
                                    size="small"
                                    sx={{ ml: 1 }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            color="primary"
                            startIcon={<CloseIcon />}
                            sx={{
                                px: 3,
                                py: 1,
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                },
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </motion.div>
        </Modal>
    );
};

export default TaskDetailModal;
