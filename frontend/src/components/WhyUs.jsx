import React, { useState, useEffect } from 'react'
import { getRandomStockImages } from '../utils/imageUtils'

export default function WhyUs() {
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(getRandomStockImages(4))
  }, [])

  const features = [
    {
      title: "Aligned Incentives",
      description: "Our success is directly tied to your success. We're committed to your financial growth.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Experienced Traders",
      description: "Our team consists of seasoned professionals with years of market expertise.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: "Transparent Reporting",
      description: "Complete transparency in all transactions and clear, detailed reporting.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Secure Custody",
      description: "Your investments are protected with industry-leading security measures.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ]

  return (
    <section id="whyus" className="py-16 sm:py-20 lg:py-24 bg-dark-gray relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 abstract-bg-1"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-white">
            Why <span className="text-primary">Choose Us?</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Discover what makes us the preferred choice for investors seeking excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-black to-dark-gray border-2 border-primary/20 rounded-2xl p-6 sm:p-8 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden"
            >
              {/* Background Image */}
              {images[index] && (
                <div 
                  className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url(${images[index]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.5)'
                  }}
                />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-tr-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
