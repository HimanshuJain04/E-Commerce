import React, { useState, useEffect } from 'react';
import { ApiCalling } from "../../../../services/api"

const options = [
    "Coupon Code",
    "Coupon Type",
    "Coupon Discount",
    "On Minimum Purchasing",
    "Expiration Date",
]

function AllCoupons({ showCreateCoupon }) {

    const [data, setData] = useState([]);

    async function getData() {
        const res = await ApiCalling("GET", 'coupon/getAllCoupons');

        console.log(res)

        if (res.success) {
            setData(res.data);
        }
    }


    useEffect(() => {
        getData();
    }, [showCreateCoupon]);

    return (
        <div className='w-full'>
            <div className=' bg-white py-5 flex flex-col gap-2 rounded-md'>

                <div>
                    <p className='text-3xl text-[black]/[0.7] text-center font-semibold'>All Coupons</p>
                </div>

                <div className='w-full py-3 mt-3 bg-red-100 gap-5 px-5 rounded-sm flex justify-between items-start  text-black font-semibold'>
                    {
                        options.map((option) => (
                            <div
                                key={option}
                                className='w-1/5 flex justify-start items-center'
                            >
                                <p>{option}</p>
                            </div>
                        ))
                    }
                </div>

                <div>
                    {
                        data.length > 0 ? (
                            data.map((coupon) => (
                                <div key={coupon._id}
                                    className=' w-full  flex-row px-5 flex justify-between border-b-2 font-semibold py-4 '
                                >
                                    <div className='w-1/6 flex justify-start items-center'>
                                        <p>{coupon.code}</p>
                                    </div>

                                    <div className='w-1/6 flex justify-start items-center'>
                                        <p>{coupon.discountType}</p>
                                    </div>

                                    <div className='w-1/6 flex justify-start items-center'>
                                        <p>{coupon.discountAmount ? `Rs. ${coupon.discountAmount}` : "NA"}</p>
                                    </div>

                                    <div className='w-1/6 flex justify-start items-center'>
                                        <p>{coupon.minimumPurchaseAmount}</p>
                                    </div>

                                    <div className='w-1/6 flex justify-start items-center'>
                                        <p>
                                            {new Date(coupon.expirationDate).toLocaleDateString('en-GB')}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No Coupons</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AllCoupons
