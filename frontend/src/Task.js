import {React , useState} from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import TaskStatus from "./TaskStatus";
function Task({task,handleDelete,setIsUpdateFormHidden,setError,setEditTask}) {

    const [isDeleting, setIsDeleting] = useState(false);

    const dateFormater = (isoDate)=>{
        const date = new Date(isoDate);
        let formattedDate = null;
        if (!isNaN(date)) {
            formattedDate = date.toLocaleDateString('en-CA'); 
        } else {
            console.error('Invalid date format');
        }
        return formattedDate;
    }
    const formattedCreatedDate = dateFormater(task.createdAt);
    const formattedDueDate = dateFormater(task.due_date);

    const handleDeleteClick = async (task) => {
        if (isDeleting) return;
        setIsDeleting(true);
        setError(null);
        try {
          handleDelete(task._id);
        } catch (err) {
          if (err.response) {
            setError(`Error: ${err.response.status} - ${err.response.data.message}`);
          } else {
            setError('Error: Something went wrong');
          }
        } finally {
          setIsDeleting(false);
        }
      };

  const handleEditClick =()=>{
      setEditTask(task);
      setIsUpdateFormHidden(false);
  }
  return (
    <li className="bg-[#d9d9d9] rounded-2xl w-[95%] mx-auto h-[150px] mt-5 relative mb-5">
        <label >
            <p className="font-bold text-[50px] pt-[20px] pl-[30px] w-[500px] overflow-hidden whitespace-nowrap text-ellipsis">{task.title}</p>
            <p className="text-[20px] pt-[4px] pl-[30px] w-[500px] overflow-hidden whitespace-nowrap text-ellipsis">{task.description}</p>
            <TaskStatus status={task.status}/>
            <p className="absolute top-0 right-[180px] font-bold text-[40px]">
                <span className=" text-red-500">{task.priority}</span>
            </p>
            <p className="absolute top-[70px] right-[150px] font-bold text-2xl">
                {`Due: ${formattedDueDate}`} 
            </p>
            <p className="absolute top-[110px] right-[150px] font-bold text-xl">
                {`Created: ${formattedCreatedDate}`} 
            </p>

            <div className="h-[50px] w-[50px] absolute top-[20px] right-[30px] cursor-pointer" 
                onClick={()=>{handleDeleteClick(task)}}
                >
                <MdDelete size={50}/>
            </div>
            <div className="h-[50px] w-[50px] absolute top-[80px] right-[30px] cursor-pointer"
                onClick={()=>{handleEditClick()}}
                >
                <CiEdit size={50}/>
            </div>
        </label>
    </li>
  )
}

export default Task
