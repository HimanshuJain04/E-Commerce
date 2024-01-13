import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AppContext } from '../../context/AppContext';
import { FaPlus, FaMinus } from "react-icons/fa6";



// this template used for cart,etc
function ProductTemplate2({ product }) {

    const { removeFromCartHandler, descreaseFromCartHandler, addToCartHandler } = useContext(AppContext);
    const [deliveryTime, setDeliveryTime] = useState("");



    useEffect(() => {

        const myDate = new Date();
        myDate.setDate(myDate.getDate() + 7);

        const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];

        const date = myDate.getDate();
        const month = monthsList[myDate.getMonth()];
        const day = daysList[myDate.getDay()];

        setDeliveryTime(`${day}, ${date} ${month}`);


    }, []);


    return (
        <div className='w-full'>
            <div className=''>

                {/* upper part for product detail */}
                <div className='w-full flex gap-5 border-[2px] rounded-sm border-[black]/[0.1] px-5 py-2'>
                    {/* left part for image */}
                    <div className='overflow-hidden h-[150px] flex justify-center items-center w-[250px]'>
                        <img src={product?.product?.images[0]} className='max-h-full max-w-full bg-contain ' alt="" />
                    </div>

                    {/* right part for detail */}
                    <div className='flex flex-col gap-3 justify-start items-start w-full'>

                        {/* upper part for details */}
                        <div className='flex w-full justify-between items-start'>
                            {/* left for detail */}
                            <div className='flex flex-col gap-1 justify-start items-start max-w-[70%]'>

                                <Link
                                    to={"/"}
                                >
                                    <span className='cursor-pointer text-xl font-semibold hover:text-red-500 transition-all duration-300 ease-in-out capitalize underline'>{product?.product?.name}</span>
                                </Link>
                                {/* <p>{product?.category?.name}</p> */}
                                <span className='text-sm font-semibold text-[black]/[0.6] cursor-pointer hover:underline transition-all duration-300 ease-in-out '>{"Clothes"}</span>
                                <p className='text-sm font-semibold text-[black]/[0.5]'>
                                    <span>{`${product?.product?.description?.substring(0, 150)}...`}</span>
                                </p>

                            </div>

                            {/* right for toatl price of prodi=uct acc. to quantity */}
                            <div>
                                <span className='font-semibold'>Rs.{product?.product?.price * product?.quantity}</span>
                            </div>

                        </div>

                        {/* lower part for quantity and shipping time */}
                        <div className='flex justify-between items-center w-full mt-5'>

                            {/* quantity increasing or descreasing */}
                            <div>
                                {/* Counter for product quantity */}
                                <div className='flex justify-center items-center w-full '>

                                    <div className='flex justify-center items-center bg-blue-600 text-white py-1 rounded-sm  '>
                                        <button
                                            onClick={() => descreaseFromCartHandler(product?._id)}
                                            className='text-xl border-r-2 px-2'
                                        ><FaMinus /></button>
                                        <div className='font-semibold px-4 text-xl'>{product?.quantity}</div>
                                        <button
                                            onClick={() => addToCartHandler(product?.product?._id)}
                                            className=' border-l-2 px-2 text-xl'
                                        ><FaPlus /></button>
                                    </div>
                                </div>
                            </div>

                            {/*  shipping time*/}
                            <div>
                                <span className='flex font-semibold text-sm text-[black]/[0.7] gap-1'>
                                    <span>Ships on</span>
                                    <span>{deliveryTime}</span>
                                </span>
                            </div>

                        </div>

                    </div>
                </div>

                {/* lower product for removing the product */}
                <div className='w-full bg-[#e7e7f2] border-x-2 border-b-2 rounded-sm border-[black]/[0.1] px-5 py-2 h-[50px] flex'>
                    {/* remove button */}
                    <div className='flex cursor-pointer gap-1 justify-center items-center'>
                        <span className='text-xl'><MdDelete /></span>
                        <button onClick={() => {
                            removeFromCartHandler(product?._id)
                        }} className='font-semibold'>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductTemplate2