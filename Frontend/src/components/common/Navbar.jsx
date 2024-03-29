import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navlink } from '../../constants/navbar';
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { AppContext } from "../../context/AppContext";
import NavHover from './NavHover';
import { ApiCalling } from '../../services/Api.js';
import ProfileDropdown from './ProfileDropdown';
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { ImSearch } from "react-icons/im";



const FeatureList = ({ css }) => {
    const { categories } = useContext(AppContext);

    return (
        <div className={css} >
            {
                Navlink?.map((data, index) => (
                    <div className='' key={data + index}>
                        {
                            data?.path ? (
                                <Link className='px-1' to={data.path}>{data.name}</Link>
                            ) : (
                                <div className='cursor-pointer px-1 border-b-[3px] border-transparent hover:border-blue-500 flex justify-center items-center xl:h-[80px] text-center group relative'>
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

        </div >
    )
}


const Navbar = () => {

    const { isLoggedIn } = useContext(AppContext);
    const [searchValue, setSearchValue] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [data, setData] = useState([]);


    const navigate = useNavigate();

    const searchHandler = () => {
        if (searchValue.length > 0) {
            navigate(`/products/getProductsByNameAndDesc/${searchValue}`);
        }
    }

    // for recommendations
    const onChangeInput = async (e) => {

        setSearchValue(e.target.value);

        if (e.target.value.length > 0) {

            const res1 = await ApiCalling("GET", `product/getProductsBySearch/${e.target.value}`);

            if (res1?.success) {

                setData(res1?.data);
            } else {
                setData([]);
            }

        } else {
            setData([]);
        }

    }

    // Search Recommandation dropdown
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    // use effect for recommandation dropdowns
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };



    return (
        <div className='w-full h-[80px] z-[100] bg-[white] justify-center fixed top-0 border-[2px] border-[black]/[0.1] flex items-center '>

            {/* for mobile view featurelist */}
            <div className={`absolute transition-all duration-500 ease-in-out top-16 z-10 left-0 h-[100vh] w-[100vw] bg-[black]/[0.5] ${showMenu ? " block" : " hidden"}`}>

                <div className=' h-full rounded-md md:w-[400px] shadow-2xl w-[300px]  bg-[white]'>
                    <div className='px-5 py-5'>
                        <FeatureList css={"flex flex-col text-xl justify-center items-center font-bold gap-5"} />
                    </div>
                </div>

            </div>

            {/* for mobile view searchbar */}
            <div className={` absolute md:hidden z-10 w-full h-full bg-white flex justify-center items-center  ${showSearchbar ? "block" : "hidden"}`}>
                <div className='relative w-full px-5 sm:px-10'>
                    <div
                        onClick={toggleDropdown}
                        className='flex bg-[black]/[0.05]  w-full rounded-md px-2 text-[black] justify-center items-center relative'
                    >
                        <input
                            type='text'
                            placeholder='What are you looking for?'
                            className='bg-transparent w-full font-semibold outline-none px-3 placeholder:text-[black]/[0.7] py-2'
                            onChange={onChangeInput}
                            value={searchValue}
                            onKeyDown={({ key }) => {
                                if (key === 'Enter') {
                                    searchHandler();
                                    setShowSearchbar(false)
                                }
                            }}
                        />
                        <button onClick={() => {
                            searchHandler();
                            setShowSearchbar(false);
                        }} className='cursor-pointer'>
                            <IoSearchOutline fontSize={20} />
                        </button>
                    </div>

                    {/* recommendation functionality */}
                    <div className={`absolute bg-white z-10 w-full ${isOpen ? '' : 'hidden'}`}>
                        {isOpen && (
                            <div className='dropdown-content'>
                                <div>
                                    <div className='flex flex-col w-full justify-start items-center p-2 font-semibold'>
                                        {data?.map((product) => (
                                            <div
                                                key={product?._id}
                                                className='cursor-pointer w-full flex justify-start my-1 items-center text-black px-5 py-1 hover:bg-red-500 hover:text-white rounded-md transition-all duration-200 ease-in-out'
                                            >
                                                <Link to={`/productDetail/productId/${product?._id}`}>
                                                    <p>{product?.name}</p>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>

            <div className='flex justify-between w-11/12 h-full items-center '>

                {/* name/icon */}
                <div className=' flex justify-center gap-5 items-center '>

                    <div className='text-xl transition-all duration-500 ease-in-out xl:hidden block' >
                        <button onClick={() => {
                            setShowMenu(!showMenu)
                        }} >
                            {
                                showMenu ? (<RxCross1 />) : (<IoMdMenu />
                                )
                            }
                        </button>
                    </div>

                    <Link to="/" className='select-none font-bold cursor-pointer'>
                        <p className='sm:hidden block'>OBS</p>
                        <p className='sm:block hidden'>OneBasketStop</p>
                    </Link>
                </div>

                {/* feature list */}
                <FeatureList css={"justify-center font-semibold xl:flex hidden items-center gap-5"} />

                {/* search-bar and login/cart */}
                <div className='flex gap-5 md:gap-10 justify-center items-center'>


                    {/* search bar */}
                    <div className='relative  md:block hidden'>
                        <div
                            ref={dropdownRef}
                            onClick={toggleDropdown}
                            className='flex bg-[black]/[0.05] rounded-md px-2 text-[black] justify-center items-center relative'
                        >
                            <input
                                type='text'
                                placeholder='What are you looking for?'
                                className='bg-transparent w-[300px] font-semibold outline-none px-3 placeholder:text-[black]/[0.7] py-2'
                                onChange={onChangeInput}
                                value={searchValue}
                                onKeyDown={({ key }) => {
                                    if (key === 'Enter') {
                                        searchHandler();
                                    }
                                }}
                            />
                            <button onClick={searchHandler} className='cursor-pointer'>
                                <IoSearchOutline fontSize={20} />
                            </button>
                        </div>

                        {/* recommendation functionality */}
                        <div className={`absolute bg-white z-10 w-full ${isOpen ? '' : 'hidden'}`}>
                            {isOpen && (
                                <div className='dropdown-content'>
                                    <div>
                                        <div className='flex flex-col w-full justify-start items-center p-2 font-semibold'>
                                            {data?.map((product) => (
                                                <div
                                                    key={product?._id}
                                                    className='cursor-pointer w-full flex justify-start my-1 items-center text-black px-5 py-1 hover:bg-red-500 hover:text-white rounded-md transition-all duration-200 ease-in-out'
                                                >
                                                    <Link to={`/productDetail/productId/${product?._id}`}>
                                                        <p>{product?.name}</p>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className='text-2xl md:hidden  block'>
                        <button onClick={() => { setShowSearchbar(!showSearchbar) }}><ImSearch /></button>
                    </div>

                    {/* login */}
                    <div className={`font-semibold cursor-pointer bg-blue-500 text-white rounded-md py-2 px-5 border-[3px] border-transparent hover:border-blue-500 hover:bg-white hover:text-blue-500 transition-all duration-200 ease-in-out ` + (isLoggedIn ? "hidden" : "block")}>
                        <Link to={"/auth/login"}>Login</Link>
                    </div>

                    {/* cart and wishlist */}
                    <div className={`flex font-semibold  justify-center items-center gap-5 ` + (!isLoggedIn ? "hidden" : "block")}>

                        <Link to={"/wishlist"} className='relative'>
                            <div className='absolute -top-[16px]'>
                                {
                                    isLoggedIn?.wishlists?.length > 0 ? (
                                        <div className='flex justify-center items-center  rounded-full h-[25px] w-[25px] p-3 bg-blue-500 text-white'>
                                            <span>{isLoggedIn?.wishlists?.length}</span>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                }
                            </div>

                            <div>
                                <span><FaRegHeart fontSize={25} /></span>
                            </div>

                        </Link>

                        <Link to={"/cart"} className='relative'>
                            <div className='absolute -top-[11px] left-1'>
                                {
                                    isLoggedIn?.carts?.length > 0 ? (
                                        <div className='flex justify-center items-center  rounded-full h-[25px] animate-bounce w-[25px] p-3 bg-red-500 text-white'>
                                            <span>{isLoggedIn?.carts?.length}</span>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                }
                            </div>

                            <div>
                                <span><IoCartOutline fontSize={30} /></span>
                            </div>

                        </Link>


                        {/* profile dropdown */}
                        <ProfileDropdown />
                    </div>

                </div>

            </div >

        </div >
    )
}

export default Navbar




