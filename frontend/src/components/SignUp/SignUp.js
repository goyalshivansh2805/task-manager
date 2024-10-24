import {React,useState} from 'react';
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function SignUp() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passType,setPassType] = useState("password");
  const [isToast,setIsToast] = useState(false);

  const navigate = useNavigate();

  const handleShowPassword = ()=>{
    setPassType(passType === "password"? "text" : "password");
  }

  const handleSubmit = async () =>{
    if(!name ||!email ||!password){
      if(isToast) return;
      setIsToast(true);
      setTimeout(()=>{setIsToast(false)},5000);
      toast.error('All fields are required' ,{position:"top-center"});
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`,{
        name,
        email,
        password
      })
      if(response.status === 200){
        toast.success(response.data.message,{position:"top-center"});
        setTimeout(()=>{
          navigate("/login");
        },2000);
      }
    } catch (error) {
      if(isToast){
        return;
      }
      toast.error(error.response.data.message,{position:"top-center"})
      setIsToast(true);
      setTimeout(()=>{
        setIsToast(false);
      },5000);
    }
  }
  
  return (
    <div className="m-auto h-[100vh] w-[1037px] flex flex-col font-sans relative">
      <div className="h-[706px] w-[100%] mt-10 mx-auto flex flex-col gap-4 rounded-3xl bg-[#d9d9d9]">
          <div className='w-[100%] grid place-content-center'>
            <h1 className="font-bold text-[43px]">TASK MANAGER</h1>
            <div className='border-2 border-black'/>
            <p className=" mx-auto text-[25px]">Create a new account</p>
          </div>
      
          <div className='border-2 border-black'/>
          <div className='flex flex-col w-[500px]  h-[500px] gap-10 justify-center items-center m-auto mt-[30px]'>
            <div className='h-[50px] w-[400px] relative'>
              <input type="text" id='name' className='h-full w-full rounded-2xl pl-4 peer' 
              value={name} onChange={(e)=>setName(e.target.value)} />
              <label className={`absolute ease-in transition-all transtion-2000 peer-focus:top-[1px] peer-focus:left-[15px] peer-focus:text-[13px]  ${name !== ""?" top-[1px] left-[15px] text-[13px]":"top-2 left-4 text-[20px]"} `} htmlFor='name'>Name</label>
            </div>
            <div className='h-[50px] w-[400px] relative'>
              <input type="email" id='email' className='h-full w-full rounded-2xl pl-4 peer ' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 

              />
              <label className={`absolute ease-in transition-all transtion-2000 peer-focus:top-[1px] peer-focus:left-[15px] peer-focus:text-[13px]  ${email !== ""?" top-[1px] left-[15px] text-[13px]":"top-2 left-4 text-[20px]"} `} htmlFor='email'>Email</label>
            </div>
            <div className='h-[50px] w-[400px] relative'>
              <input type={passType} id='password' className='h-full w-full rounded-2xl pl-4 peer font-bold'
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
              />
              <label className={`absolute ease-in transition-all transtion-2000 peer-focus:top-[1px] peer-focus:left-[15px] peer-focus:text-[13px]  ${password !== ""?" top-[1px] left-[15px] text-[13px]":"top-2 left-4 text-[20px]"} `} htmlFor='password'>Password</label>
              <div onClick={()=>{handleShowPassword()}} className='absolute right-2 top-1' >
                {passType === "password" ? <IoEyeOffSharp size={40}/> : <IoEyeSharp size={40}/> }
              </div>
            </div>

            <div onClick={()=>{handleSubmit()}} className='cursor-pointer w-[300px] h-[50px] mx-auto rounded-2xl bg-blue-300 font-bold text-[25px] text-black grid place-content-center'>
              REGISTER
            </div>

            <div className='font-serif text-[20px]'>Already have an Account? <span className='cursor-pointer underline font-bold' onClick={()=>{
              navigate("/login");
            }}>Login here</span></div>
            <div></div>
          </div>
      </div>
    </div>
  )
}

export default SignUp

