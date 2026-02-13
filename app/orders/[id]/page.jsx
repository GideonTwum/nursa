'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'

const Page = () => {
  const params = useParams()
  const id = params?.id
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const token = localStorage.getItem('nursa_token')
    if (!token) {
      window.location.href = '/login?redirect=/orders/' + id
      return
    }

    fetch(`/api/orders/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) window.location.href = '/login?redirect=/orders/' + id
          if (res.status === 404) setOrder(null)
          return null
        }
        return res.json()
      })
      .then(data => {
        if (data?.order) setOrder(data.order)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const goHome = () => window.location.href = '/'
  const toOrders = () => window.location.href = '/orders'
  const toShop = () => window.location.href = '/shop'

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-700'></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>Order not found</h1>
        <div className='flex gap-4'>
          <button onClick={toOrders} className='bg-green-700 text-white px-6 py-2 rounded-lg cursor-pointer'>My Orders</button>
          <button onClick={toShop} className='bg-gray-200 text-gray-800 px-6 py-2 rounded-lg cursor-pointer'>Shop</button>
        </div>
      </div>
    )
  }

  const isNew = typeof window !== 'undefined' && sessionStorage.getItem('order_just_placed') === order.id

  if (isNew && typeof window !== 'undefined') {
    sessionStorage.removeItem('order_just_placed')
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-green-900 pt-8 pb-16 px-4'>
        <div className='max-w-4xl mx-auto'>
          <button onClick={toOrders} className='flex items-center gap-2 text-white/80 hover:text-white mb-6 cursor-pointer transition-colors'>
            <FaArrowLeft />
            <span>Back to My Orders</span>
          </button>
          {isNew && (
            <div className='flex items-center gap-2 bg-green-500/30 text-white px-4 py-2 rounded-lg mb-4'>
              <FaCheckCircle className='text-xl' />
              <span className='font-medium'>Order placed successfully!</span>
            </div>
          )}
          <h1 className='text-white text-3xl md:text-4xl font-bold mb-4'>
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h1>
          <div className='flex flex-wrap gap-4 text-white/80 text-sm'>
            <span>Placed {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className={`px-3 py-1 rounded-full font-medium ${
              order.status === 'DELIVERED' ? 'bg-green-500/50' :
              order.status === 'CONFIRMED' ? 'bg-blue-500/50' :
              order.status === 'CANCELLED' ? 'bg-red-500/50' :
              'bg-yellow-500/50 text-gray-900'
            }`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className='max-w-4xl mx-auto px-4 py-10 -mt-6'>
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='p-6 border-b bg-gray-50'>
            <h2 className='font-bold text-gray-800 text-lg mb-2'>Order items</h2>
          </div>
          <div className='divide-y'>
            {order.items?.map((item) => (
              <div key={item.id} className='p-6 flex gap-4'>
                <div className='relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100'>
                  <Image
                    src={item.product?.image || '/images/nursa1.png'}
                    alt={item.product?.name || 'Product'}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <h3 className='font-semibold text-gray-800'>{item.product?.name || 'Product'}</h3>
                  <p className='text-gray-600 text-sm'>Qty: {item.quantity} × GH₵{Number(item.price).toFixed(2)}</p>
                </div>
                <div className='font-semibold text-gray-800'>
                  GH₵{(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className='p-6 bg-green-50 border-t flex justify-between items-center'>
            <span className='font-bold text-gray-800 text-lg'>Total</span>
            <span className='font-bold text-green-900 text-xl'>GH₵{Number(order.total).toFixed(2)}</span>
          </div>
        </div>

        <div className='mt-8 flex gap-4'>
          <button onClick={toShop} className='bg-green-700 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg cursor-pointer transition-colors'>
            Continue Shopping
          </button>
          <button onClick={toOrders} className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg cursor-pointer transition-colors'>
            View All Orders
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
