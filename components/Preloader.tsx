'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PreloaderProps {
  onComplete: () => void
  progress: number
}

export default function Preloader({ onComplete, progress }: PreloaderProps) {
  const [backgroundFading, setBackgroundFading] = useState(false)
  const [textFading, setTextFading] = useState(false)
  const [showingButton, setShowingButton] = useState(false)

  // Timeline: 100% loaded -> wait 2s -> fade bg -> wait 2s -> fade text -> wait 2s -> show button -> complete
  useEffect(() => {
    if (progress >= 100) {
      // 2 seconds after 100%, start fading background
      const bgFadeTimer = setTimeout(() => setBackgroundFading(true), 2000)
      
      // 4 seconds after 100% (2s + 2s fade), start fading text
      const textFadeTimer = setTimeout(() => setTextFading(true), 4000)
      
      // 6 seconds after 100% (4s + 2s fade), show button and complete
      const buttonTimer = setTimeout(() => {
        setShowingButton(true)
        onComplete()
      }, 6000)

      return () => {
        clearTimeout(bgFadeTimer)
        clearTimeout(textFadeTimer)
        clearTimeout(buttonTimer)
      }
    }
  }, [progress, onComplete])

  const taglineOpacity = progress / 100

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-[2000ms] ease-out pointer-events-none ${
        textFading ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden={textFading}
    >
      {/* Black overlay - fades after 2s of being at 100% */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-[2000ms] ease-out ${
          backgroundFading ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Content - stays visible until separate fade */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        {/* Logo - 67.5% mobile (10% smaller than 3/4), 25% desktop (50% smaller than 1/2) */}
        <Image
          src="/images/wild-coast-logo.webp"
          alt="Wild Coast Tours"
          width={300}
          height={300}
          className="w-[67.5%] md:w-1/4 h-auto mb-6"
          priority
        />

        {/* Subtitle - fades in with progress, doesn't fade out until later */}
        <p 
          className="text-lg md:text-xl mb-8 max-w-md transition-opacity duration-300"
          style={{ opacity: taglineOpacity }}
        >
          Authentic Eco-Tourism Experiences<br />in Mpondoland
        </p>

        {/* Progress bar - only visible while loading */}
        {progress < 100 && (
          <div className="w-48 md:w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#F7931A] transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
