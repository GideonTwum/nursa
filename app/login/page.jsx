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
    <div className='flex min-h-screen'>
        <div className='h-screen w-[50vw] flex items-center justify-center bg-green-900 loginImage'>
            <h1 className='text-white font-black text-5xl'>Welcome Back</h1>
        </div>
        <div className='bg-white h-screen flex flex-col items-center justify-center w-[50vw] gap-6'>
            <h1 className='text-green-900 font-bold'>Login Form Here</h1>
            <div className='flex flex-col'>
                <label className='text-sm ' htmlFor="">Student ID</label>
                <input type="text" className='border-1 border-[#ccc] outline-none rounded-lg p-2 w-[30vw] text-sm' placeholder='enter your student ID'/>
            </div>
            <div className='flex flex-col'>
                <label className='text-sm ' htmlFor="">Password</label>
                <input type="text" className='border-1 border-[#ccc] outline-none rounded-lg p-2 w-[30vw] text-sm' placeholder='enter your student ID'/>
            </div>
            <div>
                <button onClick={()=> Login()} className='bg-green-900 p-2 w-[30vw] rounded-lg text-white hover:bg-green-600 cursor-pointer text-sm font-semibold'>Login</button>
            </div>
            <div>
                <p className='text-sm'>Don't have an account? <span onClick={()=> Singup()} className='text-green-900 font-bold cursor-pointer'>Sign up</span></p>
            </div>
        </div>
    </div>
  )
}

export default page