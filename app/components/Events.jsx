import React from 'react'
import EventCard from '../utils/EventCard'

const Events = () => {
  return (
    <div className='h-[65vh] items-center mt-2 w-full bg-white flex flex-col '>
      <div>
        <h1 className='text-green-700 text-sm font-black'>EVENTS</h1>
      </div>
      <div className='flex items-center gap-2 eventcard'>
        <EventCard
        image='/images/dinner.png'
        title='NURSA Annual Dinner'
        desc='Join us for an unforgettable evening of celebration, networking, and fine dining at the NURSA Annual Dinner.'
        date='Date: May 21st, 2027'
        />

        <EventCard
        image='/images/dinner.png'
        title='NURSA Annual Dinner'
        desc='Join us for an unforgettable evening of celebration, networking, and fine dining at the NURSA Annual Dinner.'
        date='Date: May 21st, 2027'
        />

        <EventCard
        image='/images/dinner.png'
        title='NURSA Annual Dinner'
        desc='Join us for an unforgettable evening of celebration, networking, and fine dining at the NURSA Annual Dinner.'
        date='Date: May 21st, 2027'
        />
      </div>
    </div>
  )
}

export default Events