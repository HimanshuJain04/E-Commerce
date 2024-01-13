import React, { useState, useRef, useEffect, useContext } from 'react';
import ShowDetail from '../components/ShowDetail';
import { ApiCalling } from "../services/Api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ProductTemplate from '../components/common/ProductTemplate';
import { AppContext } from '../context/AppContext';
import { FaPlus, FaMinus } from "react-icons/fa6";


function ProductDetails() {

    const { isLoggedIn, addToWishlistHandler, descreaseFromCartHandler, addToCartHandler, removeFromWishlistHandler } = useContext(AppContext);

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [data, setData] = useState([]);
    const id = pathname.split("/").at(-1);
    const [avgRating, setAvgRating] = useState(0);
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



    useEffect(() => {

        ApiCalling("GET", `product/getProductById/${id}`)
            .then((data) => {
                // set data to the varibales
                setMainImage(data?.data?.images[0])
                setData(data?.data);
                setAvgRating(data?.rating?.reduce(function (avg, value, _, { length }) {
                    return avg + value / length;
                }, 0));

            }).catch((err) => {
                navigate("/error");
                console.log(err);
            });

        // call the next api for simialr data
        ApiCalling("GET", `product/getSimilarProducts/${id}`)
            .then((data) => {
                setSimilarData(data?.data);
            }).catch((err) => {
                setSimilarData([]);
                console.log(err);
            });


    }, [id, navigate]);


    return (
        <div className='w-full flex justify-start flex-col items-center'>

            {/* product details */}
            <div className='w-11/12 flex justify-between py-5 gap-10  min-h-[100vh] h-full items-start '>

                {/* left div for image*/}
                <div className='flex max-h-[90vh] justify-between gap-5 h-full w-[55%] items-start'>

                    {/* div for small images */}
                    <div className='flex overflow-y-auto max-h-[90vh] pb-5 px-2 flex-col gap-2  w-[20%] h-full'>
                        {
                            data?.images?.map((image) => (
                                <button
                                    onClick={() => { setMainImage(image) }}
                                    key={image}
                                    className={`cursor-pointer flex justify-center items-center duration-200 transition-all ease-in-out border-[3px] rounded-sm  ` + (mainImage === image ? " border-blue-600" : "border-transparent")}
                                >
                                    <img className=' bg-cover max-h-[150px] max-w-[100%]' src={image} alt={image} />
                                </button>
                            ))
                        }

                    </div>

                    {/* div for large image */}
                    <div className='w-[80%] h-[90vh]'>
                        <img className='w-full max-h-full bg-red-200' src={mainImage} alt="" />
                    </div>

                </div>


                {/* right div for details */}
                <div className='w-[35%]  pr-10  h-full gap-10 flex flex-col justify-start items-start '>

                    {/* div for name / rating / price */}
                    <div>

                        {/* category */}
                        <div >
                            <Link
                                to={`/products/category/${data?.category?.name}/${data?.category?._id}`}
                                className='flex uppercase font-semibold px-1 mb-3 hover:underline text-sm hover:text-red-800 cursor-pointer transition-all duration-300 ease-in-out '>
                                <span>{data?.category?.name}</span>
                            </Link>
                        </div>

                        {/* rating */}
                        <div className='flex gap-1 items-center'>
                            <p>{avgRating}</p>
                            <p>({data?.rating?.length})</p>
                        </div>

                        {/* name */}
                        <div>
                            <h3 className='text-5xl font-semibold font-sans '>{data?.name}</h3>
                        </div>


                        {/* price */}
                        <div className='mt-10 font-semibold text-red-900 text-2xl'>
                            <p className=''>Rs. {data?.price}</p>
                        </div>
                    </div>

                    {/* Add to wishlist / cart button */}
                    <div className='flex flex-col gap-5 w-full'>
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
                                                <Link to={"/cart"}>Go to cart</Link>
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

                    {/* product description */}
                    <div className='w-full flex flex-col gap-5'>
                        <ShowDetail heading={"Product Details"} description={data?.description} />
                        <ShowDetail heading={"Product Details"} description={data?.description} />
                        <ShowDetail heading={"Product Details"} description={data?.description} />
                        <ShowDetail heading={"Product Details"} description={data?.description} />
                    </div>

                </div>
            </div>


            {/* similar Products */}
            <div className='w-full my-20'>
                <div className='w-full flex justify-center items-start '>

                    <div className='w-11/12 flex gap-5 flex-col justify-center items-center'>

                        {/* heading */}
                        <div className='w-full flex justify-start items-center'>
                            <p className='uppercase font-semibold btext-[black]/[0.6] ' >You Might Also Like</p>
                        </div>

                        {/* data */}
                        <div className='w-full'>
                            <div className='flex overflow-y-hidden overflow-auto scrollbar-hide w-full items-start justify-start gap-7'>
                                {
                                    similarData?.map((product) => (
                                        <ProductTemplate key={product._id} data={product} />
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default ProductDetails;