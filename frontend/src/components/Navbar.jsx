// src/components/NavBar.js
import React from 'react';
<<<<<<< HEAD
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
=======
import { AppBar, Toolbar, Typography, Button, Box, TextField } from '@mui/material';
>>>>>>> a32da2f151e03056401e7dbad325d3fe5c75880c
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavBar = ({ onLogout }) => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1e3c72' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Task Management
                </Typography>
                <Box display="flex" alignItems="center">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button color="inherit" component={Link} to="/add-task">
                            Add Task
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button color="inherit" component={Link} to="/view-tasks">
                            View Tasks
                        </Button>
                    </motion.div>
<<<<<<< HEAD
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
=======
                    
                    {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
>>>>>>> a32da2f151e03056401e7dbad325d3fe5c75880c
                        <Button color="inherit" component={Link} to="/task-progress">
                            Task Progress
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button color="inherit" onClick={onLogout}>
                            Logout
                        </Button>
                    </motion.div> */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
