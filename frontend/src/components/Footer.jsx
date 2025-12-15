import React from 'react'
import { Link } from 'react-router-dom'
import { BRAND_NAME, BRAND_ADDRESS, BRAND_PHONE, BRAND_EMAIL } from '../config/brand'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-dark-gray to-black py-12 sm:py-16 border-t-2 border-primary/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 abstract-bg-1 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 text-primary drop-shadow-lg">{BRAND_NAME}</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Your Premium Market Analysis Service in India
            </p>
            <div className="mt-4 w-16 h-1 bg-primary"></div>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-white text-sm sm:text-base">Firm</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li><Link to="/" className="hover:text-primary transition">About {BRAND_NAME}</Link></li>
              <li><Link to="/lets-talk" className="hover:text-primary transition">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-white text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li><Link to="/user-consent" className="hover:text-primary transition">User Consent</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-primary transition">Terms and Conditions</Link></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-white text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>Address: {BRAND_ADDRESS}</li>
              <li>Phone: {BRAND_PHONE}</li>
              <li>Email: {BRAND_EMAIL}</li>
              <li>Hours: 9AM to 6PM (Mon – Fri)</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t-2 border-primary/30 pt-8 sm:pt-10 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            © {new Date().getFullYear()} <span className="text-primary font-semibold">{BRAND_NAME}</span>. All Rights Reserved
          </p>
          <p className="text-xs text-gray-500 mt-2">Designed with precision for your financial success</p>
        </div>
      </div>
    </footer>
  )
}

