import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from "../../context/AppContext";
import { ApiCalling } from "../../services/Api";
import { toast } from "react-toastify";


function Product() {

    const { categories, tags } = useContext(AppContext);
    const [filteredCat, setFilteredCat] = useState(categories);

    const [images, setImages] = useState([]);

    const [formdata, setFormdata] = useState(
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

    const onChangeFormData = (e) => {
        setFormdata(
            {
                ...formdata,
                [e.target.name]: e.target.value
            }
        )
    }

    const onChangeFile = (e) => {

        setImages(e.target.files);
        // console.log("file: ", e.target.files);
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

        <div className='w-full'>

            <form className='flex text-lg gap-5 font-semibold p-5 flex-col w-full  bg-[black]/[0.035] '>

                {/* images */}
                <div className='border-[2px] border-[black]/[0.5] w-full h-[200px] flex justify-center items-center '>
                    <input multiple className='' type="file" id='images' name='images' placeholder='Image' onChange={onChangeFile} />
                </div>

                {/* name and price*/}
                <div className='flex justify-between items-center'>
                    <input
                        className='outline-none border-[2px] border-[black]/[0.5] py-2 px-2 w-[600px] '
                        type="text"
                        placeholder='Product Name'
                        name="name"
                        value={formdata.name}
                        onChange={onChangeFormData}
                    />

                    <input
                        type="number"
                        min={0}
                        value={formdata.price}
                        className='outline-none py-2 border-[2px] border-[black]/[0.5]  px-2 w-[300px] '
                        name="price"
                        placeholder='Product Price'
                        onChange={onChangeFormData}
                    />

                </div>


                {/* stock and tag and category */}
                <div className='flex justify-between items-center'>
                    <input
                        type="number"
                        min={1}
                        value={formdata.stock}
                        className='outline-none py-2 border-[2px] border-[black]/[0.5]  px-2 w-[300px] '
                        placeholder='Product Stock'
                        name='stock'
                        onChange={onChangeFormData}
                    />

                    {/* tags */}
                    <select onChange={onChangeFormData} value={formdata.tag} name="tag" className='outline-none border-[2px]  border-[black]/[0.5]  py-2 px-2 w-[300px] uppercase'>
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
                    <select onChange={onChangeFormData} value={formdata.category} name="category" className='outline-none border-[2px]  border-[black]/[0.5]  py-2 px-2 w-[300px] uppercase'>
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

                <div>
                    <textarea
                        name="description"
                        placeholder='Product Description'
                        value={formdata.description}
                        className='outline-none w-full max-h-[200px] min-h-[200px] border-[2px] border-[black]/[0.5]  py-2 px-2 '
                        onChange={onChangeFormData}
                    />
                </div>

                <div>
                    <textarea
                        name="details"
                        placeholder='Product Details'
                        value={formdata.details}
                        className='outline-none w-full max-h-[200px] min-h-[200px] border-[2px] border-[black]/[0.5]  py-2 px-2 '
                        onChange={onChangeFormData}
                    />
                </div>

                <div className='w-full flex justify-center text-white items-center'>
                    <button
                        onClick={sumbitHandler}
                        className='w-[50%] rounded-lg py-3 bg-blue-500'
                    >Create Product</button>
                </div>

            </form>

        </div>
    )
}

export default Product;