import {useState, createContext,useEffect} from "react";
import axios from "axios";
export const TaskContext = createContext();

const TaskProvider = ({children})=>{

    const [priority,setPriority] = useState('');
    const [status,setStatus] = useState('');
    const [tasks,setTasks] = useState([]);
    const [error,setError] = useState(null);
    const [order,setOrder] = useState(null);
    const [editTask,setEditTask] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);

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

    const handleDelete = async(id)=>{
        try {
          const task = await axios.delete(`https://task-manager-api-xi-bice.vercel.app/api/tasks/${id}`);
          if(task.status === 200){
            setTasks(tasks.filter(t=>t._id!== id));
          }
        } catch (error) {
          setError(error.message);
        }
    }

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
    
          const response = await axios.get("https://task-manager-api-xi-bice.vercel.app/api/tasks", { params });
          
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

    return (
        <TaskContext.Provider value={{
            priority,
            status,
            tasks,
            error,
            order,
            editTask,
            selectedButton,
            handleStatusChange,
            handlePriorityChange,
            setPriority,
            setStatus,
            setTasks,
            setError,
            setOrder,
            setEditTask,
            setSelectedButton,
            handleDelete,
            handleButtonClick,
            handleOrderChange,


        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;