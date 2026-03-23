"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"loading" | "tagline" | "cta" | "done">("loading")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Simulate minimum loading time and wait for actual load
    const minLoadTime = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(minLoadTime)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    // Phase 1: Show tagline for 6 seconds
    setPhase("tagline")
    
    const taglineTimer = setTimeout(() => {
      setIsFading(true)
      setTimeout(() => {
        setPhase("cta")
        setIsFading(false)
      }, 500)
    }, 6000)

    return () => clearTimeout(taglineTimer)
  }, [isLoaded])

  useEffect(() => {
    if (phase !== "cta") return

    // Show CTA for 2 seconds then complete
    const ctaTimer = setTimeout(() => {
      setIsFading(true)
      setTimeout(() => {
        setPhase("done")
        onComplete()
      }, 800)
    }, 2000)

    return () => clearTimeout(ctaTimer)
  }, [phase, onComplete])

  if (phase === "done") return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-800 ${
        isFading ? "opacity-0" : "opacity-100"
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
        {(phase === "tagline" || (phase === "loading" && isLoaded)) && (
          <p 
            className={`mt-4 text-base md:text-xl text-white/90 transition-opacity duration-500 ${
              phase === "tagline" ? "opacity-100" : "opacity-0"
            }`}
          >
            Authentic Eco-Tourism Experiences in Mpondoland
          </p>
        )}

        {/* CTA - appears after tagline fades */}
        {phase === "cta" && (
          <div className="mt-6 animate-fade-in">
            <span 
              className="inline-block px-8 py-3 rounded-full font-semibold text-lg"
              style={{ backgroundColor: "#F7931A", color: "#1B5F8C" }}
            >
              Book Your Adventure
            </span>
          </div>
        )}
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
  )
}
