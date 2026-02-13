'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowLeft } from "react-icons/fa"
import { MdArticle } from "react-icons/md"

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const EventCard = ({ event }) => (
  <div className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col'>
    <div className='relative w-full h-48'>
      <Image 
        src={event.image}
        alt={event.title}
        fill
        className='object-cover'
      />
      <div className='absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full'>
        Upcoming
      </div>
    </div>
    <div className='p-5 flex flex-col gap-3 flex-1'>
      <h3 className='text-green-900 font-bold text-lg line-clamp-2'>{event.title}</h3>
      <p className='text-gray-600 text-sm line-clamp-2 flex-1'>{event.desc}</p>
      <div className='space-y-2 mt-2'>
        <div className='flex items-center gap-2 text-gray-500'>
          <FaCalendarAlt className='text-yellow-600 text-sm' />
          <span className='text-sm'>{event.date}</span>
        </div>
        <div className='flex items-center gap-2 text-gray-500'>
          <FaClock className='text-yellow-600 text-sm' />
          <span className='text-sm'>{event.time}</span>
        </div>
        <div className='flex items-center gap-2 text-gray-500'>
          <FaMapMarkerAlt className='text-yellow-600 text-sm' />
          <span className='text-sm line-clamp-1'>{event.location}</span>
        </div>
      </div>
      <a href={`/events/${event.id}`} className='mt-3 bg-green-700 hover:bg-green-600 text-white text-sm py-2 px-4 rounded-lg transition-colors cursor-pointer text-center inline-block'>
        Learn More
      </a>
    </div>
  </div>
)

const NewsCard = ({ article }) => (
  <div className='bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-yellow-500'>
    <div className='flex items-center gap-2 mb-2'>
      <span className='bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded'>
        {article.category}
      </span>
      <span className='text-gray-400 text-xs'>{article.date}</span>
    </div>
    <h3 className='text-green-900 font-bold text-lg mb-2'>
      {article.title}
    </h3>
    <p className='text-gray-600 text-sm line-clamp-2'>{article.excerpt}</p>
    <a href={`/news/${article.id}`} className='mt-3 text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center gap-1 cursor-pointer inline-block'>
      Read more →
    </a>
  </div>
)

const Page = () => {
  const [activeTab, setActiveTab] = useState('events')
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [newsArticles, setNewsArticles] = useState([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [newsLoading, setNewsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.events) {
          setUpcomingEvents(data.events.map(e => ({
            ...e,
            desc: e.description,
            date: formatDate(e.date)
          })))
        }
        setEventsLoading(false)
      })
      .catch(() => setEventsLoading(false))
  }, [])

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.articles) {
          setNewsArticles(data.articles.map(a => ({
            ...a,
            date: formatDate(a.createdAt)
          })))
        }
        setNewsLoading(false)
      })
      .catch(() => setNewsLoading(false))
  }, [])

  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-green-900 pt-8 pb-16 px-4'>
        <div className='max-w-6xl mx-auto'>
          <button 
            onClick={goHome}
            className='flex items-center gap-2 text-white/80 hover:text-white mb-6 cursor-pointer transition-colors'
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
          <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>
            Events & News
          </h1>
          <p className='text-white/80 text-sm md:text-base max-w-2xl'>
            Stay updated with the latest events, announcements, and news from the Nursing and Midwifery Students Association.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className='max-w-6xl mx-auto px-4 -mt-6'>
        <div className='bg-white rounded-xl shadow-lg p-2 inline-flex gap-2'>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 rounded-lg font-medium text-sm md:text-base transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'events' 
                ? 'bg-green-700 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaCalendarAlt />
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-3 rounded-lg font-medium text-sm md:text-base transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'news' 
                ? 'bg-green-700 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MdArticle />
            News & Blog
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-6xl mx-auto px-4 py-10'>
        {activeTab === 'events' ? (
          <>
            <div className='mb-8'>
              <h2 className='text-2xl md:text-3xl font-bold text-green-900 mb-2'>Upcoming Events</h2>
              <p className='text-gray-600'>Don't miss out on these exciting events</p>
            </div>
            {eventsLoading ? (
              <div className='flex justify-center py-16'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-700'></div>
              </div>
            ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            )}
          </>
        ) : (
          <>
            <div className='mb-8'>
              <h2 className='text-2xl md:text-3xl font-bold text-green-900 mb-2'>Latest News & Updates</h2>
              <p className='text-gray-600'>Stay informed with what's happening in NURSA</p>
            </div>
            {newsLoading ? (
              <div className='flex justify-center py-16'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-700'></div>
              </div>
            ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {newsArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
            )}
          </>
        )}
      </div>

      {/* Footer CTA */}
      <div className='bg-green-900 py-12 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h3 className='text-white text-2xl md:text-3xl font-bold mb-4'>
            Have an Event to Share?
          </h3>
          <p className='text-white/80 mb-6 max-w-lg mx-auto'>
            If you have an event or news you'd like to share with the NURSA community, get in touch with us.
          </p>
          <button 
            onClick={() => window.location.href = '/#contacts'}
            className='bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-3 rounded-lg transition-colors cursor-pointer'
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
