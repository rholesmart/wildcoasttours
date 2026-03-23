"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"loading" | "tagline" | "fading" | "cta" | "done">("loading")
  const [isLoaded, setIsLoaded] = useState(false)
  const [bgOpacity, setBgOpacity] = useState(1)

  useEffect(() => {
    // Simulate minimum loading time
    const minLoadTime = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(minLoadTime)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    // Phase 1: Show tagline and start fading background
    setPhase("tagline")
    
    // Start fading the black background slowly
    const fadeStart = setTimeout(() => {
      setBgOpacity(0)
    }, 500)

    // After 6 seconds, fade out the text
    const taglineTimer = setTimeout(() => {
      setPhase("fading")
      
      // After text fades, show CTA and unlock scroll
      setTimeout(() => {
        setPhase("cta")
        onComplete() // Unlock scroll when CTA appears
      }, 1000)
    }, 6000)

    return () => {
      clearTimeout(fadeStart)
      clearTimeout(taglineTimer)
    }
  }, [isLoaded, onComplete])

  useEffect(() => {
    if (phase !== "cta") return

    // Hide preloader completely after showing CTA for 3 seconds
    const ctaTimer = setTimeout(() => {
      setPhase("done")
    }, 3000)

    return () => clearTimeout(ctaTimer)
  }, [phase])

  if (phase === "done") return null

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-[2000ms] ease-out"
      style={{ 
        backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
        pointerEvents: phase === "cta" ? "none" : "auto"
      }}
    >
      {/* Content that fades out */}
      <div 
        className={`flex flex-col items-center justify-center transition-opacity duration-1000 ${
          phase === "fading" || phase === "cta" ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Hiker Icon */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8">
          <Image
            src="/images/hiker-icon.png"
            alt="Wild Coast Tours Hiker"
            fill
            className="object-contain invert"
            priority
          />
        </div>

        {/* Title with animated dots during loading */}
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white font-ubuntu tracking-wide">
            Wild Coast Tours
            {phase === "loading" && (
              <span className="inline-block w-12 text-left">
                <span className="animate-pulse">...</span>
              </span>
            )}
          </h1>

          {/* Tagline - appears after loading */}
          <p 
            className={`mt-4 text-base md:text-xl text-white/90 transition-opacity duration-500 ${
              phase === "tagline" ? "opacity-100" : "opacity-0"
            }`}
          >
            Authentic Eco-Tourism Experiences in Mpondoland
          </p>
        </div>

        {/* Loading indicator */}
        {phase === "loading" && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full animate-loading-bar"
                style={{ backgroundColor: "#F7931A" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Book Your Adventure CTA - appears on fullscreen background */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          phase === "cta" ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: phase === "cta" ? "auto" : "none" }}
      >
        <a 
          href="#booking"
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-white/80 font-ubuntu tracking-wider hover:text-white transition-colors duration-300 text-center px-4 drop-shadow-2xl"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
        >
          Book Your Adventure
        </a>
      </div>
    </div>
  )
}
