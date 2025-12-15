import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactSection() {
  return (
    <section id="contact-section" className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Get in Touch <span className="text-primary">With Us</span>
        </h2>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-primary">Start Your Live Demo Today</h3>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Allow our seasoned team to navigate you toward success in the stock market.
        </p>
        <Link to="/lets-talk" className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-light transition inline-block text-sm sm:text-base">
          Get Live Demo
        </Link>
      </div>
    </section>
  )
}

