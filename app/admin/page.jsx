'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaUsers, FaCalendarAlt, FaShoppingCart, FaImages, FaSignOutAlt, FaUserShield, FaPlus, FaEdit, FaTrash, FaEye, FaTimes, FaEnvelope, FaShoppingBag, FaUpload } from 'react-icons/fa'
import { MdDashboard, MdEvent, MdArticle } from 'react-icons/md'

const Page = () => {
    const [admin, setAdmin] = useState(null)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [users, setUsers] = useState([])
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAdmins: 0,
        totalEvents: 6,
        totalProducts: 8,
        totalOrders: 0
    })

    const token = () => localStorage.getItem('nursa_token')
    const [uploading, setUploading] = useState(false)

    const handleFileUpload = async (file, onSuccess) => {
        if (!file || !file.type.startsWith('image/')) {
            alert('Please select an image (JPEG, PNG, GIF, WebP)')
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('File too large. Max 5MB.')
            return
        }
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token()}` },
                body: formData
            })
            const data = await res.json().catch(() => ({}))
            if (res.ok && data.url) {
                onSuccess(data.url)
            } else {
                alert(data?.error || 'Upload failed')
            }
        } catch {
            alert('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const fetchUsers = () => {
        if (!token()) return
        fetch('/api/users', { headers: { 'Authorization': `Bearer ${token()}` } })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setUsers(data.users || [])
                    setStats(prev => ({
                        ...prev,
                        totalUsers: data.totalUsers ?? data.users?.length ?? 0,
                        totalAdmins: data.totalAdmins ?? prev.totalAdmins
                    }))
                }
            })
    }

    const [products, setProducts] = useState([])
    const [productForm, setProductForm] = useState({ name: '', description: '', price: '', image: '', category: 'Prospectus', level: 'Year 1', inStock: true, stock: 0 })
    const [editingProduct, setEditingProduct] = useState(null)
    const [productSaving, setProductSaving] = useState(false)

    const fetchProducts = () => {
        fetch('/api/products')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setProducts(data.products || [])
                    setStats(prev => ({ ...prev, totalProducts: data.totalProducts ?? data.products?.length ?? 0 }))
                }
            })
    }

    const resetProductForm = () => {
        setProductForm({ name: '', description: '', price: '', image: '', category: 'Prospectus', level: 'Year 1', inStock: true, stock: 0 })
        setEditingProduct(null)
    }

    const handleSaveProduct = async () => {
        const { name, description, price, image, category, level, inStock, stock } = productForm
        if (!name || !description || price === '' || !image || !category || !level) {
            alert('Please fill in all required fields')
            return
        }
        setProductSaving(true)
        try {
            const t = token()
            const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
            const method = editingProduct ? 'PUT' : 'POST'
            const body = editingProduct
                ? { name, description, price: parseFloat(price), image, category, level, inStock, stock: parseInt(stock, 10) || 0 }
                : { name, description, price: parseFloat(price), image, category, level, inStock, stock: parseInt(stock, 10) || 0 }
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` },
                body: JSON.stringify(body)
            })
            const data = await res.json().catch(() => ({}))
            if (res.ok) {
                resetProductForm()
                fetchProducts()
            } else {
                alert(data?.error || 'Failed to save product')
            }
        } finally {
            setProductSaving(false)
        }
    }

    const handleDeleteProduct = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return
        const t = token()
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${t}` } })
        const data = await res.json().catch(() => ({}))
        if (res.ok) {
            fetchProducts()
        } else {
            alert(data?.error || 'Failed to delete product')
        }
    }

    const startEditProduct = (p) => {
        setEditingProduct(p)
        setProductForm({
            name: p.name,
            description: p.description,
            price: String(p.price),
            image: p.image,
            category: p.category,
            level: p.level,
            inStock: p.inStock,
            stock: p.stock ?? 0
        })
    }

    const [eventsList, setEventsList] = useState([])
    const [eventForm, setEventForm] = useState({ title: '', description: '', image: '', date: '', time: '', location: '' })
    const [editingEvent, setEditingEvent] = useState(null)
    const [eventSaving, setEventSaving] = useState(false)

    const fetchEvents = () => {
        fetch('/api/events')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setEventsList(data.events || [])
                    setStats(prev => ({ ...prev, totalEvents: data.totalEvents ?? data.events?.length ?? 0 }))
                }
            })
    }

    const resetEventForm = () => {
        setEventForm({ title: '', description: '', image: '', date: '', time: '', location: '' })
        setEditingEvent(null)
    }

    const handleSaveEvent = async () => {
        const { title, description, image, date, time, location } = eventForm
        if (!title || !description || !image || !date || !time || !location) {
            alert('Please fill in all required fields')
            return
        }
        setEventSaving(true)
        try {
            const t = token()
            const url = editingEvent ? `/api/events/${editingEvent.id}` : '/api/events'
            const method = editingEvent ? 'PUT' : 'POST'
            const body = { title, description, image, date, time, location }
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` },
                body: JSON.stringify(body)
            })
            const data = await res.json().catch(() => ({}))
            if (res.ok) {
                resetEventForm()
                fetchEvents()
            } else {
                alert(data?.error || 'Failed to save event')
            }
        } finally {
            setEventSaving(false)
        }
    }

    const handleDeleteEvent = async (id) => {
        if (!confirm('Are you sure you want to delete this event?')) return
        const t = token()
        const res = await fetch(`/api/events/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${t}` } })
        const data = await res.json().catch(() => ({}))
        if (res.ok) {
            fetchEvents()
        } else {
            alert(data?.error || 'Failed to delete event')
        }
    }

    const startEditEvent = (e) => {
        setEditingEvent(e)
        const d = e.date ? new Date(e.date).toISOString().slice(0, 10) : ''
        setEventForm({
            title: e.title,
            description: e.description,
            image: e.image,
            date: d,
            time: e.time || '',
            location: e.location || ''
        })
    }

    const [galleryImages, setGalleryImages] = useState([])
    const [imagePickerFor, setImagePickerFor] = useState(null) // 'product' | 'event' | null
    const [galleryForm, setGalleryForm] = useState({ url: '', title: '', category: 'Campus Life' })
    const [editingGallery, setEditingGallery] = useState(null)
    const [gallerySaving, setGallerySaving] = useState(false)

    const fetchGallery = () => {
        fetch('/api/gallery')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) setGalleryImages(data.images || [])
            })
    }

    const resetGalleryForm = () => {
        setGalleryForm({ url: '', title: '', category: 'Campus Life' })
        setEditingGallery(null)
    }

    const handleSaveGallery = async () => {
        const { url, title, category } = galleryForm
        if (!url || !title || !category) {
            alert('Please fill in all fields')
            return
        }
        setGallerySaving(true)
        try {
            const t = token()
            const apiUrl = editingGallery ? `/api/gallery/${editingGallery.id}` : '/api/gallery'
            const method = editingGallery ? 'PUT' : 'POST'
            const res = await fetch(apiUrl, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` },
                body: JSON.stringify({ url, title, category })
            })
            const data = await res.json().catch(() => ({}))
            if (res.ok) {
                resetGalleryForm()
                fetchGallery()
            } else {
                alert(data?.error || 'Failed to save')
            }
        } finally {
            setGallerySaving(false)
        }
    }

    const handleDeleteGallery = async (id) => {
        if (!confirm('Delete this image from gallery?')) return
        const t = token()
        const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${t}` } })
        const data = await res.json().catch(() => ({}))
        if (res.ok) fetchGallery()
        else alert(data?.error || 'Failed to delete')
    }

    const startEditGallery = (img) => {
        setEditingGallery(img)
        setGalleryForm({ url: img.url, title: img.title, category: img.category })
    }

    const [contactMessages, setContactMessages] = useState([])

    const fetchContact = () => {
        const t = token()
        if (!t) return
        fetch('/api/contact', { headers: { 'Authorization': `Bearer ${t}` } })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) setContactMessages(data.messages || [])
            })
    }

    const handleMarkRead = async (id) => {
        const t = token()
        const res = await fetch(`/api/contact/${id}`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${t}` } })
        if (res.ok) fetchContact()
    }

    const handleDeleteContact = async (id) => {
        if (!confirm('Delete this message?')) return
        const t = token()
        const res = await fetch(`/api/contact/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${t}` } })
        if (res.ok) fetchContact()
    }

    const [newsArticles, setNewsArticles] = useState([])
    const [newsForm, setNewsForm] = useState({ title: '', content: '', excerpt: '', image: '', category: 'Announcement', published: false })
    const [editingNews, setEditingNews] = useState(null)
    const [newsSaving, setNewsSaving] = useState(false)

    const fetchNews = () => {
        const t = token()
        if (!t) return
        fetch('/api/news', { headers: { 'Authorization': `Bearer ${t}` } })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) setNewsArticles(data.articles || [])
            })
    }

    const resetNewsForm = () => {
        setNewsForm({ title: '', content: '', excerpt: '', image: '', category: 'Announcement', published: false })
        setEditingNews(null)
    }

    const handleSaveNews = async () => {
        const { title, content, excerpt, image, category, published } = newsForm
        if (!title || !content || !excerpt || !category) {
            alert('Please fill in title, content, excerpt, and category')
            return
        }
        setNewsSaving(true)
        try {
            const t = token()
            const url = editingNews ? `/api/news/${editingNews.id}` : '/api/news'
            const method = editingNews ? 'PUT' : 'POST'
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` },
                body: JSON.stringify({ title, content, excerpt, image: image || null, category, published })
            })
            const data = await res.json().catch(() => ({}))
            if (res.ok) {
                resetNewsForm()
                fetchNews()
            } else {
                alert(data?.error || 'Failed to save')
            }
        } finally {
            setNewsSaving(false)
        }
    }

    const handleDeleteNews = async (id) => {
        if (!confirm('Delete this article?')) return
        const t = token()
        const res = await fetch(`/api/news/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${t}` } })
        if (res.ok) fetchNews()
    }

    const startEditNews = (a) => {
        setEditingNews(a)
        setNewsForm({
            title: a.title,
            content: a.content,
            excerpt: a.excerpt,
            image: a.image || '',
            category: a.category,
            published: a.published
        })
    }

    const [orders, setOrders] = useState([])

    const fetchOrders = () => {
        const t = token()
        if (!t) return
        fetch('/api/orders', { headers: { 'Authorization': `Bearer ${t}` } })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setOrders(data.orders || [])
                    setStats(prev => ({ ...prev, totalOrders: data.totalOrders ?? data.orders?.length ?? 0 }))
                }
            })
    }

    const handleOrderStatus = async (id, status) => {
        const t = token()
        const res = await fetch(`/api/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` },
            body: JSON.stringify({ status })
        })
        if (res.ok) fetchOrders()
    }

    useEffect(() => {
        const token = localStorage.getItem('nursa_token')
        if (!token) {
            window.location.href = '/login'
            return
        }

        fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) {
                    localStorage.removeItem('nursa_token')
                    localStorage.removeItem('nursa_current_user')
                    window.location.href = '/login'
                    return null
                }
                return res.json()
            })
            .then(data => {
                if (data?.user?.isAdmin) {
                    setAdmin(data.user)
                    fetchUsers()
                    fetchProducts()
                    fetchEvents()
                    fetchGallery()
                    fetchContact()
                    fetchNews()
                    fetchOrders()
                } else {
                    window.location.href = '/'
                }
            })
            .catch(() => {
                localStorage.removeItem('nursa_token')
                localStorage.removeItem('nursa_current_user')
                window.location.href = '/login'
            })
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('nursa_token')
        localStorage.removeItem('nursa_current_user')
        window.location.href = '/'
    }

    const handleDeleteUser = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return

        const token = localStorage.getItem('nursa_token')
        if (!token) return

        const res = await fetch(`/api/users/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })

        if (res.ok) {
            fetchUsers()
        } else {
            const data = await res.json().catch(() => ({}))
            alert(data?.error || 'Failed to delete user')
        }
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
        { id: 'orders', label: 'Orders', icon: FaShoppingBag },
        { id: 'gallery', label: 'Gallery', icon: FaImages },
        { id: 'contact', label: 'Messages', icon: FaEnvelope },
        { id: 'news', label: 'News & Blog', icon: MdArticle },
    ]

    return (
        <div className='min-h-screen bg-gray-100 flex'>
            {/* Sidebar */}
            <div className='w-64 bg-gray-900 text-white fixed h-full hidden md:flex md:flex-col'>
                <div className='flex-shrink-0 p-4 border-b border-gray-700'>
                    <div className='flex items-center gap-2'>
                        <Image 
                            src="/images/nursalogo.jpg" 
                            alt="NURSA Logo" 
                            width={36} 
                            height={36}
                            className='rounded-lg'
                        />
                        <div>
                            <h1 className='font-bold text-base'>NURSA Admin</h1>
                            <p className='text-xs text-gray-400'>Portal</p>
                        </div>
                    </div>
                </div>

                <nav className='flex-1 overflow-y-auto p-3 min-h-0'>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg mb-1 transition-colors cursor-pointer ${
                                activeTab === item.id 
                                    ? 'bg-yellow-500 text-gray-900' 
                                    : 'text-gray-300 hover:bg-gray-800'
                            }`}
                        >
                            <item.icon className='text-base flex-shrink-0' />
                            <span className='text-sm font-medium truncate'>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className='flex-shrink-0 p-3 border-t border-gray-700'>
                    <div className='flex items-center gap-2 mb-3'>
                        <div className='w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0'>
                            <FaUserShield className='text-gray-900 text-sm' />
                        </div>
                        <div className='min-w-0'>
                            <p className='text-sm font-semibold truncate'>{admin.firstName} {admin.lastName}</p>
                            <p className='text-xs text-gray-400 truncate'>{admin.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className='w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg cursor-pointer transition-colors text-sm'
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
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
                            <div className='bg-white rounded-xl p-6 shadow-sm'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-gray-500 text-sm'>Orders</p>
                                        <p className='text-3xl font-bold text-gray-800'>{stats.totalOrders}</p>
                                    </div>
                                    <div className='bg-orange-100 p-3 rounded-lg'>
                                        <FaShoppingBag className='text-orange-600 text-xl' />
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
                                            {users.slice(0, 5).map((user) => (
                                                <tr key={user.id} className='border-b last:border-0'>
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
                                            {users.map((user) => (
                                                <tr key={user.id} className='border-b last:border-0 hover:bg-gray-50'>
                                                    <td className='px-6 py-4'>
                                                        <p className='font-medium text-gray-800'>{user.firstName} {user.lastName}</p>
                                                    </td>
                                                    <td className='px-6 py-4 text-gray-600'>{user.studentId}</td>
                                                    <td className='px-6 py-4 text-gray-600 hidden md:table-cell'>{user.program}</td>
                                                    <td className='px-6 py-4'>
                                                        <div className='flex items-center gap-2'>
                                                            <button className='p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer' title='View details'>
                                                                <FaEye />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                className='p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer' 
                                                                title='Delete user'
                                                            >
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
                            <button
                                onClick={resetEventForm}
                                className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer'
                            >
                                <FaPlus />
                                <span className='hidden md:inline'>Add Event</span>
                            </button>
                        </div>

                        {/* Add/Edit Form */}
                        <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
                            <h2 className='text-lg font-bold text-gray-800 mb-4'>{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <input
                                    placeholder='Event title'
                                    value={eventForm.title}
                                    onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                />
                                <div className='flex flex-wrap gap-2'>
                                    <input
                                        placeholder='Image URL or upload from device'
                                        value={eventForm.image}
                                        onChange={e => setEventForm(f => ({ ...f, image: e.target.value }))}
                                        className='flex-1 min-w-[200px] px-3 py-2 border rounded-lg'
                                    />
                                    <label className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 cursor-pointer whitespace-nowrap'>
                                        <FaUpload /> {uploading ? 'Uploading...' : 'Upload'}
                                        <input
                                            type='file'
                                            accept='image/*'
                                            className='hidden'
                                            onChange={e => {
                                                const f = e.target.files?.[0]
                                                if (f) handleFileUpload(f, url => setEventForm(prev => ({ ...prev, image: url })))
                                                e.target.value = ''
                                            }}
                                            disabled={uploading}
                                        />
                                    </label>
                                    <button type='button' onClick={() => setImagePickerFor('event')} className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center gap-2 cursor-pointer whitespace-nowrap'>
                                        <FaImages /> Gallery
                                    </button>
                                </div>
                                <div className='md:col-span-2'>
                                    <textarea
                                        placeholder='Description'
                                        value={eventForm.description}
                                        onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))}
                                        className='w-full px-3 py-2 border rounded-lg'
                                        rows={2}
                                    />
                                </div>
                                <input
                                    type='date'
                                    placeholder='Date'
                                    value={eventForm.date}
                                    onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                />
                                <input
                                    placeholder='Time (e.g. 6:00 PM - 10:00 PM)'
                                    value={eventForm.time}
                                    onChange={e => setEventForm(f => ({ ...f, time: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                />
                                <input
                                    placeholder='Location'
                                    value={eventForm.location}
                                    onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg md:col-span-2'
                                />
                            </div>
                            <div className='flex gap-2 mt-4'>
                                <button
                                    onClick={handleSaveEvent}
                                    disabled={eventSaving}
                                    className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50'
                                >
                                    {eventSaving ? 'Saving...' : (editingEvent ? 'Update' : 'Create')}
                                </button>
                                {editingEvent && (
                                    <button onClick={resetEventForm} className='bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg cursor-pointer'>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Events Table */}
                        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                            {eventsList.length === 0 ? (
                                <div className='p-8 text-center'>
                                    <FaCalendarAlt className='text-gray-300 text-5xl mx-auto mb-4' />
                                    <p className='text-gray-500'>No events yet. Add one above or run <code className='bg-gray-100 px-1'>npm run db:seed</code> to seed sample events.</p>
                                </div>
                            ) : (
                                <div className='overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead className='bg-gray-50'>
                                            <tr className='text-left text-gray-500 text-sm'>
                                                <th className='px-6 py-4'>Event</th>
                                                <th className='px-6 py-4'>Date</th>
                                                <th className='px-6 py-4 hidden md:table-cell'>Location</th>
                                                <th className='px-6 py-4'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventsList.map((e) => (
                                                <tr key={e.id} className='border-b last:border-0 hover:bg-gray-50'>
                                                    <td className='px-6 py-4'>
                                                        <p className='font-medium text-gray-800'>{e.title}</p>
                                                        <p className='text-xs text-gray-500 line-clamp-1'>{e.time}</p>
                                                    </td>
                                                    <td className='px-6 py-4 text-gray-600'>{new Date(e.date).toLocaleDateString('en-US')}</td>
                                                    <td className='px-6 py-4 text-gray-600 hidden md:table-cell line-clamp-1'>{e.location}</td>
                                                    <td className='px-6 py-4'>
                                                        <div className='flex items-center gap-2'>
                                                            <button onClick={() => startEditEvent(e)} className='p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer' title='Edit'><FaEdit /></button>
                                                            <button onClick={() => handleDeleteEvent(e.id)} className='p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer' title='Delete'><FaTrash /></button>
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

                {activeTab === 'products' && (
                    <div>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Products</h1>
                                <p className='text-gray-600'>Manage shop products</p>
                            </div>
                            <button
                                onClick={() => { resetProductForm(); setEditingProduct(null); }}
                                className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer'
                            >
                                <FaPlus />
                                <span className='hidden md:inline'>Add Product</span>
                            </button>
                        </div>

                        {/* Add/Edit Form */}
                        <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
                            <h2 className='text-lg font-bold text-gray-800 mb-4'>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <input
                                    placeholder='Product name'
                                    value={productForm.name}
                                    onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                />
                                <div className='flex flex-wrap gap-2'>
                                    <input
                                        placeholder='Image URL or upload from device'
                                        value={productForm.image}
                                        onChange={e => setProductForm(f => ({ ...f, image: e.target.value }))}
                                        className='flex-1 min-w-[200px] px-3 py-2 border rounded-lg'
                                    />
                                    <label className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 cursor-pointer whitespace-nowrap'>
                                        <FaUpload /> {uploading ? 'Uploading...' : 'Upload'}
                                        <input type='file' accept='image/*' className='hidden' onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(f, url => setProductForm(prev => ({ ...prev, image: url }))); e.target.value = '' }} disabled={uploading} />
                                    </label>
                                    <button type='button' onClick={() => setImagePickerFor('product')} className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center gap-2 cursor-pointer whitespace-nowrap'>
                                        <FaImages /> Gallery
                                    </button>
                                </div>
                                <div className='md:col-span-2'>
                                    <textarea
                                        placeholder='Description'
                                        value={productForm.description}
                                        onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))}
                                        className='w-full px-3 py-2 border rounded-lg'
                                        rows={2}
                                    />
                                </div>
                                <input
                                    type='number'
                                    placeholder='Price (GH₵)'
                                    value={productForm.price}
                                    onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                />
                                <select
                                    value={productForm.category}
                                    onChange={e => setProductForm(f => ({ ...f, category: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                >
                                    {['Prospectus', 'Study Guide', 'Manual', 'Merchandise'].map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder='Level (e.g. Year 1, All Years)'
                                    value={productForm.level}
                                    onChange={e => setProductForm(f => ({ ...f, level: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                />
                                <input
                                    type='number'
                                    placeholder='Stock'
                                    value={productForm.stock}
                                    onChange={e => setProductForm(f => ({ ...f, stock: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                />
                                <label className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        checked={productForm.inStock}
                                        onChange={e => setProductForm(f => ({ ...f, inStock: e.target.checked }))}
                                    />
                                    <span>In stock</span>
                                </label>
                            </div>
                            <div className='flex gap-2 mt-4'>
                                <button
                                    onClick={handleSaveProduct}
                                    disabled={productSaving}
                                    className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50'
                                >
                                    {productSaving ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
                                </button>
                                {editingProduct && (
                                    <button onClick={resetProductForm} className='bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg cursor-pointer'>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Products Table */}
                        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                            {products.length === 0 ? (
                                <div className='p-8 text-center'>
                                    <FaShoppingCart className='text-gray-300 text-5xl mx-auto mb-4' />
                                    <p className='text-gray-500'>No products yet. Add one above or run <code className='bg-gray-100 px-1'>npm run db:seed</code> to seed sample products.</p>
                                </div>
                            ) : (
                                <div className='overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead className='bg-gray-50'>
                                            <tr className='text-left text-gray-500 text-sm'>
                                                <th className='px-6 py-4'>Product</th>
                                                <th className='px-6 py-4'>Category</th>
                                                <th className='px-6 py-4'>Price</th>
                                                <th className='px-6 py-4 hidden md:table-cell'>Stock</th>
                                                <th className='px-6 py-4'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((p) => (
                                                <tr key={p.id} className='border-b last:border-0 hover:bg-gray-50'>
                                                    <td className='px-6 py-4'>
                                                        <p className='font-medium text-gray-800'>{p.name}</p>
                                                        <p className='text-xs text-gray-500'>{p.level}</p>
                                                    </td>
                                                    <td className='px-6 py-4 text-gray-600'>{p.category}</td>
                                                    <td className='px-6 py-4 text-gray-600'>GH₵{Number(p.price).toFixed(2)}</td>
                                                    <td className='px-6 py-4 text-gray-600 hidden md:table-cell'>{p.stock}</td>
                                                    <td className='px-6 py-4'>
                                                        <div className='flex items-center gap-2'>
                                                            <button onClick={() => startEditProduct(p)} className='p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer' title='Edit'><FaEdit /></button>
                                                            <button onClick={() => handleDeleteProduct(p.id)} className='p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer' title='Delete'><FaTrash /></button>
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

                {activeTab === 'orders' && (
                    <div>
                        <div className='mb-6'>
                            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Orders</h1>
                            <p className='text-gray-600'>Manage shop orders</p>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                            {orders.length === 0 ? (
                                <div className='p-8 text-center'>
                                    <FaShoppingBag className='text-gray-300 text-5xl mx-auto mb-4' />
                                    <p className='text-gray-500'>No orders yet</p>
                                </div>
                            ) : (
                                <div className='overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead className='bg-gray-50'>
                                            <tr className='text-left text-gray-500 text-sm'>
                                                <th className='px-6 py-4'>Order</th>
                                                <th className='px-6 py-4'>Customer</th>
                                                <th className='px-6 py-4'>Total</th>
                                                <th className='px-6 py-4'>Status</th>
                                                <th className='px-6 py-4'>Date</th>
                                                <th className='px-6 py-4'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((o) => (
                                                <tr key={o.id} className='border-b last:border-0 hover:bg-gray-50'>
                                                    <td className='px-6 py-4 font-mono text-sm'>{o.id.slice(0, 8)}...</td>
                                                    <td className='px-6 py-4'>
                                                        <p className='font-medium text-gray-800'>{o.user?.firstName} {o.user?.lastName}</p>
                                                        <p className='text-xs text-gray-500'>{o.user?.studentId}</p>
                                                    </td>
                                                    <td className='px-6 py-4 font-medium'>GH₵{Number(o.total).toFixed(2)}</td>
                                                    <td className='px-6 py-4'>
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                            o.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                                            o.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                                                            o.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                        }`}>{o.status}</span>
                                                    </td>
                                                    <td className='px-6 py-4 text-gray-600 text-sm'>{new Date(o.createdAt).toLocaleDateString()}</td>
                                                    <td className='px-6 py-4'>
                                                        <select
                                                            value={o.status}
                                                            onChange={(e) => handleOrderStatus(o.id, e.target.value)}
                                                            className='text-sm border rounded px-2 py-1 cursor-pointer'
                                                        >
                                                            <option value='PENDING'>PENDING</option>
                                                            <option value='CONFIRMED'>CONFIRMED</option>
                                                            <option value='DELIVERED'>DELIVERED</option>
                                                            <option value='CANCELLED'>CANCELLED</option>
                                                        </select>
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

                {activeTab === 'gallery' && (
                    <div>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Gallery</h1>
                                <p className='text-gray-600'>Manage photo gallery</p>
                            </div>
                            <button onClick={resetGalleryForm} className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer'>
                                <FaPlus />
                                <span className='hidden md:inline'>Add Photo</span>
                            </button>
                        </div>

                        {/* Add/Edit Form */}
                        <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
                            <h2 className='text-lg font-bold text-gray-800 mb-4'>{editingGallery ? 'Edit Image' : 'Add Image'}</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='flex flex-wrap gap-2'>
                                    <input
                                        placeholder='Image URL or upload from device'
                                        value={galleryForm.url}
                                        onChange={e => setGalleryForm(f => ({ ...f, url: e.target.value }))}
                                        className='flex-1 min-w-[200px] px-3 py-2 border rounded-lg'
                                    />
                                    <label className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 cursor-pointer whitespace-nowrap'>
                                        <FaUpload /> {uploading ? 'Uploading...' : 'Upload'}
                                        <input type='file' accept='image/*' className='hidden' onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(f, url => setGalleryForm(prev => ({ ...prev, url }))); e.target.value = '' }} disabled={uploading} />
                                    </label>
                                </div>
                                <input
                                    placeholder='Title'
                                    value={galleryForm.title}
                                    onChange={e => setGalleryForm(f => ({ ...f, title: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                />
                                <select
                                    value={galleryForm.category}
                                    onChange={e => setGalleryForm(f => ({ ...f, category: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                >
                                    {['Campus Life', 'Academics', 'Events', 'Leadership', 'Branding'].map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex gap-2 mt-4'>
                                <button onClick={handleSaveGallery} disabled={gallerySaving} className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50'>
                                    {gallerySaving ? 'Saving...' : (editingGallery ? 'Update' : 'Add')}
                                </button>
                                {editingGallery && <button onClick={resetGalleryForm} className='bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg cursor-pointer'>Cancel</button>}
                            </div>
                        </div>

                        {/* Gallery Grid */}
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            {galleryImages.length === 0 ? (
                                <div className='text-center py-12'>
                                    <FaImages className='text-gray-300 text-5xl mx-auto mb-4' />
                                    <p className='text-gray-500'>No gallery images. Add one above or run <code className='bg-gray-100 px-1'>npm run db:seed</code></p>
                                </div>
                            ) : (
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                                    {galleryImages.map((img) => (
                                        <div key={img.id} className='relative group'>
                                            <div className='aspect-square rounded-lg overflow-hidden bg-gray-100'>
                                                <Image src={img.url} alt={img.title} width={150} height={150} className='w-full h-full object-cover' />
                                            </div>
                                            <p className='text-sm font-medium text-gray-800 mt-1 truncate'>{img.title}</p>
                                            <p className='text-xs text-gray-500'>{img.category}</p>
                                            <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                                                <button onClick={() => startEditGallery(img)} className='p-1.5 bg-blue-500 text-white rounded cursor-pointer'><FaEdit className='text-xs' /></button>
                                                <button onClick={() => handleDeleteGallery(img.id)} className='p-1.5 bg-red-500 text-white rounded cursor-pointer'><FaTrash className='text-xs' /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div>
                        <div className='mb-6'>
                            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Contact Messages</h1>
                            <p className='text-gray-600'>Messages from the contact form</p>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                            {contactMessages.length === 0 ? (
                                <div className='p-8 text-center'>
                                    <FaEnvelope className='text-gray-300 text-5xl mx-auto mb-4' />
                                    <p className='text-gray-500'>No messages yet</p>
                                </div>
                            ) : (
                                <div className='divide-y'>
                                    {contactMessages.map((m) => (
                                        <div key={m.id} className={`p-6 hover:bg-gray-50 ${!m.read ? 'bg-blue-50/50' : ''}`}>
                                            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
                                                <div>
                                                    <div className='flex items-center gap-2'>
                                                        <p className='font-semibold text-gray-800'>{m.name}</p>
                                                        <span className='text-gray-400'>•</span>
                                                        <a href={`mailto:${m.email}`} className='text-blue-600 hover:underline text-sm'>{m.email}</a>
                                                        {!m.read && <span className='bg-blue-500 text-white text-xs px-2 py-0.5 rounded'>New</span>}
                                                    </div>
                                                    <p className='font-medium text-gray-700 mt-1'>{m.subject}</p>
                                                    <p className='text-gray-600 text-sm mt-2 whitespace-pre-wrap'>{m.message}</p>
                                                    <p className='text-gray-400 text-xs mt-2'>{new Date(m.createdAt).toLocaleString()}</p>
                                                </div>
                                                <div className='flex gap-2 flex-shrink-0'>
                                                    {!m.read && (
                                                        <button onClick={() => handleMarkRead(m.id)} className='px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded text-sm cursor-pointer'>Mark read</button>
                                                    )}
                                                    <button onClick={() => handleDeleteContact(m.id)} className='p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer' title='Delete'><FaTrash /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                            <button onClick={resetNewsForm} className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer'>
                                <FaPlus />
                                <span className='hidden md:inline'>New Article</span>
                            </button>
                        </div>

                        {/* Add/Edit Form */}
                        <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
                            <h2 className='text-lg font-bold text-gray-800 mb-4'>{editingNews ? 'Edit Article' : 'Add Article'}</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <input
                                    placeholder='Title'
                                    value={newsForm.title}
                                    onChange={e => setNewsForm(f => ({ ...f, title: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                />
                                <div className='flex flex-wrap gap-2'>
                                    <input
                                        placeholder='Image URL or upload from device'
                                        value={newsForm.image}
                                        onChange={e => setNewsForm(f => ({ ...f, image: e.target.value }))}
                                        className='flex-1 min-w-[200px] px-3 py-2 border rounded-lg'
                                    />
                                    <label className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 cursor-pointer whitespace-nowrap'>
                                        <FaUpload /> {uploading ? 'Uploading...' : 'Upload'}
                                        <input type='file' accept='image/*' className='hidden' onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(f, url => setNewsForm(prev => ({ ...prev, image: url }))); e.target.value = '' }} disabled={uploading} />
                                    </label>
                                    <button type='button' onClick={() => setImagePickerFor('news')} className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center gap-2 cursor-pointer whitespace-nowrap'>
                                        <FaImages /> Gallery
                                    </button>
                                </div>
                                <select
                                    value={newsForm.category}
                                    onChange={e => setNewsForm(f => ({ ...f, category: e.target.value }))}
                                    className='px-3 py-2 border rounded-lg'
                                >
                                    {['Announcement', 'Achievement', 'News', 'Partnership', 'Volunteer'].map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <label className='flex items-center gap-2'>
                                    <input type='checkbox' checked={newsForm.published} onChange={e => setNewsForm(f => ({ ...f, published: e.target.checked }))} />
                                    <span>Published</span>
                                </label>
                                <div className='md:col-span-2'>
                                    <textarea placeholder='Excerpt (short summary)' value={newsForm.excerpt} onChange={e => setNewsForm(f => ({ ...f, excerpt: e.target.value }))} className='w-full px-3 py-2 border rounded-lg' rows={2} />
                                </div>
                                <div className='md:col-span-2'>
                                    <textarea placeholder='Content (full article)' value={newsForm.content} onChange={e => setNewsForm(f => ({ ...f, content: e.target.value }))} className='w-full px-3 py-2 border rounded-lg' rows={5} />
                                </div>
                            </div>
                            <div className='flex gap-2 mt-4'>
                                <button onClick={handleSaveNews} disabled={newsSaving} className='bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50'>
                                    {newsSaving ? 'Saving...' : (editingNews ? 'Update' : 'Create')}
                                </button>
                                {editingNews && <button onClick={resetNewsForm} className='bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg cursor-pointer'>Cancel</button>}
                            </div>
                        </div>

                        {/* Articles Table */}
                        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                            {newsArticles.length === 0 ? (
                                <div className='p-8 text-center'>
                                    <MdArticle className='text-gray-300 text-5xl mx-auto mb-4' />
                                    <p className='text-gray-500'>No articles yet. Add one above or run <code className='bg-gray-100 px-1'>npm run db:seed</code></p>
                                </div>
                            ) : (
                                <div className='overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead className='bg-gray-50'>
                                            <tr className='text-left text-gray-500 text-sm'>
                                                <th className='px-6 py-4'>Title</th>
                                                <th className='px-6 py-4'>Category</th>
                                                <th className='px-6 py-4 hidden md:table-cell'>Status</th>
                                                <th className='px-6 py-4'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newsArticles.map((a) => (
                                                <tr key={a.id} className='border-b last:border-0 hover:bg-gray-50'>
                                                    <td className='px-6 py-4'><p className='font-medium text-gray-800'>{a.title}</p></td>
                                                    <td className='px-6 py-4 text-gray-600'>{a.category}</td>
                                                    <td className='px-6 py-4 hidden md:table-cell'>{a.published ? <span className='text-green-600'>Published</span> : <span className='text-gray-500'>Draft</span>}</td>
                                                    <td className='px-6 py-4'>
                                                        <div className='flex gap-2'>
                                                            <button onClick={() => startEditNews(a)} className='p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer'><FaEdit /></button>
                                                            <button onClick={() => handleDeleteNews(a.id)} className='p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer'><FaTrash /></button>
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
            </div>

            {/* Image Picker Modal */}
            {imagePickerFor && (
                <div className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4' onClick={() => setImagePickerFor(null)}>
                    <div className='bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col' onClick={e => e.stopPropagation()}>
                        <div className='flex items-center justify-between p-4 border-b'>
                            <h3 className='font-bold text-gray-800'>Select from gallery</h3>
                            <button onClick={() => setImagePickerFor(null)} className='p-2 hover:bg-gray-100 rounded cursor-pointer'><FaTimes /></button>
                        </div>
                        <div className='p-4 overflow-y-auto flex-1'>
                            {galleryImages.length === 0 ? (
                                <p className='text-gray-500 text-center py-8'>No images in gallery. Add images in the Gallery tab first.</p>
                            ) : (
                                <div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
                                    {galleryImages.map((img) => (
                                        <button
                                            key={img.id}
                                            type='button'
                                            onClick={() => {
                                                if (imagePickerFor === 'product') setProductForm(f => ({ ...f, image: img.url }))
                                                if (imagePickerFor === 'event') setEventForm(f => ({ ...f, image: img.url }))
                                                if (imagePickerFor === 'news') setNewsForm(f => ({ ...f, image: img.url }))
                                                setImagePickerFor(null)
                                            }}
                                            className='aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-green-600 hover:shadow-md transition-all cursor-pointer'
                                        >
                                            <Image src={img.url} alt={img.title} width={120} height={120} className='w-full h-full object-cover' />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page
