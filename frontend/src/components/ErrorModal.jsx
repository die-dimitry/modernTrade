import React from 'react'

export default function ErrorModal({ isOpen, onClose, message = 'An error occurred' }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-black border-2 border-red-500 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Error</h3>
          <p className="text-gray-300 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

