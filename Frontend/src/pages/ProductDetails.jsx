import React, { useState, useRef, useEffect, useContext } from 'react';
import ShowDetail from '../components/ShowDetail';
import { ApiCalling } from "../services/Api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ProductTemplate from '../components/common/ProductTemplate';
import { AppContext } from '../context/AppContext';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdOutlineStar } from "react-icons/md";



function ProductDetails() {

    const { isLoggedIn, setIsLoggedIn, addToWishlistHandler, descreaseFromCartHandler, addToCartHandler, removeFromWishlistHandler } = useContext(AppContext);

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [data, setData] = useState([]);
    const id = pathname.split("/").at(-1);
    const [mainImage, setMainImage] = useState("");
    const [isCarted, setIsCarted] = useState(null);
    const [similarData, setSimilarData] = useState([]);
    const [isWishlisted, setIsWishlisted] = useState(false);


    useEffect(() => {

        const isProductInWishlist = isLoggedIn?.wishlists?.some(item => item?._id === id);
        setIsWishlisted(isProductInWishlist);

        // const isProductInCart = isLoggedIn?.carts?.some(item => item?.product?._id === id);
        const isProductInCart = isLoggedIn?.carts?.find(item => item?.product?._id === id);

        setIsCarted(isProductInCart);

    }, [id, isLoggedIn]);

    const callApis = async () => {

        // get products details
        await ApiCalling("GET", `product/getProductById/${id}`)
            .then((data) => {
                // set data to the varibales
                setMainImage(data?.data?.images[0])
                setData(data?.data);

            }).catch((err) => {
                navigate("/error");
                console.log(err);
            });


        // call the next api for simialr data
        await ApiCalling("GET", `product/getSimilarProducts/${id}`)
            .then((data) => {
                setSimilarData(data?.data);
            }).catch((err) => {
                setSimilarData([]);
                console.log(err);
            });




        // push product into recentView array
        await ApiCalling("POST", "user/addProductIntoRecentView", {
            productId: id,
            userId: isLoggedIn._id
        })
            .then((res) => {
                setIsLoggedIn(res?.data);
            }).catch((err) => {
                navigate("/error");
                console.log(err);
            });

    }


    useEffect(() => {
        callApis();
    }, [id, navigate]);


    return (
        <div className='w-full flex justify-start flex-col items-center'>

            {/* product details */}
            <div className='w-11/12 flex flex-col xl:flex-row items-center justify-between py-5 gap-5 md:gap-20  min-h-[100vh] h-full xl:items-start '>

                {/* left div for image*/}
                <div className='flex  md:flex-row flex-col-reverse h-[65vh]  sm:h-[90vh] justify-between md:gap-5 w-full xl:w-3/5 items-start'>

                    {/* div for small images */}
                    <div className='flex  overflow-y-auto md:border-2 w-full p-1 md:p-5 rounded-sm scrollbar-hide pb-5 px-2 flex-row md:flex-col gap-3  md:w-[15%] md:max-h-full'>
                        {
                            data?.images?.map((image) => (
                                <button
                                    onClick={() => { setMainImage(image) }}
                                    key={image}
                                    className={`cursor-pointer p-1 flex justify-center items-center duration-200 transition-all ease-in-out border-[3px] rounded-sm  ` + (mainImage === image ? " border-blue-600" : "border-transparent")}
                                >
                                    <img className=' bg-cover max-h-[60px] object-contain max-w-[100px] md:max-h-[70px] md:max-w-[100%]' src={image} alt={image} />
                                </button>
                            ))
                        }

                    </div>

                    {/* div for large image */}
                    <div className='w-full h-full overflow-hidden'>
                        <img className='object-contain h-full w-full ' src={mainImage} alt="" />
                    </div>

                </div>

                {/* right div for details */}
                <div className=' w-full xl:w-2/5  pr-10  h-full gap-10 flex flex-col justify-start items-start '>

                    {/* div for name / rating / price */}
                    <div className='flex flex-col gap-3 justify-start items-start'>

                        {/* category */}
                        <div >
                            <Link
                                to={`/products/category/${data?.category?.name}/${data?.category?._id}`}
                                className='flex uppercase font-semibold px-1 hover:underline text-sm hover:text-red-800 cursor-pointer transition-all duration-300 ease-in-out '>
                                <span>{data?.category?.name}</span>
                            </Link>
                        </div>

                        {/* name */}
                        <div>
                            <h3 className='text-xl sm:text-3xl font-semibold font-sans '>{data?.name}</h3>
                        </div>

                        {
                            data?.averageRating > 0 &&
                            <div className='flex gap-2 mt-2 items-center'>

                                <div className='flex justify-center text-base rounded-full font-semibold px-3 py-[2px] bg-green-600 text-white items-center gap-1'>
                                    <span>{data?.averageRating?.toFixed(2)}</span>
                                    <MdOutlineStar fontSize={20} />
                                </div>

                                <div className='font-semibold text-[black]/[0.5]'>
                                    <p>{data?.rating_review?.length} ratings and reviews</p>
                                </div>

                            </div>
                        }


                        {/* price */}
                        <div className='mt-10 font-semibold text-red-900 text-xl sm:text-2xl'>
                            <p className=''>Rs. {data?.price}</p>
                        </div>

                    </div>

                    {/* Add to wishlist / cart button */}
                    <div className='flex px-5 sm:p-0 w-full sm:w-[500px] flex-col gap-7 xl:w-full'>
                        {/* wishlist button */}
                        <div className='w-full'>
                            <button onClick={() => {
                                if (isWishlisted) {
                                    removeFromWishlistHandler(id);
                                } else {
                                    addToWishlistHandler(id);
                                }

                            }} className='uppercase py-3 bg-red-400 hover:bg-red-600 transition-all duration-300 ease-in-out rounded-sm text-white font-semibold w-full'>
                                <span>
                                    {
                                        isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                                    }
                                </span>
                            </button>
                        </div>

                        {/* cart button */}
                        <div className='w-full'>
                            <button onClick={() => {
                                if (!isCarted) {
                                    addToCartHandler(id);
                                }
                            }} className='uppercase py-3 bg-red-400 rounded-sm hover:bg-red-600 transition-all duration-300 ease-in-out text-white font-semibold w-full'>
                                <span>
                                    {
                                        isCarted ? (
                                            <div>
                                                <button onClick={() => {
                                                    navigate("/cart");
                                                }}>Go to cart</button>
                                            </div>

                                        ) : (
                                            <p>Add to cart</p>
                                        )
                                    }
                                </span>
                            </button>
                        </div>

                        {/* Counter for product quantity */}
                        <div className={` flex justify-center mb-5 items-center w-full ` + (isCarted ? ("block") : ("hidden"))}>

                            <div className='flex justify-center items-center px-2 bg-blue-600 text-white py-2 rounded-sm  '>
                                <button
                                    onClick={() => descreaseFromCartHandler(isCarted?._id)}
                                    className='text-xl border-r-2 px-2'
                                ><FaMinus /></button>
                                <div className='font-semibold px-4 text-xl'>{isCarted?.quantity}</div>
                                <button
                                    onClick={() => addToCartHandler(id)}
                                    className=' border-l-2 px-2 text-xl'
                                ><FaPlus /></button>
                            </div>
                        </div>

                    </div>

                    {/* product description ,etc*/}
                    <div className='w-full flex flex-col gap-7'>
                        {
                            data?.description?.length > 0 && (
                                <ShowDetail heading={"Description"} data={data?.description} />
                            )
                        }

                        {
                            data?.highlights?.length > 0 && (
                                <ShowDetail heading={"Highlights"} data={data?.highlights} />
                            )
                        }

                        {
                            data?.productDetails?.length > 0 && (
                                <ShowDetail heading={"Details"} data={data?.productDetails} />
                            )
                        }

                        {/* {
                            data?.rating_review?.length > 0 && (
                                <ShowDetail heading={"Reviews"} data={data?.rating_review} />
                            )
                        } */}

                    </div>

                </div>

            </div >


            {/* similar Products */}
            <div className='w-full md:my-20 my-10 ' >
                <div className='w-full flex justify-center items-start '>

                    <div className='w-11/12 flex gap-2 flex-col justify-center items-center'>

                        {/* heading */}
                        <div className='w-full flex justify-start items-center'>
                            <p className='uppercase font-semibold btext-[black]/[0.6] ' >You Might Also Like</p>
                        </div>

                        {/* data */}
                        <div className='w-full'>
                            <div className='flex overflow-y-hidden p-3 py-10 overflow-auto scrollbar-hide w-full items-start justify-start gap-7'>
                                {
                                    similarData?.map((product) => (
                                        <ProductTemplate key={product._id} data={product} />
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                </div>
            </div >


        </div >
    )
}

export default ProductDetails;