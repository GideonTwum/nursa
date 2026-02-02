'use client'
import Image from 'next/image';
import React from 'react'

const page = () => {
    const Singup = () => {
        window.location.href = '/signup';
    }
    const Login = () => {
        window.location.href = '/';
    }
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
        <div className='h-[30vh] md:h-screen w-full md:w-[50vw] flex items-center justify-center bg-green-900 loginImage'>
            <h1 className='text-white font-black text-3xl md:text-4xl lg:text-5xl'>Welcome Back</h1>
        </div>
        <div className='bg-white min-h-[70vh] md:h-screen flex flex-col items-center justify-center w-full md:w-[50vw] gap-4 md:gap-6 py-8 px-4'>
            <h1 className='text-green-900 font-bold text-lg md:text-xl'>Login Form Here</h1>
            <div className='flex flex-col w-full max-w-sm'>
                <label className='text-sm' htmlFor="">Student ID</label>
                <input type="text" className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm' placeholder='enter your student ID'/>
            </div>
            <div className='flex flex-col w-full max-w-sm'>
                <label className='text-sm' htmlFor="">Password</label>
                <input type="password" className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm' placeholder='enter your password'/>
            </div>
            <div className='w-full max-w-sm'>
                <button onClick={()=> Login()} className='bg-green-900 p-2 w-full rounded-lg text-white hover:bg-green-600 cursor-pointer text-sm font-semibold'>Login</button>
            </div>
            <div>
                <p className='text-sm'>Don't have an account? <span onClick={()=> Singup()} className='text-green-900 font-bold cursor-pointer'>Sign up</span></p>
            </div>
        </div>
    </div>
  )
}

export default page
