import React from 'react';
import { ConstFooter } from "../../constants/footer";
import { Link } from "react-router-dom"
import { FaGithub } from "react-icons/fa";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {

    const localLinks = [
        {
            name: "Github",
            path: "Github",
            icon: <FaGithub />
        },
        {
            name: "LinkedIn",
            path: "LinkedIn",
            icon: <FaLinkedinIn />
        },
        {
            name: "Twitter",
            path: "Twitter",
            icon: <FaTwitter />
        },
    ];

    return (
        <footer className='w-full  mt-[100px] bg-[black]/[0.04] flex justify-center items-center flex-col'>

            {/* upper footer */}
            <div className='flex justify-between gap-20 items-start py-20 w-11/12 '>

                <div className='flex justify-between w-full items-start '>

                    {
                        ConstFooter?.map((column, index) => (
                            <div
                                key={column?.title + index}
                                className='flex gap-4 justify-start items-start flex-col'
                            >
                                <p className='font-bold  capitalize'>{column.title}</p>
                                <div className='flex flex-col gap-2 justify-start items-start'>
                                    {
                                        column?.links?.map((record) => (
                                            <div key={record?.name?.length + record?.name}>
                                                <Link
                                                    to={record.path}
                                                    className="capitalize font-semibold text-[black]/[0.5] 
                                                hover:underline transition-all duration-300 ease-in-out

                                                "
                                                >{record?.name}</Link>
                                            </div>
                                        ))

                                    }
                                </div>

                            </div>
                        ))
                    }
                </div>

                <div>

                    <div className='w-[200px] flex flex-col gap-4 items-start justify-start'>

                        <p className='font-bold text-lg'>E-Commerce</p>
                        <p className='text-[black]/[0.5] text-justify text-sm font-semibold '>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Ab minima aliquid facilis voluptas totam, sint qui soluta quo
                        </p>
                        <div className='flex gap-5 justify-center items-center'>
                            {
                                localLinks?.map((link) => (
                                    <div key={link.icon + link.path.length}>

                                        <Link
                                            className='text-3xl'
                                            to={link.path}>
                                            {link.icon}
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>


            </div>

            {/* lower footer */}
            <div className='border-[black]/[0.2] border-t-2 w-full flex justify-center py-4 items-center'>

                <div className=' w-11/12 flex text-[black]/[0.8] justify-between items-center '>
                    <div className='flex justify-center font-semibold items-center'>
                        <p>@ Copyright by Himanshu.</p>
                        <p>All rights reserved</p>
                    </div>

                    <div className=''>
                        <img className='h-[45px] bg-cover' src="public/payment.png" alt="payment-methods" />
                    </div>

                </div>


            </div>

        </footer>
    )
}

export default Footer;