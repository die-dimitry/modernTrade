import React, { useState, useEffect } from 'react'
import { BRAND_NAME } from '../config/brand'
import { getRandomStockImages } from '../utils/imageUtils'

export default function About() {
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(getRandomStockImages(2))
  }, [])

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-black relative overflow-hidden">
      {/* Abstract Design Background */}
      <div className="absolute inset-0 abstract-bg-2"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-white">
            Who We <span className="text-primary">Are?</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Image Section */}
          <div className="relative group">
            {images[0] && (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${images[0]})`,
                    filter: 'brightness(0.7) contrast(1.1) saturate(1.2)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-16 h-1 bg-primary mb-4"></div>
                  <p className="text-white font-semibold text-lg">Expert Financial Guidance</p>
                </div>
              </div>
            )}
            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-dark-gray to-black border-2 border-primary/20 rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Trusted Partner</h3>
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                  Meet <span className="text-primary font-semibold">{BRAND_NAME}</span>, a trusted name in finance offering a range of services like stock market investments, intraday trading, equity transactions, and options trading. Whether you're a seasoned investor or new to finance, {BRAND_NAME} provides tailored strategies and reliable guidance.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mt-4">
                  Known for expertise and commitment, we help clients navigate the stock market complexities, ensuring your investments are handled with precision. With a solid reputation for trust and results, {BRAND_NAME} is your reliable partner in achieving financial success in the dynamic world of trading and investments.
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-gray/50 border border-primary/20 rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-primary mb-2">10+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="bg-dark-gray/50 border border-primary/20 rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-primary mb-2">1000+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

