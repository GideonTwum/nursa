'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaArrowLeft, FaShoppingBag } from 'react-icons/fa'

const Page = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('nursa_token')
    if (!token) {
      window.location.href = '/login?redirect=/orders'
      return
    }

    fetch('/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) window.location.href = '/login?redirect=/orders'
          return null
        }
        return res.json()
      })
      .then(data => {
        if (data?.orders) setOrders(data.orders)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const goHome = () => window.location.href = '/'
  const toShop = () => window.location.href = '/shop'

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-green-900 pt-8 pb-16 px-4'>
        <div className='max-w-4xl mx-auto'>
          <button
            onClick={goHome}
            className='flex items-center gap-2 text-white/80 hover:text-white mb-6 cursor-pointer transition-colors'
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
          <h1 className='text-white text-3xl md:text-4xl font-bold mb-4'>
            My Orders
          </h1>
          <p className='text-white/80 text-sm md:text-base'>
            View and track your NURSA shop orders
          </p>
        </div>
      </div>

      <div className='max-w-4xl mx-auto px-4 py-10'>
        {loading ? (
          <div className='flex justify-center py-16'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-700'></div>
          </div>
        ) : orders.length === 0 ? (
          <div className='bg-white rounded-xl shadow-sm p-12 text-center'>
            <FaShoppingBag className='text-gray-300 text-6xl mx-auto mb-4' />
            <h2 className='text-xl font-bold text-gray-800 mb-2'>No orders yet</h2>
            <p className='text-gray-600 mb-6'>Browse our shop to find nursing materials and NURSA merchandise.</p>
            <button
              onClick={toShop}
              className='bg-green-700 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer'
            >
              Go to Shop
            </button>
          </div>
        ) : (
          <div className='space-y-4'>
            {orders.map((order) => (
              <a
                key={order.id}
                href={`/orders/${order.id}`}
                className='block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100'
              >
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                  <div>
                    <p className='font-mono text-sm text-gray-500 mb-1'>Order #{order.id.slice(0, 8).toUpperCase()}</p>
                    <p className='font-bold text-gray-800 text-lg'>GH₵{Number(order.total).toFixed(2)}</p>
                    <p className='text-gray-600 text-sm mt-1'>
                      {order.items?.length} item{order.items?.length !== 1 ? 's' : ''} •{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                      order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                    <span className='text-green-600 font-medium'>View →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
