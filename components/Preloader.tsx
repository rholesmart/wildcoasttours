'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

  // Lock scroll while preloader is showing
  useEffect(() => {
    if (progress < 100) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [progress])

  const taglineOpacity = progress / 100

  return (
    <>
      {/* Black overlay - fades out */}
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: '100',
          backgroundColor: 'black',
          opacity: backgroundFading ? 0 : 1,
          transition: 'opacity 1000ms ease-out',
          pointerEvents: 'none'
        }}
      />

      {/* Logo Container - always visible, never affected by fades */}
      <div
        style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '101',
          textAlign: 'center',
          pointerEvents: 'none',
          width: '50vw',
          maxWidth: '300px'
        }}
      >
        <Image
          src="/images/wild-coast-logo.webp"
          alt="Wild Coast Tours"
          width={300}
          height={300}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
          priority
        />
      </div>

      {/* Text/Button Container - fades subtitle out, button in */}
      <div
        style={{
          position: 'fixed',
          top: '350px',
          left: '0',
          right: '0',
          zIndex: '101',
          textAlign: 'center',
          color: 'white',
          width: '100%',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        }}
      >
        {/* Subtitle - fades out */}
        {!subtitleFading && (
          <p 
            style={{
              fontSize: '1.125rem',
              opacity: taglineOpacity,
              transition: 'opacity 300ms ease-out',
              maxWidth: '448px',
              margin: '0 auto',
              pointerEvents: 'none'
            }}
            className="md:text-xl"
          >
            Authentic Eco-Tourism Experiences<br />in Mpondoland
          </p>
        )}

        {/* Button - fades in */}
        {subtitleFading && (
          <div style={{ pointerEvents: 'auto', animation: 'fadeIn 1000ms ease-out' }}>
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
                  transition: 'color 300ms ease-out'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#F7931A'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              >
                Book Your Adventure
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Progress bar - fixed at 2/3 height */}
      {progress < 100 && (
        <div
          style={{
            position: 'fixed',
            top: '66.666%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '101',
            width: '12rem',
            height: '0.375rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '9999px',
            overflow: 'hidden',
            pointerEvents: 'none'
          }}
          className="md:w-64"
        >
          <div
            style={{
              height: '100%',
              borderRadius: '9999px',
              backgroundColor: '#F7931A',
              width: `${progress}%`,
              transition: 'width 100ms linear'
            }}
          />
        </div>
      )}
    </>
  )
}
