import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BRAND_NAME, BRAND_TAGLINE } from '../config/brand'
import { getRandomStockImage } from '../utils/imageUtils'

export default function Hero() {
  const [heroImage, setHeroImage] = useState('')

  useEffect(() => {
    setHeroImage(getRandomStockImage())
  }, [])

  return (
    <section id="home" className="relative min-h-[90vh] sm:min-h-[95vh] flex items-center bg-cover bg-center overflow-hidden">
      {/* Dynamic Background Image */}
      {heroImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.3) contrast(1.2) saturate(1.1)'
          }}
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      
      {/* Animated Design Elements */}
      <div className="absolute inset-0 abstract-bg-1"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s', transform: 'translate(-50%, -50%)'}}></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 z-10">
        <div className="max-w-4xl">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-primary text-sm font-semibold backdrop-blur-sm">
              Trusted Financial Partner
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 sm:mb-8 text-white drop-shadow-2xl">
            {BRAND_NAME} <span className="text-primary bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">{BRAND_TAGLINE}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 sm:mb-10 leading-relaxed font-light drop-shadow-lg">
            Explore {BRAND_NAME}, your reliable source for valuable stock market insights! Our team of experts is ready to assist you with personalized tips and strategies, unveiling the hidden secrets of the Indian market.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
            <Link 
              to="/lets-talk" 
              className="group px-8 sm:px-10 py-4 sm:py-5 bg-primary text-black font-bold rounded-xl hover:bg-primary-light hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 text-center text-base sm:text-lg relative overflow-hidden"
            >
              <span className="relative z-10">Learn more</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              to="/lets-talk" 
              className="group px-8 sm:px-10 py-4 sm:py-5 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/10 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 text-center text-base sm:text-lg backdrop-blur-sm"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}

