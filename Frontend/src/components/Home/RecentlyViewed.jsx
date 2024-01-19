import React, { useContext } from 'react'
import { AppContext } from "../../context/AppContext"
import { Link } from "react-router-dom";

function RecentlyViewed() {

    const { isLoggedIn } = useContext(AppContext);

    return (
        <div>
            {
                isLoggedIn?.recentlyViewed?.length > 0 &&
                <div className='flex mt-20 flex-col items-center gap-10'>

                    <div>
                        <p className='uppercase font-semibold text-2xl'>Recently Viewed</p>
                    </div>

                    <div className='w-full flex gap-5 justify-start p-2 items-center pb-10 scrollbar-hide overflow-x-auto overflow-y-hidden'>
                        {
                            isLoggedIn?.recentlyViewed?.map((product) => (
                                <Link
                                    to={`productDetail/productId/${product?.product?._id}`}
                                    key={product?.product?._id}
                                    className=' flex hover:shadow-xl p-2 shadow-black transition-all duration-200 ease-in-out cursor-pointer flex-col justify-center gap-2 items-center '
                                >
                                    <div className='w-[230px] h-[230px] overflow-hidden'>
                                        <img className=' object-contain '
                                            alt={product?.product?.name}
                                            src={product?.product?.images?.[0]}
                                        />
                                    </div>
                                    <div className='flex flex-col items-center max-w-[200px] justify-center'>
                                        <p className=' font-semibold text-[black]/[0.5]'>{product?.product?.name?.substring(0, 20)}...</p>
                                        <p className='text-red-950 font-semibold'>Rs. {product?.product?.price}</p>
                                    </div>

                                </Link>
                            ))
                        }

                    </div>

                </div>
            }

        </div >
    )
}

export default RecentlyViewed;