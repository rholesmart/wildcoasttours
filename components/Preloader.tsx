'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={isFading}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black" />

      {/* Content centered */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        {/* Logo */}
        <Image
          src="/images/wild-coast-logo.webp"
          alt="Wild Coast Tours Logo"
          width={100}
          height={100}
          className="mb-6"
          priority
        />

        {/* Title - always visible */}
        <h1 className="text-3xl md:text-5xl font-bold font-ubuntu mb-4">
          Wild Coast Tours
        </h1>

        {/* Subtitle - fades in with progress */}
        <p
          className="text-lg md:text-xl mb-8 transition-opacity duration-300 max-w-md"
          style={{ opacity: taglineOpacity }}
        >
          Authentic Eco-Tourism Experiences in Mpondoland
        </p>

        {/* Progress bar */}
        <div className="w-48 md:w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#F7931A] transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
