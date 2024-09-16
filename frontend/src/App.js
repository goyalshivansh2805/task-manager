
import {React , useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import CreateForm from './CreateForm';
import EditForm from './EditForm';
import Main from './Main';

function App() {

  const [selectedButton, setSelectedButton] = useState(null);
  const [priority,setPriority] = useState('');
  const [status,setStatus] = useState('');
  const [tasks,setTasks] = useState([]);
  const [error,setError] = useState(null);
  const [order,setOrder] = useState(null);
  const [isCreateFormHidden,setIsCreateFormHidden] = useState(true);
  const [isUpdateFormHidden,setIsUpdateFormHidden] = useState(true);
  const [editTask,setEditTask] = useState(null);
  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleOrderChange = () =>{
    setOrder((prevOrder) => {
      const newOrder = prevOrder === "desc" ? "asc" : "desc";
      return newOrder;
    });
  }

  const handleButtonClick = (id) => {
    if(id !== selectedButton){
      setSelectedButton(id); 
    }else{
      setSelectedButton(null);
    }
  };

  useEffect(()=>{
    const fetchTasks =async  ()=>{
      try {
        
        const params = {};

      if (selectedButton) {
        params.sortBy = selectedButton; 
      }

      if (order) {
        params.order = order; 
      }

      if (status) {
        params.status = status;
      }

      if (priority) {
        params.priority = priority.toLowerCase(); 
      }

      const response = await axios.get("http://localhost:3500/api/tasks", { params });
      
      setTasks(response.data);

      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError(null); 
            setTasks([]); 
          } else {
            setError(`Error: ${error.response.status}`); 
          }
        } else if (error.request) {
          
          setError('Network error. Please try again later.');
        } else {
          
          setError('An error occurred.');
        }
      }
    }
    fetchTasks();
  },[selectedButton,order,status,priority]);


  const handleDelete = async(id)=>{
    try {
      const task = await axios.delete(`http://localhost:3500/api/tasks/${id}`);
      if(task.status === 200){
        setTasks(tasks.filter(t=>t._id!== id));
      }
    } catch (error) {
      setError(error.message);
    }
  }


  const handleEdit = ()=>{

  }


  const handleCreate =()=>{

  }

  return (
    <div className="m-auto h-[100vh] w-[1037px] flex flex-col font-sans relative">
      <Helmet>
        <title>Task Manager</title> 
        <link rel="icon" href="https://media.istockphoto.com/id/1303877287/vector/paper-checklist-and-pencil-flat-pictogram.jpg?s=612x612&w=0&k=20&c=NoqPzn94VH2Pm7epxF8P5rCcScMEAiGQ8Hv_b2ZwRjY=" />
      </Helmet>
      <div className="h-[146px] w-[100%] mt-10 mx-auto grid place-content-center rounded-3xl bg-[#d9d9d9]">
          <p className="font-bold text-[43px] ">TASK MANAGER</p>
      </div>
      {
        !isCreateFormHidden && <CreateForm 
        setIsCreateFormHidden={setIsCreateFormHidden}
        setTasks={setTasks}
        tasks={tasks}
        setError={ setError}
        />
      }
      {
        !isUpdateFormHidden && <EditForm 
        setIsUpdateFormHidden={setIsUpdateFormHidden}
        setTasks={setTasks}
        tasks={tasks}
        setError={ setError}
        task={editTask}
        />
      }
      {
        isCreateFormHidden && isUpdateFormHidden && 
        <Main 
        handleButtonClick={handleButtonClick}
        selectedButton={selectedButton}
        handleOrderChange={handleOrderChange}
        error={error}
        handleDelete={handleDelete}
        tasks={tasks}
        handleStatusChange={handleStatusChange}
        handlePriorityChange={handlePriorityChange}
        setError={setError}
        setIsCreateFormHidden={setIsCreateFormHidden}
        setEditTask={setEditTask}
        setIsUpdateFormHidden={setIsUpdateFormHidden}
        />
      }
      
    </div>
  )
}

export default App
