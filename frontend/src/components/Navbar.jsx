
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavBar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1e3c72' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Task Management
                </Typography>
                <Box display="flex" alignItems="center">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button color="inherit" onClick={()=>{setSelectedTask(null);setIsEditing(false)}} component={Link} to="/add-task">
                            Add Task
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button color="inherit" component={Link} to="/view-tasks">
                            View Tasks
                        </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button color="inherit" component={Link} to="/task-progress">
                            Task Completion
                        </Button>
                    </motion.div>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
