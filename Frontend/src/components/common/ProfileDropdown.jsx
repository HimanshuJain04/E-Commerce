import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from "../../context/AppContext";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { ApiCalling } from '../../services/Api';
import { toast } from "react-toastify";


const ProfileDropdown = () => {

    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext)

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('click', handleOutsideClick);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const options = [
        {
            name: "Profile",
            icon: <FaUser />,
            path: `/profile`
        },
        {
            name: "My orders",
            icon: <GiShoppingBag />,
            path: `/orders`
        },
        {
            name: "Change Password",
            icon: <MdAccountBox />,
            path: `/change-password`
        },
        {
            name: "Setting",
            icon: <IoSettingsSharp />,
            path: "/setting"
        },
        {
            name: "Logout",
            icon: <FiLogOut />,
            path: "/"
        },
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logout = async () => {

        const res = await ApiCalling("POST", `auth/logout`, { id: isLoggedIn._id });

        console.log("res: ", res);
        if (res.success) {
            setIsLoggedIn(null);
            toast.success("Logout Success")
        } else {
            toast.error("Logout Failed")
        }

    }


    return (
        <div
            className=" relative "
            ref={dropdownRef}
        >
            <button onClick={toggleDropdown}>
                <div className='h-[40px] w-[40px]  bg-black overflow-hidden rounded-full'>
                    <img src={isLoggedIn?.profileImg} className='rounded-full h-full w-full' alt={isLoggedIn?.name} />
                </div>
            </button>

            {/*  options*/}
            <div className={`absolute w-[250px] -right-5 bg-white shadow-lg shadow-black rounded-md ` + (isOpen ? "block" : "hidden")}>
                <div className='bg-[black]/[0.02] rounded-md p-2'>
                    {
                        options?.map((option) => (
                            <div
                                key={option?.icon + option.name}
                                className='p-2 cursor-pointer hover:border-[black]/[0.5] border-transparent transition-all rounded-md duration-300 ease-in-out border-2 '
                            >
                                {
                                    option.name === "Logout" ? (
                                        <button
                                            onClick={logout}
                                        >
                                            <Link
                                                to={option?.path} className='flex justify-start gap-2 items-center'
                                            >
                                                <span className='text-xl'>{option?.icon}</span>
                                                <span>{option?.name}</span>
                                            </Link>
                                        </button>
                                    ) : (

                                        <Link
                                            to={option?.path} className='flex justify-start gap-2 items-center'
                                        >
                                            <span className='text-xl'>{option?.icon}</span>
                                            <span>{option?.name}</span>
                                        </Link>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default ProfileDropdown;
