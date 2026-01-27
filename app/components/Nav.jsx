'use client'
import Image from 'next/image'
import React from 'react'

const Nav = () => {
    const Login = () => {
        window.location.href = "/login";
    }
    const Signup = () => {
        window.location.href = "/signup";
    }
  return (
    <div className='flex items-center bg-white z-[999] justify-between px-4 shadow w-full h-[15vh] fixed ' >
            <div className='flex items-center gap-2'>
                <Image 
                width={50}
                height={50}
                src="/images/nursalogo.jpg"
                alt='nursa logo'/>
                <p className='font-black text-xl'>NURSA</p>
            </div>

            <div className='flex items-center gap-6'>
                <div className='hover:bg-green-700 px-2 rounded'>
                    <a href="/" className='text-sm text-green-700 hover:text-white '>Home</a>
                </div>

                <div className='hover:bg-green-700 px-2 rounded'>
                    <a href="#about" className='text-sm text-green-700 hover:text-white '>About</a>
                </div>

                <div className='hover:bg-green-700 px-2 rounded'>
                    <a href="" className='text-sm text-green-700 hover:text-white '>Shop</a>
                </div>

                <div className='hover:bg-green-700 px-2 rounded'>
                    <a href="#events" className='text-sm text-green-700 hover:text-white '>Events</a>
                </div>

                <div className='hover:bg-green-700 px-2 rounded'>
                    <a href="" className='text-sm text-green-700 hover:text-white '>Gallery</a>
                </div>

                <div className='hover:bg-green-700 px-2 rounded'>
                    <a href="#contacts" className='text-sm text-green-700 hover:text-white '>Contact</a>
                </div>
                
            </div>

            <div className='flex items-center gap-2'>
                <button onClick={()=> Login()} className='bg-green-700 cursor-pointer  hover:bg-green-600 text-sm text-white p-2 px-4 rounded font-bold'>Login</button>
                <button onClick={()=> Signup()} className='text-sm font-bold cursor-pointer hover:bg-green-700 hover:text-white p-2 px-4 rounded  '>Signup</button>
            </div>
    </div>
  )
}

export default Nav