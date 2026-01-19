'use client'

import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import { useState, useEffect, useRef } from "react"
import slide_1 from '@/assets/images/slide-1.jpg'
import slide_2 from '@/assets/images/slide-2.jpg'
import slide_3 from '@/assets/images/slide-3.jpg'
import Image from "next/image"

const slides = [
  {
    id: 0,
    type: 'video',
    src: '/airplane_takeoff.mp4',
    title: 'Leading Global',
    highlighted: 'Logistics Services',
    description: 'We offer a full range of global freight services with unmatched reliability and speed.',
    color: 'text-primary-400'
  },
  {
    id: 1,
    type: 'image',
    src: slide_1,
    title: 'Fastest & Reliable',
    highlighted: 'Courier Services',
    description: 'We offer a full range of global, ocean-freight services including FCL, LCL and consolidation.',
    color: 'text-primary-400'
  },
  {
    id: 2,
    type: 'image',
    src: slide_2,
    title: 'Professional',
    highlighted: 'Freight Solution',
    description: 'Professional shipping solutions tailored to meet your business needs worldwide.',
    color: 'text-primary-400'
  },
  {
    id: 3,
    type: 'image',
    src: slide_3,
    title: 'Industry Standard',
    highlighted: 'Warehousing',
    description: 'Comprehensive and scalable warehousing solutions for modern businesses.',
    color: 'text-primary-400'
  }
]

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef(null)

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Handle video
  useEffect(() => {
    if (slides[currentSlide].type === 'video' && videoRef.current) {
      setIsVideoLoaded(false)
      videoRef.current.load()
      videoRef.current.oncanplay = () => {
        setIsVideoLoaded(true)
        videoRef.current.play().catch(() => {})
      }
    }
  }, [currentSlide])

  const goToSlide = (index) => setCurrentSlide(index)
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Slides */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {slide.type === 'video' ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src={slide.src} type="video/mp4" />
                </video>

                {!isVideoLoaded && (
                  <div className="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-900 animate-pulse" />
                )}
              </div>
            ) : (
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
            )}
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Hero content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center text-center text-white">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`transition-all duration-1000 ease-in-out ${
              currentSlide === index
                ? 'opacity-100 translate-y-0 block'
                : 'opacity-0 translate-y-10 hidden'
            }`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-up">
              {slide.title}
              <br />
              <span className={slide.color}>{slide.highlighted}</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed animate-fade-up-delay-1">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up-delay-2">
              <Link
                href="/about"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center min-w-[180px]"
              >
                Learn More
              </Link>

              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg inline-flex items-center justify-center min-w-[180px]"
              >
                Contact Us
                <FaArrowRight className="ml-2 inline" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-10' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/50 transition"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/50 transition"
      >
        ❯
      </button>

      {/* Progress bar */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 z-30 bg-gray-700/50">
        <div
          className="h-full bg-primary-400 transition-all duration-1000 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div> */}

    </section>
  )
}

export default HomeHero
