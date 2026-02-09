'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        // Check if user is logged in
        const currentUser = localStorage.getItem('nursa_current_user')
        if (currentUser) {
            setUser(JSON.parse(currentUser))
        }
    }, [])

    const Login = () => {
        window.location.href = "/login"
    }

    const Signup = () => {
        window.location.href = "/signup"
    }

    const toShop = () => {
        window.location.href = "/shop"
    }

    const toElections = () => {
        window.location.href = "https://nursa-ehub-2026.onrender.com/index.html"
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const toGallery = () => {
        window.location.href = "/gallery"
    }

    const handleLogout = () => {
        localStorage.removeItem('nursa_current_user')
        setUser(null)
        setShowDropdown(false)
        window.location.href = '/'
    }

    return (
        <div className='flex items-center bg-white z-[999] justify-between px-4 md:px-8 shadow w-full h-[70px] md:h-[80px] fixed'>
            <div className='flex items-center gap-2'>
                <Image 
                    width={40}
                    height={40}
                    src="/images/nursalogo.jpg"
                    alt='nursa logo'
                    className='md:w-[50px] md:h-[50px]'
                />
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

                <div onClick={() => toShop()} className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <p className='text-sm text-green-700 cursor-pointer'>Shop</p>
                </div>

                <div className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <a href="#events" className='text-sm text-green-700'>Events</a>
                </div>

                <div className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <a onClick={() => toGallery()} className='text-sm text-green-700 cursor-pointer'>Gallery</a>
                </div>

                <div onClick={() => toElections()} className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <p className='text-sm text-green-700 cursor-pointer'>Elections</p>
                </div>

                <div className='hover:border-b hover:border-green-700 px-2 rounded'>
                    <a href="#contacts" className='text-sm text-green-700'>Contact</a>
                </div>
            </div>

            {/* Desktop Auth/User Section */}
            <div className='hidden md:flex items-center gap-2'>
                {user ? (
                    <div className='relative'>
                        <button 
                            onClick={() => setShowDropdown(!showDropdown)}
                            className='flex items-center gap-2 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg cursor-pointer transition-colors'
                        >
                            <FaUserCircle className='text-green-700 text-xl' />
                            <span className='text-sm font-semibold text-green-700'>
                                {user.firstName} {user.lastName}
                            </span>
                        </button>
                        
                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className='absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border py-2 min-w-[200px] z-50'>
                                <div className='px-4 py-2 border-b'>
                                    <p className='text-sm font-semibold text-green-900'>{user.firstName} {user.lastName}</p>
                                    <p className='text-xs text-gray-500'>{user.studentId}</p>
                                    <p className='text-xs text-gray-500'>{user.program}</p>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className='w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer'
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button onClick={() => Login()} className='bg-green-700 cursor-pointer hover:bg-green-600 text-sm text-white p-2 px-4 rounded font-bold'>Login</button>
                        <button onClick={() => Signup()} className='text-sm font-bold cursor-pointer hover:bg-green-700 hover:text-white p-2 px-4 rounded'>Signup</button>
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className='md:hidden text-green-700 text-2xl cursor-pointer'>
                {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='absolute top-[70px] left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center py-4 gap-4'>
                    {user && (
                        <div className='flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg mb-2'>
                            <FaUserCircle className='text-green-700 text-xl' />
                            <div>
                                <p className='text-sm font-semibold text-green-700'>{user.firstName} {user.lastName}</p>
                                <p className='text-xs text-gray-500'>{user.studentId}</p>
                            </div>
                        </div>
                    )}
                    
                    <a href="/" className='text-sm text-green-700 py-2'>Home</a>
                    <a href="#about" onClick={toggleMenu} className='text-sm text-green-700 py-2'>About</a>
                    <p onClick={() => { toShop(); toggleMenu(); }} className='text-sm text-green-700 cursor-pointer py-2'>Shop</p>
                    <a href="#events" onClick={toggleMenu} className='text-sm text-green-700 py-2'>Events</a>
                    <a onClick={() => { toGallery(); toggleMenu(); }} className='text-sm text-green-700 cursor-pointer py-2'>Gallery</a>
                    <a href="#contacts" onClick={toggleMenu} className='text-sm text-green-700 py-2'>Contact</a>
                    
                    <div className='flex flex-col gap-2 mt-2 w-full px-8'>
                        {user ? (
                            <button 
                                onClick={handleLogout} 
                                className='bg-red-500 cursor-pointer hover:bg-red-600 text-sm text-white p-2 px-4 rounded font-bold w-full flex items-center justify-center gap-2'
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        ) : (
                            <>
                                <button onClick={() => Login()} className='bg-green-700 cursor-pointer hover:bg-green-600 text-sm text-white p-2 px-4 rounded font-bold w-full'>Login</button>
                                <button onClick={() => Signup()} className='text-sm font-bold cursor-pointer hover:bg-green-700 hover:text-white p-2 px-4 rounded border border-green-700 w-full'>Signup</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Nav
