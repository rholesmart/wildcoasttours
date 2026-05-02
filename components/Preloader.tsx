"use client"

import { useState, useEffect } from "react"
import { CompassIcon, HikerIcon } from "./HikingIcons"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [showTagline, setShowTagline] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const duration = 1500

    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min(100, (elapsed / duration) * 100)
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setShowTagline(true)
        setTimeout(() => setIsFading(true), 1200)
        setTimeout(() => onComplete(), 2200)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col transition-all duration-1000 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={isFading}
    >
      {/* Black curtain that fades out */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-out ${
          showTagline ? "opacity-0" : "opacity-100"
        }`} 
      />
      
      {/* Content positioned exactly like hero - centered vertically and horizontally */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center text-white px-4">
        {/* Hiker icon animating */}
        <div className={`mb-6 transition-all duration-700 ${showTagline ? "opacity-0 -translate-y-4" : "opacity-100"}`}>
          <HikerIcon className="w-12 h-12 md:w-16 md:h-16 text-[#F7931A] animate-pulse" />
        </div>

        {/* Title - matches hero h1 exactly */}
        <h1 className="text-3xl md:text-5xl font-bold font-ubuntu flex items-center justify-center gap-2">
          <span>Wild Coast Tours</span>
          {!showTagline && (
            <span className="inline-flex w-10 tracking-widest text-[#F7931A]">
              <span className="dot dot-1">.</span>
              <span className="dot dot-2">.</span>
              <span className="dot dot-3">.</span>
            </span>
          )}
        </h1>

        {/* Progress bar - scout badge style */}
        <div className={`mt-4 flex items-center gap-3 transition-opacity duration-500 ${showTagline ? "opacity-0" : "opacity-100"}`}>
          <CompassIcon className="w-5 h-5 text-white/50" />
          <div className="w-48 md:w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-100 ease-linear bg-[#F7931A]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <CompassIcon className="w-5 h-5 text-white/50" />
        </div>

        {/* Tagline - matches hero p exactly */}
        <p
          className={`mt-6 text-lg md:text-xl transition-all duration-700 ${
            showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
        .dot-1 { animation-delay: 0s; }
        .dot-2 { animation-delay: 0.2s; }
        .dot-3 { animation-delay: 0.4s; }
        @keyframes dot-pulse {
          0%, 60%, 100% { opacity: 0; }
          30% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
