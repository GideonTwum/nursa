'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FaArrowLeft, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa'

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const Page = () => {
  const params = useParams()
  const id = params?.id
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`/api/events/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.event) setEvent(data.event)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const toEvents = () => window.location.href = '/events'
  const goHome = () => window.location.href = '/'

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-700'></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>Event not found</h1>
        <button onClick={toEvents} className='bg-green-700 text-white px-6 py-2 rounded-lg cursor-pointer'>
          Back to Events & News
        </button>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-green-900 pt-8 pb-16 px-4'>
        <div className='max-w-4xl mx-auto'>
          <button
            onClick={toEvents}
            className='flex items-center gap-2 text-white/80 hover:text-white mb-6 cursor-pointer transition-colors'
          >
            <FaArrowLeft />
            <span>Back to Events & News</span>
          </button>
          <div className='flex items-center gap-2 mb-4'>
            <span className='bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full'>
              Upcoming
            </span>
          </div>
          <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>
            {event.title}
          </h1>
          <div className='flex flex-wrap gap-6 text-white/90'>
            <div className='flex items-center gap-2'>
              <FaCalendarAlt className='text-yellow-500' />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <FaClock className='text-yellow-500' />
              <span>{event.time}</span>
            </div>
            <div className='flex items-center gap-2'>
              <FaMapMarkerAlt className='text-yellow-500' />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-4xl mx-auto px-4 py-10 -mt-6'>
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='relative w-full h-64 md:h-96'>
            <Image
              src={event.image}
              alt={event.title}
              fill
              className='object-cover'
            />
          </div>
          <div className='p-6 md:p-10'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>About this event</h2>
            <div className='text-gray-700 whitespace-pre-wrap leading-relaxed'>
              {event.description}
            </div>
          </div>
        </div>

        <div className='mt-8 flex gap-4'>
          <button
            onClick={toEvents}
            className='bg-green-700 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg cursor-pointer transition-colors'
          >
            Back to Events & News
          </button>
          <button
            onClick={goHome}
            className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg cursor-pointer transition-colors'
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
