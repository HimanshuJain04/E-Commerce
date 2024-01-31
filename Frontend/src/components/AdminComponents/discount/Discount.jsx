import React, { useState } from 'react'
import AllCoupons from './usedComponents/AllCoupons';
import CreateCoupon from './usedComponents/CreateCoupon';
import { IoMdAdd } from "react-icons/io";

function Discount() {

  const [showCreateCoupon, setShowCreateCoupon] = useState(false);

  return (
    <div className='flex justify-center relative items-start min-h-[100vh] pt-10 pb-20 w-full'>
      {/* <CreateCoupon /> */}
      <AllCoupons />

      <div
        className='absolute bottom-5 left-[50%] bg-black px-5 py-2 hover:text-yellow-300 transition-all duration-300 ease-in-out text-white rounded-lg font-semibold translate-x-[-50%]'
      >
        <button
          onClick={() => {
            setShowCreateCoupon(true);
          }}
          className='flex justify-center items-center gap-2'
        >
          <span className='text-xl'><IoMdAdd /></span>
          <span>
            Create Coupon
          </span>
        </button>
      </div>

      <div className={`absolute w-full h-full py-10 bg-[black]/[0.25] ${showCreateCoupon ? " block" : "hidden"} `}>
        <CreateCoupon setShowCreateCoupon={setShowCreateCoupon} />
      </div>
    </div>
  )
}

export default Discount;
