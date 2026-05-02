"use client"

// Scout/hiking style SVG icons
export function CompassIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon fill="currentColor" points="12,2 14,10 12,12 10,10" opacity="0.8" />
      <polygon fill="currentColor" points="12,22 10,14 12,12 14,14" opacity="0.4" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

export function MountainIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21L1 21L8 10L12 15L16 8L23 21L16 21" />
      <path d="M12 15L16 8L20 14" fill="currentColor" opacity="0.2" />
    </svg>
  )
}

export function TrailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 6 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-12z" />
      <path d="M12 6c-2 2-4 4-4 6 0 2.2 1.8 4 4 4s4-1.8 4-4c0-2-2-4-4-6z" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function HikerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="4" r="2.5" />
      <path d="M14.5 8h-5L7 11l1.5 1.5L10 11v3l-3 7h2.5l2-5 2 5H16l-3-7v-3l1.5 1.5L16 11z" />
      <path d="M18 10L18 22" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="9" r="1" />
    </svg>
  )
}

export function CampfireIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19c-3 0-5-2-5-5 0-4 5-9 5-9s5 5 5 9c0 3-2 5-5 5z" fill="currentColor" opacity="0.3" />
      <path d="M12 19c-1.5 0-2.5-1-2.5-2.5 0-2 2.5-4.5 2.5-4.5s2.5 2.5 2.5 4.5c0 1.5-1 2.5-2.5 2.5z" fill="#F7931A" />
      <path d="M8 22L6 19" />
      <path d="M16 22L18 19" />
      <path d="M4 22H20" />
    </svg>
  )
}

export function BinocularsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="16" r="4" />
      <circle cx="18" cy="16" r="4" />
      <path d="M6 12V6a2 2 0 012-2h2" />
      <path d="M18 12V6a2 2 0 00-2-2h-2" />
      <path d="M10 16h4" />
    </svg>
  )
}

export function WaterfallIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6h6l2-4h4l2 4h6" />
      <path d="M4 6c0 4-2 8-2 12h6c0-4-2-8-2-12" fill="currentColor" opacity="0.2" />
      <path d="M8 10v8" />
      <path d="M12 8v10" />
      <path d="M16 10v8" />
      <path d="M20 6c0 4 2 8 2 12h-6c0-4 2-8 2-12" fill="currentColor" opacity="0.2" />
    </svg>
  )
}

export function BackpackIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="8" width="12" height="14" rx="2" />
      <path d="M9 8V5a3 3 0 016 0v3" />
      <path d="M6 12h12" />
      <path d="M10 15h4" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
    </svg>
  )
}
