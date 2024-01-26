import React, { useEffect, useState } from 'react';
import { ApiCalling } from "../../../services/Api";
import { BsPencilSquare } from "react-icons/bs";




function Orders() {

  const [orders, setOrders] = useState([]);

  async function fun() {
    const res = await ApiCalling("GET", "order/getAllOrders");
    if (res.success) {
      setOrders(res.data)
    }
    console.log(res)
  }

  useEffect(() => {

    fun();

  }, [])

  return (
    <div className='py-10'>
      <div>
        {
          orders.length > 0 && (
            <div className=' flex-col flex gap-10'>
              {
                orders.map((order) => (

                  // order--->>
                  <div
                    className='flex flex-col gap-10'
                    key={order._id}
                  >
                    {
                      order.products.map((product) => (

                        // product-->>
                        <div
                          key={product._id}
                          className='flex flex-row items-center justify-around border-b-2 bg-white shadow-md gap-5 p-5 rounded-md '
                        >

                          {/* details about user and orders */}
                          <div>
                            <div className='flex flex-col gap-3 max-w-[300px]  justify-around'>
                              {/* orderId */}
                              <div className='text-center font-semibold'>Order Id: <span className='font-bold text-blue-900'>{order._id}</span></div>
                              {/* payment status */}
                              <div className='flex flex-row gap-3'>
                                <p className='font-semibold'>Payment: </p>
                                <span className='font-bold text-blue-900'>
                                  {
                                    order.paymentOption === "Razorpay" ? "Completed" : "Pending"
                                  }
                                </span>
                              </div>
                              {/* address */}
                              <div className='flex gap-2 font-semibold flex-col'>
                                <p>Address:</p>
                                <div>
                                  <p>Name: <span className='text-blue-900'>{order.userInfo.address.name}</span></p>
                                  <p>Street: <span className='text-blue-900'>{order.userInfo.address.street}</span></p>
                                  <p>NearBy: <span className='text-blue-900'>{order.userInfo.address.nearBy}</span></p>
                                  <p>PhoneNo: <span className='text-blue-900'>{order.userInfo.address.phoneNo}</span></p>
                                  <p>City: <span className='text-blue-900'>{order.userInfo.address.city}</span></p>
                                  <p>Pincode: <span className='text-blue-900'>{order.userInfo.address.pincode}</span></p>
                                  <p>State: <span className='text-blue-900'>{order.userInfo.address.state}</span></p>
                                  <p>Country: <span className='text-blue-900'>{order.userInfo.address.country}</span></p>
                                </div>
                              </div>

                            </div>
                          </div>

                          {/* image and name */}
                          <div className='flex overflow-hidden flex-col w-[250px] gap-2'>
                            {/* image */}
                            <div className='overflow-hidden h-[170px] '>
                              <img
                                src={product.product.images[0]}
                                alt={product.product.name}
                                className='object-contain'
                              />
                            </div>
                            <p className='font-semibold text-sm'>{product.product.name?.substring(0, 50)}...</p>
                            <p className='font-semibold'>ProductId: <span className='text-blue-900 '>{product.product._id}</span></p>
                          </div>

                          <div>
                            <div className='flex gap-3 items-center justify-center'>
                              <p className='font-semibold'>Status: <span className='text-blue-900 font-bold '>{product.status}</span></p>
                              <span className='text-xl cursor-pointer'><BsPencilSquare /></span>
                            </div>
                          </div>

                        </div>
                      ))
                    }
                  </div>


                ))
              }
            </div>
          )
        }
      </div>
    </div >
  )
}

export default Orders
