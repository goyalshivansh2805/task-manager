import {React,useContext} from 'react';
import SubHome from './Utility/SubHome';
import {useNavigate} from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from '../../context/authContext';
import { TaskContext } from '../../context/context';



function Home() {

  const navigate = useNavigate();
  const {loading} = useContext(AuthContext);
  const {handleLogout} = useContext(TaskContext);

  return (
    <div className="m-auto h-[100vh] w-[1037px] flex flex-col font-sans relative">
      <div className="relative h-[146px] w-[100%] mt-10 mx-auto grid place-content-center rounded-3xl bg-[#d9d9d9]">
          <p className="font-bold text-[43px] ">TASK MANAGER</p>
          <div className='absolute right-2 top-2 cursor-pointer' onClick={handleLogout}>
            <IoIosLogOut size={50}/>
          </div>
      </div>
        {
          loading? "Loading..." :
          <SubHome />}
    </div>
  )
}

export default Home
