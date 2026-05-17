'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PreloaderProps {
  onComplete: () => void
  progress: number
}

export default function Preloader({ onComplete, progress }: PreloaderProps) {
  const [overlayFading, setOverlayFading] = useState(false)
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [showButton, setShowButton] = useState(false)

  // Timeline: 100% loaded -> wait 1s -> fade overlay (1s transition)
  //           -> wait 1s -> switch tagline to button -> complete
  useEffect(() => {
    if (progress < 100) return

    const t1 = setTimeout(() => setOverlayFading(true), 1000)  // start fading overlay
    const t2 = setTimeout(() => setShowButton(true), 2000)     // swap tagline -> button
    const t3 = setTimeout(() => {
      setPreloaderDone(true)
      onComplete()
    }, 3000)                                                    // signal parent

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
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

  // Once the full sequence is done, render nothing — parent can unmount safely
  if (preloaderDone) return null

  const taglineOpacity = progress / 100

  return (
    <>
      {/* Black overlay — fades out after loading completes */}
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

      {/* Logo — sits above overlay at all times, never fades */}
      <div
        style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          textAlign: 'center',
          pointerEvents: 'none',
          width: '50vw',
          maxWidth: '300px',
        }}
      >
        <Image
          src="/images/wild-coast-logo.webp"
          alt="Wild Coast Tours"
          width={300}
          height={300}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          priority
        />
      </div>

      {/* Text / CTA — transitions from tagline to button */}
      <div
        style={{
          position: 'fixed',
          top: '75%',
          left: 0,
          right: 0,
          zIndex: 9999,
          textAlign: 'center',
          color: 'white',
          width: '100%',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        {!showButton ? (
          // Tagline fades in as progress increases, hidden once button takes over
          <p
            style={{
              fontSize: '1.125rem',
              opacity: taglineOpacity,
              transition: 'opacity 300ms ease-out',
              maxWidth: '448px',
              margin: '0 auto',
              pointerEvents: 'none',
            }}
            className="md:text-xl"
          >
            Authentic Eco-Tourism Experiences
            <br />
            in Mpondoland
          </p>
        ) : (
          // CTA fades in when overlay finishes
          <div style={{ animation: 'fadeIn 1000ms ease-out forwards' }}>
            <Link href="/booking">
              <button
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'white',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 300ms ease-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F7931A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
              >
                Book Your Adventure
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Progress bar — hidden once at 100% */}
      {progress < 100 && (
        <div
          style={{
            position: 'fixed',
            top: '66.666%',
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
          className="md:w-64"
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