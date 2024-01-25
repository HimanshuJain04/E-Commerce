import React from 'react';
import Sidebar from "./components/AdminComponents/Sidebar";
import NavbarAdmin from "./components/AdminComponents/NavbarAdmin";
import Create from './components/AdminComponents/Create';

function AdminDashboard() {
    return (
        <div className=''>
            <div className='flex w-full relative justify-between items-start'>

                {/* SideBar */}
                <div className='relative w-[300px]' >
                    <div className='fixed top-0 left-0 w-[300px] bg-white h-[100vh]'>
                        <Sidebar />
                    </div>
                </div>

                {/* Children */}
                <div className='w-full bg-[#F4F7FE] ml-10 flex justify-center items-start'>
                    <div className='w-11/12 min-h-[100vh]'>
                        <Create />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard
