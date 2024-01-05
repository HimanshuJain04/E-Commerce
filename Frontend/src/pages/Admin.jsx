import React, { useState } from 'react';
import Product from "../components/admin/Product"
import Category from "../components/admin/Category"
import Tag from "../components/admin/Tag"

function Admin() {

    const sidebar = [
        {
            name: "Products",

        },
        {
            name: "Categories"
        },
        {
            name: "Tags"
        }
    ]

    const [option, setOption] = useState(sidebar[0].name);

    return (

        <div className='justify-center items-start flex w-full'>

            <div className='w-11/12 h-full flex  '>

                {/* sidebar */}
                <div className='w-[250px] h-[calc(100vh-100px)] text-white font-semibold p-5 text-lg bg-blue-600 flex flex-col gap-2 justify-start items-start'>
                    {
                        sidebar?.map((data) => (
                            <button
                                key={data}
                                onClick={() => { setOption(data?.name) }}
                                className={`py-1 px-5 w-full rounded-full cursor-pointer hover:bg-white hover:text-blue-500 ` + (option === data.name ? "bg-white text-blue-500" : "")}
                            >
                                <p>{data.name}</p>
                            </button>
                        ))
                    }


                </div>

                {/* Main Components */}
                <div className=' w-full'>
                    {
                        option === "Products" ? (<Product />) : (
                            option === "Categories" ? (<Category />) : (<Tag />)
                        )

                    }

                </div>
            </div>
        </div>
    )
}

export default Admin