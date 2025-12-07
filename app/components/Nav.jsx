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
                <p className='text-sm text-green-700'>Home</p>
                <p className='text-sm text-green-700'>About</p>
                <p className='text-sm text-green-700'>Shop</p>
                <p className='text-sm text-green-700'>Events</p>
                <p className='text-sm text-green-700'>Gallery</p>
                <p className='text-sm text-green-700'>Contact</p>
            </div>

            <div className='flex items-center gap-2'>
                <button onClick={()=> Login()} className='bg-green-700 cursor-pointer  hover:bg-green-600 text-sm text-white p-2 px-4 rounded font-bold'>Login</button>
                <button onClick={()=> Signup()} className='text-sm font-bold cursor-pointer hover:bg-green-700 p-2 px-4 rounded  '>Signup</button>
            </div>
    </div>
  )
}

export default Nav