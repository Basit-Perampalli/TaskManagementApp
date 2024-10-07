
import React, { useEffect, useState } from 'react';
import TaskTable from '../components/TaskTable';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Container,Stack,Button, Typography, TextField } from '@mui/material';

const ViewTasks = ({ tasks,setTasks, onEditTask, onDeleteTask, onToggleComplete, setSelectedTask, setIsEditing }) => {
    const navigate = useNavigate();
    const [currPage,setCurrPage] = useState(1);
    const [pageCnt,setPageCnt] = useState(1);
    const [search,setSearch] = useState(null);
    const handleEditClick = (task) => {
        setSelectedTask(task);      
        setIsEditing(true);         
        navigate('/add-task');     
    };

    const fetchTasks = async () => {
        try {
          if (search){
            console.log(search)
            var response = await fetch(`http://127.0.0.1:8000/search/task/?page=${currPage}&title__contains=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
          }
          else{
            var response = await fetch(`http://127.0.0.1:8000/search/task/?page=${currPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
          }
          
    
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
      } catch (error) {
        toast.error('Internal server issue')
        console.error('There was a problem with the fetch operation:', error);
      }
      };

    useEffect(()=>{
        fetchTasks()
    },[currPage,search])


    return (
        <Container>
        <Box sx={{display:"flex",marginTop:"10px"}} justifyContent={'space-between'}>
            <div>
                
            <Typography variant="h4" color="initial">Tasks</Typography>
            </div>
            <TextField
                sx={{marginLeft:"55vh"}}
                    fullWidth
                  id="search"
                  variant='standard'
                  color='primary'
                  label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
        </Box>
        <TaskTable
            tasks={tasks}
            onEdit={handleEditClick}    
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
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
    );
};

export default ViewTasks;
