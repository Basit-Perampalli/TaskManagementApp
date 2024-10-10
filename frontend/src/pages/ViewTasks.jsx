
import React, { useContext, useEffect, useState } from 'react';
import TaskTable from '../components/TaskTable';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Container,Button, Typography, TextField, MenuItem, Select, InputLabel, FormControl  } from '@mui/material';
import NavBar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const ViewTasks = ({ tasks,setTasks, setSelectedTask, setIsEditing }) => {
    const navigate = useNavigate();
    const [currPage,setCurrPage] = useState(1);
    const [pageCnt,setPageCnt] = useState(1);
    const [search,setSearch] = useState(undefined);
    const [priorityFilter, setPriorityFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const {getnewtoken} = useContext(AuthContext)
    const handleEditClick = (task) => {
        setSelectedTask(task);      
        setIsEditing(true);         
        navigate('/add-task');     
    };

    const fetchTasks = async () => {
        var token = localStorage.getItem('refreshToken')
        if (token){
            token = await getnewtoken(token)
        }else{
            console.log('no token found')
            localStorage.removeItem('refreshToken')
            navigate('/')
            return
        }
        var url = `http://127.0.0.1:8000/search/task/?page=${currPage}`

        try {
          if (search){
            url = url+`&title__contains=${search}`
          }
          if (priorityFilter){
            url = url+`&priority=${priorityFilter}`
          }
          if (statusFilter){
            url = url+`&status=${statusFilter}`
          }
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':   `Bearer ${token}`
            }
        });
          
    
          if (!response.ok) {
              toast.error('Internal server issue')
          }
    
          const data = await response.json();
          console.log(data.results)
          if(data.count%7===0){
            setPageCnt(data.count/7);
            console.log(data.count/7);
          }else{
            setPageCnt((data.count-data.count%7)/7+1);
            console.log((data.count-data.count%7)/7+1);
          }
          setTasks(data.results);
          console.log(data);
          
      } catch (error) {
        toast.error('Internal server issue')
        console.error('There was a problem with the fetch operation:', error);
      }
      };

    useEffect(()=>{
        fetchTasks()
        const token = localStorage.getItem('refreshToken')
        if(!token){
            navigate('/')
        }
    },[currPage,search,priorityFilter,statusFilter])


    return (
        <Box>
        <NavBar setIsEditing={setIsEditing} setSelectedTask={setSelectedTask} />
        <Container>
        <Box sx={{display:"flex",marginTop:"10px"}} justifyContent={'space-between'} alignItems={'center'}>
            <div>
                
            <Typography variant="h4" color="initial">Tasks</Typography>
            </div>
            <TextField
                sx={{marginRight:"23px",marginLeft:"50px"}}
                fullWidth
                id="search"
                variant='standard'
                color='primary'
                label="Search"
                value={search}
                  onChange={(e)=>{setSearch(e.target.value);setCurrPage(1)}}
                  />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <FormControl variant="outlined" sx={{ minWidth: 120,marginX:"29px" }}>
                    <InputLabel id="priority-filter-label">Priority</InputLabel>
                    <Select
                        labelId="priority-filter-label"
                        value={priorityFilter}
                        onChange={(e) => {setPriorityFilter(e.target.value);setCurrPage(1)}}
                        label="Priority"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel id="status-filter-label">Status</InputLabel>
                    <Select
                        labelId="status-filter-label"
                        value={statusFilter}
                        onChange={(e) => {setStatusFilter(e.target.value);setCurrPage(1)}}
                        label="Status"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value='true'>Complete</MenuItem>
                        <MenuItem value="false">Incomplete</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
        <TaskTable
            tasks={tasks}
            setTasks={setTasks}
            onEdit={handleEditClick}   
            />
        <Box sx={{display:"flex",marginTop:"10px"}} justifyContent={'space-between'}>
            <Button variant='contained' disabled={currPage===1?true:false} onClick={()=>{setCurrPage(currPage-1)}}>
                Previous
            </Button>
            <Button variant='contained' disabled={currPage===pageCnt?true:false} onClick={()=>{setCurrPage(currPage+1)}}>
                Next
            </Button>
        </Box>
        </Container>
    </Box>
    );
};

export default ViewTasks;
