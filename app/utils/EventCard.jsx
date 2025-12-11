import Image from 'next/image'
import React from 'react'

const EventCard = ({title, desc, image, date}) => {
  return (
    <div className='bg-white rounded w-[50vw] p-2 shadow-lg spread-4  h-[60vh] flex items-center gap-2'>
        <div >
            <Image 
            width={200} 
            height={200} 
            src={image}
            alt='event image'
            className='rounded object-cover'
            />
        </div>
        <div className='p-2 w-[60%] flex flex-col gap-2'>
            <h1 className='text-green-900 font-bold text-lg'>{title}</h1>
            <p className='text-sm text-gray-600'>{desc}</p>
            <p className='text-sm text-gray-600'>{date}</p>
        </div>
    </div>
  )
}

export default EventCard