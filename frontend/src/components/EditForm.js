import {React,useState,useContext,useEffect} from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/context';

function EditForm() {
  
  const navigate = useNavigate();
  const {setTasks,tasks,setError,editTask} = useContext(TaskContext);

  const [taskTitle, setTaskTitle] = useState(editTask?.title) ;
  const [taskDescription, setTaskDescription] = useState(editTask?.description);
  const [dueDate, setDueDate] = useState(editTask?.due_date);
  const [priority, setPriority] = useState(editTask?.priority); 
  const [status, setStatus] = useState(editTask?.status); 
  const formatDate = (date)=>{
    if(!date) return null;
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      dueDate,
      priority,
      status
    };
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${editTask._id}`,newTask);
      const newTasks = tasks.map(task1=> task1._id === editTask._id ? response.data : task1);
      navigate("/");
      setTasks(newTasks);
    } catch (error) {
      setError(error.message);
    }
  };


  useEffect(() => {
    if (!editTask) {
      navigate("/"); 
    }
  }, [editTask, navigate]);
  return (
    <div className='m-auto h-[100vh] w-[1037px] relative'>
      <div className="h-[146px] w-[100%] mt-10 mx-auto grid place-content-center rounded-3xl bg-[#d9d9d9]">
          <p className="font-bold text-[43px] ">TASK MANAGER</p>
      </div>
      {editTask? <div className="w-full h-[500px] top-[200px] rounded-2xl bg-[#d9d9d9] flex flex-col absolute z-10">
      <div className="grid place-content-center">
        <h1 className="text-[40px] font-bold mt-4">
          EDIT TASK
        </h1>
        <div className='absolute top-6 right-6 cursor-pointer' onClick={()=>{navigate("/")}}>

          <IoIosCloseCircleOutline size={40}/>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className='flex gap-4 mt-10'>
          <div className="flex flex-col gap-10 justify-center items-center w-[50%] h-full ">
            <div className='relative'>
              <input type="text" name="title" id="title" 
                required
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="text-black w-[300px] h-[70px] p-2.5 rounded-lg border-2 peer border-black"
                
                />
              <label htmlFor="title" className={`absolute peer-focus:top-0 peer-focus:text-[15px] peer-focus:left-2 ease-in transition-all duration-200  ${ taskTitle ? ' left-2 text-[15px] top-1' : 'top-4 left-4 text-xl'} `}>Title</label>
            </div>

            <div className="relative">
              <input type="text" name="description" id="description" 
                required
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="text-black w-[300px] h-[100px] peer p-2.5 rounded-lg border-2 border-black"
                />
              <label htmlFor="description" className={`absolute peer-focus:top-2 peer-focus:text-[15px] peer-focus:left-3 ease-in transition-all duration-200 ${taskDescription? 'left-3 text-[15px] top-2' : 'top-8 left-4 text-xl'}`}>Description</label>
            </div>
          </div>

          <div className='flex flex-col gap-6 w-[50%] h-full items-center'>
            <div className='relative '>
              <input type="date" name="dueDate" id="dueDate" 
                required
                value={formatDate(dueDate)}
                onChange={(e) => setDueDate(e.target.value)}
                className="text-black w-[300px] h-[70px] p-2.5 rounded-lg border-2 border-black"
                />
              <label htmlFor="dueDate" className={`absolute 'top-0 left-3 text-[18px]`}>Due Date:</label>
            </div>


            <div className='relative flex gap-4 mt-8'>
              <div>
                <select name="priority" id="priority" 
                  required
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="text-black w-[200px] h-[70px] p-2.5 rounded-lg border-2 border-black"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <select name="status" id="status" 
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="text-black w-[200px] h-[70px] p-2.5 rounded-lg border-2 border-black"
                >
                  <option value="Pending">Pending</option>
                  <option value="Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className='h-full w-full absolute top-[350px] left-[44%]'>
            <button type='submit' className="bg-[#7ed957]  text-black hover:bg-[#75c454] h-[70px] w-[150px] mt-[25.6px] rounded-3xl grid place-content-center font-bold text-[19px] cursor-pointer" 
              >EDIT</button>
          </div>
          
        </form>
      </div>

    </div> : null}
    </div>
    
  )
}

export default EditForm
