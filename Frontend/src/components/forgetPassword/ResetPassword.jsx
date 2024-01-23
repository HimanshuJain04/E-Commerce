import React, { useState } from 'react'
import { ApiCalling } from '../../services/Api';

function ResetPassword() {

    const [data, setData] = useState(
        {
            pass: "",
            conPass: ""
        }
    );

    async function saveHandler() {

        const res = await ApiCalling("POST", "auth/changeForgotPassword", data);
        console.log(res)

    }

    return (
        <div className='flex flex-col gap-10 mt-5 justify-start items-center w-full'  >

            <div>
                <p className='text-2xl font-semibold text-[black]/[0.6]'>Change Your Password</p>
            </div>

            {/* new password */}
            <div className='flex flex-col gap-1'>
                <label
                    htmlFor="pass"
                    className='text-lg font-semibold text-[black]/[0.8]'
                >New password</label>
                <input
                    type="text"
                    className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                    placeholder='Enter your new password'
                    id='pass'
                    name='pass'
                    value={data.pass}
                    onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }); }}
                    required
                />
            </div>

            {/* Confirm password */}
            <div className='flex flex-col gap-1'>
                <label
                    htmlFor="confPass"
                    className='text-lg font-semibold text-[black]/[0.8]'
                >Confirm Password</label>
                <input
                    type="text"
                    className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                    placeholder='Enter your confirm password'
                    id='confPass'
                    name='conPass'
                    value={data.conPass}
                    onChange={(e) => {
                        setData({ ...data, [e.target.name]: e.target.value });
                    }}
                    required
                />
            </div>

            {/* button */}
            <div className='my-5'>
                <button
                    onClick={saveHandler}
                    className='bg-blue-600 font-bold text-white py-3 hover:text-blue-600 rounded-md hover:bg-transparent px-10 border-[3px] transition-all duration-300 ease-in-out border-transparent hover:border-blue-600'
                >save</button>
            </div>

        </div>
    )
}

export default ResetPassword