'use client'
import React from 'react'
import SlideShow from './SlideShow'

const Splash = () => {
  return (
    <div className='relative w-full mt-[70px] md:mt-[80px] h-[60vh] md:h-[70vh]'>
        {/* Carousel Background */}
        <div className='absolute inset-0 w-full h-[70vh]'>
            <SlideShow />
        </div>
        
        {/* Overlay Content */}
        <div className='absolute inset-0 flex flex-col items-center justify-center px-4 z-10 pointer-events-none'>
            <div className='max-w-4xl text-center'>
                <h1 className='font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight drop-shadow-lg'>
                    Welcome to the Nursing and Midwifery Students Association
                </h1>
                <p className='mt-4 text-white/90 text-sm md:text-base lg:text-lg max-w-2xl mx-auto drop-shadow'>
                    Empowering future healthcare professionals at Valley View University
                </p>
            </div>
        </div>
    </div>
  )
}

export default Splash
