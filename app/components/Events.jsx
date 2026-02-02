import React from 'react'
import EventCard from '../utils/EventCard'
import { FaArrowRightLong } from "react-icons/fa6";

const Events = () => {
  return (
    <div className='min-h-[50vh] py-12 items-center w-full justify-center bg-green-900 gap-6 md:gap-10 flex flex-col px-4' id='events'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-white text-sm font-bold'>EVENTS</h1>
        <p className='text-[#ccc] text-sm md:text-base'>There are no Upcoming Events!</p>
      </div>
      <div>
        <button className='bg-yellow-500 p-3 md:p-4 rounded-lg flex items-center gap-3 md:gap-4 justify-center min-w-[180px] md:min-w-[200px] text-white text-sm md:text-base'>
          View all events <FaArrowRightLong />
        </button>
      </div>
    </div>
  )
}

export default Events