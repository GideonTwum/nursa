'use client'
import React from 'react'

const page = () => {
    const Login = () => {
        window.location.href = '/login';
    }
  return (
    <div className='flex min-h-screen'>
        <div className='h-screen w-[50vw] flex items-center justify-center bg-green-900 signUpImage'>
            <h1 className='text-white font-black text-center text-5xl'>Great to have <br /> you with us!</h1>
        </div>
        <div className='bg-white h-screen flex flex-col items-center justify-center w-[50vw] gap-6'>
            <h1 className='mt-10 text-green-900 font-bold'>Login Form Here</h1>
            <div className='flex flex-col'>
                <label className='text-sm ' htmlFor="">Student ID</label>
                <input type="text" className='border-1 border-[#ccc] outline-none rounded-lg p-2 w-[30vw] text-sm' placeholder='enter your student ID'/>
            </div>
            <div className='flex flex-col'>
                <label className='text-sm ' htmlFor="">First name</label>
                <input type="text" className='border-1 border-[#ccc] outline-none rounded-lg p-2 w-[30vw] text-sm' placeholder='enter your first name eg.Adwoa'/>
            </div>
            <div className='flex flex-col'>
                <label className='text-sm ' htmlFor="">Last name</label>
                <input type="text" className='border-1 border-[#ccc] outline-none rounded-lg p-2 w-[30vw] text-sm' placeholder='enter your last name eg.Asaa'/>
            </div>
            <div className='flex flex-col'>
                <label className='text-sm ' htmlFor="">Program</label>
                <input type="text" className='border-1 border-[#ccc] outline-none rounded-lg p-2 w-[30vw] text-sm' placeholder='enter your program of study'/>
            </div>
            <div className='flex flex-col'>
                <label className='text-sm ' htmlFor="">Password</label>
                <input type="text" className='border-1 border-[#ccc] outline-none rounded-lg p-2 w-[30vw] text-sm' placeholder='enter your password'/>
            </div>
            <div>
                <button onClick={()=> Login()} className='bg-green-900 p-2 w-[30vw] rounded-lg text-white hover:bg-green-600 cursor-pointer text-sm font-semibold'>Sign Up</button>
            </div>
            <div className='mb-10'>
                <p className='text-sm'>Already have an account? <span onClick={()=> Login()} className='text-green-900 font-bold cursor-pointer'>login</span></p>
            </div>
        </div>
    </div>
  )
}

export default page