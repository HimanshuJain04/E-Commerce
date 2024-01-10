import React from 'react'

function NewArrival() {

    const image = "data:image/jpeg;base64,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"
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

                    <img className='w-full h-full' src={image} alt="image" />

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

                        <img className='w-full h-full' src={image} alt="image" />
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

                            <img className='h-full w-full' src={image} alt="image" />
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

                            <img className='w-full h-full' src={image} alt="image" />
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default NewArrival;