import React, { useState, useEffect } from 'react';
import ShowDetail from '../components/ShowDetail';
import { ApiCalling } from "../services/Api";
import { useNavigate, useLocation } from "react-router-dom";
import SimilarProducts from '../components/ProductDetail/SimilarProducts';

function ProductDetails() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const id = pathname.split("/").at(-1);
    const [mainImage, setMainImage] = useState("");
    const [avgRating, setAvgRating] = useState(0);


    useEffect(() => {

        ApiCalling("GET", `product/getProductById/${id}`)
            .then((data) => {
                console.log("data: ", data.data);
                setMainImage(data?.data?.images[0])
                setData(data.data);

                setAvgRating(data?.rating?.reduce(function (avg, value, _, { length }) {
                    return avg + value / length;
                }, 0));

            }).catch((err) => {
                navigate("/error");
                console.log(err);
            })
    }, []);



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
                            <p className=''>{data?.price}</p>
                        </div>
                    </div>

                    {/* Add to wishlist / cart button */}
                    <div className='flex flex-col gap-5 w-full'>
                        <div className='w-full'>
                            <button className='uppercase py-3 bg-red-400 hover:bg-red-600 transition-all duration-300 ease-in-out rounded-sm text-white font-semibold w-full'>Add to wishlist</button>
                        </div>

                        <div className='w-full'>
                            <button className='uppercase py-3 bg-red-400 rounded-sm hover:bg-red-600 transition-all duration-300 ease-in-out text-white font-semibold w-full'>Add to cart</button>
                        </div>

                    </div>

                    <div className='w-full flex flex-col gap-5'>
                        <ShowDetail heading={"Product Details"} description={data?.description} />
                        <ShowDetail heading={"Product Details"} description={data?.description} />
                        <ShowDetail heading={"Product Details"} description={data?.description} />
                        <ShowDetail heading={"Product Details"} description={data?.description} />
                    </div>



                </div>

            </div>


            {/* similar Products */}
            <div className='w-full mt-20'>
                <SimilarProducts />
            </div>



        </div>
    )
}

export default ProductDetails;