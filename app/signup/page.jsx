'use client'
import React from 'react'

const page = () => {
    const Login = () => {
        window.location.href = '/login';
    }
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
        <div className='h-[25vh] md:h-screen w-full md:w-[50vw] flex items-center justify-center bg-green-900 signUpImage'>
            <h1 className='text-white font-black text-center text-3xl md:text-4xl lg:text-5xl px-4'>Great to have <br /> you with us!</h1>
        </div>
        <div className='bg-white min-h-[75vh] md:h-screen flex flex-col items-center justify-center w-full md:w-[50vw] gap-4 md:gap-5 py-8 px-4 overflow-y-auto'>
            <h1 className='text-green-900 font-bold text-lg md:text-xl'>Sign Up Form</h1>
            <div className='flex flex-col w-full max-w-sm'>
                <label className='text-sm' htmlFor="">Student ID</label>
                <input type="text" className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm' placeholder='enter your student ID'/>
            </div>
            <div className='flex flex-col w-full max-w-sm'>
                <label className='text-sm' htmlFor="">First name</label>
                <input type="text" className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm' placeholder='enter your first name eg.Adwoa'/>
            </div>
            <div className='flex flex-col w-full max-w-sm'>
                <label className='text-sm' htmlFor="">Last name</label>
                <input type="text" className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm' placeholder='enter your last name eg.Asaa'/>
            </div>
            <div className='flex flex-col w-full max-w-sm'>
                <label className='text-sm' htmlFor="">Program</label>
                <input type="text" className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm' placeholder='enter your program of study'/>
            </div>
            <div className='flex flex-col w-full max-w-sm'>
                <label className='text-sm' htmlFor="">Password</label>
                <input type="password" className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm' placeholder='enter your password'/>
            </div>
            <div className='w-full max-w-sm'>
                <button onClick={()=> Login()} className='bg-green-900 p-2 w-full rounded-lg text-white hover:bg-green-600 cursor-pointer text-sm font-semibold'>Sign Up</button>
            </div>
            <div>
                <p className='text-sm'>Already have an account? <span onClick={()=> Login()} className='text-green-900 font-bold cursor-pointer'>login</span></p>
            </div>
        </div>
    </div>
  )
}

export default page
