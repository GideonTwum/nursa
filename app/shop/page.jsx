'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaArrowLeft, FaShoppingCart, FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa"
import { MdLocalShipping } from "react-icons/md"

const products = [
  {
    id: 1,
    name: "Nursing Fundamentals Prospectus",
    description: "Complete guide covering basic nursing principles, patient care fundamentals, and essential clinical skills for first-year students.",
    price: 45.00,
    image: "/images/nursa1.png",
    category: "Prospectus",
    level: "Year 1",
    inStock: true
  },
  {
    id: 2,
    name: "Clinical Procedures Manual",
    description: "Step-by-step illustrated guide for common clinical procedures including vital signs, medication administration, and wound care.",
    price: 55.00,
    image: "/images/nursa2.png",
    category: "Manual",
    level: "Year 1-2",
    inStock: true
  },
  {
    id: 3,
    name: "Pharmacology Study Guide",
    description: "Comprehensive pharmacology reference covering drug classifications, dosage calculations, and nursing implications.",
    price: 60.00,
    image: "/images/nursa3.png",
    category: "Study Guide",
    level: "Year 2",
    inStock: true
  },
  {
    id: 4,
    name: "Midwifery Essentials Prospectus",
    description: "Specialized guide for midwifery students covering prenatal care, labor management, and postpartum nursing.",
    price: 50.00,
    image: "/images/nursa4.png",
    category: "Prospectus",
    level: "Year 2-3",
    inStock: true
  },
  {
    id: 5,
    name: "Medical-Surgical Nursing Guide",
    description: "Advanced study material covering care of patients with medical and surgical conditions across various body systems.",
    price: 65.00,
    image: "/images/dinner.png",
    category: "Study Guide",
    level: "Year 3",
    inStock: true
  },
  {
    id: 6,
    name: "NURSA Scrubs (Top & Bottom)",
    description: "Official NURSA branded scrubs in green. Comfortable, durable, and professional for clinical rotations.",
    price: 80.00,
    image: "/images/nursabg.png",
    category: "Merchandise",
    level: "All Years",
    inStock: true
  },
  {
    id: 7,
    name: "Anatomy & Physiology Atlas",
    description: "Detailed anatomical illustrations and physiological explanations essential for understanding human body systems.",
    price: 70.00,
    image: "/images/nursa1.png",
    category: "Study Guide",
    level: "Year 1",
    inStock: false
  },
  {
    id: 8,
    name: "NURSA Lab Coat",
    description: "Professional white lab coat with NURSA embroidery. Required for laboratory sessions and clinical visits.",
    price: 45.00,
    image: "/images/nursa2.png",
    category: "Merchandise",
    level: "All Years",
    inStock: true
  }
]

