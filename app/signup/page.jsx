'use client'
import React, { useState } from 'react'
import { FaUserGraduate, FaUserShield } from 'react-icons/fa'

const Page = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [formData, setFormData] = useState({
        studentId: '',
        adminId: '',
        firstName: '',
        lastName: '',
        program: '',
        role: '',
        adminCode: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const ADMIN_SECRET_CODE = 'NURSA2026' // Secret code for admin registration

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

        if (isAdmin) {
            // Admin Signup
            if (!formData.adminId || !formData.firstName || !formData.lastName || !formData.role || !formData.adminCode || !formData.password) {
                setError('Please fill in all fields')
                setLoading(false)
                return
            }

            if (formData.adminCode !== ADMIN_SECRET_CODE) {
                setError('Invalid admin registration code')
                setLoading(false)
                return
            }

            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters')
                setLoading(false)
                return
            }

            // Check if admin already exists
            const existingAdmins = JSON.parse(localStorage.getItem('nursa_admins') || '[]')
            const adminExists = existingAdmins.find(admin => admin.adminId === formData.adminId)
            
            if (adminExists) {
                setError('An admin with this ID already exists')
                setLoading(false)
                return
            }

            // Create new admin
            const newAdmin = {
                adminId: formData.adminId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                role: formData.role,
                password: formData.password
            }

            // Save admin to localStorage
            existingAdmins.push(newAdmin)
            localStorage.setItem('nursa_admins', JSON.stringify(existingAdmins))

            // Log the admin in automatically
            const loggedInAdmin = {
                adminId: newAdmin.adminId,
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
                role: newAdmin.role,
                isAdmin: true
            }
            localStorage.setItem('nursa_current_admin', JSON.stringify(loggedInAdmin))

            // Redirect to admin dashboard
            setTimeout(() => {
                window.location.href = '/admin'
            }, 500)
        } else {
            // Student Signup
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
                password: formData.password
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
    }

    const goToLogin = () => {
        window.location.href = '/login'
    }

    const switchMode = (adminMode) => {
        setIsAdmin(adminMode)
        setFormData({
            studentId: '',
            adminId: '',
            firstName: '',
            lastName: '',
            program: '',
            role: '',
            adminCode: '',
            password: ''
        })
        setError('')
    }

    return (
        <div className='flex flex-col md:flex-row min-h-screen'>
            <div className={`h-[25vh] md:h-screen w-full md:w-[50vw] flex items-center justify-center ${isAdmin ? 'bg-gray-900' : 'bg-green-900'} signUpImage transition-colors duration-300`}>
                <div className='text-center px-4'>
                    {isAdmin ? (
                        <FaUserShield className='text-yellow-500 text-5xl md:text-6xl mx-auto mb-4' />
                    ) : (
                        <FaUserGraduate className='text-yellow-500 text-5xl md:text-6xl mx-auto mb-4' />
                    )}
                    <h1 className='text-white font-black text-center text-3xl md:text-4xl lg:text-5xl'>
                        {isAdmin ? 'Admin Registration' : 'Great to have'}<br />{!isAdmin && 'you with us!'}
                    </h1>
                    <p className='text-white/70 mt-2 text-sm md:text-base'>
                        {isAdmin ? 'Register as NURSA administrator' : 'Join the nursing community'}
                    </p>
                </div>
            </div>
            <div className='bg-white min-h-[75vh] md:h-screen flex flex-col items-center justify-center w-full md:w-[50vw] gap-4 md:gap-4 py-8 px-4 overflow-y-auto'>
                
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
                    {isAdmin ? 'Create Admin Account' : 'Create Student Account'}
                </h1>
                
                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded w-full max-w-sm text-sm'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className='flex flex-col gap-3 w-full max-w-sm'>
                    {isAdmin ? (
                        <>
                            <div className='flex flex-col'>
                                <label className='text-sm' htmlFor="adminId">Admin ID</label>
                                <input 
                                    type="text" 
                                    id="adminId"
                                    name="adminId"
                                    value={formData.adminId}
                                    onChange={handleChange}
                                    className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-gray-500' 
                                    placeholder='enter admin ID (e.g., ADM001)'
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='flex flex-col'>
                                    <label className='text-sm' htmlFor="firstName">First name</label>
                                    <input 
                                        type="text" 
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-gray-500' 
                                        placeholder='First name'
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
                                        className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-gray-500' 
                                        placeholder='Last name'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-sm' htmlFor="role">Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-gray-500 bg-white'
                                >
                                    <option value="">Select your role</option>
                                    <option value="President">President</option>
                                    <option value="Vice President">Vice President</option>
                                    <option value="Secretary">Secretary</option>
                                    <option value="Treasurer">Treasurer</option>
                                    <option value="PRO">Public Relations Officer</option>
                                    <option value="Organizing Secretary">Organizing Secretary</option>
                                    <option value="Faculty Advisor">Faculty Advisor</option>
                                </select>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-sm' htmlFor="adminCode">Admin Registration Code</label>
                                <input 
                                    type="password" 
                                    id="adminCode"
                                    name="adminCode"
                                    value={formData.adminCode}
                                    onChange={handleChange}
                                    className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-gray-500' 
                                    placeholder='enter secret admin code'
                                />
                                <p className='text-xs text-gray-500 mt-1'>Contact NURSA executive for the code</p>
                            </div>
                        </>
                    ) : (
                        <>
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
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='flex flex-col'>
                                    <label className='text-sm' htmlFor="firstName">First name</label>
                                    <input 
                                        type="text" 
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className='border border-[#ccc] outline-none rounded-lg p-2 w-full text-sm focus:border-green-500' 
                                        placeholder='e.g. Adwoa'
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
                                        placeholder='e.g. Asaa'
                                    />
                                </div>
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
                        </>
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
                            placeholder='min 6 characters'
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`p-2 w-full rounded-lg text-white cursor-pointer text-sm font-semibold disabled:cursor-not-allowed transition-colors mt-2 ${
                            isAdmin 
                                ? 'bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400' 
                                : 'bg-green-900 hover:bg-green-600 disabled:bg-green-400'
                        }`}
                    >
                        {loading ? 'Creating Account...' : `Sign Up as ${isAdmin ? 'Admin' : 'Student'}`}
                    </button>
                </form>
                <div>
                    <p className='text-sm'>
                        Already have an account?{' '}
                        <span onClick={goToLogin} className={`font-bold cursor-pointer hover:underline ${isAdmin ? 'text-gray-800' : 'text-green-900'}`}>
                            login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Page
