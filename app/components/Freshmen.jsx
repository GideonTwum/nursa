'use client'
import React from 'react'
import { FaWindows } from 'react-icons/fa'

const Freshmen = () => {
    const toFreshmenPage = () =>{
        window.location.href = "/freshmen"
    }
  return (
    <div className='min-h-screen bg-green-900 flex flex-col items-center justify-center px-4 py-12 md:py-0'>
        <div className='bg-green-500/10 min-h-[50vh] md:min-h-[60vh] w-full max-w-4xl rounded-lg p-6 md:p-10 flex flex-col items-center justify-center gap-6 hover:shadow-lg hover:shadow-green-700/50 transition-shadow duration-300'>
            <h1 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center'>Nursa Freshmen Guide</h1>
            <p className='text-center text-white text-base md:text-lg lg:text-xl leading-relaxed'>
                Dear Nursa Freshers, <br /> 
                Welcome to Nursa! Our association presents you with a Freshers Starter Package filled with essentials, campus info, and a warm welcome. Enjoy your journey with NURSA!
            </p>
            <div>
                <button onClick={()=> toFreshmenPage()} className='bg-white py-2 px-6 md:px-8 rounded-lg min-w-[120px] text-green-900 hover:bg-green-500/40 hover:text-white cursor-pointer text-sm md:text-base'>
                    Read more
                </button>
            </div>
        </div>
    </div>
  )
}

export default Freshmen