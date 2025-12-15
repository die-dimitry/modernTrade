import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRandomStockImages } from '../utils/imageUtils'

export default function Process() {
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(getRandomStockImages(2))
  }, [])

  const steps = [
    {
      number: "1",
      title: "Get in touch with us",
      description: "Feel free to reach out to us by completing a simple and convenient form. We look forward to hearing from you!",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      number: "2",
      title: "Start Investing",
      description: "Unlock new possibilities by taking the first step into the world of investment opportunities. Start building your financial future with us.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ]

  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 abstract-bg-2"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-white">
            What's the <span className="text-primary">Process?</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Simple steps to start your investment journey with us
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-dark-gray to-black border-2 border-primary/20 rounded-2xl p-8 sm:p-10 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden"
            >
              {/* Background Image */}
              {images[index] && (
                <div 
                  className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url(${images[index]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.3)'
                  }}
                />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-transparent"></div>
              
              <div className="relative z-10">
                {/* Number Badge */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                    <div className="relative w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/50">
                      <span className="text-4xl font-black text-primary">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                </div>
                
                {/* Icon */}
                <div className="mb-6 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {step.icon}
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/lets-talk" 
            className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-black font-bold rounded-xl hover:bg-primary-light hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 text-lg"
          >
            <span>Get Started</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

