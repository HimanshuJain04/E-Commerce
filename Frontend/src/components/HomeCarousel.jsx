import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { carousel } from "../constants/carousel";

import React from 'react'

function HomeCarousel() {
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={2000}
            showThumbs={false}
        >
            {
                carousel?.map((data) => (
                    <div className="w-full h-[80vh]" key={data.image}>
                        <img src={data.image} className="w-full h-full" />
                    </div>
                ))

            }
        </Carousel>
    )
}

export default HomeCarousel;