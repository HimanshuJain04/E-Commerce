import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { carousel } from "../../constants/carousel";

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
                    <div className="max-w-full max-h-[100vh] overflow-hidden" key={data.image}>
                        <img src={data.image} className="object-cover h-full w-full" />
                    </div>
                ))

            }
        </Carousel>
    )
}

export default HomeCarousel;