'use client'

import { useState, useEffect } from 'react'

interface PreloaderProps {
  onComplete: () => void
  progress: number
}

export default function Preloader({ onComplete, progress }: PreloaderProps) {
  const [backgroundFading, setBackgroundFading] = useState(false)
  const [subtitleFading, setSubtitleFading] = useState(false)

  // Timeline: 100% loaded -> wait 1s -> fade bg -> wait 1s -> fade subtitle -> complete
  useEffect(() => {
    if (progress >= 100) {
      // 1 second after 100%, start fading background
      const bgFadeTimer = setTimeout(() => setBackgroundFading(true), 1000)
      
      // 2 seconds after 100% (1s + 1s fade), start fading subtitle
      const subtitleTimer = setTimeout(() => setSubtitleFading(true), 2000)
      
      // 3 seconds after 100%, complete preloader
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 3000)

      return () => {
        clearTimeout(bgFadeTimer)
        clearTimeout(subtitleTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [progress, onComplete])

  const taglineOpacity = progress / 100

  return (
    <>
      {/* Black overlay - only the background fades */}
      <div
        className={`fixed inset-0 z-[100] bg-black transition-opacity duration-[1000ms] ease-out pointer-events-none ${
          backgroundFading ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Subtitle text only - fades in with progress, then fades out */}
      <div className="fixed inset-0 z-[101] h-full flex items-center justify-center text-center text-white px-4 pointer-events-none">
        <p 
          className={`text-lg md:text-xl max-w-md transition-opacity duration-[1000ms] ease-out ${
            subtitleFading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ 
            opacity: subtitleFading ? 0 : taglineOpacity,
            transitionDuration: subtitleFading ? '1000ms' : '300ms'
          }}
        >
          Authentic Eco-Tourism Experiences<br />in Mpondoland
        </p>

        {/* Progress bar - only visible while loading */}
        {progress < 100 && (
          <div className="absolute top-1/2 w-48 md:w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#F7931A] transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </>
  )
}
