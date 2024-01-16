import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import ProductTemplate from "../components/common/ProductTemplate";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiCalling } from '../services/Api';

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
            value: "priceLtoH"
        },
        {
            option: "Price low to high",
            value: "priceHtoL"
        },
        {
            option: "Rating high to low",
            value: "ratingHtoL"
        },
        {
            option: "Rating low to high",
            value: "ratingLtoH"
        },


    ];


    const { pathname } = useLocation();
    const curr = pathname.split("/");
    const query = curr[2];
    const value = curr[3];
    let id = curr[4];
    const [data, setData] = useState([]);
    const navigate = useNavigate();


    async function getData() {

        let prefixUrl = "";

        if (query === "tag") {
            prefixUrl = "getProductsByTag";

        } else if (query === "category") {
            prefixUrl = "getProductsByCategory";

        } else if (query === "search") {
            prefixUrl = "getProductsBySearch";
            id = value;

        }


        const res1 = await ApiCalling("GET", `product/${prefixUrl}/${id}`);

        if (res1?.status) {
            setData(res1?.data);
        } else {
            setData([]);
            navigate("/error");
        }
    }


    useEffect(() => {
        getData();
    }, [pathname]);

    

    const [dataOrder, setDataOrder] = useState(options[0]?.value);
    const [range, setRange] = useState(
        {
            minRange: 0,
            maxRange: 100000000,
            showRange: false
        }
    );

    return (
        <div className='flex justify-center items-start'>
            <div className='w-11/12  relative flex gap-10 justify-between items-start'>

                {/* left part for category */}
                <div className='w-[350px] h-[600px] bg-blue-100 '>
                    category

                </div>

                {/* right part for data */}
                <div className='w-full flex flex-col gap-10 justify-start items-center  h-full '>

                    {/* upper part for filters */}
                    <div className='justify-between w-full items-center flex'>

                        {/* total results */}
                        <div>
                            <p className='text-2xl font-semibold shadow-md rounded-md px-5 py-2 shadow-[black]/[0.3]  '
                            ><span>{data?.length}</span> results</p>
                        </div>

                        {/* filters */}
                        <div className='flex justify-center font-semibold items-center gap-10'>
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
                                            setRange(
                                                {
                                                    ...range,
                                                    showRange: !range.showRange,
                                                }
                                            )
                                        }}

                                        className='flex cursor-pointer justify-center items-center gap-2'>

                                        <span>Price {range.minRange}-{range.maxRange}</span>
                                        <span className='text-xl'>
                                            {
                                                range.showRange === true ? <IoIosArrowUp /> : <IoIosArrowDown />
                                            }
                                        </span>
                                    </button>

                                    {/* range */}
                                    <div className={`absolute rounded-md z-10 shadow-2xl shadow-black bg-white px-5 py-2 top-16 right-5  ` + (range.showRange ? "block" : "hidden")}>
                                        <input type="range" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* lower part for products */}
                    <div className='w-full'>
                        <div
                            className='w-full flex flex-wrap gap-10 justify-start items-start'
                        >
                            {
                                data?.map((product) => (
                                    <div
                                        key={product?._id}
                                        className=' '
                                    >
                                        <ProductTemplate data={product} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>

            </div>

        </div >
    )
}

export default Page;