import React, { useContext } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AppContext } from '../context/AppContext';


function Navigation({ totalPages }) {

    const { currentPage, setCurrentPage } = useContext(AppContext);

    return (
        <div>
            <div className='flex gap-5 justify-center items-center'>

                {/* previos button */}
                <button
                    onClick={() => {
                        if (currentPage > 1)
                            setCurrentPage(currentPage - 1)
                    }}
                    className={`text-xl cursor-pointer ` + (currentPage === 1 ? "hidden" : "block")}>
                    <span>
                        <MdOutlineArrowBackIosNew />
                    </span>
                </button>

                <button
                    onClick={() => {
                        setCurrentPage(currentPage - 1)
                    }}
                    className={`flex justify-center items-center border-[black]/[0.2] border-2 text-[black]/[0.7] font-semibold text-xl rounded-md h-[50px] w-[50px] cursor-pointer ` + (currentPage === 1 ? " hidden" : "  block")}
                >
                    <span>{currentPage - 1}</span>
                </button>

                <div
                    className='bg-[black] flex justify-center items-center border-black border-2 text-white font-semibold text-xl rounded-md h-[50px] w-[50px] cursor-pointer'
                >
                    <span>{currentPage}</span>
                </div>

                <button
                    onClick={() => {
                        setCurrentPage(currentPage + 1)
                    }}
                    className={` flex justify-center items-center border-[black]/[0.2] border-2 text-[black]/[0.7] font-semibold text-xl rounded-md h-[50px] w-[50px] cursor-pointer ` + (currentPage < totalPages ? " block" : " hidden")}
                >
                    <span>{currentPage + 1}</span>
                </button>

                <button
                    onClick={() => {
                        setCurrentPage(currentPage + 2)
                    }}
                    className={` flex justify-center items-center border-[black]/[0.2] border-2 text-[black]/[0.7] font-semibold text-xl rounded-md h-[50px] w-[50px] cursor-pointer ` + (currentPage < totalPages - 1 ? " block" : " hidden")}
                >
                    <span>{currentPage + 2}</span>
                </button>

                <div
                    className={` flex justify-center items-center border-[black]/[0.2] border-2 text-[black]/[0.7] font-semibold text-xl rounded-md h-[50px] w-[50px] cursor-pointer ` + (currentPage < totalPages - 2 ? " block" : " hidden")}
                >
                    <span><BsThreeDots /></span>
                </div>


                {/* next button */}
                <button
                    onClick={() => {
                        if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1)
                        }
                    }}
                    className={`text-xl cursor-pointer ` + (currentPage < totalPages ? " block" : " hidden")}>
                    <span>
                        <MdOutlineArrowForwardIos />
                    </span>
                </button>

            </div>
        </div >
    )
}

export default Navigation;