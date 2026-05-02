"use client"

import { useState, useEffect } from "react"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [showTagline, setShowTagline] = useState(false)
  const [isFading, setIsFading] = useState(false)

  // Progress bar animation - completes in ~1.2s
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const duration = 1200

    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min(100, (elapsed / duration) * 100)
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        // Reveal tagline once bar is full
        setShowTagline(true)
        // Then fade out the curtain so the real hero takes over
        setTimeout(() => setIsFading(true), 900)
        setTimeout(() => onComplete(), 1700)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={isFading}
    >
      {/* Centered content - matches hero section position */}
      <div className="text-center text-white px-4 w-full max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold font-ubuntu inline-flex items-baseline justify-center">
          <span>Wild Coast Tours</span>
          {!showTagline && (
            <span className="ml-1 inline-block w-8 text-left tracking-widest text-[#F7931A]">
              <span className="dot dot-1">.</span>
              <span className="dot dot-2">.</span>
              <span className="dot dot-3">.</span>
            </span>
          )}
        </h1>

        {/* Progress bar directly under title */}
        <div className="mt-4 mx-auto w-48 md:w-64 h-1 bg-white/15 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%`, backgroundColor: "#F7931A" }}
          />
        </div>

        {/* Tagline - same position as hero tagline */}
        <p
          className={`mt-6 text-lg md:text-xl text-white/90 transition-opacity duration-500 ${
            showTagline ? "opacity-100" : "opacity-0"
          }`}
        >
          Authentic Eco-Tourism Experiences in Mpondoland
        </p>
      </div>

      <style jsx>{`
        .dot {
          opacity: 0;
          animation: dot-pulse 1.2s infinite;
        }
        .dot-1 {
          animation-delay: 0s;
        }
        .dot-2 {
          animation-delay: 0.2s;
        }
        .dot-3 {
          animation-delay: 0.4s;
        }
        @keyframes dot-pulse {
          0%, 60%, 100% {
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
