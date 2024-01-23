import React, { useState, useRef } from 'react'
import { ApiCalling } from '../../services/Api';
import { toast } from "react-toastify";

function VerifyOtp({ email, setState }) {


    const [otp, setOtp] = useState(["", "", "", "", ""])


    async function verifyHandler() {

        let OTP = otp.join("");

        const res = await ApiCalling("POST", "auth/VerifyOtpForgotPassword", { OTP, email });
        if (res.success) {
            toast.success("OTP Verified!");
            setState("RESET");
        } else {
            toast.error(res.message);

        }
    }

    function changeHandler(e, index) {
        const arr = [...otp];
        arr[index] = e.target.value;
        setOtp(arr);
    }

    return (
        <div className='flex flex-col gap-10 mt-5 justify-start items-center w-full'  >

            <div>
                <p className='text-2xl font-semibold text-[black]/[0.6]'>Verify OTP</p>
            </div>

            {/* OTP fields */}
            <div className='flex gap-5 justify-center items-center'>
                {otp.map((digit, index) => (
                    <div key={index}>
                        <input
                            required
                            type="text"
                            maxLength={1}
                            className='p-5 text-xl w-[55px] outline-none rounded-xl bg-white font-semibold'
                            value={otp[index]}
                            onChange={(e) => changeHandler(e, index)}
                            name={`box${index}`}
                        />
                    </div>
                ))}
            </div>

            {/* button */}
            <div className='my-5' >
                <button
                    onClick={verifyHandler}
                    className='bg-green-600 font-bold text-white py-3 hover:text-green-600 rounded-md hover:bg-transparent px-10 border-[3px] transition-all duration-300 ease-in-out border-transparent hover:border-green-600'
                >Verify</button>
            </div>


        </div >
    )
}

export default VerifyOtp;