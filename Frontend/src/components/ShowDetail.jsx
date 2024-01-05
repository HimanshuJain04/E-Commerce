import React, { useState } from 'react';
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";

function ShowDetail({ heading, description }) {

    const [showDetail, setShowDetail] = useState(false);

    return (

        <div className=' w-full flex gap-4 flex-col border-b-2 border-[black]/[0.09] pb-4'>

            {/* heading and icon */}
            <div className='justify-between flex'>

                <p className='font-semibold text-lg text-[black]/[0.5] '>{heading}</p>
                <button onClick={() => { setShowDetail(!showDetail) }}>
                    {
                        showDetail ? (
                            <LuMinus fontSize={20} />
                        ) : (
                            <GoPlus fontSize={20} />
                        )
                    }
                </button>
            </div>

            <div className={`text-[black]/[0.5] pl-5  font-semibold ` + (showDetail ? " block" : " hidden")}>
                <p>{description}</p>
            </div>

        </div>
    )
}

export default ShowDetail