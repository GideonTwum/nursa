'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowLeft } from "react-icons/fa"
import { MdArticle } from "react-icons/md"

const upcomingEvents = [
  {
    id: 1,
    title: "Annual NURSA Dinner & Awards Night",
    desc: "Join us for an elegant evening celebrating academic excellence and outstanding contributions to the nursing community. Dress code: Formal attire.",
    image: "/images/dinner.png",
    date: "March 15, 2026",
    time: "6:00 PM - 10:00 PM",
    location: "Valley View University Auditorium"
  },
  {
    id: 2,
    title: "Health Outreach Program",
    desc: "A community health screening and education event where nursing students provide free health services to local communities including blood pressure checks, health education, and basic consultations.",
    image: "/images/nursa2.png",
    date: "April 8, 2026",
    time: "8:00 AM - 4:00 PM",
    location: "Oyibi Community Center"
  },
  {
    id: 3,
    title: "Freshers Orientation Week",
    desc: "Welcome new nursing students with campus tours, mentorship pairing, and introduction to NURSA activities and resources. Meet your seniors and make lifelong connections.",
    image: "/images/nursa1.png",
    date: "May 20, 2026",
    time: "9:00 AM - 3:00 PM",
    location: "School of Nursing Building"
  },
  {
    id: 4,
    title: "Clinical Skills Workshop",
    desc: "Hands-on workshop focusing on essential clinical skills including IV insertion, wound care, and patient assessment techniques guided by experienced practitioners.",
    image: "/images/nursa3.png",
    date: "June 5, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Nursing Skills Lab"
  },
  {
    id: 5,
    title: "Mental Health Awareness Seminar",
    desc: "An important seminar addressing mental health challenges among healthcare students and professionals. Learn coping strategies and available support resources.",
    image: "/images/nursa4.png",
    date: "June 18, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Main Campus Lecture Hall B"
  },
  {
    id: 6,
    title: "NURSA Sports Gala",
    desc: "Annual inter-class sports competition featuring football, volleyball, athletics, and more. Come support your class and enjoy a day of fun and fitness.",
    image: "/images/nursabg.png",
    date: "July 10, 2026",
    time: "7:00 AM - 6:00 PM",
    location: "University Sports Complex"
  }
]

const newsArticles = [
  {
    id: 1,
    title: "NURSA President Meets with University Administration",
    excerpt: "In a historic meeting, NURSA leadership discussed improved facilities and resources for nursing students with the university administration.",
    date: "February 1, 2026",
    category: "Announcement"
  },
  {
    id: 2,
    title: "Nursing Students Excel in National Examinations",
    excerpt: "Valley View University nursing students achieved a 95% pass rate in the recent national licensing examinations, the highest in the institution's history.",
    date: "January 28, 2026",
    category: "Achievement"
  },
  {
    id: 3,
    title: "New Simulation Lab Equipment Arrives",
    excerpt: "State-of-the-art simulation mannequins and medical equipment have been installed in the nursing skills laboratory for enhanced practical training.",
    date: "January 20, 2026",
    category: "News"
  },
  {
    id: 4,
    title: "NURSA Partners with Ghana Health Service",
    excerpt: "A new memorandum of understanding has been signed to provide more internship opportunities for nursing students across various health facilities.",
    date: "January 15, 2026",
    category: "Partnership"
  },
  {
    id: 5,
    title: "Call for Volunteers: Community Health Campaign",
    excerpt: "NURSA is seeking volunteers for an upcoming community health campaign in underserved areas. Sign up to make a difference in people's lives.",
    date: "January 10, 2026",
    category: "Volunteer"
  }
]

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
      <button className='mt-3 bg-green-700 hover:bg-green-600 text-white text-sm py-2 px-4 rounded-lg transition-colors cursor-pointer'>
        Learn More
      </button>
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
    <h3 className='text-green-900 font-bold text-lg mb-2 hover:text-green-700 cursor-pointer'>
      {article.title}
    </h3>
    <p className='text-gray-600 text-sm line-clamp-2'>{article.excerpt}</p>
    <button className='mt-3 text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center gap-1 cursor-pointer'>
      Read more →
    </button>
  </div>
)

const Page = () => {
  const [activeTab, setActiveTab] = useState('events')

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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className='mb-8'>
              <h2 className='text-2xl md:text-3xl font-bold text-green-900 mb-2'>Latest News & Updates</h2>
              <p className='text-gray-600'>Stay informed with what's happening in NURSA</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {newsArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
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
