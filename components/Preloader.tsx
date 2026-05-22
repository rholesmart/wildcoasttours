'use client'

import { useState, useEffect } from 'react'

interface PreloaderProps {
  onComplete: () => void
  progress: number
}

export default function Preloader({ onComplete, progress }: PreloaderProps) {
  const [overlayFading, setOverlayFading] = useState(false)

  useEffect(() => {
    if (progress < 100) return
    // Wait for tagline to finish fading out (600ms), then lift the curtain
    const t1 = setTimeout(() => setOverlayFading(true), 600)
    // onComplete fires after curtain fully fades (600 + 1100ms)
    // Client will then start its own 2s timer before showing the button
    const t2 = setTimeout(() => onComplete(), 1700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [progress, onComplete])

  // Lock scroll while loading
  useEffect(() => {
    const overflow = progress < 100 ? 'hidden' : 'unset'
    document.documentElement.style.overflow = overflow
    document.body.style.overflow = overflow
    return () => {
      document.documentElement.style.overflow = 'unset'
      document.body.style.overflow = 'unset'
    }
  }, [progress])

  return (
    <>
      {/* Black curtain — fades out once progress hits 100% + tagline fades */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          backgroundColor: 'black',
          opacity: overlayFading ? 0 : 1,
          transition: 'opacity 1000ms ease-out',
          pointerEvents: overlayFading ? 'none' : 'auto',
        }}
      />

      {/* Progress bar — visible only while loading */}
      {progress < 100 && (
        <div
          style={{
            position: 'fixed',
            top: '75%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 102,
            width: '12rem',
            height: '0.375rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '9999px',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: '9999px',
              backgroundColor: '#F7931A',
              width: `${progress}%`,
              transition: 'width 100ms linear',
            }}
          />
        </div>
      )}
    </>
  )
}