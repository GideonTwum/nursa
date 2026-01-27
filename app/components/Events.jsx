import React from 'react'
import EventCard from '../utils/EventCard'
import { FaArrowRightLong } from "react-icons/fa6";

const Events = () => {
  return (
    <div className='h-[50vh] items-center w-full justify-center bg-green-900 gap-10 flex flex-col ' id='events'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-white text-sm font-bold'>EVENTS</h1>
        <p className='text-[#ccc]'>There are no Upcoming Events!</p>
      </div>
      <div>
        <button className='bg-yellow-500 p-4 rounded-lg flex items-center gap-4 justify-center w-[15vw] text-white'>View all events <FaArrowRightLong /></button>
      </div>

    </div>
  )
}

export default Events