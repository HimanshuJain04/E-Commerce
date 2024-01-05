import React from 'react';
import { Link } from 'react-router-dom';
import { Navlink } from '../../constants/navbar';
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { AppContext } from "../../context/AppContext";
import { useContext } from 'react';
import NavHover from '../NavHover';



const Navbar = () => {

    const { isLoggedIn, categories } = useContext(AppContext);

    return (
        <div className='w-full h-[80px] z-[100] bg-white justify-center fixed top-0 border-[2px] border-[black]/[0.1] flex items-center '>

            <div className='flex justify-between w-10/12 h-full items-center '>
                {/* name/icon */}
                <Link to="/" className='font-bold cursor-pointer'>
                    <p>E-Commerce</p>
                </Link>

                {/* features  list*/}
                <div className='flex justify-center font-semibold items-center gap-5'>

                    {
                        Navlink?.map((data, index) => (
                            <div className='' key={index}>
                                {
                                    data?.path ? (
                                        <Link className='px-1' to={data.path}>{data.name}</Link>
                                    ) : (
                                        <div className='cursor-pointer px-1 border-b-[3px] border-transparent hover:border-blue-500 flex justify-center items-center h-[80px] text-center group relative'>
                                            <p>{data?.name}</p>
                                            <div className='absolute hidden rounded-xl group-hover:block z-10 top-[80px] bg-white -left-[300px]'>
                                                <NavHover gender={data.name} categories={
                                                    categories.filter((category) => category?.tag?.name === data?.name)
                                                }
                                                    images={data?.images}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )

                        )
                    }

                </div>

                {/* search-bar and login/cart */}
                <div className='flex gap-10 justify-center items-center'>

                    {/* search bar */}
                    <div className='flex bg-[black]/[0.05] rounded-md px-2 text-[black] justify-center items-center'>
                        <input type="text"
                            placeholder='What are you looking for?'
                            className=' bg-transparent w-[300px] font-semibold outline-none px-3 placeholder:text-[black]/[0.7] py-2 '
                        />
                        <IoSearchOutline fontSize={20} className='cursor-pointer' />
                    </div>

                    {/* login */}
                    <div className={`font-semibold cursor-pointer bg-blue-500 text-white rounded-md py-2 px-5 border-[3px] border-transparent hover:border-blue-500 hover:bg-white hover:text-blue-500 transition-all duration-200 ease-in-out ` + (isLoggedIn ? "hidden" : "block")}>
                        <Link to={"/auth/signup"}>Signup</Link>
                    </div>

                    {/* cart and bag */}
                    <div className={`flex font-semibold  justify-center items-center gap-5 ` + (!isLoggedIn ? "hidden" : "block")}>
                        <Link to={"/wishlist"}><FaRegHeart fontSize={25} /></Link>
                        <Link to={"/cart"}><IoCartOutline fontSize={30} /></Link >
                        <div className='rounded-full w-[40px] h-[40px] cursor-pointer bg-red-500 flex justify-center items-center '>
                            <p>H</p>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar