import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminRegi = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        useEffect(()=>{
            const token = localStorage.getItem("accessToken")
            if(token){
                navigate('/view-tasks')
            }
        },[])

        if (!username || !email || !password) {
            toast.error('Please fill in all fields');
            return;
        }
        try {
            const response = await fetch("http://localhost:8000/auth/register/", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({email,"first_name":username,"last_name":username,password}),
            });
        
            if (!response.ok) {
              const errorData = await response.json();
              alert('User already Exist', response.status);
              return;
            }
        
            const received_data = await response.json();
            console.log('Registration successful:', received_data);
            localStorage.setItem('accessToken', received_data.access);
            localStorage.setItem('refreshToken', received_data.refresh);
            console.log(localStorage.getItem('accessToken'));
            
            navigate('/view-tasks')
            props.setIsLogin(true)
          } catch (error) {
            alert('Error during registration:', error);
          }
    };

    return (
        <div style={styles.container}>
            <Box sx={styles.box}>
                <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                    Registration
                </Typography>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <Box sx={styles.inputGroup}>
                        <Box sx={styles.inputField}>
                            <TextField
                                variant="outlined"
                                label="Name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                            />
                        </Box>
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
                            Already have an account? <Link to="/">Login</Link>
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
                            Register
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

export default AdminRegi;
