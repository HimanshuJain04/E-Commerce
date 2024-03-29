import React, { useEffect, useState } from 'react'
import { ApiCalling } from "../../../services/Api.js";
import { GrEdit } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import EditProduct from './EditProduct';



function AllProducts() {

    const [data, setData] = useState([]);
    const [showEditPage, setShowEditPage] = useState(null);

    const fun = async () => {
        const res = await ApiCalling("GET", "product/getAllProductsAtOnce");
        if (res.success) {
            setData(res.data);

        } else {
            setData([]);
        }
    }

    useEffect(() => {

        fun();

    }, []);

    async function deleteHandler(id) {

        const res = await ApiCalling("DELETE", `product/deleteProductById/${id}`)
        if (res.success) {
            fun();
        }
    }


    return (
        <div>
            {
                showEditPage ? (
                    <div>
                        <EditProduct product_id={showEditPage} setShowEditPage={setShowEditPage} />
                    </div>
                ) : (
                    <div className='bg-[#f4f7fe] w-full  flex flex-col justify-start py-10 items-start'>
                        {
                            data.length > 0 && (
                                <div className='flex flex-wrap justify-center items-start gap-20 w-full'>
                                    {
                                        data.map((product) => (
                                            <div
                                                key={product._id}
                                                className='flex bg-white relative p-3 rounded-sm shadow-md gap-2 w-full flex-col overflow-hidden h-[350px] max-w-[250px]'
                                            >
                                                <div className='flex absolute right-1 top-1 text-xl flex-col gap-2'>
                                                    <button onClick={() => { setShowEditPage(product._id) }} className='cursor-pointer shadow-[black]/[0.5] bg-white  rounded-full p-2 shadow-sm'><GrEdit /></button>
                                                    <button
                                                        onClick={() => deleteHandler(product._id)}
                                                        className='cursor-pointer shadow-[black]/[0.5] bg-white  rounded-full p-2 shadow-sm'><FaTrash /></button>
                                                </div>

                                                {/* image */}
                                                <div className='max-w-full max-h-[200px] overflow-hidden' >
                                                    <img src={product?.images[0]} className='object-cover' alt={product.name} />
                                                </div>

                                                {/* price and name */}
                                                <div className='flex flex-col gap-2 font-semibold justify-center items-center'>
                                                    <p className='text-sm'>{product.name.substring(0, 50)}...</p>
                                                    <p className='text-sm'>Rs. {product.price}</p>
                                                    <p>ID: {product._id}</p>
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }

                    </div >

                )
            }

        </div >
    );
}

export default AllProducts;
