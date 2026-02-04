'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaUsers, FaCalendarAlt, FaShoppingCart, FaImages, FaSignOutAlt, FaUserShield, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { MdDashboard, MdEvent, MdArticle } from 'react-icons/md'

const Page = () => {
    const [admin, setAdmin] = useState(null)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [users, setUsers] = useState([])
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAdmins: 0,
        totalEvents: 6,
        totalProducts: 8
    })

    useEffect(() => {
        // Check if admin is logged in
        const currentAdmin = localStorage.getItem('nursa_current_admin')
        if (!currentAdmin) {
            window.location.href = '/login'
            return
        }
        setAdmin(JSON.parse(currentAdmin))

        // Load users
        const storedUsers = JSON.parse(localStorage.getItem('nursa_users') || '[]')
        const storedAdmins = JSON.parse(localStorage.getItem('nursa_admins') || '[]')
        setUsers(storedUsers)
        setStats({
            totalUsers: storedUsers.length,
            totalAdmins: storedAdmins.length,
            totalEvents: 6,
            totalProducts: 8
        })
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('nursa_current_admin')
        window.location.href = '/'
    }

    if (!admin) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-100'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto'></div>
                    <p className='mt-4 text-gray-600'>Loading...</p>
                </div>
            </div>
        )
    }

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
        { id: 'users', label: 'Users', icon: FaUsers },
        { id: 'events', label: 'Events', icon: MdEvent },
        { id: 'products', label: 'Products', icon: FaShoppingCart },
        { id: 'gallery', label: 'Gallery', icon: FaImages },
        { id: 'news', label: 'News & Blog', icon: MdArticle },
    ]

    return (
        <div className='min-h-screen bg-gray-100 flex'>
            {/* Sidebar */}
            <div className='w-64 bg-gray-900 text-white fixed h-full hidden md:block'>
                <div className='p-6 border-b border-gray-700'>
                    <div className='flex items-center gap-3'>
                        <Image 
                            src="/images/nursalogo.jpg" 
                            alt="NURSA Logo" 
                            width={40} 
                            height={40}
                            className='rounded-lg'
                        />
                        <div>
                            <h1 className='font-bold text-lg'>NURSA Admin</h1>
                            <p className='text-xs text-gray-400'>Management Portal</p>
                        </div>
                    </div>
                </div>

                <nav className='p-4'>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors cursor-pointer ${
                                activeTab === item.id 
                                    ? 'bg-yellow-500 text-gray-900' 
                                    : 'text-gray-300 hover:bg-gray-800'
                            }`}
                        >
                            <item.icon className='text-lg' />
                            <span className='text-sm font-medium'>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center'>
                            <FaUserShield className='text-gray-900' />
                        </div>
                        <div>
                            <p className='text-sm font-semibold'>{admin.firstName} {admin.lastName}</p>
                            <p className='text-xs text-gray-400'>{admin.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className='w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg cursor-pointer transition-colors'
                    >
                        <FaSignOutAlt />
                        <span className='text-sm'>Logout</span>
                    </button>
                </div>
            </div>

            {/* Mobile Header */}
            <div className='md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 z-50'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Image 
                            src="/images/nursalogo.jpg" 
                            alt="NURSA Logo" 
                            width={32} 
                            height={32}
                            className='rounded'
                        />
                        <span className='font-bold'>NURSA Admin</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className='bg-red-500 p-2 rounded cursor-pointer'
                    >
                        <FaSignOutAlt />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className='md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-2 z-50'>
                <div className='flex justify-around'>
                    {menuItems.slice(0, 5).map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex flex-col items-center p-2 rounded cursor-pointer ${
                                activeTab === item.id ? 'text-yellow-500' : 'text-gray-400'
                            }`}
                        >
                            <item.icon className='text-xl' />
                            <span className='text-xs mt-1'>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 pb-24 md:pb-8'>
                {activeTab === 'dashboard' && (
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>Dashboard</h1>
                        <p className='text-gray-600 mb-8'>Welcome back, {admin.firstName}!</p>

                        {/* Stats Cards */}
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8'>
                            <div className='bg-white rounded-xl p-6 shadow-sm'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-gray-500 text-sm'>Total Users</p>
                                        <p className='text-3xl font-bold text-gray-800'>{stats.totalUsers}</p>
                                    </div>
                                    <div className='bg-blue-100 p-3 rounded-lg'>
                                        <FaUsers className='text-blue-600 text-xl' />
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white rounded-xl p-6 shadow-sm'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-gray-500 text-sm'>Admins</p>
                                        <p className='text-3xl font-bold text-gray-800'>{stats.totalAdmins}</p>
                                    </div>
                                    <div className='bg-purple-100 p-3 rounded-lg'>
                                        <FaUserShield className='text-purple-600 text-xl' />
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white rounded-xl p-6 shadow-sm'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-gray-500 text-sm'>Events</p>
                                        <p className='text-3xl font-bold text-gray-800'>{stats.totalEvents}</p>
                                    </div>
                                    <div className='bg-green-100 p-3 rounded-lg'>
                                        <FaCalendarAlt className='text-green-600 text-xl' />
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white rounded-xl p-6 shadow-sm'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-gray-500 text-sm'>Products</p>
                                        <p className='text-3xl font-bold text-gray-800'>{stats.totalProducts}</p>
                                    </div>
                                    <div className='bg-yellow-100 p-3 rounded-lg'>
                                        <FaShoppingCart className='text-yellow-600 text-xl' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Users */}
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <div className='flex items-center justify-between mb-4'>
                                <h2 className='text-lg font-bold text-gray-800'>Recent Users</h2>
                                <button 
                                    onClick={() => setActiveTab('users')}
                                    className='text-sm text-green-600 hover:underline cursor-pointer'
                                >
                                    View All
                                </button>
                            </div>
                            {users.length === 0 ? (
                                <p className='text-gray-500 text-center py-8'>No users registered yet</p>
                            ) : (
                                <div className='overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead>
                                            <tr className='text-left text-gray-500 text-sm border-b'>
                                                <th className='pb-3'>Name</th>
                                                <th className='pb-3'>Student ID</th>
                                                <th className='pb-3 hidden md:table-cell'>Program</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.slice(0, 5).map((user, index) => (
                                                <tr key={index} className='border-b last:border-0'>
                                                    <td className='py-3'>
                                                        <p className='font-medium text-gray-800'>{user.firstName} {user.lastName}</p>
                                                    </td>
                                                    <td className='py-3 text-gray-600'>{user.studentId}</td>
                                                    <td className='py-3 text-gray-600 hidden md:table-cell'>{user.program}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Users</h1>
                                <p className='text-gray-600'>Manage registered students</p>
                            </div>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                            {users.length === 0 ? (
                                <div className='p-8 text-center'>
                                    <FaUsers className='text-gray-300 text-5xl mx-auto mb-4' />
                                    <p className='text-gray-500'>No users registered yet</p>
                                </div>
                            ) : (
                                <div className='overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead className='bg-gray-50'>
                                            <tr className='text-left text-gray-500 text-sm'>
                                                <th className='px-6 py-4'>Name</th>
                                                <th className='px-6 py-4'>Student ID</th>
                                                <th className='px-6 py-4 hidden md:table-cell'>Program</th>
                                                <th className='px-6 py-4'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={index} className='border-b last:border-0 hover:bg-gray-50'>
                                                    <td className='px-6 py-4'>
                                                        <p className='font-medium text-gray-800'>{user.firstName} {user.lastName}</p>
                                                    </td>
                                                    <td className='px-6 py-4 text-gray-600'>{user.studentId}</td>
                                                    <td className='px-6 py-4 text-gray-600 hidden md:table-cell'>{user.program}</td>
                                                    <td className='px-6 py-4'>
                                                        <div className='flex items-center gap-2'>
                                                            <button className='p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer'>
                                                                <FaEye />
                                                            </button>
                                                            <button className='p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer'>
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Events</h1>
                                <p className='text-gray-600'>Manage NURSA events</p>
                            </div>
                            <button className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer'>
                                <FaPlus />
                                <span className='hidden md:inline'>Add Event</span>
                            </button>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <p className='text-gray-500 text-center py-8'>
                                Event management interface - You can add, edit, and delete events here.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Products</h1>
                                <p className='text-gray-600'>Manage shop products</p>
                            </div>
                            <button className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer'>
                                <FaPlus />
                                <span className='hidden md:inline'>Add Product</span>
                            </button>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <p className='text-gray-500 text-center py-8'>
                                Product management interface - You can add, edit, and delete products here.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'gallery' && (
                    <div>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Gallery</h1>
                                <p className='text-gray-600'>Manage photo gallery</p>
                            </div>
                            <button className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer'>
                                <FaPlus />
                                <span className='hidden md:inline'>Upload Photos</span>
                            </button>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <p className='text-gray-500 text-center py-8'>
                                Gallery management interface - You can upload and manage photos here.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'news' && (
                    <div>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>News & Blog</h1>
                                <p className='text-gray-600'>Manage news articles</p>
                            </div>
                            <button className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer'>
                                <FaPlus />
                                <span className='hidden md:inline'>New Article</span>
                            </button>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <p className='text-gray-500 text-center py-8'>
                                News management interface - You can create and publish articles here.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
