import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext';
import { ApiCalling } from '../../services/Api.js';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


function TopSelling() {

    const { tags } = useContext(AppContext);

    const allTag = {
        name: "All",
        _id: "All"
    };


    const [allTags, setAllTags] = useState([]);
    const [option, setOption] = useState(allTags[0] || "Default Option");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // initialize the tag value
    useEffect(() => {
        // Check if tags are not empty
        if (tags.length > 0) {
            setAllTags([allTag, ...tags]);
            setOption(allTag);
        }
    }, [tags]);

    async function changeData() {
        const id = option.name !== "All" ? option._id : "All";

        const res = await ApiCalling("GET", `product/getTopSellingProducts/${id}`);
        if (res?.success) {
            setData(res?.data);
        } else {
            toast.error(res?.data?.message);
            setData([]);
            navigate("/error/something-went-wrong");
        }
    }

    // for changing the data according to options
    useEffect(() => {
        if (option !== "Default Option") {
            changeData();
        }
    }, [option]);


    return (
        <div>
            {
                data?.length > 0 ? (
                    <div className='flex flex-col items-center gap-10'>

                        {/* Trending Now */}
                        <div>
                            <p className='uppercase font-semibold text-2xl'>Top Selling Products</p>
                        </div>

                        {/* categories */}
                        <div className='flex justify-center w-full items-center'>
                            <div className='flex gap-5 md:gap-10 justify-center flex-wrap items-center  w-full px-10 py-2 lg:py-5 overflow-auto scrollbar-hide '>
                                {
                                    allTags?.map((cateogory) => (
                                        <button
                                            onClick={() => {
                                                setOption(cateogory)
                                            }}
                                            key={cateogory?._id}
                                            className={`px-4 py-1 md:px-7 md:py-2 hover:bg-red-900  flex-shrink-0 font-semibold cursor-pointer transition-all duration-200 ease-in-out  hover:text-white rounded-full border-2 border-red-900 `
                                                + (option?.name === cateogory?.name ? "bg-red-900 text-white" : " text-black")}
                                        >
                                            <p className=''>{cateogory?.name}</p>
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* category Products */}
                        <div className='w-full flex gap-5 justify-start p-2 items-center pb-10 scrollbar-hide overflow-x-auto overflow-y-hidden'>

                            {
                                data?.map((product) => (
                                    <Link
                                        to={`productDetail/productId/${product?._id}`}
                                        key={product._id}
                                        className=' flex hover:shadow-xl p-2 shadow-black transition-all duration-200 ease-in-out cursor-pointer flex-col justify-center gap-2 items-center '
                                    >
                                        <div className='w-[230px] h-[230px] overflow-hidden'>
                                            <img className=' object-contain '
                                                alt={product?.name}
                                                src={product?.images?.[0]}
                                            />
                                        </div>
                                        <div className='flex flex-col items-center max-w-[200px] justify-center'>
                                            <p className=' font-semibold text-[black]/[0.5]'>{product?.name.substring(0, 20)}...</p>
                                            <p className='text-red-950 font-semibold'>Rs. {product?.price}</p>
                                        </div>

                                    </Link>
                                ))
                            }

                        </div>

                    </div >
                ) : (
                    <div>Loading..</div>
                )
            }

        </div>





    )
}


export default TopSelling;