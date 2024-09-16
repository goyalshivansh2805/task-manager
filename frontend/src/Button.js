import React from 'react'

function Button({message,isSelected,onClick}) {


  return (
    <>
      <div onClick={onClick} className={`${isSelected? "bg-gray-500 text-white":"bg-[#d9d9d9] text-black hover:bg-[#cbcbcb]"} h-[70px] w-[150px] mt-[25.6px] rounded-3xl grid place-content-center font-bold text-[19px] cursor-pointer`} 
       >{message}</div>
    </>
  )
}

export default Button
