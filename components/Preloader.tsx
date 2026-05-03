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
        {/* Logo - 75% mobile, 50% desktop */}
        <Image
          src="/images/wild-coast-logo.webp"
          alt="Wild Coast Tours"
          width={300}
          height={300}
          className="w-3/4 md:w-1/2 h-auto mb-6"
          priority
        />

        {/* Subtitle - always visible, never fades */}
        <p className="text-lg md:text-xl mb-8 max-w-md">
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
