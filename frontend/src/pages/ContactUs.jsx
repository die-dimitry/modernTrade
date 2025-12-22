import React, { useState, useEffect } from 'react'
import { BRAND_NAME, BRAND_ADDRESS, BRAND_PHONE, BRAND_EMAIL } from '../config/brand'
import axios from 'axios'
import PhoneInput from '../components/PhoneInput'
import SuccessModal from '../components/SuccessModal'
import ErrorModal from '../components/ErrorModal'
import { getRandomStockImage } from '../utils/imageUtils'
import { apiBaseUrl } from '../config/api'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '+91',
    email: '',
    message: ''
  })
  const [country, setCountry] = useState('IN')
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [bgImage, setBgImage] = useState('')

  useEffect(() => {
    setBgImage(getRandomStockImage())
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhoneChange = (e) => {
    setFormData(prev => ({
      ...prev,
      mobile: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Client-side validation
    if (!formData.name || formData.name.trim().length < 2) {
      setErrorMessage('Please enter a valid name (at least 2 characters)')
      setShowErrorModal(true)
      return
    }
    
    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      setShowErrorModal(true)
      return
    }
    
    // Validate phone number (must have more than just country code)
    const phoneWithoutSpaces = formData.mobile.replace(/\s/g, '')
    if (!phoneWithoutSpaces || phoneWithoutSpaces.length < 4) {
      setErrorMessage('Please enter a valid phone number')
      setShowErrorModal(true)
      return
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
      setErrorMessage('Please enter a message (at least 10 characters)')
      setShowErrorModal(true)
      return
    }
    
    try {
      setLoading(true)
      const base = apiBaseUrl
      const response = await axios.post(`${base}/contact/submit`, formData, {
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.data.success) {
        // Reset form
        setFormData({ name: '', mobile: '+91', email: '', message: '' })
        setShowSuccessModal(true)
      }
    } catch (err) {
      console.error('Contact form error:', err)
      
      // Show user-friendly error message
      let errorMessage = 'Error submitting form. Please try again.'
      
      if (err.response) {
        // Server responded with error
        const serverError = err.response.data?.error || err.response.data?.message
        if (serverError) {
          errorMessage = serverError
        } else if (err.response.status === 400) {
          errorMessage = 'Please check your form data and try again.'
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later.'
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'Unable to connect to server. Please check your internet connection.'
      }
      
      setErrorMessage(errorMessage)
      setShowErrorModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-black min-h-screen px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Image */}
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: 'brightness(0.25) contrast(1.2) saturate(1.1)'
          }}
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/90"></div>
      
      {/* Abstract Design Background */}
      <div className="absolute inset-0 abstract-bg-1 opacity-50"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center text-white">
          Get in <span className="text-primary">touch</span> with us
        </h1>
        
        <form onSubmit={handleSubmit} noValidate className="bg-dark-gray border-2 border-primary/20 p-6 sm:p-8 lg:p-10 rounded-lg space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-300">
              Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 bg-black border-2 border-gray-700 rounded-lg focus:border-primary focus:outline-none text-white transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-300">
              Mobile <span className="text-primary">*</span>
            </label>
            <PhoneInput
              name="mobile"
              value={formData.mobile}
              onChange={handlePhoneChange}
              country={country}
              onCountryChange={setCountry}
              placeholder="Enter 10 digit phone number"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-300">
              Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 bg-black border-2 border-gray-700 rounded-lg focus:border-primary focus:outline-none text-white transition"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-2 text-gray-300">
              Message <span className="text-primary">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full p-3 sm:p-4 bg-black border-2 border-gray-700 rounded-lg focus:border-primary focus:outline-none text-white transition resize-none"
              placeholder="Enter your message"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-light transition text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

        </form>

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          message="Query has been submitted"
        />

        <ErrorModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          message={errorMessage}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          <div className="bg-dark-gray border-2 border-primary/20 p-6 sm:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-primary">Address</h3>
            <p className="text-sm sm:text-base text-gray-300">
              {BRAND_ADDRESS}
            </p>
          </div>
          <div className="bg-dark-gray border-2 border-primary/20 p-6 sm:p-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-primary">Customer Support</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-2">{BRAND_PHONE}</p>
            <p className="text-sm sm:text-base text-gray-300">{BRAND_EMAIL}</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">9AM to 6PM (Mon – Fri)</p>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="bg-dark-gray border-2 border-primary/20 rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-primary">Find Us</h3>
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden border-2 border-primary/20">
              <iframe
                src={`https://www.google.com/maps?q=21.1899675,72.7944144&hl=en&z=18&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Modern Trade Location"
              ></iframe>
            </div>
            <div className="mt-4">
              <a 
                href="https://www.google.com/maps/place/Titanium+Square/@21.1899675,72.7944144,18.5z/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light text-sm sm:text-base underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
