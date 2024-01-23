import React, { useState } from 'react'
import { ApiCalling } from '../../services/Api';
import { toast } from "react-toastify";



function EmailForOtp({ email, setEmail, setState }) {



    async function sendHandler() {
        const res = await ApiCalling("POST", "auth/sendOTPForForgotPassword", { email });
        console.log(res)
        if (res.success) {
            toast.success("Otp Sent Successfully")
            setState("VerifyOtp");
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div className='flex flex-col gap-10 mt-5 justify-start items-center w-full'>
            <div>
                <p className='text-2xl text-[black]/[0.6]'>Otp will be sent on your email address</p>
            </div>

            {/* email for otp */}
            <div className='flex flex-col gap-1'>
                <label
                    htmlFor="email"
                    className='text-lg font-semibold text-[black]/[0.8]'
                >Email Address</label>
                <input
                    type="email"
                    className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                    placeholder='Enter your email Address'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); }}
                    required
                />
            </div>


            {/* button */}
            <div className='my-5'>
                <button
                    onClick={sendHandler}
                    className='bg-blue-600 font-semibold text-white py-3 hover:text-blue-600 rounded-md hover:bg-transparent px-10 border-[3px] transition-all duration-300 ease-in-out border-transparent hover:border-blue-600'
                >Sent</button>
            </div>
        </div>
    )
}

export default EmailForOtp;