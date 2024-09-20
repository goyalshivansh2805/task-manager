import {React} from 'react';
import SubHome from './Utility/SubHome';

function Home() {


  return (
    <div className="m-auto h-[100vh] w-[1037px] flex flex-col font-sans relative">
      <div className="h-[146px] w-[100%] mt-10 mx-auto grid place-content-center rounded-3xl bg-[#d9d9d9]">
          <p className="font-bold text-[43px] ">TASK MANAGER</p>
      </div>

        <SubHome />
      
    </div>
  )
}

export default Home
