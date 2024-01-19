
import React, { useContext, useRef, useState } from 'react';
import { AppContext } from "../context/AppContext";
import { ApiCalling } from '../services/Api';
import { toast } from 'react-toastify';

function Profile() {

    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

    const inputRef = useRef(null);

    const [data, setData] = useState(
        {
            name: isLoggedIn?.name,
            email: isLoggedIn?.email,
            phoneNo: isLoggedIn?.phoneNo,
            gender: isLoggedIn?.gender,
            image: "",
        }
    );


    async function saveHandler() {

        const fd = new FormData();

        fd.append("userId", isLoggedIn?._id);
        fd.append("name", data?.name);
        fd.append("gender", data?.gender);
        fd.append("phoneNo", data?.phoneNo);
        fd.append("image", data?.image);

        const res = await ApiCalling("POST", "user/updateUserInfo", fd);

        if (res?.success) {
            setIsLoggedIn(res?.data);
            toast.success("Updated user info");
        } else {
            toast.error("Something went wrong,try again later");
        }

    }


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
                        <button
                            onClick={() => { inputRef.current.click(); }}
                            className='rounded-full bg-black border-2 border-black relative h-[200px] flex justify-center items-center w-[200px] overflow-hidden'>
                            <input
                                ref={inputRef}
                                type="file"
                                onChange={(e) => {
                                    setData(
                                        {
                                            ...data,
                                            image: e.target.files[0]

                                        }
                                    )
                                }}
                                className='hidden'
                            />
                            <img
                                className='object-cover scale-110 '
                                src={
                                    data.image === "" ? isLoggedIn?.profileImg : (URL.createObjectURL(data.image))
                                }
                                alt={data.name}
                            />
                        </button>

                    </div>

                    {/* lower part for user-details */}
                    <div className='flex flex-col gap-5 justify-start items-start'>

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
                                placeholder='Enter your phone number'
                                id='email'
                                name='email'
                                readOnly
                                value={data.email}
                                onChange={changeHandler}
                                required
                            />

                        </div>

                        {/* user-phone no */}
                        <div className='flex flex-col gap-1'>
                            <label
                                htmlFor="phoneNo"
                                className='text-lg font-semibold text-[black]/[0.8]'
                            >Phone Number</label>
                            <input
                                type="text"
                                className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                                placeholder='Enter your email address'
                                id='phoneNo'
                                name='phoneNo'
                                value={data.phoneNo}
                                onChange={changeHandler}
                                required
                            />

                        </div>

                        {/* user-gender */}
                        <div className='flex flex-col gap-1'>
                            <label
                                htmlFor="gender"
                                className='text-lg font-semibold text-[black]/[0.8]'
                            >Gender</label>
                            <select name="gender"
                                className='capitalize font-semibold py-2 px-4'
                                value={data.gender}
                                onChange={changeHandler}
                                id="gender"
                            >

                                <option value={data?.gender}>{data.gender}</option>
                                <option value={data?.gender === "Male" ? "Female" : "Male"}>{
                                    data?.gender === "Male" ? "Female" : "Male"
                                }</option>
                                <option value="Other">Other</option>

                            </select>

                        </div>
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
        </div>
    )
}

export default Profile