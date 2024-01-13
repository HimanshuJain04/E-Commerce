import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ApiCalling } from '../../services/Api';
import { AppContext } from '../../context/AppContext';
import { toast } from "react-toastify";


// this template used for cart,etc
function ProductTemplate2({ product }) {

    const { isLoggedIn, setIsLoggedIn, removeFromCartHandler } = useContext(AppContext);


    return (
        <div className='w-full'>
            <div className=''>

                {/* upper part for product detail */}
                <div className='w-full flex gap-5 border-[2px] rounded-sm border-[black]/[0.1] px-5 py-2'>
                    {/* left part for image */}
                    <div className='overflow-hidden h-[150px] flex justify-center items-center w-[250px]'>
                        <img src={product?.images[0]} className='max-h-full max-w-full bg-contain ' alt="" />
                    </div>

                    {/* right part for detail */}
                    <div className='flex flex-col gap-3 justify-start items-start w-full'>

                        {/* upper part for details */}
                        <div className='flex w-full justify-between items-start'>
                            {/* left for detail */}
                            <div className='flex flex-col gap-1 justify-start items-start max-w-[70%]'>

                                <Link
                                    to={"/"}
                                >
                                    <span className='cursor-pointer text-xl font-semibold hover:text-red-500 transition-all duration-300 ease-in-out capitalize underline'>{product?.name}</span>
                                </Link>
                                {/* <p>{product?.category?.name}</p> */}
                                <span className='text-sm font-semibold text-[black]/[0.6] cursor-pointer hover:underline transition-all duration-300 ease-in-out '>{"Clothes"}</span>
                                <p className='text-sm font-semibold text-[black]/[0.5]'>
                                    <span>{`${product?.description?.substring(0, 150)}...`}</span>
                                </p>
                            </div>

                            {/* right for toatl price of prodi=uct acc. to quantity */}
                            <div>
                                <span className='font-semibold'>Rs.{product?.price * product?.quantity}</span>
                            </div>

                        </div>

                        {/* lower part for quantity and shipping time */}
                        <div className='flex justify-between items-center w-full'>

                            {/* quantity increasing or descreasing */}
                            <div>Counter</div>

                            {/*  shipping time*/}
                            <div>
                                <span className='flex font-semibold text-sm text-[black]/[0.7] gap-1'>
                                    <span>Ships on</span>
                                    <span>Thursday,9th March</span>
                                </span>
                            </div>

                        </div>

                    </div>
                </div>

                {/* lower product for removing the product */}
                <div className='w-full bg-[#e7e7f2] border-x-2 border-b-2 rounded-sm border-[black]/[0.1] px-5 py-2 h-[50px] flex'>
                    {/* remove button */}
                    <div className='flex cursor-pointer gap-1 justify-center items-center'>
                        <span className='text-xl'><MdDelete /></span>
                        <button onClick={() => { removeFromCartHandler(product?._id) }} className='font-semibold'>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductTemplate2