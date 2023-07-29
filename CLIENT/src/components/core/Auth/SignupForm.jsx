import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import { toast } from 'react-hot-toast';


const SignUpForm = ({setloginStatus}) => {

    const [formData, setformData]= useState({
        fname:"",
        lname:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [showPassword, setshowPassword] = useState(false);

    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    const [accountType, setAccountType] = useState("student");

    const navigate= useNavigate();


    function changeHandler(event){

        setformData((prevformData)=>({
     ...prevformData,
         [event.target.name]:event.target.value
        }))
    }

    function submitHandler(event){
        event.preventDefault();
        if(formData.password !== formData.confirmPassword)
        {
            toast.error("Password And Confirm Password Do Not Match");
            return;
        }

        toast.success("Welcome Onboard");
        navigate("/dashboard");

        console.log(formData)
    }


  return (
    <div >
       <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
        <button
        className={`${accountType === "student" 
        ?
        "bg-richblack-900 text-richblack-5"
        :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
        onClick={()=> setAccountType("student")}>
            Student
        </button>

        <button
                    className={`${accountType === "instructor" 
            ?
              "bg-richblack-900 text-richblack-5"
            :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType("instructor")}>
            Instructor
        </button>
       </div>


       <form onSubmit={submitHandler}>

       <div className='flex gap-x-4 mt-[20px]'>
         <label htmlFor="fname" className='w-full' >
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name <sup className='text-pink-200'>*</sup></p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' type="text" required name='fname' id='fname' placeholder='Enter First Name' onChange={changeHandler} value={formData.fname}/>
         </label>

         <label className='w-full' htmlFor="lname" >
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name <sup className='text-pink-200'>*</sup></p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'  type="text" required name='lname' id='lname' placeholder='Enter Last Name' onChange={changeHandler} value={formData.lname}/>
         </label>
       </div>
       
       
       <div className='mt-[20px]'>
       <label htmlFor="email" className='w-full mt-[20px]'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'> Email <sup className='text-pink-200'>*</sup></p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' type="email" required name='email' id='email' placeholder='Enter email address' onChange={changeHandler} value={formData.email}/>
        </label>

        </div>



        <div className='w-full flex gap-x-4 mt-[20px]'>
        <label className='w-full relative' htmlFor="password"><p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' type={showPassword?  ("text"): ("password")} name='password' id='password' placeholder='Enter Password' value={formData.password} required onChange={changeHandler}/>

            <span className='absolute right-3 top-[38px] cursor-pointer'  onClick={()=>{setshowPassword((prev) => !prev)}}>
             {showPassword? (<AiOutlineEyeInvisible fontSize={24} color='white'/>):(<AiOutlineEye fontSize={24} color='white'/>)}
            </span> 
        </label>

        <label className='w-full relative' htmlFor="confirmPassword"><p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' type={showConfirmPassword?  ("text"): ("password")} name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} required onChange={changeHandler}/>

            <span className='absolute right-3 top-[38px] cursor-pointer'  onClick={()=>{setshowConfirmPassword((prev) => !prev)}}>
             {showConfirmPassword?  (<AiOutlineEyeInvisible fontSize={24} color='white'/>):(<AiOutlineEye fontSize={24} color='white'/>)}
            </span> 
        </label>
        </div>


        <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Create Account
        </button>


       </form>
    </div>
  )
}

export default SignUpForm