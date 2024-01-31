import React, { useEffect, useState } from 'react'
import { ApiCalling } from '../services/api';
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
                                    <div>
                                        <p className='text-sm font-semibold text-[black]/[0.5]'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur distinctio dignissimos accusamus, officia praesentium amet deleniti dolore error cumque incidunt, dolorem reiciendis eos aliquam exercitationem, non alias eaque placeat eius.
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
