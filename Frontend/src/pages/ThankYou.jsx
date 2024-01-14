import React from 'react';
import { useNavigate } from "react-router-dom";

function ThankYou() {
    const navigate = useNavigate();
    return (
        <div>
            <div className='w-11/12 mx-auto flex flex-col gap-5 justify-center items-center mt-10'>

                <video src="/shopping.mp4"
                    autoPlay
                    loop={true}
                    muted={true}
                    className='w-full h-[75vh] border-none'
                ></video>
                <button onClick={() => {
                    navigate("/")
                }}
                    className='text-white rounded-md hover:bg-green-700 transition-all duration-300 ease-in-out font-semibold px-10 py-3 bg-green-500'
                >Continue Shopping</button>

            </div>
        </div>
    )
}

export default ThankYou