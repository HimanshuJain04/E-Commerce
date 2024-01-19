
import React, { useContext, useState } from 'react';
import { AppContext } from "../context/AppContext";

function Profile() {

    const { isLoggedIn } = useContext(AppContext);

    console.log(isLoggedIn);

    const [data, setData] = useState(
        {
            name: isLoggedIn?.name,
            email: isLoggedIn?.email,
            phoneNo: isLoggedIn?.phoneNo,
            gender: isLoggedIn?.gender,
            address: isLoggedIn?.address
        }
    );



    function changeHandler(e) {
        setData(
            {
                ...data,
                [e.target.name]: e.target.value
            }
        );
    }

    return (
        <div>
            <div className='flex w-full justify-center items-center'>
                <div className='flex w-10/12 flex-col gap-5 py-5 bg-[black]/[0.05] justify-start items-center'>
                    {/* upper part for image */}
                    <div className='justify-center w-full items-center flex py-5'>
                        {/* profile-image */}
                        <div className='rounded-full h-[200px] w-[200px] overflow-hidden'>
                            <img
                                className='object-contain rounded-full '
                                src={isLoggedIn?.profileImg}
                                alt={isLoggedIn?.name}
                            />
                        </div>

                    </div>

                    {/* lower part for user-details */}
                    <div className='flex flex-col gap-5 justify-start items-center'>

                        {/* user-name */}
                        <div className='flex flex-col gap-1'>
                            <label
                                htmlFor="name"
                                className='text-lg font-semibold text-[black]/[0.8]'
                            >Full Name</label>
                            <input
                                type="text"
                                className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                                placeholder='Enter your full name'
                                id='name'
                                name='name'
                                value={data.name}
                                onChange={changeHandler}
                                required
                            />

                        </div>

                        {/* user-email */}
                        <div className='flex flex-col gap-1'>
                            <label
                                htmlFor="email"
                                className='text-lg font-semibold text-[black]/[0.8]'
                            >Email Address</label>
                            <input
                                type="text"
                                className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                                placeholder='Enter your email address'
                                id='email'
                                name='email'
                                readOnly
                                value={data.email}
                                onChange={changeHandler}
                                required
                            />

                        </div>
                        {/* user-email */}
                        <div className='flex flex-col gap-1'>
                            <label
                                htmlFor="email"
                                className='text-lg font-semibold text-[black]/[0.8]'
                            >Email Address</label>
                            <input
                                type="text"
                                className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                                placeholder='Enter your email address'
                                id='email'
                                name='email'
                                readOnly
                                value={data.email}
                                onChange={changeHandler}
                                required
                            />

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile