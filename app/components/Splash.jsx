import Image from 'next/image'
import React from 'react'
import SlideShow from './SlideShow'

const Splash = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full '>
        <div className='carosel flex flex-col items-center justify-center  w-full bg-green-500 mt-20 h-[70vh]'>
            <div className=''>
                <h1 className='font-black text-3xl text-center  text-white '>Welcome to the School of Nursing and <br /> Midwifery Students Association</h1>
            </div>
            
        </div>
    </div>
  )
}

export default Splash