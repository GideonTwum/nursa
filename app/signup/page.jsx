'use client'
import React, { useState } from 'react'

const Page = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        firstName: '',
        lastName: '',
        program: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSignup = (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Validation
        if (!formData.studentId || !formData.firstName || !formData.lastName || !formData.program || !formData.password) {
            setError('Please fill in all fields')
            setLoading(false)
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            setLoading(false)
            return
        }

        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('nursa_users') || '[]')
        const userExists = existingUsers.find(user => user.studentId === formData.studentId)
        
        if (userExists) {
            setError('A user with this Student ID already exists')
            setLoading(false)
            return
        }

        // Create new user
        const newUser = {
            studentId: formData.studentId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            program: formData.program,
            password: formData.password // In production, this should be hashed
        }

        // Save user to localStorage
        existingUsers.push(newUser)
        localStorage.setItem('nursa_users', JSON.stringify(existingUsers))

        // Log the user in automatically
        const loggedInUser = {
            studentId: newUser.studentId,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            program: newUser.program
        }
        localStorage.setItem('nursa_current_user', JSON.stringify(loggedInUser))

        // Redirect to home
        setTimeout(() => {
            window.location.href = '/'
        }, 500)
    }

    const goToLogin = () => {
        window.location.href = '/login'
    }

    return (
        <div className='flex flex-col md:flex-row min-h-screen'>
            <div className='h-[25vh] md:h-screen w-full md:w-[50vw] flex items-center justify-center bg-green-900 signUpImage'>
                <h1 className='text-white font-black text-center text-3xl md:text-4xl lg:text-5xl px-4'>Great to have <br /> you with us!</h1>
            </div>
            <div className='bg-white min-h-[75vh] md:h-screen flex flex-col items-center justify-center w-full md:w-[50vw] gap-4 md:gap-5 py-8 px-4 overflow-y-auto'>
                <h1 className='text-green-900 font-bold text-lg md:text-xl'>Create Account</h1>
                
                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded w-full max-w-sm text-sm'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className='flex flex-col gap-4 w-full max-w-sm'>
                    <div className='flex flex-col'>
                        <label className='text-sm' htmlFor="studentId">Student ID</label>
                        <input 
                            type="text" 
                            id="studentId"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-green-500' 
                            placeholder='enter your student ID'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm' htmlFor="firstName">First name</label>
                        <input 
                            type="text" 
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-green-500' 
                            placeholder='enter your first name eg.Adwoa'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm' htmlFor="lastName">Last name</label>
                        <input 
                            type="text" 
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-green-500' 
                            placeholder='enter your last name eg.Asaa'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm' htmlFor="program">Program</label>
                        <input 
                            type="text" 
                            id="program"
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-green-500' 
                            placeholder='enter your program of study'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm' htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-green-500' 
                            placeholder='enter your password (min 6 characters)'
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className='bg-green-900 p-2 w-full rounded-lg text-white hover:bg-green-600 cursor-pointer text-sm font-semibold disabled:bg-green-400 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <div>
                    <p className='text-sm'>Already have an account? <span onClick={goToLogin} className='text-green-900 font-bold cursor-pointer hover:underline'>login</span></p>
                </div>
            </div>
        </div>
    )
}

export default Page
