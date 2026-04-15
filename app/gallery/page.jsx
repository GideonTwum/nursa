'use client'
import React, { useState, useEffect } from 'react'
import { FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from "react-icons/fa"

const Page = () => {
  const [galleryImages, setGalleryImages] = useState([])
  const [categories, setCategories] = useState(["All"])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetch('/api/gallery', { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setGalleryImages(
            data.images?.map(img => {
              const d = img.driveUrl
              const driveUrl =
                typeof d === 'string' && d.trim() ? d.trim() : d || null
              return { ...img, src: img.url, driveUrl }
            }) || []
          )
          setCategories(data.categories || ['All'])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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
            {loading ? 'Loading...' : (
              <>Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}</>
            )}
          </p>
        </div>

        {loading ? (
          <div className='flex justify-center py-16'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-700'></div>
          </div>
        ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(index)}
              className='group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer'
            >
              <img
                src={image.src}
                alt={image.title}
                className='absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='absolute bottom-0 left-0 right-0 p-4'>
                  <h3 className='text-white font-semibold text-sm md:text-base'>{image.title}</h3>
                  <span className='text-white/80 text-xs'>{image.category}</span>
                  {image.driveUrl && (
                    <a
                      href={image.driveUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={(e) => e.stopPropagation()}
                      className='mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-300 hover:text-yellow-200 underline-offset-2 hover:underline'
                    >
                      <FaExternalLinkAlt className='text-[10px] shrink-0' />
                      View more (album)
                    </a>
                  )}
                </div>
              </div>
              <div className='absolute top-3 left-3 pointer-events-none'>
                <span className='bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full'>
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        )}

        {!loading && filteredImages.length === 0 && (
          <div className='text-center py-20'>
            <p className='text-gray-500 text-lg'>No photos found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox: column layout so title + link stay above fold and not covered by image layer */}
      {lightboxOpen && (
        <div className='fixed inset-0 bg-black/95 z-50 flex flex-col'>
          <div className='flex justify-end p-3 shrink-0'>
            <button
              type='button'
              onClick={closeLightbox}
              className='text-white/80 hover:text-white text-2xl cursor-pointer p-2'
              aria-label='Close'
            >
              <FaTimes />
            </button>
          </div>

          <div className='flex-1 flex items-center justify-center min-h-0 px-14 md:px-20 relative'>
            <button
              type='button'
              onClick={goToPrevious}
              className='absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-2xl md:text-3xl p-2 hover:bg-white/10 rounded-full z-10'
              aria-label='Previous image'
            >
              <FaChevronLeft />
            </button>
            <img
              src={filteredImages[currentImageIndex]?.src}
              alt={filteredImages[currentImageIndex]?.title}
              className='max-w-full max-h-[min(70vh,100%)] w-auto h-auto object-contain'
            />
            <button
              type='button'
              onClick={goToNext}
              className='absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-2xl md:text-3xl p-2 hover:bg-white/10 rounded-full z-10'
              aria-label='Next image'
            >
              <FaChevronRight />
            </button>
          </div>

          <div className='shrink-0 pb-6 pt-2 px-4 text-center bg-black/40'>
            <h3 className='text-white font-semibold text-lg mb-2'>
              {filteredImages[currentImageIndex]?.title}
            </h3>
            {Boolean(
              filteredImages[currentImageIndex]?.driveUrl &&
                String(filteredImages[currentImageIndex].driveUrl).trim()
            ) && (
              <a
                href={String(filteredImages[currentImageIndex].driveUrl).trim()}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium text-sm transition-colors'
              >
                <FaExternalLinkAlt className='text-xs' />
                View more (album / Drive)
              </a>
            )}
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
