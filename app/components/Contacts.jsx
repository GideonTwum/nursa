import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Contacts = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-green-900 px-4 py-12' id='contacts'>
      <div className='flex items-center flex-col text-center'>
         <h1 className='text-white font-bold text-2xl md:text-3xl lg:text-4xl'>Get In <span className='text-yellow-500'>touch</span></h1>
         <p className='text-white text-sm mt-2'>We'd love to hear from you.</p>
        <div className='h-[4px] mt-4 bg-yellow-500 w-16 md:w-20'></div>
      </div>
      <div className='mt-8 md:mt-10 flex flex-col md:flex-row gap-4 w-full max-w-4xl'>
        <div className='flex flex-col gap-4 flex-1'>
            <div className='flex bg-green-500/30 p-4 md:p-5 rounded-lg w-full items-center gap-4'>
              <div className='p-2 bg-green-300/10 flex-shrink-0'>
                  <MdEmail className='text-xl md:text-2xl text-yellow-500'/>
              </div>
              <div>
                <p className='text-white text-sm'>Email</p>
                <p className='text-white text-sm break-all'>nursavvu@gmail.com</p>
              </div>
            </div>

            <div className='flex bg-green-500/30 p-4 md:p-5 rounded-lg w-full items-center gap-4'>
              <div className='p-2 bg-green-300/10 flex-shrink-0'>
                <FaPhoneAlt className='text-xl md:text-2xl text-yellow-500'/>
              </div>
              <div>
                <p className='text-white text-sm'>Phone</p>
                <p className='text-white text-sm'>+233 (0) 54 811 2339</p>
              </div>
            </div>

            <div className='flex bg-green-500/30 p-4 md:p-5 rounded-lg w-full items-center gap-4'>
              <div className='p-2 bg-green-300/10 flex-shrink-0'>
                  <FaLocationDot className='text-xl md:text-2xl text-yellow-500'/>
              </div>
              <div>
                <p className='text-white text-sm'>Location</p>
                <p className='text-white text-sm'>Oyibi, Accra</p>
              </div>
            </div>
        </div>

        <div className='flex-1 md:flex-none md:w-auto'>
            <div className='flex flex-col bg-green-500/30 p-4 md:p-5 rounded-lg w-full md:w-auto gap-4'>  
              <div>
                <p className='text-white text-lg md:text-xl'>Follow Us</p>
              </div>
              <div className='p-2 flex gap-4 flex-wrap'>
                  <FaTiktok className='text-xl md:text-2xl text-yellow-500 cursor-pointer hover:scale-110 transition-transform'/>
                  <FaInstagramSquare className='text-xl md:text-2xl text-yellow-500 cursor-pointer hover:scale-110 transition-transform'/>
                  <FaFacebook className='text-xl md:text-2xl text-yellow-500 cursor-pointer hover:scale-110 transition-transform'/>
                  <FaSquareXTwitter className='text-xl md:text-2xl text-yellow-500 cursor-pointer hover:scale-110 transition-transform'/>
              </div>
            </div>          
        </div>
      </div>
    </div>
  )
}

export default Contacts