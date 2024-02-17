import React, { useEffect, useState } from 'react'
import { ApiCalling } from '../services/Api.js';
import { RxCross1 } from "react-icons/rx";


function Coupon({ setShowCouponBox, setSelectedCoupon, selectedCoupon }) {

    const [allCoupons, setAllCoupons] = useState([]);


    async function getAllCoupons() {
        const res = await ApiCalling("GET", "coupon/getAllCoupons");
        if (res.success) {
            setAllCoupons(res.data);
        }

    }

    useEffect(() => {
        getAllCoupons();
    }, [])

    return (
        <div className='flex justify-center items-center h-full'>
            <div className='bg-white w-[500px] relative p-5 flex rounded-md flex-col gap-5 justify-start items-start'>

                {/* exit point */}
                <div className='absolute top-2 right-2'>
                    <button onClick={() => {
                        setShowCouponBox(false);
                    }}>
                        <RxCross1 />
                    </button>
                </div>

                {
                    allCoupons.length > 0 ?
                        (
                            allCoupons.map((coupon) => (
                                <div
                                    key={coupon._id}
                                    className='flex flex-col p-3 gap-3 w-full border-b-2 justify-between items-center'
                                >
                                    {/* code / apply coupon */}
                                    <div className='flex flex-row justify-between w-full items-center gap-10'>
                                        {/* code */}
                                        <div className="font-semibold text-lg">{coupon.code}</div>


                                        {/* apply button  */}
                                        <button
                                            onClick={() => {
                                                if (selectedCoupon?.code === coupon.code) {
                                                    // remove condition
                                                    setSelectedCoupon(null);
                                                } else {
                                                    // apply condition
                                                    setSelectedCoupon(coupon);
                                                }
                                            }}
                                            className='text-red-700 hover:underline font-semibold transition-all duration-300 ease-in-out'
                                        >
                                            <span>
                                                {
                                                    selectedCoupon?.code === coupon.code ? "Remove" : "Apply Coupon"
                                                }
                                            </span>

                                        </button>

                                    </div>


                                    {/* description */}
                                    <div className='w-full'>
                                        <p className='text-sm  text-start font-semibold text-[black]/[0.5]'>
                                            Apply <span>{coupon.code}</span> to get off on minimum purchasing of <span>{coupon.minimumPurchaseAmount}</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        )
                        : (<div>No Coupons</div>)
                }
            </div >
        </div >
    )
}

export default Coupon
