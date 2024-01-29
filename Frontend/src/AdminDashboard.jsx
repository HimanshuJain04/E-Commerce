import React, { useState } from 'react';
import Sidebar from "./components/AdminComponents/Sidebar";
import { FaUserAlt, FaBorderAll } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { PiPackageLight } from "react-icons/pi";
import { MdDashboard, MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GrAnalytics } from "react-icons/gr";
import { HiOutlineViewGridAdd } from "react-icons/hi";

// pages import
import AllProducts from "./components/AdminComponents/all-products/AllProducts"
import Create from './components/AdminComponents/creation/Create';
import Analysis from "./components/AdminComponents/analysis/Analysis"
import Dashboard from "./components/AdminComponents/dashboard/Dashboard"
import Orders from "./components/AdminComponents/orders/Orders"
import Profile from "./pages/Profile"
import Setting from "./components/AdminComponents/setting/Setting"
import SignIn from "./components/AdminComponents/sign-in/SignIn"
import Logout from "./components/AdminComponents/logout/Logout"
import VisitWebsite from "./components/AdminComponents/visit-website/VisitWebsite"



const options1 = [
    {
        title: "Dashboard",
        icon: <MdDashboard />
    },
    {
        title: "Orders",
        icon: <PiPackageLight />
    },
    {
        title: "Analysis",
        icon: <GrAnalytics />
    },
    {
        title: "Create",
        icon: <HiOutlineViewGridAdd />
    },
    {
        title: "All Products",
        icon: <FaBorderAll />
    },
    {
        title: "Profile",
        icon: <FaUserAlt />
    },
    {
        title: "Sign In",
        icon: <MdLock />
    },
    {
        title: "Setting",
        icon: <LuSettings />
    },
    {
        title: "Visit Website",
        icon: <MdOutlinePhotoSizeSelectActual />
    },
    {
        title: "Logout",
        icon: <RiLogoutBoxRLine />
    }
];


function AdminDashboard() {

    const [option, setOption] = useState(options1[0].title);


    let content;

    switch (option) {
        case 'Dashboard':
            content = <Dashboard setOption={setOption} />;
            break;
        case 'Orders':
            content = <Orders />;
            break;
        case 'Analysis':
            content = <Analysis />;
            break;
        case 'Create':
            content = <Create />;
            break;
        case 'All Products':
            content = <AllProducts />;
            break;
        case 'Profile':
            content = <Profile />;
            break;
        case 'Sign In':
            content = <SignIn />;
            break;
        case 'Setting':
            content = <Setting />;
            break;
        case 'Logout':
            content = <Logout />;
            break;
        case 'Visit Website':
            content = <VisitWebsite setOption={setOption} />;
            break;
        default:
            content = <Dashboard />;
            break;
    }

    return (
        <div className=''>
            <div className='flex w-full relative justify-between items-start'>

                {/* SideBar */}
                {
                    option !== "Visit Website" && (

                        <div className='relative w-[300px]' >
                            <div className='fixed top-0 left-0 w-[300px] bg-white h-[100vh]'>
                                <Sidebar option={option} setOption={setOption} options1={options1} />
                            </div>
                        </div>
                    )
                }

                {/* Children */}
                <div className={` ${option === "Visit Website" ? "bg-white" : "bg-[#F4F7FE]"} w-full  flex justify-center items-start`}>
                    <div className={` ${option === "Visit Website" ? " w-full" : " w-11/12 ml-16"}  min-h-[100vh] `} >
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
