import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BRAND_NAME } from '../config/brand'

export default function Header() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-primary/30 shadow-lg shadow-primary/5 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-2xl sm:text-3xl font-black text-white hover:text-primary transition group">
          <span className="group-hover:drop-shadow-[0_0_10px_rgba(255,107,53,0.5)] transition-all">
            {BRAND_NAME}
          </span>
        </Link>
        <nav className="w-full sm:w-auto">
          <ul className="flex gap-4 sm:gap-6 items-center justify-center sm:justify-end">
            <li>
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg transition ${
                  isActive('/') 
                    ? 'bg-primary text-black font-semibold' 
                    : 'text-white hover:text-primary hover:bg-primary/10'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/lets-talk" 
                className={`px-4 py-2 rounded-lg transition ${
                  isActive('/lets-talk') 
                    ? 'bg-primary text-black font-semibold' 
                    : 'text-white hover:text-primary hover:bg-primary/10'
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link 
                to="/user-consent" 
                className={`px-4 py-2 rounded-lg transition ${
                  isActive('/user-consent') 
                    ? 'bg-primary text-black font-semibold' 
                    : 'text-white hover:text-primary hover:bg-primary/10'
                }`}
              >
                User Consent
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

