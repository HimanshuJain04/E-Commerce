import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import ProductTemplate from "../components/common/ProductTemplate";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiCalling } from '../services/Api';
import Navigation from '../components/Navigation';
import { AppContext } from '../context/AppContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


function Page() {

    const options = [
        {
            option: "By relevence",
            value: "relevence"
        },
        {
            option: "By popularity",
            value: "popularity"
        },
        {
            option: "Price high to low",
            value: "price-high-to-low"
        },
        {
            option: "Price low to high",
            value: "price-low-to-high"
        },
        {
            option: "Rating high to low",
            value: "rating-high-to-low"
        },
        {
            option: "Rating low to high",
            value: "rating-low-to-high"
        },


    ];

    const { currentPage } = useContext(AppContext);
    const limit = 10;

    const { pathname } = useLocation();
    let query = pathname.split("/")[2];
    let value = pathname.split("/")[3];

    const [data, setData] = useState([]);
    const navigate = useNavigate();


    const [dataOrder, setDataOrder] = useState(options[0]?.value);
    const [showRange, setShowRange] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 100000]);


    async function getData() {

        let url;

        if (query === "getAllProducts") {
            url = `${query}`;
        } else {
            url = `${query}/${value}`;
        }

        const res1 = await ApiCalling("GET", `product/${url}?currPage=${currentPage}&limit=${limit}&filter=${dataOrder}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`);

        if (res1?.success) {
            setData(res1?.data);

        } else {
            setData([]);
            navigate("/error");
        }
    }



    const handlePriceRangeChange = (newRange) => {
        setPriceRange(newRange);
    };

    useEffect(() => {
        getData();
    }, [pathname, currentPage, priceRange, dataOrder])

    return (
        <div className='flex justify-center items-start'>

            <div className='flex justify-center w-11/12 flex-col gap-10 items-start'>
                <div className='relative w-full flex gap-14 justify-between items-start'>

                    {/* left part for category */}
                    <div className='w-[400px] h-[600px] bg-blue-100 '>
                        category

                    </div>

                    {/* right part for data */}
                    <div className='w-full  flex flex-col gap-10 justify-center items-center  h-full '>

                        {/* upper part for filters */}
                        <div className='justify-between w-full items-center flex'>

                            {/* total results */}
                            <div>
                                <p className='text-2xl font-semibold shadow-md rounded-md px-5 py-2 shadow-[black]/[0.3]  '
                                ><span>{data?.totalProducts}</span> results</p>
                            </div>

                            {/* filters */}
                            <div className='flex justify-between font-semibold items-center gap-10'>
                                {/* by popularity */}
                                <div className='bg-white shadow-md shadow-[black]/[0.2] px-5 py-2 rounded-full cursor-pointer '>
                                    <select
                                        value={dataOrder}
                                        onChange={(e) => {
                                            setDataOrder(e.target.value)
                                        }}

                                        className='outline-none px-2 cursor-pointer ' name="" id="">
                                        {
                                            options.map((option) => (
                                                <option
                                                    className=""
                                                    key={option.option} value={option.value}
                                                > {option.option}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                {/* by price */}
                                <div>
                                    <div className='relative bg-white shadow-md shadow-[black]/[0.2] font-semibold rounded-full px-5 py-2 '>

                                        {/* show price  */}
                                        <button
                                            onClick={() => {
                                                setShowRange(!showRange)
                                            }}

                                            className='flex cursor-pointer justify-center items-center gap-2'>

                                            <span>Price {priceRange[0]}-{priceRange[1]}</span>
                                            <span className='text-xl'>
                                                {
                                                    showRange === true ? <IoIosArrowUp /> : <IoIosArrowDown />
                                                }
                                            </span>
                                        </button>

                                        {/* range */}
                                        <div className={`absolute rounded-md z-10 shadow-2xl shadow-black bg-white px-5 py-2 top-16 right-5  ` + (showRange ? "block" : "hidden")}>
                                            <Slider
                                                range
                                                min={0}
                                                max={100000}
                                                defaultValue={priceRange}
                                                onChange={handlePriceRangeChange}
                                                className='w-[150px]'
                                            />
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* lower part for products */}
                        <div className=' flex justify-center items-start'>
                            <div
                                className='flex flex-wrap gap-10 justify-start items-start'
                            >
                                {
                                    data?.data?.map((product) => (
                                        <div
                                            key={product?._id}
                                        >
                                            <ProductTemplate data={product} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                </div>

                {/* navigation */}
                <div className='w-full justify-center items-center flex'>
                    <Navigation totalPages={data?.totalPages} />
                </div>
            </div>

        </div >
    )
}

export default Page;