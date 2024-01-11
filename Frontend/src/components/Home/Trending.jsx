import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext';
import { ApiCalling } from '../../services/Api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

function Trending() {

    const { tags } = useContext(AppContext);

    const [option, setOption] = useState(tags[0] || "Default Option");
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    // initialize the tag value
    useEffect(() => {
        // Check if tags are not empty
        if (tags.length > 0) {
            setOption(tags[0]);
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
                            <p className='uppercase font-semibold text-2xl'>Trending Now</p>
                        </div>

                        {/* categories */}
                        <div>
                            <div className='flex gap-10 justify-center items-center '>
                                {

                                    tags?.map((cateogory) => (
                                        <button
                                            onClick={() => {
                                                setOption(cateogory)
                                            }}
                                            key={cateogory?._id}
                                            className={`px-7 py-2 hover:bg-red-900 font-semibold cursor-pointer transition-all duration-200 ease-in-out  hover:text-white rounded-full border-2 border-red-900 `
                                                + (option.name === cateogory.name ? "bg-red-900 text-white" : " text-black")}
                                        >
                                            <p className=''>{cateogory?.name}</p>
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* category Products */}
                        <div className='w-full flex gap-5 scrollbar-hide overflow-x-auto overflow-y-hidden'>

                            {
                                data?.map((product) => (
                                    <Link
                                        to={`productDetail/productId/${product?._id}`}
                                        key={product._id}
                                        className=' flex cursor-pointer flex-col justify-center gap-2 items-center '
                                    >
                                        <div className='w-[200px] h-[200px] overflow-hidden'>
                                            <img className=' bg-contain w-full h-full '
                                                alt={product?.name}
                                                src={product?.images[0]}
                                            />
                                        </div>
                                        <div className='flex flex-col items-center justify-center'>
                                            <p className='font-bold'>{product.title}</p>
                                            <p className=' font-semibold text-[black]/[0.5]'>{product?.name}</p>
                                            <p className='text-red-950 font-semibold'>$ {product?.price}</p>
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

    );

}

export default Trending;