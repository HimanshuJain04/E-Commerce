import React, { useEffect, useState } from 'react';
import { ApiCalling } from '../../../../services/Api.js';
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaRupeeSign, FaUsers } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { BsBoxSeam } from "react-icons/bs";


export default function Cards() {
    const [data, setData] = useState(null);


    async function getValue() {

        const res = await ApiCalling("GET", "order/getTotalDetails");
        if (res.success) {
            setData(res.data);
        }
    }

    useEffect(() => {
        getValue();
    }, []);


    return (
        <div>
            {
                data && (
                    <div className='flex justify-center w-full items-center gap-10'>

                        {/* total Products */}
                        <div className='flex justify-start p-5 w-full shadow-lg rounded-md bg-white items-center gap-5'>
                            <div className='text-[50px] bg-red-700 p-3 text-white rounded-full'>
                                <LiaShoppingBasketSolid />
                            </div>
                            <div className='flex flex-col gap-2 items-start justify-start'>
                                <p className='font-semibold text-[black]/[0.4]'>Total Products</p>
                                <span className='font-semibold text-xl ml-2'> {data[0]}</span>
                            </div>
                        </div>

                        {/* totalSales */}
                        <div className='flex justify-start p-5 w-full shadow-lg rounded-md bg-white items-center gap-5'>
                            <div className='text-[80px] text-orange-500 bg-white rounded-full'>
                                <HiCurrencyRupee />
                            </div>
                            <div className='flex flex-col gap-2 items-start justify-start'>
                                <p className='font-semibold text-[black]/[0.4]'>Total Sales</p>
                                <span className='font-semibold flex justify-start items-center text-xl '> <FaRupeeSign /> <span className='text-2xl'>{data[1]}</span></span>
                            </div>
                        </div>

                        {/* total orders */}
                        <div className='flex justify-start p-5 w-full shadow-lg rounded-md bg-white items-center gap-5'>
                            <div className='text-[50px] bg-blue-700 p-3 text-white rounded-full'>
                                <BsBoxSeam />
                            </div>

                            <div className='flex flex-col gap-2 items-start justify-start'>
                                <p className='font-semibold text-[black]/[0.4]'>Total Orders</p>
                                <span className='font-semibold text-xl '>{data[2]}</span>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}
