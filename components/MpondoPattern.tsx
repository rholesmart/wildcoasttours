"use client"

const ACCENT_COLOR = "#F7931A"

export function MpondoPatternTop() {
  return (
    <div className="w-full h-8 md:h-12 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="mpondoTop" x="0" y="0" width="60" height="48" patternUnits="userSpaceOnUse">
            {/* Traditional Mpondo triangular patterns */}
            <polygon points="0,48 15,0 30,48" fill={ACCENT_COLOR} opacity="0.9" />
            <polygon points="30,48 45,0 60,48" fill="#1B5F8C" opacity="0.8" />
            <polygon points="15,0 30,48 45,0" fill="none" stroke={ACCENT_COLOR} strokeWidth="2" opacity="0.6" />
            {/* Dot accents */}
            <circle cx="15" cy="24" r="3" fill="white" opacity="0.7" />
            <circle cx="45" cy="24" r="3" fill="white" opacity="0.7" />
            {/* Chevron lines */}
            <polyline points="0,36 15,24 30,36" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
            <polyline points="30,36 45,24 60,36" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mpondoTop)" />
      </svg>
    </div>
  )
}

export function MpondoPatternBottom() {
  return (
    <div className="w-full h-8 md:h-12 overflow-hidden rotate-180">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="mpondoBottom" x="0" y="0" width="60" height="48" patternUnits="userSpaceOnUse">
            {/* Traditional Mpondo triangular patterns */}
            <polygon points="0,48 15,0 30,48" fill={ACCENT_COLOR} opacity="0.9" />
            <polygon points="30,48 45,0 60,48" fill="#1B5F8C" opacity="0.8" />
            <polygon points="15,0 30,48 45,0" fill="none" stroke={ACCENT_COLOR} strokeWidth="2" opacity="0.6" />
            {/* Dot accents */}
            <circle cx="15" cy="24" r="3" fill="white" opacity="0.7" />
            <circle cx="45" cy="24" r="3" fill="white" opacity="0.7" />
            {/* Chevron lines */}
            <polyline points="0,36 15,24 30,36" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
            <polyline points="30,36 45,24 60,36" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mpondoBottom)" />
      </svg>
    </div>
  )
}

export function MpondoDivider() {
  return (
    <div className="w-full h-4 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 16"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="mpondoDivider" x="0" y="0" width="32" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="3" fill={ACCENT_COLOR} />
            <circle cx="24" cy="8" r="3" fill="#1B5F8C" />
            <line x1="12" y1="8" x2="20" y2="8" stroke={ACCENT_COLOR} strokeWidth="2" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mpondoDivider)" />
      </svg>
    </div>
  )
}
