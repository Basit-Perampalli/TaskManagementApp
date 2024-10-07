import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Both fields are required');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = users.find(user => user.email === email && user.password === password);

        if (validUser) {
            toast.success('Login successful');
            onLogin(); 
            navigate('/add-task'); 
        } else {
            toast.error('Invalid email or password');
        }
    };

    return (
        <div style={styles.container}>
            <Box sx={styles.box}>
                <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <Box sx={styles.inputGroup}>
                        <Box sx={styles.inputField}>
                            <TextField
                                variant="outlined"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />
                        </Box>
                        <Box sx={styles.inputField}>
                            <TextField
                                variant="outlined"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                        </Box>
                    </Box>
                    <div style={styles.signupPassword}>
                        <Typography>
                            Don't have an account? <Link to="/registration">Register</Link>
                        </Typography>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{ mt: 2 }}
                            style={{ backgroundColor: '#1e3c72' }}
                        >
                            Login
                        </Button>
                    </motion.div>
                </form>
            </Box>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
    },
    box: {
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    inputField: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    signupPassword: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        fontSize: '14px',
    },
};

export default AdminLogin;
