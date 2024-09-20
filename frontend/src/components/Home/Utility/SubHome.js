import React, { useContext } from 'react'
import { FaSort } from "react-icons/fa";
import Button from '../../Utility/Button';
import Select from '../../Utility/Select';
import Tasks from "../../Tasks/Tasks";
import { TaskContext } from '../../../context/context';
import { useNavigate } from 'react-router-dom';
function Main() {
    const navigate = useNavigate();

    const {handleButtonClick,selectedButton,handleOrderChange,error,handleDelete,tasks,handleStatusChange,handlePriorityChange,setError,setEditTask} = useContext(TaskContext);

  return (
    <>
      <div className="flex justify-between">
        <Button 
          id={"due_date"}
          message={"Due Date"} 
          isSelected ={ selectedButton === "due_date"}
          onClick = {()=>handleButtonClick("due_date")}
          />
        {
          selectedButton === "due_date"? <div className="grid place-content-center mt-6 cursor-pointer" onClick={()=>{handleOrderChange()}}>
                <FaSort size={40}/>
              </div> : null
        }
        <Button 
          id={"priority"}
          message={"Priority"}
          isSelected ={ selectedButton === "priority"}
          onClick = {()=>handleButtonClick("priority")}
           />

        {
          selectedButton === "priority"? <div className="grid place-content-center mt-6 cursor-pointer" onClick={()=>{handleOrderChange()}}>
                <FaSort size={40}/>
              </div> : null
        }

        <Select 
          title={"Status"}
          option1={"Progress"}
          option2={"Completed"}
          option3={"Pending"}
          handleChange={handleStatusChange}
          />
        <Select 
          title={"Priority"}
          option1={"High"}
          option2={"Medium"}
          option3={"Low"}
          handleChange={handlePriorityChange}
          />

          <div onClick={()=>{
            navigate("/create")
          }} className="bg-[#7ed957] text-black hover:bg-[#75c454] h-[70px] w-[150px] mt-[25.6px] rounded-3xl grid place-content-center font-bold text-[19px] cursor-pointer" 
          >New</div>
      </div>
      

      <div className="flex flex-col w-full min-h-[400px] mt-10 border-gray-300 border-2 overflow-y-auto max-h-[600px]">
      {
        error ? (
          <p className="w-full h-full grid place-content-center font-bold text-[30px]">
            Error: {error}
          </p>
        ) : !tasks.length ? (
          <p className="w-full h-full grid place-content-center font-bold text-[30px]">
            No tasks to show
          </p>
        ) : (
          <Tasks tasks={tasks} handleDelete={handleDelete} error={error} setError={setError} setEditTask={setEditTask} />
        )
      } 

      </div >
    </>
  )
}

export default Main
