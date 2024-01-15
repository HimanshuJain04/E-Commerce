import React, { useEffect, useState } from 'react';
import { ApiCalling } from '../../services/Api';

function Order({ order }) {

    console.log("order: ", order);

    // const {} = 

    const [data, setData] = useState([]);

    useEffect(() => {
        const getOrderDetails = async () => {

            const res = await ApiCalling("GET", `order/getOrderDetailsById/${order?._id}`);

            if (res?.success) {

                setData(res?.data);
            } else {
                setData([]);
            }

        }
        getOrderDetails();
    })

    return (
        <div>
            <div className='flex justify-around hover:shadow-xl shadow-[black] font-semibold px-10 py-3 items-start'>

                {/* image */}
                <div className=' overflow-hidden w-[300px] h-[300px]'>
                    <img src={data?.images?.[0]} className='h-full bg-cover' alt={data?.name} />
                </div>

                {/* product name and desc */}
                <div className='flex flex-col items-start justify-start gap-5'>
                    <p className='hover:underline transition-all duration-300 ease-in-out'>{data?.name}</p>
                    <p className='text=[black]/[0.5]'>{data?.description?.substring(0, 30)}...</p>
                </div>

                {/* price */}
                <div>
                    <span>Rs. {data?.price}</span>
                </div>

                {/* delivery status */}
                <div className='flex flex-col items-start justify-start gap-5'>
                    <p className=''>{data?.deliveryTime}</p>
                    <p>{data?.status}</p>
                </div>


            </div>
        </div>
    )
}

export default Order