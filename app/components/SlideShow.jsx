'use client'
import { Carousel } from 'antd'
import Image from 'next/image'
import React from 'react'

const slides = [
    { src: '/images/nursa1.png', alt: 'Nursing students image 1' },
    { src: '/images/nursa2.png', alt: 'Nursing students image 2' },
    { src: '/images/nursa3.png', alt: 'Nursing students image 3' },
    { src: '/images/nursa4.png', alt: 'Nursing students image 4' },
]

const SlideShow = () => {
  return (
    <Carousel 
        autoplay 
        autoplaySpeed={4000}
        effect="fade"
        dots={true}
        className='w-full h-full'
    >
        {slides.map((slide, index) => (
            <div key={index} className='relative w-full h-[60vh] md:h-[70vh]'>
                <Image 
                    src={slide.src} 
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    className='object-cover'
                />
                {/* Dark overlay for better text visibility */}
                <div className='absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-black/30'></div>
            </div>
        ))}
    </Carousel>
  )
}

export default SlideShow
