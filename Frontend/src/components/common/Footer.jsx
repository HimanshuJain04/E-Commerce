import React from 'react';
import { ConstFooter } from "../../constants/footer";
import { Link } from "react-router-dom"
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';


function Footer() {

    const iconLinks = [
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
        }
    ]



    return (
        <footer className='w-full  bg-[black]/[0.04] flex justify-center items-center flex-col'>

            {/* upper footer */}
            <div className='flex flex-wrap justify-center md:py-20 w-11/12 py-10  xl:justify-between gap-14 items-start '>

                {
                    ConstFooter?.map((column, index) => (
                        <div
                            key={column.title + index}
                            className='w-full sm:w-auto '
                        >
                            {
                                column.title !== "E-Commerce" ? (

                                    <div className=' justify-start  items-center md:items-start flex-col gap-3 flex p-2 w-full sm:max-w-[250px] '>
                                        <p className='font-bold text-center capitalize'>{column.title}</p>
                                        <div className='flex flex-col gap-2 justify-start items-start'>
                                            {
                                                column?.links?.map((record, index) => (
                                                    <div key={record?.name?.length + record?.name + index}>
                                                        <Link
                                                            to={record.path}
                                                            className="capitalize font-semibold text-[black]/[0.5] 
                                                hover:underline transition-all duration-300 ease-in-out "
                                                        >{record?.name}</Link>
                                                    </div>
                                                ))

                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div className=' justify-start items-center md:items-start flex-col gap-3 flex p-2 w-full md:max-w-[250px] '>
                                        <p className='font-bold text-lg'>E-Commerce</p>
                                        <p className='text-[black]/[0.5] text-justify text-sm font-semibold '>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                            Ab minima aliquid facilis voluptas totam, sint qui soluta quo
                                        </p>
                                        <div className='flex mt-2 gap-8 justify-center items-center'>
                                            {
                                                iconLinks.map((link, index) => (
                                                    <div key={link.icon + index}>

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
                                )
                            }

                        </div>
                    ))
                }

            </div>

            {/* lower footer */}
            <div className='border-[black]/[0.2] border-t-2 w-full flex flex-row justify-center py-4 items-center'>

                <div className=' w-11/12 flex lg:flex-row flex-col gap-5 text-[black]/[0.8] justify-between items-center '>
                    <div className='flex justify-center xsm:flex-row flex-col font-semibold items-center'>
                        <p>@ Copyright by Himanshu.</p>
                        <p>All rights reserved</p>
                    </div>

                    <div className=''>
                        <img className='h-[45px] bg-cover' src="/payment.png" alt="payment-methods" />
                    </div>

                </div>

            </div>

        </footer>
    )
}

export default Footer;