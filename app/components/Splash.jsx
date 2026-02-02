import Image from 'next/image'
import React from 'react'
import SlideShow from './SlideShow'

const Splash = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
        <div className='carosel flex flex-col items-center justify-center w-full bg-green-500 mt-[70px] md:mt-[80px] h-[60vh] md:h-[70vh] px-4'>
            <div className='max-w-4xl'>
                <h1 className='font-black text-2xl sm:text-3xl md:text-4xl text-center text-white leading-tight'>
                    Welcome to the Nursing and Midwifery Students Association
                </h1>
            </div>
        </div>
    </div>
  )
}

export default Splash