import {React,useState} from 'react'

function Select({title,option1,option2,option3,handleChange}) {
  const [selectedValue, setSelectedValue] = useState('');
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    handleChange(e.target.value);
  }
  return (
    <>
      <form class="mt-[25.6px] h-[70px] w-[230px]">
          <label for={title} class="absolute left-[-9999px]">Select an option</label>
          <select id={title} value={selectedValue} onChange={handleSelectChange} class={`h-full cursor-pointer text-[20px] font-bold bg-[#d9d9d9] border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} >
            <option value="" >{title}</option>
            <option value={option1}>{option1}</option>
            <option value={option2}>{option2}</option>
            <option value={option3}>{option3}</option>

          </select>
        </form>
    </>
  )
}

export default Select
