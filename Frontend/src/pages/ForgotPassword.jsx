import React, { useState } from 'react'
import EmailForOtp from '../components/forgetPassword/EmailForOtp'
import VerifyOtp from '../components/forgetPassword/VerifyOtp'
import ResetPassword from '../components/forgetPassword/ResetPassword'

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [state, setState] = useState("SendOtp");



    return (
        <div className='flex justify-center items-center'>
            <div className='flex w-10/12 rounded-md py-10 bg-[black]/[0.025] justify-start items-center'>
                {
                    state === "SendOtp" ? (
                        <EmailForOtp email={email} setState={setState} setEmail={setEmail} />

                    ) : (
                        state === "VerifyOtp" ? (
                            <VerifyOtp email={email} setState={setState} />
                        ) : (
                            <ResetPassword email={email} />
                        )
                    )
                }

            </div>
        </div>
    )
}

export default ForgotPassword