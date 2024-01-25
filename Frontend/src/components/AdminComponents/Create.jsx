import React, { useState } from 'react';
import Product from "./creation/Product";
import Category from "./creation/Category";
import Tag from "./creation/Tag";

function Create() {

    const options = [
        {
            title: "Products"
        },
        {
            title: "Categories"
        },
        {
            title: "Tags"
        },
    ];

    const [option, setOption] = useState(options[0].title);

    return (
        <div>
            <div className='bg-[#f4f7fe] w-full  flex flex-col justify-start items-center'>

                {/* bar for selection category/option */}
                <div className='flex flex-row w-full rounded-lg shadow-lg mt-5 justify-around items-center bg-white'>
                    {
                        options.map((singleOption) => (
                            <button
                                onClick={() => { setOption(singleOption.title) }}
                                key={singleOption.title}
                                className={` py-5 w-full justify-center items-center rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out ${option === singleOption.title ? " bg-blue-700 text-white " : ""}`}
                            >
                                <div>
                                    <span>{singleOption.title}</span>
                                </div>
                            </button>
                        ))
                    }
                </div>

                <div className='py-10 mb-10'>
                    {
                        option === "Products" ? (
                            <Product />
                        ) : option === "Categories" ? (
                            <Category />
                        ) : (
                            <Tag />
                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default Create
