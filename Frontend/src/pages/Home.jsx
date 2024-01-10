import React, { useContext } from 'react';
import HomeCarousel from "../components/Home/HomeCarousel";
import Trending from '../components/Home/Trending';
import ActualCategory from '../components/Home/ActualCategory';
import Brands from '../components/Home/Brands';
import NewArrival from '../components/Home/NewArrival';
import TopSelling from '../components/Home/TopSelling';
import { AppContext } from '../context/AppContext';
import { cards } from "../constants/home";

function Home() {



    return (
        <div className='w-full flex justify-center'>
            <div className='w-11/12 flex flex-col gap-10'>

                {/* Carousel */}
                <div>
                    <HomeCarousel></HomeCarousel>
                </div>


                {/* Trending Section */}
                <div className='mt-20'>
                    <Trending />
                </div>

                {/* Top Selling Products Section */}
                <div className='mt-20'>
                    <TopSelling />
                </div>

                {/* Actual Category Section */}
                <div className='mt-20'>
                    <ActualCategory />
                </div>

                {/* Brands Section */}
                <div className='mt-20'>
                    <Brands />
                </div>

                {/* New Arrival Section */}
                <div className='mt-20'>
                    <NewArrival />
                </div>

                {/* Services cards */}
                <div className=' mt-20 px-10'>

                    <div className='w-full  flex justify-between items-center '>

                        {

                            cards?.map((card) => (
                                <div
                                    key={card.desc}
                                    className='flex flex-col p-5 gap-8 justify-start items-center'
                                >
                                    {/* images section */}
                                    <div className=''>
                                        <div className='rounded-full p-3 w-[100px] h-[100px] bg-[black]/[0.25]'>
                                            <img src={card.cImage} className='p-2 rounded-full bg-white' alt="Card-Image" />
                                        </div>
                                    </div>

                                    {/* text */}
                                    <div className='flex flex-col gap-2 justify-center items-center'>
                                        <p className='font-bold text-xl uppercase'>{card?.heading}</p>
                                        <p className='font-semibold'>{card?.desc}</p>
                                    </div>

                                </div>
                            ))
                        }
                    </div>


                </div>

            </div >

        </div >
    )
}

export default Home