'use client'
import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { FaUserGraduate, FaUserShield } from 'react-icons/fa'

const LoginForm = () => {
    const searchParams = useSearchParams()
    const redirect = searchParams?.get('redirect') || ''
    const [isAdmin, setIsAdmin] = useState(false)
    const [formData, setFormData] = useState({
        studentId: '',
        adminId: '',
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

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const identifier = isAdmin ? formData.adminId : formData.studentId
            if (!identifier || !formData.password) {
                setError('Please fill in all fields')
                setLoading(false)
                return
            }

            const payload = isAdmin
                ? { adminId: identifier, password: formData.password, isAdmin: true }
                : { studentId: identifier, password: formData.password }

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Login failed')
                setLoading(false)
                return
            }

            localStorage.setItem('nursa_token', data.token)
            localStorage.setItem('nursa_current_user', JSON.stringify(data.user))

            if (data.user.isAdmin) {
                window.location.href = redirect && redirect.startsWith('/') ? redirect : '/admin'
            } else {
                window.location.href = redirect && redirect.startsWith('/') ? redirect : '/'
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
            setLoading(false)
        }
    }

    const goToSignup = () => {
        window.location.href = '/signup'
    }

    const switchMode = (adminMode) => {
        setIsAdmin(adminMode)
        setFormData({ studentId: '', adminId: '', password: '' })
        setError('')
    }

    return (
        <div className='flex flex-col md:flex-row min-h-screen'>
            <div className={`h-[30vh] md:h-screen w-full md:w-[50vw] flex items-center justify-center ${isAdmin ? 'bg-gray-900' : 'bg-green-900'} loginImage transition-colors duration-300`}>
                <div className='text-center'>
                    {isAdmin ? (
                        <FaUserShield className='text-yellow-500 text-5xl md:text-6xl mx-auto mb-4' />
                    ) : (
                        <FaUserGraduate className='text-yellow-500 text-5xl md:text-6xl mx-auto mb-4' />
                    )}
                    <h1 className='text-white font-black text-3xl md:text-4xl lg:text-5xl'>
                        {isAdmin ? 'Admin Portal' : 'Welcome Back'}
                    </h1>
                    <p className='text-white/70 mt-2 text-sm md:text-base'>
                        {isAdmin ? 'Manage NURSA operations' : 'Continue your nursing journey'}
                    </p>
                </div>
            </div>
            <div className='bg-white min-h-[70vh] md:h-screen flex flex-col items-center justify-center w-full md:w-[50vw] gap-4 md:gap-6 py-8 px-4'>
                
                {/* Toggle Tabs */}
                <div className='flex bg-gray-100 rounded-lg p-1 w-full max-w-sm'>
                    <button
                        onClick={() => switchMode(false)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            !isAdmin ? 'bg-green-700 text-white shadow' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <FaUserGraduate />
                        Student
                    </button>
                    <button
                        onClick={() => switchMode(true)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            isAdmin ? 'bg-gray-800 text-white shadow' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <FaUserShield />
                        Admin
                    </button>
                </div>

                <h1 className={`font-bold text-lg md:text-xl ${isAdmin ? 'text-gray-800' : 'text-green-900'}`}>
                    {isAdmin ? 'Admin Login' : 'Student Login'}
                </h1>
                
                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded w-full max-w-sm text-sm'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className='flex flex-col gap-4 w-full max-w-sm'>
                    {isAdmin ? (
                        <div className='flex flex-col'>
                            <label className='text-sm' htmlFor="adminId">Admin ID</label>
                            <input 
                                type="text" 
                                id="adminId"
                                name="adminId"
                                value={formData.adminId}
                                onChange={handleChange}
                                className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-gray-500' 
                                placeholder='enter your admin ID'
                            />
                        </div>
                    ) : (
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
                    )}
                    <div className='flex flex-col'>
                        <label className='text-sm' htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm ${isAdmin ? 'focus:border-gray-500' : 'focus:border-green-500'}`}
                            placeholder='enter your password'
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`p-2 w-full rounded-lg text-white cursor-pointer text-sm font-semibold disabled:cursor-not-allowed transition-colors ${
                            isAdmin 
                                ? 'bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400' 
                                : 'bg-green-900 hover:bg-green-600 disabled:bg-green-400'
                        }`}
                    >
                        {loading ? 'Logging in...' : `Login as ${isAdmin ? 'Admin' : 'Student'}`}
                    </button>
                </form>
                <div>
                    <p className='text-sm'>
                        Don't have an account?{' '}
                        <span onClick={goToSignup} className={`font-bold cursor-pointer hover:underline ${isAdmin ? 'text-gray-800' : 'text-green-900'}`}>
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}
