'use client'
import React, { useState } from 'react'

const Page = () => {
    const [formData, setFormData] = useState({
        studentId: '',
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

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Validation
        if (!formData.studentId || !formData.password) {
            setError('Please fill in all fields')
            setLoading(false)
            return
        }

        // Get users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('nursa_users') || '[]')
        
        // Find user
        const user = existingUsers.find(
            u => u.studentId === formData.studentId && u.password === formData.password
        )

        if (!user) {
            setError('Invalid Student ID or password')
            setLoading(false)
            return
        }

        // Log the user in
        const loggedInUser = {
            studentId: user.studentId,
            firstName: user.firstName,
            lastName: user.lastName,
            program: user.program
        }
        localStorage.setItem('nursa_current_user', JSON.stringify(loggedInUser))

        // Redirect to home
        setTimeout(() => {
            window.location.href = '/'
        }, 500)
    }

    const goToSignup = () => {
        window.location.href = '/signup'
    }

    return (
        <div className='flex flex-col md:flex-row min-h-screen'>
            <div className='h-[30vh] md:h-screen w-full md:w-[50vw] flex items-center justify-center bg-green-900 loginImage'>
                <h1 className='text-white font-black text-3xl md:text-4xl lg:text-5xl'>Welcome Back</h1>
            </div>
            <div className='bg-white min-h-[70vh] md:h-screen flex flex-col items-center justify-center w-full md:w-[50vw] gap-4 md:gap-6 py-8 px-4'>
                <h1 className='text-green-900 font-bold text-lg md:text-xl'>Login to Your Account</h1>
                
                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded w-full max-w-sm text-sm'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className='flex flex-col gap-4 w-full max-w-sm'>
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
                        <label className='text-sm' htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-green-500' 
                            placeholder='enter your password'
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className='bg-green-900 p-2 w-full rounded-lg text-white hover:bg-green-600 cursor-pointer text-sm font-semibold disabled:bg-green-400 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div>
                    <p className='text-sm'>Don't have an account? <span onClick={goToSignup} className='text-green-900 font-bold cursor-pointer hover:underline'>Sign up</span></p>
                </div>
            </div>
        </div>
    )
}

export default Page
