import React, { useContext, useRef, useEffect, useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { AppContext } from '../../context/AppContext';
import { Link } from "react-router-dom"

function ProductTemplate({ data }) {

    const { isLoggedIn, addToWishlistHandler, removeFromWishlistHandler } = useContext(AppContext);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [openSearchRec, setOpenSearchRec] = useState(false);

    const profileMenu = useRef(null);


    useEffect(() => {
        const isProductInWishlist = isLoggedIn?.wishlists?.some(item => item._id === data?._id);
        setIsWishlisted(isProductInWishlist);

    }, [data?._id, isLoggedIn]);


    return (
        <div>
            <div>
                <div
                    className=' min-w-[300px] hover:shadow-xl rounded-sm transition-all duration-500 ease-in-out hover:shadow-[black]/[0.3] bg-white  max-w-[300px] p-2 relative h-[450px] flex flex-col gap-2 items-center justify-start '
                >
                    {/* wishlist-icon */}
                    <div className='absolute right-5 top-5'>
                        <button
                            onClick={() => {
                                if (isWishlisted) {
                                    removeFromWishlistHandler(data?._id);
                                } else {
                                    addToWishlistHandler(data?._id);
                                }
                            }}
                        >
                            <span className='text-3xl'>
                                {
                                    isWishlisted ? <FaHeart /> : <FaRegHeart />

                                }
                            </span>
                        </button>
                    </div>

                    {/* for image */}
                    <div className='w-full h-[90%] overflow-hidden  flex justify-center items-center'>

                        <img
                            className='max-w-full cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out max-h-full bg-contain'
                            src={data?.images[0]}
                            alt={`${data?.name}`}
                        />
                    </div>

                    {/* for data about product */}
                    <div className="flex flex-col w-full gap-2 font-semibold justify-start items-center">
                        <Link to={`/productDetail/productId/${data?._id}`}>
                            <p className='text-[black]/[0.6] hover:underline transition-all duration-300 ease-in-out '>{data?.name}</p>
                        </Link>
                        <p className='text-red-800'>Rs. {data?.price}</p>
                    </div>

                </div >
            </div>
        </div>
    )
}

export default ProductTemplate;