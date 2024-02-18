import React, { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ApiCalling } from '../services/Api.js';
import { toast } from "react-toastify"

function Signup() {

  const [viewPass, setViewPass] = useState(false);
  const [viewCPass, setViewCPass] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState(
    {
      name: "",
      email: "",
      gender: "",
      confirmPass: "",
      phoneNo: "",
      password: ""
    }
  )

  const sumbitHandler = async () => {

    const res = await ApiCalling("POST", "auth/signup", data);
    console.log(res);

    if (res?.success === true) {
      toast.success("SignUp success")
      navigate("/auth/login");
    } else {
      toast.error("SignUp Failed");
      toast.error(res?.data?.message);
    }
  }



  function onChange(e) {
    setData(
      {
        ...data,
        [e.target.name]: e.target.value
      }
    )
  }

  return (
    <div className='w-full flex justify-center bg-[black]/[0.03]'>
      <div className='w-11/12 flex gap-10'>

        {/* left part for image */}
        <div className='w-[60%]'>
          <img className='w-full h-full' src="https://cdn.dribbble.com/users/1946759/screenshots/4596801/admin.png" alt="login-image" />
        </div>


        {/* right part for form */}
        <div className='w-[40%] gap-4 flex justify- items-center flex-col py-10'>

          {/* heading etc */}
          <div className='flex justify-center w-full'>
            <p className='text-4xl font-semibold'>Sign up for new account</p>
          </div>

          {/* form */}
          <div className=' gap-5 flex flex-col w-full mt-10 p-5 max-w-[80%] '>



            {/* name */}
            <div className='flex w-full border-[black]/[0.2] rounded-lg border-2 justify-center gap-2 items-end'>
              <input
                type="text"
                name='name'
                id='name'
                onChange={onChange}
                placeholder='Enter your full name'
                required
                className='outline-none rounded-lg py-2 w-full px-2 font-semibold'
              />
            </div>

            {/* email */}
            <div className='flex w-full border-[black]/[0.2] rounded-lg border-2 justify-center gap-2 items-end'>

              <input
                type="email"
                name='email'
                id='email'
                onChange={onChange}
                placeholder='Enter your email address'
                required
                className='outline-none py-2 rounded-lg w-full px-2 font-semibold'
              />
            </div>


            {/* password */}
            <div className='flex relative w-full rounded-lg border-[black]/[0.2] border-2 justify-center gap-2 items-end'>
              <input
                type={viewPass ? "text" : "password"}
                name='password'
                id='password'
                placeholder='Enter your password'
                required
                onChange={onChange}
                className='outline-none py-2 rounded-lg w-full px-2 font-semibold'
              />
              <button className='absolute top-[30%] right-[5%]' onClick={() => { setViewPass(!viewPass) }}>
                {
                  viewPass ? (<IoEyeOutline fontSize={20} />) : (< FaRegEyeSlash fontSize={20} />
                  )
                }
              </button>
            </div>

            {/* Confirm password */}
            <div className='flex relative w-full rounded-md border-[black]/[0.2] border-2 justify-center gap-2 items-end'>
              <input
                type={viewCPass ? "text" : "password"}
                name='confirmPass'
                id='confirmPass'
                placeholder='Enter your confirm password'
                required
                onChange={onChange}
                className='outline-none py-2 rounded-lg w-full px-2 font-semibold'
              />
              <button className='absolute top-[30%] right-[5%]' onClick={() => { setViewCPass(!viewCPass) }}>
                {
                  viewCPass ? (<IoEyeOutline fontSize={20} />) : (< FaRegEyeSlash fontSize={20} />
                  )
                }
              </button>
            </div>

            <div className='flex gap-5 w-full'>
              {/* Gender */}
              <div className='flex w-[70%] border-[black]/[0.2] rounded-lg border-2 justify-center gap-2 items-end'>
                <select
                  name='gender'
                  id='gender'
                  onChange={onChange}
                  required
                  className='outline-none rounded-lg py-2 w-full px-2 font-semibold'
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

              </div>

              {/* number */}
              <div className='flex w-full border-[black]/[0.2] rounded-lg border-2 justify-center gap-2 items-end'>
                <input
                  type="number"
                  name='phoneNo'
                  id='phoneNo'
                  onChange={onChange}
                  placeholder='Enter phone number'
                  required
                  className='outline-none rounded-lg py-2 w-full px-2 font-semibold'
                />
              </div>

            </div>


            <div className='w-full mt-10 flex justify-center'>
              <button
                onClick={sumbitHandler}
                className='w-[100%] bg-blue-500 border-2 border-transparent transition-all duration-300 ease-in-out hover:border-blue-500 hover:bg-transparent hover:text-blue-500 text-white font-semibold rounded-lg py-2 text-lg'
              >Create Account</button>
            </div>

          </div>

          <div className='flex w-full gap-2 items-center'>
            <div className='w-full h-[2px] bg-black'></div>
            <p>OR</p>
            <div className='w-full h-[2px] bg-black'></div>
          </div>

          <div className='w-full items-center flex justify-center'>
            <Link
              to="/auth/login"
              className=' hover:underline font-semibold'
            >Login</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signup