import React from 'react'
import Task from './Task'

function Tasks({tasks,handleDelete,error,setError,setIsUpdateFormHidden,setEditTask}) {
  return (
    <ul>
      {tasks.map((task)=>{
              return <Task
                key={task._id}
                task={task}
                handleDelete = {handleDelete}
                error={error}
                setError={setError}
                setIsUpdateFormHidden={setIsUpdateFormHidden}
                setEditTask={setEditTask}
               />
          })}
    </ul>
  )
}

export default Tasks
