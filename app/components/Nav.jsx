'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const Login = () => {
        window.location.href = "/login";
    }
    const Signup = () => {
        window.location.href = "/signup";
    }

    const toShop = () => {
        window.location.href = "/shop";
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

  return (
    <div className='flex items-center bg-white z-[999] justify-between px-4 md:px-8 shadow w-full h-[70px] md:h-[80px] fixed'>
            <div className='flex items-center gap-2'>
                <Image 
                width={40}
                height={40}
                src="/images/nursalogo.jpg"
                alt='nursa logo'
                className='md:w-[50px] md:h-[50px]'/>
                <p className='font-black text-lg md:text-xl'>NURSA</p>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-6'>
                <div className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <a href="/" className='text-sm text-green-700'>Home</a>
                </div>

                <div className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <a href="#about" className='text-sm text-green-700'>About</a>
                </div>

                <div onClick={()=>toShop()} className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <p className='text-sm text-green-700 cursor-pointer'>Shop</p>
                </div>

                <div className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <a href="#events" className='text-sm text-green-700'>Events</a>
                </div>

                <div className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <a href="" className='text-sm text-green-700'>Gallery</a>
                </div>

                <div className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <a href="#contacts" className='text-sm text-green-700'>Contact</a>
                </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className='hidden md:flex items-center gap-2'>
                <button onClick={()=> Login()} className='bg-green-700 cursor-pointer hover:bg-green-600 text-sm text-white p-2 px-4 rounded font-bold'>Login</button>
                <button onClick={()=> Signup()} className='text-sm font-bold cursor-pointer hover:bg-green-700 hover:text-white p-2 px-4 rounded'>Signup</button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className='md:hidden text-green-700 text-2xl cursor-pointer'>
                {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='absolute top-[70px] left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center py-4 gap-4'>
                    <a href="/" className='text-sm text-green-700 py-2'>Home</a>
                    <a href="#about" onClick={toggleMenu} className='text-sm text-green-700 py-2'>About</a>
                    <p onClick={()=>{toShop(); toggleMenu();}} className='text-sm text-green-700 cursor-pointer py-2'>Shop</p>
                    <a href="#events" onClick={toggleMenu} className='text-sm text-green-700 py-2'>Events</a>
                    <a href="" className='text-sm text-green-700 py-2'>Gallery</a>
                    <a href="#contacts" onClick={toggleMenu} className='text-sm text-green-700 py-2'>Contact</a>
                    <div className='flex flex-col gap-2 mt-2 w-full px-8'>
                        <button onClick={()=> Login()} className='bg-green-700 cursor-pointer hover:bg-green-600 text-sm text-white p-2 px-4 rounded font-bold w-full'>Login</button>
                        <button onClick={()=> Signup()} className='text-sm font-bold cursor-pointer hover:bg-green-700 hover:text-white p-2 px-4 rounded border border-green-700 w-full'>Signup</button>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Nav