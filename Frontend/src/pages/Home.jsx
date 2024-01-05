import React from 'react';
import HomeCarousel from "../components/HomeCarousel";


function Home() {

    
    return (
        <div className='w-full flex justify-center'>
            <div className='w-11/12'>

                {/* Carousel */}
                <HomeCarousel></HomeCarousel>

                {/* new school fashion container */}
                <div className='relative  flex justify-end w-full pr-32 '>

                    {/* left Part */}
                    <div className='absolute left-[15%] -top-[20%] w-[400px] h-[550px]'>
                        <img className='bg-cover h-full w-full' src="https://th.bing.com/th?id=OIP.48C1fjm5A4taM6KNeVPyTQHaKI&w=213&h=292&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />

                    </div>

                    {/* right part */}
                    <div className='relative w-[500px] pt-40 '>

                        {/* heading */}
                        <div className='p-10 shadow-md bg-white -left-[40%] top-[10%] absolute shadow-[black] text-3xl font-sans'>
                            <p className='uppercase'>The New school of fashion!</p>
                        </div>

                        {/* paragraph */}
                        <div className='my-10'>
                            <p className='text-sm font-semibold text-[black]/[0.8]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cum, iusto consectetur
                                provident quos ducimus quo quaerat minima. Saepe nulla sit incidunt odio, corporis culpa
                                facere atque vero, dignissimos fugiat eius hic animi iste ratione blanditiis cupiditate.
                                Molestiae, quia. Nam impedit, quam porro itaque iure omnis alias, quod facilis dolore mollitia
                                at totam accusamus nostrum fugit, ut repudiandae quia debitis autem aut? Voluptas dignissimos
                                dolor nemo amet quaerat animi est alias voluptatum neque. Aliquam dignissimos omnis magnam eligendi
                                nemo maxime mollitia quos officiis quia a aspernatur quas neque quae unde assumenda sit modi, ipsum
                                sed nam dolorem. Iure, consequatur praesentium.</p>
                        </div>

                        {/* button */}
                        <div >
                            <button className='px-6 font-semibold py-2 shadow-md rounded-sm cursor-pointer shadow-[black]'>Read More</button>
                        </div>
                    </div>

                </div>


            </div >

        </div >
    )
}

export default Home