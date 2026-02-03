'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"

const galleryImages = [
  {
    id: 1,
    src: "/images/nursa1.png",
    title: "NURSA Students in Action",
    category: "Campus Life"
  },
  {
    id: 2,
    src: "/images/nursa2.png",
    title: "Clinical Training Session",
    category: "Academics"
  },
  {
    id: 3,
    src: "/images/nursa3.png",
    title: "Student Group Photo",
    category: "Campus Life"
  },
  {
    id: 4,
    src: "/images/nursa4.png",
    title: "Nursing Skills Practice",
    category: "Academics"
  },
  {
    id: 5,
    src: "/images/dinner.png",
    title: "Annual Dinner & Awards",
    category: "Events"
  },
  {
    id: 6,
    src: "/images/presido.png",
    title: "NURSA President",
    category: "Leadership"
  },
  {
    id: 7,
    src: "/images/nursabg.png",
    title: "Campus Grounds",
    category: "Campus Life"
  },
  {
    id: 8,
    src: "/images/nursalogo.jpg",
    title: "NURSA Official Logo",
    category: "Branding"
  }
]

const categories = ["All", "Campus Life", "Academics", "Events", "Leadership", "Branding"]

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    )
  }

  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-green-900 pt-8 pb-16 px-4'>
        <div className='max-w-6xl mx-auto'>
          <button 
            onClick={goHome}
            className='flex items-center gap-2 text-white/80 hover:text-white mb-6 cursor-pointer transition-colors'
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
          <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>
            Photo Gallery
          </h1>
          <p className='text-white/80 text-sm md:text-base max-w-2xl'>
            Explore memorable moments from NURSA events, campus life, and academic activities.
          </p>
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

      {/* Gallery Grid */}
      <div className='max-w-6xl mx-auto px-4 py-10'>
        <div className='mb-6'>
          <p className='text-gray-600'>
            Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {filteredImages.map((image, index) => (
            <div 
              key={image.id}
              onClick={() => openLightbox(index)}
              className='group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer'
            >
              <Image 
                src={image.src}
                alt={image.title}
                fill
                className='object-cover group-hover:scale-110 transition-transform duration-500'
              />
              {/* Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='absolute bottom-0 left-0 right-0 p-4'>
                  <h3 className='text-white font-semibold text-sm md:text-base'>{image.title}</h3>
                  <span className='text-white/80 text-xs'>{image.category}</span>
                </div>
              </div>
              {/* Category Badge */}
              <div className='absolute top-3 left-3'>
                <span className='bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full'>
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className='text-center py-20'>
            <p className='text-gray-500 text-lg'>No photos found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className='fixed inset-0 bg-black/95 z-50 flex items-center justify-center'>
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className='absolute top-4 right-4 text-white/80 hover:text-white text-2xl cursor-pointer z-10 p-2'
          >
            <FaTimes />
          </button>

          {/* Previous Button */}
          <button 
            onClick={goToPrevious}
            className='absolute left-4 text-white/80 hover:text-white text-3xl cursor-pointer z-10 p-2 hover:bg-white/10 rounded-full transition-colors'
          >
            <FaChevronLeft />
          </button>

          {/* Image */}
          <div className='relative w-full h-full max-w-4xl max-h-[80vh] mx-4'>
            <Image 
              src={filteredImages[currentImageIndex]?.src}
              alt={filteredImages[currentImageIndex]?.title}
              fill
              className='object-contain'
            />
          </div>

          {/* Next Button */}
          <button 
            onClick={goToNext}
            className='absolute right-4 text-white/80 hover:text-white text-3xl cursor-pointer z-10 p-2 hover:bg-white/10 rounded-full transition-colors'
          >
            <FaChevronRight />
          </button>

          {/* Image Info */}
          <div className='absolute bottom-8 left-0 right-0 text-center'>
            <h3 className='text-white font-semibold text-lg mb-1'>
              {filteredImages[currentImageIndex]?.title}
            </h3>
            <p className='text-white/60 text-sm'>
              {currentImageIndex + 1} of {filteredImages.length}
            </p>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className='bg-green-900 py-12 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h3 className='text-white text-2xl md:text-3xl font-bold mb-4'>
            Share Your Photos
          </h3>
          <p className='text-white/80 mb-6 max-w-lg mx-auto'>
            Have photos from NURSA events you'd like to share? Send them to us and they might be featured in our gallery!
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
