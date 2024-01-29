import React, { useEffect, useState } from 'react';
import { ApiCalling } from '../../../../services/Api';
import { PiMoneyBold } from "react-icons/pi";
import { FaRupeeSign, FaShoppingBasket, FaUsers } from "react-icons/fa";


function TodaysDeatailCards() {

    const [data, setData] = useState([1, 1, 1,]);

    async function getValue() {

        const res1 = await ApiCalling("GET", "user/getTotalCustomers");

        const res2 = await ApiCalling("GET", "order/getTodaysDetails");

        if (res1.success && res2.success) {
            const copyData = [res1.data, res2.data];
            setData(copyData);
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

                        {/* total users */}
                        <div className='flex justify-start p-5 w-full shadow-lg rounded-md bg-white items-center gap-5'>
                            <div className='text-[50px] bg-red-700 p-3 text-white rounded-full'>
                                <FaUsers />
                            </div>
                            <div className='flex flex-col gap-2 items-start justify-start'>
                                <p className='font-semibold text-[black]/[0.4]'>Registered User</p>
                                <span className='font-semibold text-xl ml-2'> {data[0]}</span>
                            </div>
                        </div>

                        {/* totalSales */}
                        <div className='flex justify-start p-5 w-full shadow-lg rounded-md bg-white items-center gap-5'>
                            <div className='text-[50px] text-white p-3 bg-orange-500 rounded-full'>
                                <PiMoneyBold />
                            </div>
                            <div className='flex flex-col gap-2 items-start justify-start'>
                                <p className='font-semibold text-[black]/[0.4]'>Today's Revenue</p>
                                <span className='font-semibold flex justify-start items-center text-xl '> <FaRupeeSign /> <span className='text-2xl'>{data[1][0]}</span></span>
                            </div>
                        </div>

                        {/* total orders */}
                        <div className='flex justify-start p-5 w-full shadow-lg rounded-md bg-white items-center gap-5'>
                            <div className='text-[50px] bg-blue-700 p-3 text-white rounded-full'>
                                <FaShoppingBasket />
                            </div>

                            <div className='flex flex-col gap-2 items-start justify-start'>
                                <p className='font-semibold text-[black]/[0.4]'>Today's Orders</p>
                                <span className='font-semibold text-xl '>{data[1][1]}</span>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default TodaysDeatailCards
