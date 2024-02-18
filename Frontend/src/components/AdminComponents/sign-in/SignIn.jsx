import { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { ApiCalling } from '../../../services/Api.js';
import { toast } from "react-toastify"


function SignIn() {


  const [viewPass, setViewPass] = useState(false);
  const [viewCPass, setViewCPass] = useState(false);

  const [data, setData] = useState(
    {
      name: "",
      email: "",
      gender: "",
      confirmPass: "",
      phoneNo: "",
      password: "",
      checkbox: false
    }
  );

  const sumbitHandler = async () => {

    const res = await ApiCalling("POST", "auth/signup", data);
    if (res.success) {
      toast.success("User creation successfully");

      setData(
        {
          name: "",
          email: "",
          gender: "",
          confirmPass: "",
          phoneNo: "",
          password: "",
          checkbox: false
        }
      );

    } else {
      toast.error(res.message);
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
    <div className='flex justify-center items-center mt-20'>


      <div className='w-[600px] bg-white rounded-lg px-10 py-10 gap-4 shadow-lg flex justify- items-center flex-col'>

        {/* heading etc */}
        <div className='flex justify-center w-full'>
          <p className='text-4xl font-semibold'>Create New User</p>
        </div>

        {/* form */}
        <div className=' gap-5 flex flex-col w-full p-5 max-w-[80%] '>

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

          {/* checkbox */}
          <div className='w-full flex justify-start gap-2 items-center '>
            <label
              htmlFor="checkbox"
              className=" max-w-xs flex p-3 w-full border bg-white border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <input
                type="checkbox"
                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                name='checkbox'
                id='checkbox'
                onChange={(e) => {
                  setData(
                    {
                      ...data,
                      checkbox: e.target.checked
                    }
                  )
                }}
                value={data.checkbox}
              />
              <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">Make user as <span className='font-semibold'>admin</span></span>
            </label>
          </div>


          <div className='w-full mt-10 flex justify-center'>
            <button
              onClick={sumbitHandler}
              className='w-[100%] bg-blue-700 border-2 border-transparent transition-all duration-300 ease-in-out hover:border-blue-700 hover:bg-transparent hover:text-blue-700 text-white font-semibold rounded-lg py-2 text-lg'
            >Create User</button>
          </div>

        </div>
      </div>
    </div >
  )
}

export default SignIn;
