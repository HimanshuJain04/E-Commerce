import React, { useState, useContext } from 'react'
import { ApiCalling } from '../services/Api';
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext';

function ChangePassword() {

    const { setIsLoggedIn, isLoggedIn } = useContext(AppContext);

    const [data, setData] = useState(
        {
            oldPass: "",
            newPass: "",
            confPass: ""
        }
    )

    function changeHandler(e) {
        setData(
            {
                ...data,
                [e.target.name]: e.target.value
            }
        )

    }

    async function saveHandler() {
        const fd = new FormData();

        fd.append("oldPass", data.oldPass);
        fd.append("newPass", data.newPass);
        fd.append("confPass", data.confPass);
        fd.append("userId", isLoggedIn?._id);

        const res = await ApiCalling("POST", "user/changePassword", fd);

        if (res?.success) {
            setIsLoggedIn(res?.data);
            toast.success("Password Changed");

            setData(
                {
                    oldPass: "",
                    newPass: "",
                    confPass: "",
                }
            );

        } else {

            toast.error(res.data.message);
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='flex w-10/12 flex-col gap-10 rounded-md py-10 bg-[black]/[0.025] justify-start items-center'>
                {/* Old password */}
                <div className='flex flex-col gap-1'>
                    <label
                        htmlFor="oldPass"
                        className='text-lg font-semibold text-[black]/[0.8]'
                    >Old Password</label>
                    <input
                        type="text"
                        className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                        placeholder='Enter your old password'
                        id='oldPass'
                        name='oldPass'
                        value={data.oldPass}
                        onChange={changeHandler}
                        required
                    />
                </div>

                {/* new password */}
                <div className='flex flex-col gap-1'>
                    <label
                        htmlFor="newPass"
                        className='text-lg font-semibold text-[black]/[0.8]'
                    >New Password</label>
                    <input
                        type="text"
                        className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                        placeholder='Enter your new password'
                        id='newPass'
                        name='newPass'
                        value={data.newPass}
                        onChange={changeHandler}
                        required
                    />
                </div>

                {/* confirm password */}
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
                        name='confPass'
                        value={data.confPass}
                        onChange={changeHandler}
                        required
                    />
                </div>


                {/* button */}
                <div className='my-10'>
                    <button
                        onClick={saveHandler}
                        className='bg-blue-600 font-semibold text-white py-3 hover:text-blue-600 rounded-md hover:bg-transparent px-10 border-[3px] transition-all duration-300 ease-in-out border-transparent hover:border-blue-600'
                    >Save</button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword