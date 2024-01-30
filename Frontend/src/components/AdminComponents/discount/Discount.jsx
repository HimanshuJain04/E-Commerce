import React from 'react'
import AllCoupons from './usedComponents/AllCoupons';
import CreateCoupon from './usedComponents/CreateCoupon';

function Discount() {
  return (
    <div className='flex justify-center items-start pt-10 pb-20 w-full'>
      <CreateCoupon />
    </div>
  )
}

export default Discount;
