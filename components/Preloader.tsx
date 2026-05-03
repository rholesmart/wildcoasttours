"use client"

import { useState, useEffect } from "react"

interface PreloaderProps {
  onComplete: () => void
  progress: number
}

export default function Preloader({ onComplete, progress }: PreloaderProps) {
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (progress >= 100 && !isFading) {
      // Start fade out after a short delay
      const fadeTimer = setTimeout(() => setIsFading(true), 500)
      // Complete and remove after fade
      const removeTimer = setTimeout(() => onComplete(), 1500)
      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(removeTimer)
      }
    }
  }, [progress, isFading, onComplete])

  // Calculate tagline opacity based on progress (0-100% progress = 0-100% opacity)
  const taglineOpacity = progress / 100

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-1000 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={isFading}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Content centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        {/* Progress bar at top */}
        <div className="absolute top-32 w-48 md:w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#F7931A] transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tagline - fades in with progress */}
        <p
          className="text-lg md:text-xl transition-opacity duration-300"
          style={{ opacity: taglineOpacity }}
        >
          Authentic Eco-Tourism Experiences in Mpondoland
        </p>


      </div>
    </div>
  )
}
