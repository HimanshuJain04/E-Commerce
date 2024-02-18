import React, { useEffect, useState } from 'react';
import { ApiCalling } from "../../../services/Api.js";
import { BsPencilSquare } from "react-icons/bs";

const statusOptions = ["Accepted", "Rejected", "Delivery processing", "Delivered"];

function Orders() {

  const [orders, setOrders] = useState([]);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  async function fun() {
    const res = await ApiCalling("GET", "order/getAllOrders");
    if (res.success) {
      setOrders(res.data)
    }
    console.log(res)
  }

  useEffect(() => {

    fun();

  }, []);



  const handleEditClick = (productId, orderId) => {
    const obj = {
      singleOrderId: productId,
      orderId: orderId
    };

    setSelectedProductId(obj);

  };

  const handleOptionClick = (option) => {
    setSelectedStatus(option);
  };

  const handleSaveClick = async () => {

    // call api and save the status of product 

    if (!selectedStatus) {
      return;
    }

    const res = await ApiCalling("POST", "order/updateProductStatus",
      {
        orderId: selectedProductId.orderId,
        productId: selectedProductId.singleOrderId,
        status: selectedStatus
      }
    );

    if (res.success) {
      fun();
    }

    setSelectedProductId(null);
    setSelectedStatus(null);
  };

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
                            <div className='flex flex-col gap-3 max-w-[310px] items-start justify-around'>
                              {/* orderId */}
                              <div className='text-center font-semibold'>Order Id: <span className='font-bold text-blue-900'>{order._id}</span></div>
                              <div className='text-center font-semibold'>Per OrderId: <span className='font-bold text-blue-900'>{product._id}</span></div>
                              {/* payment status */}
                              <div className='flex flex-row gap-3'>
                                <p className='font-semibold'>Payment: </p>
                                <span className='font-bold text-blue-900'>
                                  {
                                    order.paymentOption === "Razorpay" ? "Completed" : "Pending"
                                  }
                                </span>
                              </div>
                              <div className='text-center font-semibold'>Quantity: <span className='font-bold text-blue-900'>{product.quantity}</span></div>
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

                          {/* status related */}
                          <div>
                            <div className='flex gap-3 items-center justify-center'>
                              <p className='font-semibold'>
                                Status:{' '}
                                {
                                  selectedProductId?.singleOrderId !== product._id &&
                                  <span className='text-blue-900 font-bold'>
                                    {product.status}
                                  </span>
                                }
                              </p>

                              <span
                                className='text-xl cursor-pointer'
                                onClick={() => handleEditClick(product._id, order._id)}
                              >
                                <BsPencilSquare />
                              </span>

                              {selectedProductId?.singleOrderId === product._id && (
                                <div className='options-dropdown flex flex-col gap-4 justify-center items-center'>
                                  {/* options */}
                                  <select
                                    value={selectedStatus}
                                    className='border-2 border-[black]/[0.15] outline-none rounded-md px-2 py-1 cursor-pointer'
                                    onChange={(e) => handleOptionClick(e.target.value)}
                                  >
                                    <option value=''>Select Status</option>
                                    {statusOptions.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>

                                  {/* button */}
                                  <div >
                                    <button
                                      className='bg-blue-700  transition-all duration-300 font-semibold hover:bg-white border-2 border-blue-700 hover:border-blue-700 hover:text-blue-700 ease-in-out text-white py-2 px-10 rounded-md'
                                      onClick={handleSaveClick}
                                    >Save</button>
                                  </div>
                                </div>
                              )}
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
