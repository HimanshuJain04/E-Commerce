import React, { useState } from 'react'
import EmailForOtp from '../components/forgetPassword/EmailForOtp'
import VerifyOtp from '../components/forgetPassword/VerifyOtp'
import ResetPassword from '../components/forgetPassword/ResetPassword'

function ForgotPassword() {


    return (
        <div className='flex justify-center items-center'>
            <div className='flex w-10/12 rounded-md py-10 bg-[black]/[0.025] justify-start items-center'>

                {/* <EmailForOtp /> */}
                {/* <VerifyOtp /> */}
                <ResetPassword />

            </div>
        </div>
    )
}

export default ForgotPassword