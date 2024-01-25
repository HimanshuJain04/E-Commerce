import React from 'react';
import Sidebar from "./components/AdminComponents/Sidebar";

function AdminDashboard() {
    return (
        <div>
            <div className='flex w-full justify-between items-start'>
                {/* SideBar */}
                <div
                    className='w-[300px] bg-white h-[100vh]'
                >
                    <Sidebar />
                </div>

                {/* Children */}
                <div className='min-h-[100vh] bg-gray-300 w-full'>

                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
