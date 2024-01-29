import React, { useEffect, useState } from 'react';
import { ApiCalling } from '../../../../services/Api';
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaRupeeSign, FaUsers } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";


export default function Cards() {
    const [data, setData] = useState(null);


    async function getOrderValue() {

        const res1 = await ApiCalling("GET", "user/getTotalCustomers");

        const res2 = await ApiCalling("GET", "order/getTotalRevenueAndTotalOrders");

        if (res1.success && res2.success) {
            const copyData = [res1.data, res2.data];

            console.log(copyData)

            setData(copyData);
        }
    }

    useEffect(() => {
        getOrderValue();
    }, []);


    return (
        <div>
            {
                data && (
                    <div className='flex justify-center w-full items-center gap-10'>

                        {/* total users */}
                        <div className='flex justify-start p-5 w-full shadow-lg rounded-md bg-white items-center gap-5'>
                            <div className='text-[50px] bg-red-700 p-2 text-white rounded-full'>
                                <FaUsers />
                            </div>
                            <div className='flex flex-col gap-2 items-start justify-start'>
                                <p className='font-semibold text-[black]/[0.4]'>Registered User</p>
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
                                <span className='font-semibold flex justify-start items-center text-xl '> <FaRupeeSign /> <span className='text-2xl'>{data[1][0]}</span></span>
                            </div>
                        </div>

                        {/* total orders */}
                        <div className='flex justify-start p-5 w-full shadow-lg rounded-md bg-white items-center gap-5'>
                            <div className='text-[50px] bg-blue-700 p-2 text-white rounded-full'>
                                <IoCartSharp />
                            </div>

                            <div className='flex flex-col gap-2 items-start justify-start'>
                                <p className='font-semibold text-[black]/[0.4]'>Total Orders</p>
                                <span className='font-semibold text-xl '>{data[1][1]}</span>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}