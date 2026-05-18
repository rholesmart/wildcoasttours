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
    const t1 = setTimeout(() => setOverlayFading(true), 1000)
    const t2 = setTimeout(() => onComplete(), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [progress, onComplete])

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
      {/* Black overlay — fades out once loaded */}
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

      {/* Progress bar */}
      {progress < 100 && (
        <div
          style={{
            position: 'fixed',
            top: '75%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 101,
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