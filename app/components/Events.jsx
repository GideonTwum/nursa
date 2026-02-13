'use client'
import React, { useState, useEffect } from 'react'
import EventCard from '../utils/EventCard'
import { FaArrowRightLong } from "react-icons/fa6";

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.events) setEvents(data.events)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const toEvents = () => {
    window.location.href = "/events";
  }
  
  return (
    <div className='min-h-screen py-12 md:py-16 items-center w-full justify-center bg-green-900 gap-8 md:gap-12 flex flex-col px-4' id='events'>
      {/* Section Header */}
      <div className='flex flex-col items-center gap-2 text-center'>
        <p className='text-yellow-500 text-sm font-semibold tracking-wider'>UPCOMING</p>
        <h1 className='text-white text-3xl md:text-4xl font-bold'>Our Events</h1>
        <div className='h-1 w-16 bg-yellow-500 mt-2 rounded'></div>
        <p className='text-[#ccc] text-sm md:text-base mt-2 max-w-md'>
          Stay connected with the latest happenings in the nursing community
        </p>
      </div>

      {/* Events Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl'>
        {loading ? (
          <div className='col-span-full flex justify-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500'></div>
          </div>
        ) : (
          events.slice(0, 3).map((event) => (
            <div key={event.id} className='flex justify-center'>
              <EventCard 
                id={event.id}
                title={event.title}
                desc={event.description}
                image={event.image}
                date={formatDate(event.date)}
              />
            </div>
          ))
        )}
      </div>

      {/* View All Button */}
      <div>
        <button 
          onClick={() => toEvents()} 
          className='bg-yellow-500 hover:bg-yellow-600 cursor-pointer p-3 md:p-4 rounded-lg flex items-center gap-3 md:gap-4 justify-center min-w-[180px] md:min-w-[200px] text-white text-sm md:text-base font-medium transition-colors duration-200'
        >
          View all events <FaArrowRightLong />
        </button>
      </div>
    </div>
  )
}

export default Events
