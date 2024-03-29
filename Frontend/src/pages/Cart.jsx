import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductTemplate2 from '../components/common/ProductTemplate2';
import { BsPlusCircleFill } from "react-icons/bs";
import { AppContext } from "../context/AppContext";
import Coupon from '../components/Coupon';


function Cart() {

  const { isLoggedIn } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [bagTotal, setBagTotal] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponOff, setCouponOff] = useState(0);
  const [showCouponBox, setShowCouponBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setData(isLoggedIn?.carts);

    let bagPrice = 0;

    isLoggedIn?.carts?.forEach((product) => {
      bagPrice += product?.product?.price * product?.quantity
    });

    setBagTotal(bagPrice);

    const newGst = bagPrice * 0.18;
    setGst(newGst);

    let delivery = 0;

    if ((bagPrice + newGst) > 1000) {
      delivery = 0;

    } else {
      delivery = 100;
    }

    setDeliveryCost(delivery);

    setTotal(bagPrice + newGst + delivery);

  }, [isLoggedIn]);

  const orderPlaceHandler = () => {
    navigate(`/user/address&payment`);
  }

  // TODO: Repair this 

  useEffect(() => {
    let coupOff = 0;
    let deliveryCt = deliveryCost;

    // Calculate subtotal before taxes and delivery charges
    const subtotal = bagTotal;

    // Apply coupon discount
    if (selectedCoupon) {
      if (selectedCoupon.discountType === "percentage") {
        if (subtotal >= selectedCoupon.minimumPurchaseAmount) {
          coupOff = (subtotal / 100) * selectedCoupon.discountAmount;
        }
      } else if (selectedCoupon.discountType === "fixed") {
        if (subtotal >= selectedCoupon.minimumPurchaseAmount) {
          coupOff = selectedCoupon.discountAmount;
        }
      } else if (selectedCoupon.discountType === "free_shipping") {
        // Handle free shipping coupon
        if (subtotal + gst >= selectedCoupon.minimumPurchaseAmount) {
          deliveryCt = 0;
        }
      } else if (selectedCoupon.discountType === "BOGO") {
        // Handle BOGO coupon
        alert("Coming Soon");
      }

    } else {
      // coupon is not selected

      if (subtotal + gst >= 1000) {
        deliveryCt = 0;

      } else {
        deliveryCt = 100;
      }
    }


    // Update delivery cost only if it hasn't already been set to 0
    if (deliveryCt !== 0) {
      setDeliveryCost(deliveryCt);
    }

    setDeliveryCost(deliveryCt);
    setCouponOff(coupOff);
    setTotal(subtotal + gst + deliveryCt - coupOff);

  }, [selectedCoupon, bagTotal, gst]);



  return (
    <div className='flex w-full relative h-full justify-center items-center pt-10'>

      <div className={`fixed top-0 w-full h-full bg-[black]/[0.5] ${showCouponBox ? " block" : "hidden"} `}>
        <Coupon
          setShowCouponBox={setShowCouponBox}
          selectedCoupon={selectedCoupon}
          setSelectedCoupon={setSelectedCoupon}
        />
      </div>


      {
        data?.length > 0 ? (
          // cart is not empty

          <div className='w-11/12 flex flex-col xl:flex-row justify-between gap-10 items-start'>

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

                <p>Total: Rs. <span>{total}</span></p>

              </div>

              {/* products */}
              <div className='w-full mt-3'>
                <div className='flex flex-col justify-start  items-start gap-5 w-full'>
                  {
                    data?.map((data) => (
                      <ProductTemplate2 key={data?._id} product={data} />
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
            <div className='w-full'>

              <div className='w-full xl:w-[450px] px-10 border-2 border-[black]/[0.1] flex flex-col gap-5 py-10 mt-10 '>

                <div>
                  <p className='text-2xl font-bold'>Price Details</p>
                </div>

                <div className='flex w-full text-lg text-[black]/[0.6] gap-3 font-semibold flex-col justify-start items-start'>

                  {/* bag toatl */}
                  <div className='flex w-full justify-between items-center'>
                    <p>Bag Total</p>
                    <span>Rs. {bagTotal}</span>
                  </div>

                  {/* bag discount */}
                  <div className='flex w-full justify-between items-center'>
                    <p>Bag Discount</p>
                    <span>-Rs. {"00"}</span>
                  </div>

                  {/* GST */}
                  <div className='flex w-full justify-between items-center'>
                    <p>GST</p>
                    <span>Rs. {gst.toFixed(2)}</span>
                  </div>

                  {/* Coupon discount */}
                  <div className='flex w-full justify-between items-center'>
                    <p>Coupon Discount</p>
                    <button
                      onClick={() => {
                        setShowCouponBox(true);
                      }}
                      className='text-red-400 hover:underline transition-all duration-300 ease-in-out cursor-pointer'>
                      <span>
                        {
                          selectedCoupon ? selectedCoupon.code : "Apply Coupon"
                        }
                      </span>
                    </button>
                  </div>

                  {/* Delivery */}
                  <div className='flex w-full justify-between items-center'>
                    <p>Delivery</p>
                    {
                      deliveryCost <= 0 ? (
                        <span>Free</span>
                      ) : (
                        <span>Rs. {deliveryCost}</span>
                      )
                    }
                  </div>
                </div>

                {/* delivery discount section/tag */}
                <div className='flex flex-col sm:flex-row w-full justify-center mt-3 items-center'>
                  <span className='bg-green-600 text-white w-full sm:w-[50%] text-center py-2 font-semibold'>Free Delivery</span>
                  <span className='bg-[black]/[0.8] text-white py-2 text-center w-full font-semibold'>For order above Rs.1000</span>
                </div>

                {/* total */}
                <div className='flex justify-between my-3 text-lg items-center w-full font-bold'>
                  <p>Total</p>
                  <span>Rs. {total}</span>
                </div>

                {/* button */}
                <div>
                  <button
                    onClick={orderPlaceHandler}
                    className='w-full bg-red-600 text-white rounded-md py-3  font-bold border-[3px] transition-all duration-300 ease-in-out hover:text-red-600 border-red-600 hover:bg-transparent'
                  >Place Order</button>
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