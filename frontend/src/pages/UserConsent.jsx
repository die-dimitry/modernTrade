import React, { useRef, useState, useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import axios from 'axios'
import { BRAND_NAME } from '../config/brand'
import PhoneInput from '../components/PhoneInput'
import SuccessModal from '../components/SuccessModal'
import ErrorModal from '../components/ErrorModal'
import { getRandomStockImage } from '../utils/imageUtils'

export default function UserConsent() {
  const sigRef = useRef(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNo: '+91',
    panNumber: '',
    agentName: '',
    acceptTerms: false
  })
  const [phoneCountry, setPhoneCountry] = useState('IN')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [bgImage, setBgImage] = useState('')
  const sigContainerRef = useRef(null)

  useEffect(() => {
    setBgImage(getRandomStockImage())
  }, [])

  useEffect(() => {
    // Fix coordinate mapping by ensuring canvas pixel size matches display size
    // This prevents the drawing offset issue when CSS scales the canvas
    const fixCanvasSize = () => {
      if (sigRef.current && sigContainerRef.current) {
        const container = sigContainerRef.current
        const canvas = sigRef.current.getCanvas()
        
        if (container && canvas) {
          // Get container dimensions accounting for padding
          const rect = container.getBoundingClientRect()
          const padding = 16 // 8px on each side
          const targetWidth = rect.width - padding
          const targetHeight = 150
          
          // Only resize if dimensions are different
          if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            // Save existing content
            const wasEmpty = sigRef.current.isEmpty()
            const savedData = wasEmpty ? null : canvas.toDataURL()
            
            // Set canvas to exact pixel dimensions (no CSS scaling needed)
            canvas.width = targetWidth
            canvas.height = targetHeight
            
            // Restore saved content if it existed
            if (savedData && !wasEmpty) {
              const img = new Image()
              img.onload = () => {
                const ctx = canvas.getContext('2d')
                if (ctx) {
                  ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
                }
              }
              img.src = savedData
            }
          }
        }
      }
    }
    
    // Initialize after render
    const timer = setTimeout(fixCanvasSize, 100)
    
    // Update on window resize
    window.addEventListener('resize', fixCanvasSize)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', fixCanvasSize)
    }
  }, [])

  function clearSig() {
    sigRef.current?.clear()
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    let processedValue = value
    
    // PAN Number validation: uppercase, alphanumeric, max 10 characters, no spaces
    if (name === 'panNumber') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }))
  }

  function handlePhoneChange(field, e) {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    
    // Validate full name
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      setErrorMessage('Please enter a valid full name (at least 2 characters)')
      setShowErrorModal(true)
      return
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      setShowErrorModal(true)
      return
    }
    
    // Validate phone number
    const phoneWithoutSpaces = formData.phoneNo.replace(/\s/g, '')
    if (!phoneWithoutSpaces || phoneWithoutSpaces.length < 4) {
      setErrorMessage('Please enter a valid phone number')
      setShowErrorModal(true)
      return
    }
    
    // Validate PAN number
    if (!formData.panNumber || formData.panNumber.length !== 10) {
      setErrorMessage('Please enter a valid 10-character PAN Card Number')
      setShowErrorModal(true)
      return
    }
    
    // Validate file upload
    if (!file) {
      setErrorMessage('Please upload your Aadhar Card')
      setShowErrorModal(true)
      return
    }
    
    // Validate file size (8MB max)
    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('File size must be less than 8MB')
      setShowErrorModal(true)
      return
    }
    
    // Validate signature
    if (!sigRef.current || sigRef.current.isEmpty()) {
      setErrorMessage('Please sign the consent form')
      setShowErrorModal(true)
      return
    }
    
    // Validate terms acceptance
    if (!formData.acceptTerms) {
      setErrorMessage('Please accept the terms and conditions')
      setShowErrorModal(true)
      return
    }

    const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL('image/png')
    const form = new FormData()
    form.append('fullName', formData.fullName)
    form.append('email', formData.email)
    form.append('phoneNo', formData.phoneNo)
    form.append('panNumber', formData.panNumber)
    form.append('agentName', formData.agentName)
    if (file) form.append('aadhar', file)
    form.append('signature', dataUrl)

    try {
      setLoading(true)
      const base = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'
      await axios.post(`${base}/consent/submit`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setShowSuccessModal(true)
      // Reset form
      setFormData({ fullName: '', email: '', phoneNo: '+91', panNumber: '', agentName: '', acceptTerms: false })
      setFile(null)
      sigRef.current?.clear()
    } catch (err) {
      console.error(err)
      let errorMsg = 'Error submitting consent form. Please try again.'
      
      if (err.response) {
        const serverError = err.response.data?.error || err.response.data?.message
        if (serverError) {
          errorMsg = serverError
        } else if (err.response.status === 400) {
          errorMsg = 'Please check your form data and try again.'
        } else if (err.response.status === 500) {
          errorMsg = 'Server error. Please try again later.'
        }
      } else if (err.request) {
        errorMsg = 'Unable to connect to server. Please check your internet connection.'
      }
      
      setErrorMessage(errorMsg)
      setShowErrorModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Disclaimer Banner */}
        <div className="mb-6 overflow-hidden bg-red-900/20 border-2 border-red-500/50 rounded-lg p-4">
          <div className="flex animate-scroll whitespace-nowrap">
            <span className="text-red-400 font-bold text-sm sm:text-base inline-block px-4">
              ⚠️ Investment in the stock market is subject to market risk, we DO NOT offer any guaranteed profit services or Fixed Returns Services. We DO NOT provide any assurance or guarantee of profit or returns with any of our services. Trading in the Stock Market may result in Partial or Complete loss of Gains as well as Initial Capital. Before taking our Research Alerts Services. any services of Dealwisepro firm, Clients should read carefully the Disclaimer, Legal disclaimer, terms and conditions, refund policy and other policies of our company. We do not provide any recommendation or any services through Telegram/ Instagram/Etc . We DO NOT accept payment of Research Alerts Service fee in any personal or Individual bank account, all payments made should be done in Dealwisepro current account only. Investing and Trading in stock market is risky. It Involves both profit and loss, Due to leverage both profit and loss are exaggerated, our research service gives research alerts for trading ideas in which both target and stop loss is mentioned, however execution of trade is solely the responsibility of the client. We DO NOT provide any trade execution services. All our research alerts are to be considered only as a reference tool and clients should not consider our research alerts as Personal Investment/Trading Advice in any condition. We DO NOT take any responsibility for any losses that the User may incur ⚠️
            </span>
            <span className="text-red-400 font-bold text-sm sm:text-base inline-block px-4">
              ⚠️ Investment in the stock market is subject to market risk, we DO NOT offer any guaranteed profit services or Fixed Returns Services. We DO NOT provide any assurance or guarantee of profit or returns with any of our services. Trading in the Stock Market may result in Partial or Complete loss of Gains as well as Initial Capital. Before taking our Research Alerts Services. any services of Dealwisepro firm, Clients should read carefully the Disclaimer, Legal disclaimer, terms and conditions, refund policy and other policies of our company. We do not provide any recommendation or any services through Telegram/ Instagram/Etc . We DO NOT accept payment of Research Alerts Service fee in any personal or Individual bank account, all payments made should be done in Dealwisepro current account only. Investing and Trading in stock market is risky. It Involves both profit and loss, Due to leverage both profit and loss are exaggerated, our research service gives research alerts for trading ideas in which both target and stop loss is mentioned, however execution of trade is solely the responsibility of the client. We DO NOT provide any trade execution services. All our research alerts are to be considered only as a reference tool and clients should not consider our research alerts as Personal Investment/Trading Advice in any condition. We DO NOT take any responsibility for any losses that the User may incur ⚠️
            </span>
          </div>
        </div>

        {/* Document Header */}
        <div className="bg-dark-gray border-2 border-primary/30 rounded-lg p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b-2 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-black text-xl sm:text-2xl font-black">MT</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">{BRAND_NAME}</h1>
                <p className="text-sm sm:text-base text-gray-400">User Consent & Acknowledgement</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm text-gray-400">Document ID: {Date.now().toString().slice(-8)}</p>
              <p className="text-xs sm:text-sm text-gray-400">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Consent Details Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">Consent Details</h2>
              <div className="bg-light-gray/50 p-4 sm:p-6 rounded-lg border border-primary/20 space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                <p className="font-semibold text-primary">Investment Disclaimer:</p>
                <p>Investment in the stock market is subject to market risk, we DO NOT offer any guaranteed profit services or Fixed Returns Services. We DO NOT provide any assurance or guarantee of profit or returns with any of our services. Trading in the Stock Market may result in Partial or Complete loss of Gains as well as Initial Capital.</p>
                
                <p className="font-semibold text-primary mt-4">Company Policies:</p>
                <p>Before taking our Research Alerts Services & any services of {BRAND_NAME} firm, Clients should read carefully the Disclaimer, Legal disclaimer, terms and conditions, refund policy and other policies of our company. We do not provide any recommendation or any services through Telegram/ Instagram/Etc. We DO NOT accept payment of Research Alerts Service fee in any personal or Individual bank account, all payments made should be done in {BRAND_NAME} current account only.</p>
                
                <p className="font-semibold text-primary mt-4">Risk Acknowledgment:</p>
                <p>Investing and Trading in stock market is risky. It Involves both profit and loss, Due to leverage both profit and loss are exaggerated, our research service gives research alerts for trading ideas in which both target and stop loss is mentioned, however execution of trade is solely the responsibility of the client. We DO NOT provide any trade execution services.</p>
                
                <p className="font-semibold text-primary mt-4">Terms Acceptance:</p>
                <p>By visiting/Using/accessing our website and/or our official mobile application and by making payment for a subscription of any of our research services, you are agreeing to be bound by the following terms and conditions and all other terms and conditions, Legal Disclaimer, Disclosures, Policies and User Consent of {BRAND_NAME} firm mentioned on our official website.</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-dark-gray/80 p-6 sm:p-8 rounded-lg border-2 border-primary/30">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">Consent Form</h2>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">All fields are mandatory. Upload must be .jpg, .png, .jpeg, .heic, or .pdf (max 8MB). Signature and acceptance are required before submission.</p>
              
              <form onSubmit={onSubmit} noValidate className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-3 bg-black border-2 border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-black border-2 border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone No. <span className="text-primary">*</span>
                  </label>
                  <PhoneInput
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={(e) => handlePhoneChange('phoneNo', e)}
                    country={phoneCountry}
                    onCountryChange={setPhoneCountry}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    PAN Card Number <span className="text-primary">*</span>
                    <span className="text-xs text-gray-400 block mt-1">10 characters, alphanumeric only</span>
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border-2 border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition uppercase"
                    placeholder="ABCDE1234F"
                    maxLength={10}
                  />
                  {formData.panNumber && formData.panNumber.length !== 10 && (
                    <p className="text-xs text-red-400 mt-1">PAN must be exactly 10 characters</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    name="agentName"
                    value={formData.agentName}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border-2 border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Aadhar Card <span className="text-primary">*</span>
                    <span className="text-xs text-gray-400 block mt-1">(.jpg, .png, .jpeg, .heic, .pdf, max 8MB)</span>
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.png,.jpeg,.heic,.pdf"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="w-full p-3 bg-black border-2 border-dashed border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black file:cursor-pointer hover:file:bg-primary-light"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Please Sign Here To Confirm Acceptance of our Terms and Conditions <span className="text-primary">*</span>
                  </label>
                  <div 
                    ref={sigContainerRef}
                    className="signature-box mt-2 bg-white rounded-lg p-2 border-2 border-gray-700"
                    onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
                    onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
                    onTouchStart={(e) => e.currentTarget.classList.add('hover')}
                    onTouchEnd={(e) => e.currentTarget.classList.remove('hover')}
                  >
                    <div className="w-full" style={{ position: 'relative', height: '150px' }}>
                      <SignatureCanvas
                        ref={sigRef}
                        penColor="black"
                        backgroundColor="white"
                        canvasProps={{
                          width: 500,
                          height: 150,
                          className: 'sig-canvas',
                          style: { 
                            touchAction: 'none',
                            display: 'block'
                          }
                        }}
                        clearOnResize={false}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearSig}
                    className="mt-3 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition text-sm font-medium"
                  >
                    Clear Signature
                  </button>
                </div>

                <div className="flex items-start gap-3 p-4 bg-black/50 rounded-lg border border-primary/20">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-primary bg-black border-gray-700 rounded focus:ring-primary focus:ring-2"
                  />
                  <label htmlFor="acceptTerms" className="text-sm sm:text-base text-gray-300 flex-1">
                    I accept Terms and Conditions and agree to User Consent Terms Mentioned above <span className="text-primary font-semibold">(Yes, I Agree)</span>
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-light transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    {loading ? 'Submitting...' : 'Submit Consent'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  )
}
