import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'

function MyOrders() {
    const { isLoggedIn } = useContext(AppContext);

    return (
        <div className=''>
            <div className='w-10/12 mx-auto flex justify-center items-start '>

                <div className='flex flex-col w-full gap-5'>
                    {
                        isLoggedIn?.orders?.map((order) => (
                            order?.products?.map((product) => (
                                <div key={product?._id}>

                                    {/* Order  Template */}
                                    <div className='w-full cursor-pointer font-semibold  flex justify-around items-center px-10 border-2 rounded-sm border-transparent transition-all duration-300 ease-in-out hover:border-[black]/[0.09] py-3 hover:shadow-xl shadow-black bg-[black]/[0.05]'>

                                        <div
                                            className='flex justify-start items-center gap-20'
                                        >
                                            {/* image */}
                                            <div className='overflow-hidden flex justify-center items-center w-[200px] h-[200px]'>

                                                <img
                                                    className='bg-cover'
                                                    src={product?.product?.images?.[0]}
                                                    alt={product?.product?.name}
                                                />
                                            </div>

                                            {/* name and desc */}
                                            <div
                                                className='flex flex-col gap-5 justify-start items-start'
                                            >
                                                <div>
                                                    <p>{product?.product?.name}</p>
                                                </div>
                                                <div className='text-[black]/[0.6]'>
                                                    <p>{product?.product?.description}</p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* price and quan */}
                                        <div
                                            className='flex flex-col gap-5 justify-start items-start'
                                        >
                                            <div>
                                                <p>Rs. {product?.amount}</p>
                                            </div>
                                            <div>
                                                <p>{product?.quantity} qunatity</p>
                                            </div>

                                        </div>

                                        {/* delivery status */}
                                        <div
                                            className='flex flex-col gap-5 justify-start items-start'
                                        >
                                            <div>
                                                <p>Delivered at {product?.deliveryTime}</p>
                                            </div>
                                            <div>
                                                <p>{product?.status}</p>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            ))
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default MyOrders;