import React from 'react';
import UserDasboard from "../../../UserDashboard";
import { AiOutlineRollback } from "react-icons/ai";


function VisitWebsite({ setOption }) {
    return (
        <div className='relative'>
            <UserDasboard />
            <button
                onClick={() => setOption("Dashboard")}
                className='flex justify-center bottom-2 left-[50%] transition-all duration-200 ease-in-out hover:text-yellow-200 sticky z-[60] translate-x-[-50%] text-white items-center gap-2 text-xl bg-black rounded-lg px-5 py-2'>
                <AiOutlineRollback />
                <span className='text-sm' >Back to dashboard</span>
            </button>
        </div>
    )
}

export default VisitWebsite
