import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductTemplate2 from '../components/common/ProductTemplate2';
import { BsPlusCircleFill } from "react-icons/bs";
import { AppContext } from "../context/AppContext";


function Cart() {

  const { isLoggedIn } = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(isLoggedIn?.carts);
  }, [isLoggedIn]);


  return (
    <div className='flex w-full h-full justify-center items-center pt-10'>
      {
        data?.length > 0 ? (
          // cart is not empty

          <div className='w-11/12 flex justify-between gap-10 items-start'>

            {/* left part for product detail */}
            <div className='w-full  flex flex-col gap-5 justify-start items-start'>

              {/* heading */}
              <div className='w-full justify-start items-start'>
                <p className='text-3xl text-[black]/[0.8] font-semibold'>My Cart Page</p>
              </div>

              {/* total items and pricing */}
              <div className='flex w-full font-semibold text-lg  justify-between items-center'>

                <p className='flex justify-center gap-1 items-center'>
                  <span>{data?.length}</span>
                  <span>item Added</span>
                </p>

                <p>Total: Rs. <span>{"555"}</span></p>
              </div>

              {/* products */}
              <div className='w-full mt-3'>
                <div className='flex flex-col justify-start  items-start gap-5 w-full'>
                  {
                    data?.map((product) => (
                      <ProductTemplate2 key={product?._id} product={product} />
                    ))
                  }
                </div>

              </div>

              {/* button for adding products */}
              <Link className='flex font-semibold text-xl text-[black]/[0.7] py-3 border-2 border-[black]/[0.2] rounded-lg justify-center items-center w-full'>
                <span className='flex gap-2 justify-center items-center'>
                  <BsPlusCircleFill className='text-2xl' />
                  <span>Add another product</span>
                </span>
              </Link>

            </div>

            {/* right part for priceing and all that stuff */}
            <div>

              <div className='w-[450px] px-10 border-2 border-[black]/[0.1] flex flex-col gap-5 py-10 mt-10 '>

                <div>
                  <p className='text-2xl font-bold'>Price Details</p>
                </div>

                <div className='flex w-full text-lg text-[black]/[0.6] gap-3 font-semibold flex-col justify-start items-start'>

                  {/* bag toatl */}
                  <div className='flex w-full justify-between items-center'>
                    <p>Bag Total</p>
                    <span>Rs. {500}</span>
                  </div>

                  {/* bag discount */}
                  <div className='flex w-full justify-between items-center'>
                    <p>Bag Discount</p>
                    <span>-Rs. {100}</span>
                  </div>

                  {/* GST */}
                  <div className='flex w-full justify-between items-center'>
                    <p>GST</p>
                    <span>Rs. {100}</span>
                  </div>

                  {/* Coupon discount */}
                  <div className='flex w-full justify-between items-center'>
                    <p>Coupon Discount</p>
                    <span className='text-red-400 hover:underline transition-all duration-300 ease-in-out cursor-pointer'>Apply Coupon</span>
                  </div>

                  {/* Delivery */}
                  <div className='flex w-full justify-between items-center'>
                    <p>Delivery</p>
                    <span>Rs. {100}</span>
                  </div>

                </div>

                {/* delivery discount div */}
                <div className='flex w-full justify-center mt-3 items-center'>
                  <span className='bg-green-600 text-white w-[50%] text-center py-2 font-semibold'>Free Delivery</span>
                  <span className='bg-[black]/[0.8] text-white py-2 text-center w-full font-semibold'>For order above Rs.1000</span>
                </div>

                {/* total */}
                <div className='flex justify-between my-3 text-lg items-center w-full font-bold'>
                  <p>Total</p>
                  <span>Rs. {1000}</span>
                </div>

                {/* button */}
                <div>
                  <button className='w-full bg-red-600 text-white rounded-md py-3  font-bold border-[3px] transition-all duration-300 ease-in-out hover:text-red-600 border-red-600 hover:bg-transparent'>Place Order</button>
                </div>

              </div>

            </div>

          </div>

        ) : (

          // Cart is empty 
          <div>
            <p><span className='text-5xl font-semibold'>Cart Is Empty</span></p>
          </div>
        )
      }

    </div>
  )
}

export default Cart