const categories = ["All", "Prospectus", "Study Guide", "Manual", "Merchandise"]

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-green-900 pt-8 pb-16 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex justify-between items-start'>
            <div>
              <button 
                onClick={goHome}
                className='flex items-center gap-2 text-white/80 hover:text-white mb-6 cursor-pointer transition-colors'
              >
                <FaArrowLeft />
                <span>Back to Home</span>
              </button>
              <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>
                NURSA Shop
              </h1>
              <p className='text-white/80 text-sm md:text-base max-w-2xl'>
                Get your nursing prospectus, study guides, and official NURSA merchandise here.
              </p>
            </div>
            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className='relative bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full cursor-pointer transition-colors'
            >
              <FaShoppingCart className='text-xl' />
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold'>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className='max-w-6xl mx-auto px-4 -mt-6'>
        <div className='bg-white rounded-xl shadow-lg p-3 flex flex-wrap gap-2'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors cursor-pointer ${
                selectedCategory === category 
                  ? 'bg-green-700 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Free Shipping Banner */}
      <div className='max-w-6xl mx-auto px-4 mt-6'>
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3'>
          <MdLocalShipping className='text-yellow-600 text-2xl' />
          <p className='text-yellow-800 text-sm'>
            <span className='font-semibold'>Free campus delivery</span> on orders over GH₵100!
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className='max-w-6xl mx-auto px-4 py-10'>
        <div className='mb-6'>
          <p className='text-gray-600'>
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col'
            >
              <div className='relative w-full h-48'>
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className='object-cover'
                />
                {!product.inStock && (
                  <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                    <span className='bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className='absolute top-3 left-3'>
                  <span className='bg-green-700 text-white text-xs font-medium px-2 py-1 rounded-full'>
                    {product.level}
                  </span>
                </div>
              </div>
              <div className='p-4 flex flex-col flex-1'>
                <span className='text-yellow-600 text-xs font-semibold mb-1'>{product.category}</span>
                <h3 className='text-green-900 font-bold text-base mb-2 line-clamp-2'>{product.name}</h3>
                <p className='text-gray-600 text-sm line-clamp-2 flex-1 mb-3'>{product.description}</p>
                <div className='flex items-center justify-between mt-auto'>
                  <span className='text-green-900 font-bold text-xl'>GH₵{product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => product.inStock && addToCart(product)}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      product.inStock 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className='fixed inset-0 z-50'>
          {/* Overlay */}
          <div 
            className='absolute inset-0 bg-black/50'
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          {/* Cart Panel */}
          <div className='absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col'>
            {/* Cart Header */}
            <div className='bg-green-900 p-4 flex items-center justify-between'>
              <h2 className='text-white text-xl font-bold flex items-center gap-2'>
                <FaShoppingCart />
                Your Cart ({cartCount})
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className='text-white/80 hover:text-white cursor-pointer'
              >
                <FaTimes className='text-xl' />
              </button>
            </div>

            {/* Cart Items */}
            <div className='flex-1 overflow-y-auto p-4'>
              {cart.length === 0 ? (
                <div className='text-center py-10'>
                  <FaShoppingCart className='text-gray-300 text-5xl mx-auto mb-4' />
                  <p className='text-gray-500'>Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className='mt-4 text-green-700 font-medium hover:underline cursor-pointer'
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className='space-y-4'>
                  {cart.map((item) => (
                    <div key={item.id} className='flex gap-3 bg-gray-50 rounded-lg p-3'>
                      <div className='relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden'>
                        <Image 
                          src={item.image}
                          alt={item.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='text-green-900 font-semibold text-sm line-clamp-1'>{item.name}</h4>
                        <p className='text-yellow-600 font-bold text-sm mt-1'>GH₵{item.price.toFixed(2)}</p>
                        <div className='flex items-center gap-2 mt-2'>
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className='w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center cursor-pointer'
                          >
                            <FaMinus className='text-xs' />
                          </button>
                          <span className='text-sm font-medium w-8 text-center'>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className='w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center cursor-pointer'
                          >
                            <FaPlus className='text-xs' />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className='ml-auto text-red-500 hover:text-red-600 cursor-pointer'
                          >
                            <FaTrash className='text-sm' />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className='border-t p-4 space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='text-green-900 font-bold text-xl'>GH₵{cartTotal.toFixed(2)}</span>
                </div>
                {cartTotal >= 100 && (
                  <p className='text-green-600 text-sm flex items-center gap-1'>
                    <MdLocalShipping /> You qualify for free campus delivery!
                  </p>
                )}
                <button className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer'>
                  Proceed to Checkout
                </button>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className='w-full text-green-700 font-medium py-2 hover:underline cursor-pointer'
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className='bg-green-900 py-12 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h3 className='text-white text-2xl md:text-3xl font-bold mb-4'>
            Need Help Finding Materials?
          </h3>
          <p className='text-white/80 mb-6 max-w-lg mx-auto'>
            Contact us if you can't find what you're looking for or need recommendations for your year of study.
          </p>
          <button 
            onClick={() => window.location.href = '/#contacts'}
            className='bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-3 rounded-lg transition-colors cursor-pointer'
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
