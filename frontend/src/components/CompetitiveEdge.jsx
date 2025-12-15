import React, { useState, useEffect } from 'react'
import { getRandomStockImages } from '../utils/imageUtils'

export default function CompetitiveEdge() {
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(getRandomStockImages(3))
  }, [])

  const features = [
    {
      title: "Informed Guidance",
      description: "Our team of seasoned financial experts and analysts provides unparalleled guidance, drawing from years of experience to ensure well-informed investment decisions.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Unparalleled Support",
      description: "Our customer support team is dedicated and available 24/7 to assist you with any queries or concerns. Committed to your satisfaction, we aim to deliver prompt, reliable, and friendly support whenever you need it.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: "Personalized Plans",
      description: "Recognizing the uniqueness of each investor, we customize our investment strategies to align with your specific goals, risk tolerance, and financial aspirations, maximizing your potential for success.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ]

  return (
    <section id="competitive-edge" className="py-16 sm:py-20 lg:py-24 bg-dark-gray relative overflow-hidden">
      {/* Abstract Design Background */}
      <div className="absolute inset-0 abstract-bg-1"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-white">
            Our <span className="text-primary">Competitive Edge</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            What sets us apart in the financial services industry
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-black to-dark-gray border-2 border-primary/20 rounded-2xl p-8 sm:p-10 hover:border-primary hover:shadow-2xl hover:shadow-primary/30 hover:glow-orange transition-all duration-300 overflow-hidden"
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
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-transparent to-transparent"></div>
              
              {/* Glow Effect */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-300"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-xl border-2 border-primary/30 group-hover:bg-primary/30 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-primary group-hover:text-primary-light transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/5 rounded-tr-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

