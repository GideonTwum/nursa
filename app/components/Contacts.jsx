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
    <div className='min-h-screen flex flex-col  items-center justify-center bg-green-900' id='contacts'>
      <div className='flex items-center flex-col   '>
         <h1 className='text-white font-bold text-4xl'>Get In <span className='text-yellow-500'>touch</span></h1>
         <p className='text-white text-sm'>We'd love to hear from you.</p>
        <div className='h-[4px] mt-4 bg-yellow-500 w-[5vw]'></div>
      </div>
      <div className='mt-10 flex  gap-4'>
        <div className='flex flex-col gap-4'>
            <div className='flex bg-green-500/30 p-5 rounded-lg w-[30vw] items-center gap-4'>
              <div className='p-2 bg-green-300/10'>
                  <MdEmail className='text-2xl text-yellow-500'/>
              </div>
              <div>
                <p className='text-white text-sm'>Email</p>
                <p className='text-white text-sm'>nursavvu@gmail.com</p>
              </div>
            </div>

            <div className='flex bg-green-500/30 p-5 rounded-lg w-[30vw] items-center gap-4'>
              <div className='p-2 bg-green-300/10'>
                <FaPhoneAlt className='text-2xl text-yellow-500'/>
              </div>
              <div>
                <p className='text-white text-sm'>Phone</p>
                <p className='text-white text-sm'>+233 (0) 54 811 2339</p>
              </div>
            </div>

            <div className='flex bg-green-500/30 p-5 rounded-lg w-[30vw] items-center gap-4'>
              <div className='p-2 bg-green-300/10'>
                  <FaLocationDot className='text-2xl text-yellow-500'/>
              </div>
              <div>
                <p className='text-white text-sm'>Location</p>
                <p className='text-white text-sm'>Oyibi, Accra</p>
              </div>
            </div>
        </div>

        <div>
            <div className='flex flex-col bg-green-500/30 p-5 rounded-lg w-[30vw] gap-4'>  
              <div>
                <p className='text-white text-xl'>Follow Us</p>
              </div>
              <div className='p-2  flex gap-4 w-[fit-content] rounded'>
                  <FaTiktok className='text-2xl text-yellow-500 cursor-pointer'/>
                  <FaInstagramSquare className='text-2xl text-yellow-500 cursor-pointer'/>
                  <FaFacebook className='text-2xl text-yellow-500 cursor-pointer'/>
                  <FaSquareXTwitter className='text-2xl text-yellow-500 cursor-pointer'/>
              </div>
            </div>          
        </div>
            

      </div>
    </div>
  )
}

export default Contacts