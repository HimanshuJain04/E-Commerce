import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from "react-router-dom";

function ActualCategory() {

    const images = [
        "https://th.bing.com/th/id/OIP.q5vTy1bcWj65l-5c6SJGQQHaK0?rs=1&pid=ImgDetMain",
        "https://www.fashiongonerogue.com/wp-content/uploads/2020/10/Faux-Fur-Coat.jpg",
        "https://th.bing.com/th/id/OIP.iQVWVJL5KtpQYaXdoWn_WQHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th/id/OIP.3UBxLPp3bz7hFkk7kLmO0QHaJQ?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.BGwhDC-5eqhHHqZkDPDMygHaE7?w=230&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    ];

    const allTag = {
        name: "All",
        _id: "All-Categories",
    };

    const [showAll, setShowAll] = useState(false);
    const { tags } = useContext(AppContext);
    const [allTags, setAllTags] = useState([]);


    // initialize the tag value
    useEffect(() => {
        // Check if tags are not empty
        if (tags.length > 0) {
            setAllTags([allTag, ...tags]);
        }
    }, [tags]);


    return (
        <div className='flex flex-col justify-center  items-center gap-10 p-5'>

            {/* Actual Category */}
            <div>
                <p className='uppercase font-semibold text-2xl text-[black]/[0.8]'>Actual Categories</p>
            </div>


            {/* category Products */}
            <div className={`w-full flex flex-wrap overflow-hidden gap-10 items-start justify-center ` + (showAll ? "h-[full] " : "  h-[370px]")}>

                {
                    allTags?.map((product, index) => (
                        <div key={product?._id}>
                            <Link
                                to={
                                    product?.name === "All" ? "/products/getAllProducts/AllProducts" : `/products/getProductsByTag/${product?._id}`
                                }
                                className=' flex group  cursor-pointer flex-col justify-center gap-2 items-center '
                            >
                                <div className='w-[300px] relative  transition-all duration-1000 ease-in-out  h-[300px] overflow-hidden'>

                                    {/* hover Effect */}
                                    <div className='group-hover:flex absolute  justify-center items-center hidden w-full bg-[black]/[0.6] transition-all duration-1000 ease-in-out  h-full'>
                                        <div className='px-4 border-white rounded-full border-[1px] text-white py-2'>
                                            <p>Explore More</p>
                                        </div>
                                    </div>

                                    {/* image */}
                                    <img className=' bg-contain w-full h-full '
                                        src={images[index]} alt={product?.name} />
                                </div>

                                <div className='flex flex-col items-center justify-center'>
                                    <p className='font-bold'>{product?.name}</p>
                                    <p className=' font-semibold text-[black]/[0.5]'>
                                        {
                                            product.name !== "All" ? (`${product?.categories?.[0]?.name},${product?.categories?.[1]?.name}...etc`
                                            ) : ("All Categories")
                                        }
                                    </p>
                                </div>

                            </Link>
                        </div>
                    ))
                }

            </div>

            {/* show all or less button */}
            <button
                onClick={() => {
                    setShowAll(!showAll)
                }}
            >
                <p className='font-semibold bg-red-900 rounded-full text-white px-3 py-1'>
                    {
                        showAll ? "Show Less" : "Show More"
                    }
                </p>
            </button>

        </div >
    )
}

export default ActualCategory