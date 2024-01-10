import React from 'react';

function SimilarProducts() {
    const datas = [
        {
            id: 494897,
            image: "kjcsv",
            name: "fhvjh",
            price: 340
        },
        {
            id: 494897,
            image: "kjcsv",
            name: "fhvjh",
            price: 340
        },
        {
            id: 494897,
            image: "kjcsv",
            name: "fhvjh",
            price: 340
        },
        {
            id: 494897,
            image: "kjcsv",
            name: "fhvjh",
            price: 340
        },
        {
            id: 494897,
            image: "kjcsv",
            name: "fhvjh",
            price: 340
        },
        {
            id: 494897,
            image: "kjcsv",
            name: "fhvjh",
            price: 340
        },
        {
            id: 494897,
            image: "kjcsv",
            name: "fhvjh",
            price: 340
        },
        {
            id: 494897,
            image: "kjcsv",
            name: "fhvjh",
            price: 340
        },
        {
            id: 494897,
            image: "kjcsv",
            name: "fhvjh",
            price: 340
        },
        {
            id: 494897,
            image: "kjcsv",
            name: "fhvjh",
            price: 340
        },
    ];


    function wishlistHandler() {
        console.log("wishlistHandler");
    }


    return (
        <div className='w-full flex justify-center items-start '>

            <div className='w-11/12 flex gap-5 flex-col justify-center items-center'>

                {/* heading */}
                <div className='w-full flex justify-start items-center'>
                    <p className='uppercase font-semibold btext-[black]/[0.6] ' >You Might Also Like</p>
                </div>

                {/* data */}
                <div className='w-full'>
                    <div className='flex overflow-y-hidden overflow-auto scrollbar-hide w-full items-start justify-start gap-7'>
                        {
                            datas.map((product) => (
                                <div
                                    key={product.id}
                                    className=' min-w-[300px] max-w-[300px] p-2 relative h-[400px] flex flex-col gap-2 items-center justify-start '
                                >

                                    {/* wishlist-icon */}
                                    <div className='absolute right-5 top-5'>
                                        <button onClick={wishlistHandler}>()</button>
                                    </div>

                                    {/* for image */}
                                    <div className='w-full h-[85%] bg-white flex justify-center items-center'>

                                        <img
                                            className='max-w-full max-h-full bg-contain'
                                            src="../../../public/try.png"
                                            // src={product?.image}
                                            alt={`${product.name}-Image`}
                                        />

                                    </div>

                                    {/* for data about product */}
                                    <div className="flex flex-col w-full gap-2 font-semibold justify-start items-center">
                                        <p className='text-[black]/[0.6]'>{product?.name}</p>
                                        <p className='text-red-800'>{product?.price}</p>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SimilarProducts