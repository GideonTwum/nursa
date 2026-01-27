import React from 'react'

const Freshmen = () => {
  return (
    <div className='min-h-screen bg-green-900 flex flex-col items-center justify-center'>
        <div className='bg-green-500/10 h-[60vh] w-[60vw] rounded-lg p-10 flex flex-col items-center gap-6 hover:shadow-lg hover:shadow-green-700/50 transition-shadow duration-300 '>
            <h1 className='text-white text-4xl font-bold'>Nursa Freshmen Guide</h1>
            <p className='text-center text-white text-xl'>Dear Nursa Freshers, <br /> Welcome to Nursa! Our association presents you with a Freshers Starter Package filled with essentials, campus info, and a warm <br /> welcome. Enjoy your journey with NURSA!.</p>
            <div>
                <button className='bg-white p-2 rounded-lg w-[10vw] text-green-900 hover:bg-green-500/40 hover:text-white cursor-pointer'>Read more</button>
            </div>
        </div>
    </div>
  )
}

export default Freshmen