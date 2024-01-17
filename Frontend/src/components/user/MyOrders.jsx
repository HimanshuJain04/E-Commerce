import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaStar } from 'react-icons/fa';
import { ApiCalling } from '../../services/Api';
import toast from "react-toastify";


function MyOrders() {

    const { isLoggedIn } = useContext(AppContext);
    const [showRR, setShowRR] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);


    const [ratingandReview, setRatingandReview] = useState(
        {
            rating: 0,
            review: "",
        }
    );


    const sumbitHandler = async () => {

        console.log(ratingandReview);
        console.log(currentProduct);

        const res = await ApiCalling("POST", "updateRatingAndReview", {
            rating: ratingandReview.rating,
            review: ratingandReview.review,
            productId: currentProduct?.product?._id,
            userId: isLoggedIn._id
        });

        console.log("res : ", res);

        if (res?.success) {
            toast.success("Rating and review successfully");
        } else {
            console.log("res: ", res);
            toast.error("Rating and review failed");
        }



    };



    return (
        <div className=''>
            <div className='w-10/12 relative  mx-auto flex justify-center items-start '>

                {/* Rating &reviewRBox */}
                <div>
                    <div className={`bg-white absolute left-[50%] shadow-[black]/[0.5] translate-x-[-50%] top-[10%] w-[350px] flex flex-col shadow-2xl h-[300px] rounded-xl ` + (showRR ? " block" : "hidden")}>

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
                </div>

                {/* orders */}
                <div className='flex flex-col w-full gap-5'>
                    {
                        isLoggedIn?.orders?.map((order) => (
                            order?.products?.map((product) => (
                                <div key={product?._id}>

                                    {/* Order  Template */}
                                    <div className='w-full cursor-pointer font-semibold  flex justify-around px-10 items-start border-2 rounded-sm border-transparent transition-all duration-300 ease-in-out hover:border-[black]/[0.09] py-3 hover:shadow-xl shadow-black bg-[black]/[0.05]'>

                                        {/* image and name/desc */}
                                        <div
                                            className='flex justify-start items-start gap-20'
                                        >
                                            {/* image */}
                                            <div className='overflow-hidden flex justify-center items-center w-[170px] h-[170px]'>

                                                <img
                                                    className='object-contain h-full w-full '
                                                    src={product?.product?.images?.[0]}
                                                    alt={product?.product?.name}
                                                />
                                            </div>

                                            {/* name and desc */}
                                            <div
                                                className='flex flex-col max-w-[400px] gap-3 justify-start items-start'
                                            >
                                                <div>
                                                    <p>{product?.product?.name}</p>
                                                </div>
                                                <div className='text-[black]/[0.6]'>
                                                    <p>{product?.product?.description?.substring(0, 150)}....</p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* price and quan */}
                                        <div
                                            className='flex flex-col gap-8  justify-start items-start'
                                        >
                                            <div>
                                                <p>Rs. {product?.amount}</p>
                                            </div>
                                            <div>
                                                <p>{product?.quantity} qunatity</p>
                                            </div>

                                        </div>


                                        {/* delivery status and Review & Rating  */}
                                        <div
                                            className='flex flex-col gap-8 justify-start items-start'
                                        >
                                            <div>
                                                <p>Delivered at {product?.deliveryTime}</p>
                                            </div>
                                            <div>
                                                <p>Status: {product?.status}</p>
                                            </div>

                                            <div className='bg-blue-500 text-white font-semibold hover:shadow-xl hover:scale-105  shadow-black transition-all duration-200 ease-in-out px-5 py-2 rounded-sm'>
                                                <button onClick={() => {
                                                    setShowRR(true);
                                                    setCurrentProduct(product);
                                                }}>Review & Rating</button>
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