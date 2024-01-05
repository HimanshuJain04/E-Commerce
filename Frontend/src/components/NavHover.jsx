import React from 'react'

function NavHover({ gender, categories, images }) {


    return (
        <div className=' w-[60vw] rounded-xl bg-[black]/[0.05] '>
            {/* discount image */}
            <div className='w-full h-[200px]'>
                <img className='w-full h-full' src="https://th.bing.com/th/id/OIP.Za_X1Ycgyk1jY8KodGKV8AHaEQ?rs=1&pid=ImgDetMain" alt="Discount Image" />
            </div>

            {/* lower div */}
            <div className='flex p-5 gap-2 justify-between items-start'>

                {/* left div for images */}
                <div className='w-full flex border-[black]/[0.1] border-r-2 pr-4 flex-col gap-2 justify-start items-start'>
                    <p className='uppercase text-lg font-semibold'>Shop for <span>{gender}</span> :</p>
                    <div className='flex gap-5 justify-center items-start'>
                        <img className='w-[50%] h-[350px] ' src={images[0]} alt="" />
                        <img className='w-[50%] h-[350px]' src={images[1]} alt="" />
                    </div>
                </div>

                {/* right div for categories */}
                <div className='w-full  flex-flex-col gap-2 pl-2'>
                    <p className='uppercase text-lg font-semibold'>categories :</p>
                    <div className='grid grid-cols-2 gap-y-4 gap-x-5 p-5'>
                        {

                            categories?.map((category) => (
                                <button
                                    onClick={() => { console.log("Category : ", category); }}
                                    key={category._id}
                                    className=' py-3 px-5 border-2 border-[black]/[0.2]'
                                >
                                    <p className='text-lg font-semibold text-left'>{category?.name}</p>
                                </button>
                            ))
                        }

                    </div>

                </div>

            </div>


        </div>
    )
}

export default NavHover