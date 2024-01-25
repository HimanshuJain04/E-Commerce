import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaStar } from 'react-icons/fa';
import { ApiCalling } from '../../services/Api';
import { toast } from "react-toastify";


function MyOrders() {

    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    const [showRR, setShowRR] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);


    const [ratingandReview, setRatingandReview] = useState(
        {
            rating: 0,
            review: "",
        }
    );

    console.log(isLoggedIn?.orders);

    const sumbitHandler = async () => {

        const res = await ApiCalling("POST", "user/updateRatingAndReview", {
            rating: ratingandReview.rating,
            review: ratingandReview.review,
            productId: currentProduct?.product?._id,
            userId: isLoggedIn._id
        });

        if (res?.success) {
            toast.success("Rating and review successfully");
            setIsLoggedIn(res?.data)
            setShowRR(false);
        } else {
            console.log("res: ", res);
            toast.error("Rating and review failed");
        }
    };

    return (
        <div className=''>
            <div className='w-10/12 relative  mx-auto flex flex-col gap-10 justify-center items-start '>
                <div>
                    <p className='text-4xl font-semibold text-[black]/[0.6]'>My Orders</p>
                </div>

                {/* Rating &reviewRBox */}
                <div className={`bg-white absolute z-[12] left-[50%] shadow-[black]/[0.5] translate-x-[-50%] top-[10%] w-[350px] flex flex-col shadow-2xl h-[300px] rounded-xl ` + (showRR ? " block" : "hidden")}>

                    <div className='flex bg-white items-center justify-center font-semibold text-xl py-5'>
                        <p>Your opinion matter to us!</p>
                    </div>

                    <div className='w-full flex  justify-center items-start bg-[#E8E8F5]'>
                        <div
                            className='flex flex-col gap-5 p-5 justify-center items-center'
                        >
                            <div className='font-semibold'>
                                <p>How was the product?</p>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, index) => (

                                        <label key={index} className="cursor-pointer">
                                            {index + 1 <= ratingandReview.rating ? (
                                                <FaStar className="text-yellow-500 h-8 w-8" onClick={() => setRatingandReview({ ...ratingandReview, rating: index + 1 })} />
                                            ) : (
                                                <FaStar className="text-gray-300 h-8 w-8" onClick={() => setRatingandReview({ ...ratingandReview, rating: index + 1 })} />
                                            )}
                                        </label>

                                    ))}
                                    <p className="ml-2">{ratingandReview.rating}/5</p>
                                </div>

                            </div>

                            <div>
                                <textarea
                                    placeholder='Drop you review'
                                    value={ratingandReview.review}
                                    onChange={(e) => {
                                        setRatingandReview({
                                            ...ratingandReview,
                                            review: e.target.value
                                        });
                                    }}
                                    className='outline-none rounded-md h-[150px] scrollbar-hide resize-none w-[250px] p-2 '
                                />
                            </div>

                            <div className='w-full'>
                                <button
                                    onClick={sumbitHandler}
                                    className='bg-[#4c39ac] text-white font-semibold px-7 py-2 w-full rounded-md'
                                >Rate Now</button>

                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center py-5 bg-white items-center text-blue-800 text-sm'>
                        <button onClick={() => { setShowRR(false) }}>Maybe later</button>
                    </div>

                </div>



                {/* orders */}
                <div className='flex flex-col w-full gap-5'>
                    {
                        isLoggedIn?.orders?.map((order) => (
                            order?.products?.map((product) => (
                                <div key={product?._id}>

                                    {/* Order  Template */}
                                    <div className='w-full flex-col lg:flex-row cursor-pointer gap-10 font-semibold  flex justify-between px-10 items-start border-2 rounded-sm border-transparent transition-all duration-300 ease-in-out hover:border-[black]/[0.09] py-3 hover:shadow-xl shadow-black bg-[black]/[0.05]'>

                                        {/* image and name/desc */}
                                        <div
                                            className='flex justify-start flex-col xsm:flex-row items-center  xsm:items-start w-full gap-10'
                                        >
                                            {/* image */}
                                            <div className='overflow-hidden flex justify-center items-center w-[170px] h-[170px] min-w-[150px] min-h-[150px] '>

                                                <img
                                                    className='object-contain h-full w-full '
                                                    src={product?.product?.images?.[0]}
                                                    alt={product?.product?.name}
                                                />
                                            </div>

                                            {/* name and desc */}
                                            <div
                                                className='flex flex-col max-w-[350px] gap-3 mt-3 justify-start items-center xsm:items-start'
                                            >
                                                <div>
                                                    <p className='text-center'>{product?.product?.name?.substring(0, 60)}...</p>
                                                </div>
                                                <div className='text-[black]/[0.6] lg:block hidden '>
                                                    <p className='xl:block hidden'>{product?.product?.description?.substring(0, 100)}....</p>
                                                    <p className='xl:hidden block'>{product?.product?.description?.substring(0, 60)}....</p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* other details */}
                                        <div className='w-full xsm:flex-row flex-col flex justify-between gap-10 items-center'>

                                            {/* price and quan */}
                                            <div
                                                className='flex flex-row xsm:flex-col gap-8  justify-start items-start'
                                            >
                                                <div>
                                                    <p>Rs. {product?.amount}</p>
                                                </div>
                                                <div>
                                                    <p>{product?.quantity} quan.</p>
                                                </div>

                                            </div>


                                            {/* delivery status and Review & Rating  */}
                                            <div
                                                className='flex flex-col gap-8 justify-start items-center xsm:items-start'
                                            >

                                                <div>
                                                    <p>Delivered at {product?.deliveryTime}</p>
                                                </div>
                                                <div>
                                                    <p>Status: {product?.status}</p>
                                                </div>
                                                {
                                                    product?.status === "Delivered" && !product?.isReviewed && (

                                                        <div
                                                        >
                                                            <div className='bg-blue-500 text-white font-semibold hover:shadow-xl hover:scale-105  shadow-black transition-all duration-200 ease-in-out px-5 py-2 rounded-sm'>
                                                                <button onClick={() => {
                                                                    setShowRR(true);
                                                                    setCurrentProduct(product);
                                                                }}>Review & Rating</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                            </div>

                                        </div>


                                    </div>

                                </div>
                            ))
                        ))
                    }
                </div>

            </div>

        </div >
    )
}

export default MyOrders;