import Image from 'next/image'
import React from 'react'
import { FaCalendarAlt } from "react-icons/fa";

const EventCard = ({title, desc, image, date}) => {
  return (
    <div className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm flex flex-col'>
        <div className='relative w-full h-48 md:h-52'>
            <Image 
                src={image}
                alt={title || 'event image'}
                fill
                className='object-cover'
            />
        </div>
        <div className='p-4 md:p-5 flex flex-col gap-3 flex-1'>
            <h2 className='text-green-900 font-bold text-lg md:text-xl line-clamp-2'>{title}</h2>
            <p className='text-sm text-gray-600 line-clamp-3 flex-1'>{desc}</p>
            <div className='flex items-center gap-2 text-yellow-600 mt-2'>
                <FaCalendarAlt className='text-sm' />
                <p className='text-sm font-medium'>{date}</p>
            </div>
        </div>
    </div>
  )
}

export default EventCard
