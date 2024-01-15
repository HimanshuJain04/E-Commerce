import React from 'react'

function Brands() {
    const images = [
        "https://logos-download.com/wp-content/uploads/2016/02/Gucci_Logo.png",
        "https://th.bing.com/th/id/OIP.mCqQm0p-jYI4HIVbmutDVgHaEK?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th/id/OIP.mmpqb4NeXV4lOq66Dwz7mgHaFj?w=190&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th/id/OIP.k9UV-vVxFlo-aRiqc0XrLQHaFj?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.Zy1wlA0apIFUKf1MTjSFigHaEK?w=375&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th/id/OIP.aw4ynosen6elgMpjUjaUBwHaEK?w=287&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th/id/OIP.qvz1aGluyBdxi8h8hJr5QQHaEw?rs=1&pid=ImgDetMain"
    ];


    return (
        <div className='flex justify-between items-center flex-col gap-12'>
            <div>
                <p className='uppercase text-2xl font-semibold '>Only trusted Brands</p>
            </div>
            <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] inline-flex flex-nowrap">

                <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none">
                    {
                        images.map((image, index) => (
                            <li
                                key={image}
                            >
                                <img
                                    src={images[index]}
                                    className=' h-[100px] mix-blend-screen bg-cover' alt="images"
                                />
                            </li>
                        ))
                    }
                </ul>

                <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none" aria-hidden="true">
                    {
                        images.map((image, index) => (
                            <li
                                key={image}
                            >
                                <img
                                    src={images[index]}
                                    className=' h-[100px] bg-cover'
                                    alt="Image" />
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    )
}

export default Brands