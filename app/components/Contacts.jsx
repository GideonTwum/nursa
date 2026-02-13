'use client'
import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Contacts = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus('error')
      return
    }
    setSending(true)
    setStatus(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setForm({ name: '', email: '', subject: '', message: '' })
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-green-900 px-4 py-12' id='contacts'>
      <div className='flex items-center flex-col text-center'>
         <h1 className='text-white font-bold text-2xl md:text-3xl lg:text-4xl'>Get In <span className='text-yellow-500'>touch</span></h1>
         <p className='text-white text-sm mt-2'>We'd love to hear from you.</p>
        <div className='h-[4px] mt-4 bg-yellow-500 w-16 md:w-20'></div>
      </div>
      <div className='mt-8 md:mt-10 flex flex-col md:flex-row gap-4 w-full max-w-4xl'>
        <div className='flex flex-col gap-4 flex-1'>
            <div className='flex bg-green-500/30 p-4 md:p-5 rounded-lg w-full items-center gap-4'>
              <div className='p-2 bg-green-300/10 flex-shrink-0'>
                  <MdEmail className='text-xl md:text-2xl text-yellow-500'/>
              </div>
              <div>
                <p className='text-white text-sm'>Email</p>
                <p className='text-white text-sm break-all'>nursavvu@gmail.com</p>
              </div>
            </div>

            <div className='flex bg-green-500/30 p-4 md:p-5 rounded-lg w-full items-center gap-4'>
              <div className='p-2 bg-green-300/10 flex-shrink-0'>
                <FaPhoneAlt className='text-xl md:text-2xl text-yellow-500'/>
              </div>
              <div>
                <p className='text-white text-sm'>Phone</p>
                <p className='text-white text-sm'>+233 (0) 54 811 2339</p>
              </div>
            </div>

            <div className='flex bg-green-500/30 p-4 md:p-5 rounded-lg w-full items-center gap-4'>
              <div className='p-2 bg-green-300/10 flex-shrink-0'>
                  <FaLocationDot className='text-xl md:text-2xl text-yellow-500'/>
              </div>
              <div>
                <p className='text-white text-sm'>Location</p>
                <p className='text-white text-sm'>Oyibi, Accra</p>
              </div>
            </div>
        </div>

        <div className='flex-1 md:flex-none md:w-auto'>
            <div className='flex flex-col bg-green-500/30 p-4 md:p-5 rounded-lg w-full md:w-auto gap-4'>  
              <div>
                <p className='text-white text-lg md:text-xl'>Follow Us</p>
              </div>
              <div className='p-2 flex gap-4 flex-wrap'>
                  <FaTiktok className='text-xl md:text-2xl text-yellow-500 cursor-pointer hover:scale-110 transition-transform'/>
                  <FaInstagramSquare className='text-xl md:text-2xl text-yellow-500 cursor-pointer hover:scale-110 transition-transform'/>
                  <FaFacebook className='text-xl md:text-2xl text-yellow-500 cursor-pointer hover:scale-110 transition-transform'/>
                  <FaSquareXTwitter className='text-xl md:text-2xl text-yellow-500 cursor-pointer hover:scale-110 transition-transform'/>
              </div>
            </div>          
        </div>
      </div>

      {/* Contact Form */}
      <div className='mt-10 w-full max-w-2xl'>
        <h2 className='text-white font-bold text-xl md:text-2xl mb-4 text-center'>Send us a message</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-green-500/30 p-6 rounded-xl'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <input
              type='text'
              placeholder='Your name'
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className='px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              required
            />
            <input
              type='email'
              placeholder='Your email'
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className='px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              required
            />
          </div>
          <input
            type='text'
            placeholder='Subject'
            value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            className='px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            required
          />
          <textarea
            placeholder='Your message'
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            rows={4}
            className='px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none'
            required
          />
          {status === 'success' && (
            <p className='text-yellow-400 text-sm'>Thank you! Your message has been sent.</p>
          )}
          {status === 'error' && (
            <p className='text-red-300 text-sm'>Something went wrong. Please try again.</p>
          )}
          <button
            type='submit'
            disabled={sending}
            className='bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-70'
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contacts