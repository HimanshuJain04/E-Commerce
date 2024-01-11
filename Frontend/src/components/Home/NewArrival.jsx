import React from 'react'

function NewArrival() {

    const images = [
        "https://th.bing.com/th/id/OIP.711tI7gcDVfwJYjWWZqtuQHaE8?w=237&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th?id=OIF.6cO%2f0bJOJpcTap8LS23zRQ&w=282&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th/id/OIP.ltU4QoJBuiOO_kug8ZQFjwHaET?w=258&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th/id/OIP.0v3NOakHiv4cna4vOOFxtgHaE3?w=239&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    ];


    return (
        <div className='flex-col flex gap-10'>

            <div className='w-full flex justify-center items-center'>
                <p className='uppercase text-2xl font-semibold'>New Arrival</p>
            </div>

            {/* images div */}
            <div className='flex gap-5  h-[80vh] overflow-hidden justify-between items-center'>

                {/* right div */}
                <div className='w-full h-full relative'>
                    <div className='absolute w-full h-full bg-gradient-to-t flex  flex-col items-start justify-end from-[black]/[0.9] to-[black]/[0.1]'>

                        <div className='text-white text-justify font-semibold w-[80%] flex flex-col gap-3 p-7'>

                            <p className='font-semibold text-xl'>PlayStation 5</p>
                            <p className='text-[white]/[0.8] text-sm'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. In natus, porro accusantium.
                            </p>

                            <div className='flex'>
                                <button className='hover:underline transition-all duration-300 ease-in-out cursor-pointer font-semibold'>Shop Now</button>
                            </div>
                        </div>

                    </div>

                    <img
                        className='w-full h-full'
                        src={images[0]}
                        alt="image" />

                </div>

                {/* left div */}
                <div className='w-full flex-col flex gap-5 h-full '>

                    {/* left upper */}
                    <div className='h-[50%] w-full relative'>
                        <div className='absolute w-full h-full bg-gradient-to-t flex  flex-col items-start justify-end from-[black]/[0.9] to-[black]/[0.1]'>

                            <div className='text-white text-justify font-semibold w-[80%] flex flex-col gap-3 p-7'>

                                <p className='font-semibold text-xl'>PlayStation 5</p>
                                <p className='text-[white]/[0.8] text-sm'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In natus, porro accusantium.
                                </p>

                                <div className='flex'>
                                    <button className='hover:underline transition-all duration-300 ease-in-out cursor-pointer font-semibold'>Shop Now</button>
                                </div>
                            </div>

                        </div>

                        <img className='w-full h-full'
                            src={images[1]}
                            alt="image" />
                    </div>

                    {/* left lower */}
                    <div className='h-full w-full flex justify-center items-center gap-5'>

                        {/* left lower right */}
                        <div className=' w-full h-full relative'>
                            <div className='absolute w-full h-full bg-gradient-to-t flex  flex-col items-start justify-end from-[black]/[0.9] to-[black]/[0.1]'>

                                <div className='text-white text-justify font-semibold w-[80%] flex flex-col gap-3 p-7'>

                                    <p className='font-semibold text-xl'>PlayStation 5</p>
                                    <p className='text-[white]/[0.8] text-sm'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In natus, porro accusantium.
                                    </p>

                                    <div className='flex'>
                                        <button className='hover:underline transition-all duration-300 ease-in-out cursor-pointer font-semibold'>Shop Now</button>
                                    </div>
                                </div>

                            </div>

                            <img className='h-full w-full' src={images[2]} alt="image" />
                        </div>

                        {/* left lower left */}
                        <div className=' w-full h-full relative'>
                            <div className='absolute w-full h-full bg-gradient-to-t flex  flex-col items-start justify-end from-[black]/[0.9] to-[black]/[0.1]'>

                                <div className='text-white text-justify font-semibold w-[80%] flex flex-col gap-3 p-7'>

                                    <p className='font-semibold text-xl'>PlayStation 5</p>
                                    <p className='text-[white]/[0.8] text-sm'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In natus, porro accusantium.
                                    </p>

                                    <div className='flex'>
                                        <button className='hover:underline transition-all duration-300 ease-in-out cursor-pointer font-semibold'>Shop Now</button>
                                    </div>
                                </div>

                            </div>

                            <img className='w-full h-full' src={images[3]} alt="image" />
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default NewArrival;