import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from "../../../context/AppContext";
import { ApiCalling } from "../../../services/Api";
import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import ProductHighlights from "./ProductHighlights";


function Product() {

    const { categories, tags } = useContext(AppContext);
    const [filteredCat, setFilteredCat] = useState(categories);

    const [images, setImages] = useState([]);

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

    const [formdata, setFormdata] = useState(
        {
            name: "",
            price: "",
            basePrice: "",
            discount: "",
            weight: "",
            description: "",
            availability: "",
            dimensions: {
                length: "",
                width: "",
                height: "",
            },
            highlights: [],
            brand: "",
            stock: "",
            tag: "",
            category: "",
            details: "",
        }
    );

    const onChangeFormData = (e) => {
        const { name, value, type } = e.target;

        setFormdata(prevFormData => {
            if (name === "highlights") {
                return {
                    ...prevFormData,
                    highlights: value.split(',').map(item => item.trim()),
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


    useEffect(() => {
        if (formdata.tag === "") {
            setFilteredCat(categories);
        } else {
            const newCat = categories.filter((category) => category.tag.name === formdata.tag);
            setFilteredCat(newCat);
        }

    }, [formdata.tag]);



    const sumbitHandler = async (e) => {

        e.preventDefault();

        const fd = new FormData();

        fd.append('name', formdata.name);
        fd.append('price', formdata.price);
        fd.append('description', formdata.description);
        fd.append('stock', formdata.stock);
        fd.append('category', formdata.category);
        fd.append('tag', formdata.tag);
        fd.append('details', formdata.details);

        for (const image of images) {
            fd.append("images", image, image.name);
        }


        const res = await ApiCalling("POST", "product/createProduct", fd)

        if (res?.success === true) {

            toast.success("Product Created Successfully");

            setFormdata(
                {
                    name: "",
                    price: "",
                    description: "",
                    stock: "",
                    tag: "",
                    category: "",
                    details: "",
                }
            );

        } else {
            toast.error(res.data.message);
        }

    }



    return (

        <div className='w-full mt-5 shadow-xl rounded-lg'>

            <form className='flex text-lg gap-5 font-semibold rounded-lg  flex-col w-full bg-white p-10 '>

                {/* image , name , price , etc */}
                <div className='flex flex-row gap-10'>

                    {/* images */}
                    <div className='border-[2px] w-[200px] rounded-md cursor-pointer border-[black]/[0.15] flex justify-center items-center '>
                        <input multiple className='' hidden type="file" id='images' name='images' placeholder='Image' onChange={onChangeFile} />
                        <div>
                            <IoMdImages className='text-[100px]' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>

                        {/* name */}
                        <input
                            className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                            type="text"
                            placeholder='Product Name'
                            name="name"
                            value={formdata.name}
                            onChange={onChangeFormData}
                        />

                        {/* price related */}
                        <div className='flex gap-5 flex-row'>

                            {/* actual price or mrp */}
                            <input
                                type="number"
                                min={0}
                                value={formdata.basePrice}
                                className='outline-none py-2 border-[2px] border-[black]/[0.15] rounded-md  px-2 w-[300px] '
                                name="basePrice"
                                placeholder='MRP of product'
                                onChange={onChangeFormData}
                            />

                            {/* product price */}
                            <input
                                type="number"
                                min={0}
                                value={formdata.price}
                                className='outline-none py-2 border-[2px] border-[black]/[0.15] rounded-md  px-2 w-[300px] '
                                name="price"
                                placeholder='Product Price'
                                onChange={onChangeFormData}
                            />

                        </div>

                        {/* stock and discount */}
                        <div className='flex gap-5 flex-row'>

                            {/*  Discount */}
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={formdata.discount}
                                className='outline-none py-2 border-[2px] border-[black]/[0.15] rounded-md  px-2 w-[300px] '
                                name="discount"
                                placeholder='Discount in percentage'
                                onChange={onChangeFormData}
                            />


                            {/* stock */}
                            <input
                                type="number"
                                min={1}
                                value={formdata.stock}
                                className='outline-none py-2 border-[2px] rounded-md border-[black]/[0.15]  px-2 w-[300px] '
                                placeholder='Product Stock'
                                name='stock'
                                onChange={onChangeFormData}
                            />

                        </div>

                        {/*  tag and category */}
                        <div className='flex justify-between items-center'>

                            {/* tags */}
                            <select onChange={onChangeFormData} value={formdata.tag} name="tag" className='outline-none border-[2px] cursor-pointer rounded-md  border-[black]/[0.15]  py-2 px-2 w-[300px] uppercase'>
                                <option value="">Select Tag</option>
                                {
                                    tags.map((tag) => (
                                        <option className='uppercase'
                                            key={tag._id}
                                            value={tag?.name}

                                        > {tag?.name}</option>
                                    ))
                                }

                            </select>

                            {/* Category */}
                            <select onChange={onChangeFormData}
                                value={formdata.category}
                                name="category"
                                className='outline-none border-[2px] rounded-md cursor-pointer border-[black]/[0.15]  py-2 px-2 w-[300px] uppercase'>
                                <option value="">Select Category</option>
                                {
                                    filteredCat?.map((category) => (
                                        <option className='uppercase'
                                            key={category?._id}
                                            value={category?.name}

                                        > {category?.name}</option>
                                    ))
                                }

                            </select>
                        </div>

                    </div>
                </div>

                <div className='flex flex-row gap-10'>

                    {/* highlights */}
                    <div className='w-1/3 bg-red-100 relative'>
                        <ProductHighlights />
                    </div>

                    {/* brand , dimanesion ,etc */}
                    <div className='2/3 flex flex-col gap-5'>
                        {/* brand,etc */}
                        <div className='flex flex-row gap-5'>
                            {/* brand */}
                            <input
                                className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                type="text"
                                placeholder='Brand Name'
                                name="brand"
                                value={formdata.brand}
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
                        </div>

                        {/* Dimension,etc */}
                        <div className='flex flex-row gap-5'>

                            <input
                                type="text"
                                className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                name="dimensions.width"
                                value={formdata.dimensions.width}
                                onChange={onChangeFormData}
                                placeholder="Width in cm"
                            />

                            <input
                                type="text"
                                className='outline-none border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
                                name="dimensions.height"
                                value={formdata.dimensions.height}
                                onChange={onChangeFormData}
                                placeholder="Height in cm"
                            />

                        </div>
                    </div>

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
                        <span>Create Product</span>
                    </button>
                </div>
            </form >

        </div >
    )
}

export default Product;