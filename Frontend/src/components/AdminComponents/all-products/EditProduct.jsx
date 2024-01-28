import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from "../../../context/AppContext";
import { ApiCalling } from "../../../services/Api";
import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import ProductHighlights from "../creation/ProductHighlights";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";



function EditProduct({ product_id, setShowEditPage }) {


    const inputRef = useRef(null);
    // const {  } = useContext(AppContext);

    const [images, setImages] = useState(null);

    const availabilityArr = [
        {
            name: 'In Stock'
        },
        {
            name: 'Out of Stock',
        },
        {
            name: 'Preorder'
        }
    ];

    const [formdata, setFormdata] = useState(null);

    const onChangeFormData = (e) => {
        const { name, value, type } = e.target;

        setFormdata(prevFormData => {
            if (name === "highlights") {
                return {
                    ...prevFormData,
                    highlights: value ? [value] : [], // Set it as an array with the single value
                };
            } else if (name.startsWith("dimensions")) {
                const dimensionName = name.split('.')[1];
                return {
                    ...prevFormData,
                    dimensions: {
                        ...prevFormData.dimensions,
                        [dimensionName]: value,
                    },
                };
            } else {
                return {
                    ...prevFormData,
                    [name]: type === 'number' ? parseFloat(value) : value,
                };
            }
        });
    };

    const onChangeFile = (e) => {
        setImages(e.target.files);
    }

    async function getProductData() {

        console.log("product_id: ", product_id)

        const res = await ApiCalling("GET", `product/getProductById/${product_id}`);
        console.log("res : ", res);

        if (res.success) {

            setFormdata(
                {
                    name: res.data.name,
                    price: res.data.price,
                    basePrice: res.data.basePrice,
                    discount: res.data.discount,
                    weight: "",
                    averageRating: res.data.averageRating,
                    description: res.data.description,
                    createdAt: res.data.createdAt,
                    availability: res.data.availability,
                    dimensions: {
                        length: res.data?.dimensions?.length,
                        width: res.data?.dimensions?.width,
                        height: res.data?.dimensions?.height,
                    },
                    highlights: res.data.highlights,
                    sales: res.data.sales,
                    updatedAt: res.data.updatedAt,
                    brand: res.data.brand,
                    stock: res.data.stock,
                    tag: res.data.category?.tag,
                    category: res.data.category?.name,
                    details: res.data.details,
                }
            );

            setImages(res.data.images);
        }

    }


    useEffect(() => {

        getProductData();

    }, []);


    const sumbitHandler = async (e) => {

        e.preventDefault();

        console.log(formdata)

        // const fd = new FormData();

        // fd.append('name', formdata.name);
        // fd.append('price', formdata.price);
        // fd.append('description', formdata.description);
        // fd.append('stock', formdata.stock);
        // fd.append('category', formdata.category);
        // fd.append('tag', formdata.tag);
        // fd.append('details', formdata.details);
        // fd.append('basePrice', formdata.basePrice);
        // fd.append('discount', formdata.discount);
        // fd.append('weight', formdata.weight);
        // fd.append('availability', formdata.availability);
        // fd.append('dimensions', formdata.dimensions);
        // fd.append('highlights', formdata.highlights);
        // fd.append('brand', formdata.brand);

        // for (const image of images) {
        //     fd.append("images", image, image.name);
        // }


        // const res = await ApiCalling("POST", "product/createProduct", fd);

        // if (res?.success === true) {

        //     toast.success("Product Created Successfully");

        //     setFormdata(
        //         {
        //             name: "",
        //             price: "",
        //             basePrice: "",
        //             discount: "",
        //             weight: "",
        //             description: "",
        //             availability: availabilityArr[0].name,
        //             dimensions: {
        //                 length: "",
        //                 width: "",
        //                 height: "",
        //             },
        //             highlights: [],
        //             brand: "",
        //             stock: "",
        //             tag: "",
        //             category: "",
        //             details: "",
        //         }
        //     );

        // } else {
        //     toast.error(res.message);
        // }

    }


    return (
        <div className='w-full mt-5 shadow-xl rounded-lg'>
            {
                formdata && (

                    <form className='flex text-lg gap-5 font-semibold rounded-lg  flex-col w-full bg-white p-10 '>

                        <div>
                            <button
                                className='text-3xl rounded-full p-1 hover:bg-[#f4f7fe]'
                                onClick={() => { setShowEditPage(null) }}
                            >
                                <MdOutlineKeyboardBackspace />
                            </button>
                        </div>

                        {/* div for small images */}
                        <div className='relative'>
                            <div className='flex overflow-auto  w-full p-2 px-5 rounded-md justify-center items-start scrollbar-hide flex-row gap-3 '>
                                {
                                    images?.map((image) => (
                                        <div
                                            key={image}
                                            className={`cursor-pointer p-1 border-[black]/[0.1] flex justify-center items-center border-[3px]`}
                                        >
                                            <img className=' bg-cover max-h-[150px] object-contain max-w-[150px] ' src={image} alt={image} />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='absolute -bottom-5 left-[50%] translate-x-[-50%]'>
                                <button
                                    className='bg-white shadow-2xl border-blue-800 border-2 text-3xl rounded-full p-2'
                                >
                                    <RiImageAddFill />
                                </button>
                            </div>

                        </div>

                        {/* name and brand */}
                        <div className='flex justify-between mt-10 gap-5 items-center'>
                            {/* name */}
                            <input
                                className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-2/3 '
                                type="text"
                                placeholder='Product Name'
                                name="name"
                                value={formdata.name}
                                onChange={onChangeFormData}
                            />

                            {/* brand */}
                            <input
                                className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-1/3 '
                                type="text"
                                placeholder='Brand Name'
                                name="brand"
                                value={formdata.brand}
                                onChange={onChangeFormData}
                            />

                        </div>


                        {/* prices | stock |  discount*/}
                        <div className='flex gap-5 flex-row'>

                            {/* actual price or mrp  */}
                            <input
                                type="number"
                                min={0}
                                value={formdata.basePrice}
                                className='outline-none py-2 border-[2px] border-[black]/[0.15] rounded-md  px-2 w-full '
                                name="basePrice"
                                placeholder='MRP of product'
                                onChange={onChangeFormData}
                            />

                            {/* product price */}
                            <input
                                type="number"
                                min={0}
                                value={formdata.price}
                                className='outline-none py-2 border-[2px] border-[black]/[0.15] rounded-md  px-2 w-full '
                                name="price"
                                placeholder='Product Price'
                                onChange={onChangeFormData}
                            />

                            {/* stock */}
                            <input
                                type="number"
                                value={formdata.stock}
                                className='outline-none py-2 border-[2px] rounded-md border-[black]/[0.15]  px-2 w-full '
                                placeholder='Product Stock'
                                name='stock'
                                onChange={onChangeFormData}
                            />

                            {/* sales */}
                            <input
                                className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                type="number"
                                placeholder='Sales'
                                name="sales"
                                readOnly
                                value={formdata.sales}
                                onChange={onChangeFormData}
                            />

                            {/*  Discount */}
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={formdata.discount}
                                className='outline-none py-2 border-[2px] border-[black]/[0.15] rounded-md  px-2 w-full '
                                name="discount"
                                placeholder='Discount in percentage'
                                onChange={onChangeFormData}
                            />

                        </div>

                        {/* stock and tag , category */}
                        <div className='flex gap-5 flex-row'>


                            {/* average-rating */}
                            <input
                                className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                type="number"
                                placeholder='Average Rating'
                                name="averageRating"
                                readOnly
                                value={formdata.averageRating.toFixed(2)}
                                onChange={onChangeFormData}
                            />

                            {/* tags */}
                            <input
                                className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                type="text"
                                placeholder='Product Tag'
                                name="tag"
                                readOnly
                                value={formdata.tag}
                                onChange={onChangeFormData}
                            />

                            {/* Category */}
                            <input
                                className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                type="text"
                                readOnly
                                placeholder='Product Category'
                                name="category"
                                value={formdata.category}
                                onChange={onChangeFormData}
                            />

                            {/* weight */}
                            <input
                                className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                type="number"
                                placeholder='Weight in grams'
                                name="weight"
                                value={formdata.weight}
                                onChange={onChangeFormData}
                            />

                        </div>


                        {/* highlight and others */}
                        <div className='flex flex-row gap-10'>

                            {/* highlights */}
                            <div className='w-1/3 relative border-2 border-[black]/[0.2] rounded-md p-1'>
                                <ProductHighlights formdata={formdata} setFormdata={setFormdata} />
                            </div>

                            <div className='w-2/3 flex flex-col gap-5'>

                                <div className='flex flex-row gap-5'>
                                    {/* availability */}
                                    <select onChange={onChangeFormData}
                                        value={formdata.availability}
                                        name="availability"
                                        className='outline-none border-[2px] rounded-md cursor-pointer border-[black]/[0.15]  py-2 px-2 w-full uppercase'>
                                        {
                                            availabilityArr.map((av) => (
                                                <option
                                                    key={av}
                                                    className='uppercase'
                                                    value={av.name}>{av.name}</option>
                                            ))
                                        }
                                    </select>

                                    {/* length  */}
                                    <input
                                        type="text"
                                        name="dimensions.length"
                                        className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                        value={formdata.dimensions.length}
                                        onChange={onChangeFormData}
                                        placeholder="Length in cm"
                                    />

                                    {/* width */}
                                    <input
                                        type="text"
                                        className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                        name="dimensions.width"
                                        value={formdata.dimensions.width}
                                        onChange={onChangeFormData}
                                        placeholder="Width in cm"
                                    />

                                    {/* height */}
                                    <input
                                        type="text"
                                        className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                        name="dimensions.height"
                                        value={formdata.dimensions.height}
                                        onChange={onChangeFormData}
                                        placeholder="Height in cm"
                                    />


                                </div>

                                {/* product description */}
                                <div>
                                    <textarea
                                        name="description"
                                        placeholder='Product Description'
                                        value={formdata.description}
                                        className='outline-none w-full resize-none h-[150px] rounded-md border-[2px] border-[black]/[0.15]  py-2 px-2 '
                                        onChange={onChangeFormData}
                                    />
                                </div>
                            </div>

                        </div>



                        {/* Product details */}
                        <div>
                            <textarea
                                name="details"
                                placeholder='Product Details'
                                value={formdata.details}
                                className='outline-none w-full h-[150px] resize-none border-[2px] border-[black]/[0.15] rounded-md  py-2 px-2 '
                                onChange={onChangeFormData}
                            />
                        </div>

                        {/* button */}
                        <div className='w-full flex justify-center text-white items-center'>
                            <button
                                onClick={sumbitHandler}
                                className='w-full flex justify-center items-center gap-1 rounded-lg font-semibold py-3 bg-blue-700 border-[2px] border-transparent transition-all duration-300 ease-in-out hover:text-blue-800 hover:border-blue-700 hover:bg-white'
                            >
                                <span className='text-3xl'><MdAdd /></span>
                                <span>Save Changes</span>
                            </button>
                        </div>

                    </form >

                )
            }

        </div >
    )
}

export default EditProduct
