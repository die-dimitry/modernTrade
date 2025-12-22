import React from 'react'

export default function SuccessModal({ isOpen, onClose, message = 'Query has been submitted' }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-black border-2 border-primary rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">{message}</h3>
          <p className="text-gray-300 mb-6">Thank you for your submission!</p>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary-light transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}








