import React, { useContext } from 'react'
import Task from './Task';
import { TaskContext } from '../../context/context';

function Tasks() {

  const {tasks}  = useContext(TaskContext);
  return (
    <ul>
      {tasks.map((task)=>{
              return <Task
                key={task._id}
                task={task}
               />
          })}
    </ul>
  )
}

export default Tasks
