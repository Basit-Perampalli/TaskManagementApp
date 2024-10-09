// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, TextField,Avatar,IconButton,Tooltip,MenuItem,Menu } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavBar = ({ onLogout }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      const handleLogout=()=>{
        localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/')
      }
    
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
                    <Box sx={{ flexGrow: 0 }}>
          </Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                {/* <MenuItem key={"proflie"} onClick={()=>{handleCloseUserMenu(); setProfileModal(true)}}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem> */}
                <MenuItem key={"logout"} onClick={()=>{handleCloseUserMenu(); handleLogout()}}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
                    {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
