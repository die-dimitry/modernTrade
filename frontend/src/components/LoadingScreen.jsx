import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../../loading.json'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="w-48 h-48 sm:w-56 sm:h-56">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <p className="mt-4 text-white text-lg font-semibold tracking-wide">
        Loading Modern Trade...
      </p>
    </div>
  )
}


