import { useContext } from 'react';

import { AppContext } from "../../context/AppContext";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";



function Sidebar({ option, setOption, options1 }) {

    const { isLoggedIn } = useContext(AppContext);

    return (
        <div className='w-full h-full flex flex-col py-10 justify-between items-start'>

            <div className='w-full gap-10 flex  flex-col'>

                <div className='border-b-2 flex items-center justify-center border-[black]/[0.3] pb-3 mx-4'>
                    <p className='text-center text-2xl font-bold text-blue-800'>OneBasketStop</p>
                    <span className='text-4xl'><TiShoppingCart /></span>
                </div>

                {/* Profile Section */}
                <div className='flex flex-row text-blue-950 border-b-2 pb-5 border-[black]/[0.2] mx-4 justify-around items-center'>

                    <div className='h-[60px] flex justify-center items-center shadow-lg rounded-md overflow-hidden w-[60px]'>
                        <img
                            src={isLoggedIn?.profileImg}
                            className='rounded-md object-cover'
                        />
                    </div>

                    <div className='flex justify-start items-start flex-col'>
                        <p className='font-bold text-xl max-w-[100px]'>{isLoggedIn?.name}</p>
                        <div className='font-semibold flex justify-center items-center gap-2'>
                            <span>Verified</span>
                            <span><RiVerifiedBadgeFill /></span></div>
                    </div>
                </div>

                {/* options */}
                <div>
                    <div className='flex flex-col gap-1 w-full'>
                        {
                            options1.map((options) => (
                                <button
                                    onClick={() => {
                                        setOption(options.title)
                                    }}
                                    key={options.title + options.icon}
                                    className={`flex justify-between hover:shadow-lg cursor-pointer items-center w-full rounded-xl  ${options.title === option ? "shadow-lg " : ""}`}
                                >
                                    <div
                                        className='w-full flex-row pl-10 h-full  py-2 flex justify-start gap-10 items-center'>
                                        <span className={`text-2xl transition-all duration-300 ease-in-out  ${options.title === option ? "text-blue-700" : "text-[black]/[0.3] "} `}>{options.icon}</span>
                                        <span className={`text-xl transition-all duration-300 ease-in-out  ${options.title === option ? "font-bold text-blue-900 " : " text-[black]/[0.3] font-semibold "} `}>{options.title}</span>
                                    </div>
                                    <div className={`w-[3px] h-[35px] transition-all duration-300 ease-in-out  rounded-sm ${options.title === option ? "bg-blue-700" : ""} `}></div>
                                </button>
                            ))
                        }
                    </div>

                </div>

            </div>

        </div >
    )
}

export default Sidebar
