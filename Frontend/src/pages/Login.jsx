import React, { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ApiCalling } from '../services/Api';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from "react-toastify"

function Login() {

    const { setIsLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();

    const [view, setView] = useState(false);
    const [data, setData] = useState(
        {
            email: "",
            password: ""
        }
    )

    function onChange(e) {
        setData(
            {
                ...data,
                [e.target.name]: e.target.value
            }
        )
    }

    const sumbitHandler = async () => {
        const res = await ApiCalling("POST", "auth/login", data);

        if (res.success === true) {
            setIsLoggedIn(res?.existUser);
            localStorage.setItem('EcommerceUser', res?.token);
            toast.success("Login success")
            toast.success(`Hello ${res.existUser.name}`);
            navigate("/");
        } else {
            toast.error("Login Failed");
            toast.error(res?.data?.message);
            setIsLoggedIn(null);
        }
    }



    return (
        <div className='w-full flex justify-center bg-[black]/[0.03]'>
            <div className='w-10/12 flex'>

                {/* left part for image */}
                <div className='w-[60%]'>
                    <img className='w-full h-full' src="http://dli-eduventure.um.ac.id/assets/img/login.png" alt="login-image" />
                    {/* <img className='w-full h-full' src="https://th.bing.com/th/id/OIP.5qtkmlgdPxFxxLZ6nIJ5AgAAAA?pid=ImgDet&w=200&h=200&c=7&dpr=1.3" alt="login-image" /> */}
                </div>


                {/* right part for form */}
                <div className='w-[30%] gap-4 flex justify-start items-start flex-col py-10'>

                    {/* heading etc */}
                    <div className='flex flex-col justify-start items-start gap-5'>
                        <p className='text-5xl font-semibold'>Welcome Back {":)"}</p>
                        <p className='font-semibold text-[black]/[0.6]'>To keep connected with us please login with your personal information by email address and password</p>
                    </div>

                    {/* form */}
                    <div className=' gap-5 flex flex-col w-full mt-10 '>

                        {/* email */}
                        <div className='flex bg-white border-[black]/[0.2] rounded-md border-2 justify-center gap-2 items-end'>
                            <CiMail fontSize={35} className='text-[black]/[0.3]' />
                            <div className='flex flex-col w-full'>
                                <label htmlFor="email" className='text-[black]/[0.3] font-semibold'>Email Address</label>
                                <input
                                    type="email"
                                    name='email'
                                    id='email'
                                    onChange={onChange}
                                    placeholder='Enter your email address'
                                    required
                                    className='outline-none py-2 w-full px-2 font-semibold'
                                />
                            </div>
                        </div>

                        {/* password */}
                        <div className='flex bg-white relative w-full rounded-md border-[black]/[0.2] border-2 justify-center gap-2 items-end'>
                            <CiLock fontWeight={900} fontSize={35} className='text-[black]/[0.3]' />
                            <div className='flex flex-col w-full '>
                                <label htmlFor="password" className='text-[black]/[0.3] font-semibold'>Password</label>
                                <input
                                    type={view ? "text" : "password"}
                                    name='password'
                                    id='password'
                                    placeholder='Enter your password'
                                    required
                                    onChange={onChange}
                                    className='outline-none py-2 w-full px-2 font-semibold'
                                />
                            </div>
                            <button className='absolute top-[50%] right-[5%]' onClick={() => { setView(!view) }}>
                                {
                                    view ? (<IoEyeOutline fontSize={20} />) : (< FaRegEyeSlash fontSize={20} />
                                    )
                                }
                            </button>
                        </div>

                        {/* forget password link */}
                        <div className='w-full flex justify-end'>
                            <Link
                                to="auth/forget-password"
                                className='text-blue-500 font-semibold hover:underline transition-all duration-300 ease-in-out'

                            >Forget password</Link>

                        </div>

                        <div className='w-full'>
                            <button
                                onClick={sumbitHandler}
                                className='w-full bg-blue-500 border-2 border-transparent transition-all duration-300 ease-in-out hover:border-blue-500 hover:bg-transparent hover:text-blue-500 text-white font-semibold rounded-lg py-2 text-lg'
                            >Login</button>
                        </div>

                    </div>

                    <div className='flex w-full gap-2 items-center'>
                        <div className='w-full h-[2px] bg-black'></div>
                        <p>OR</p>
                        <div className='w-full h-[2px] bg-black'></div>
                    </div>

                    <div className='w-full items-center flex justify-center'>
                        <Link
                            to="/auth/signup"
                            className=' hover:underline font-semibold'
                        >Create Account</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login