import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {Link} from 'react-router-dom';

const LoginForm = ({setloginStatus}) => {

    const navigate= useNavigate();

    const [formData, setformData]= useState({
        email:"",
        password:""
    })

    const [showPassword, setshowPassword] = useState(false)

    function changeHandler(event){

       setformData((prevformData)=>({
    ...prevformData,
        [event.target.name]:event.target.value
       }))
    }

    function submitHandler(event){
        event.preventDefault();
        toast.success("Logged In");
        navigate("/dashboard")
    }
  return (
    <div>
        <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
            <label className='w-full' htmlFor="email"><p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address <sup className='text-pink-200'>*</sup></p>
            <input type="email" name='email' id='email' placeholder='Enter email address' value={formData.email} required onChange={changeHandler} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'/>
            </label>


            <label className='w-full relative' htmlFor="password"><p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Password<sup className='text-pink-200'>*</sup></p>
            <input type={showPassword?  ("text"): ("password")} name='password' id='password' placeholder='Enter Password' value={formData.password} required onChange={changeHandler} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'/>

            <span className='absolute right-3 top-[38px] cursor-pointer' onClick={()=>{setshowPassword((prev) => !prev)}}>
             {showPassword? (<AiOutlineEyeInvisible fontSize={24} color='white'/>):(<AiOutlineEye fontSize={24} color='white'/>)}
            </span> 

            <Link to="#">
               <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                Forgot Password
               </p>
            </Link>
            </label>

            <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                Sign In
            </button>

        </form>
    </div>
  )
}

export default LoginForm