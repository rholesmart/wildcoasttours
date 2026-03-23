'use client'

export default function HikerSVG() {
  return (
    <svg
      viewBox="0 0 100 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-32 h-48 md:w-48 md:h-64 animate-bounce"
    >
      {/* Head */}
      <circle cx="50" cy="25" r="8" fill="white" />
      
      {/* Body */}
      <rect x="46" y="35" width="8" height="35" fill="white" />
      
      {/* Left Arm */}
      <line x1="46" y1="40" x2="35" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round" />
      
      {/* Right Arm (holding pole) */}
      <line x1="54" y1="40" x2="65" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round" />
      
      {/* Hiking Pole */}
      <line x1="65" y1="50" x2="75" y2="90" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="75" cy="92" r="1.5" fill="white" />
      
      {/* Left Leg */}
      <line x1="46" y1="70" x2="40" y2="95" stroke="white" strokeWidth="3" strokeLinecap="round" />
      
      {/* Right Leg */}
      <line x1="54" y1="70" x2="60" y2="95" stroke="white" strokeWidth="3" strokeLinecap="round" />
      
      {/* Left Foot */}
      <line x1="40" y1="95" x2="38" y2="100" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Right Foot */}
      <line x1="60" y1="95" x2="62" y2="100" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Backpack */}
      <rect x="44" y="45" width="12" height="20" fill="white" fillOpacity="0.6" rx="2" />
    </svg>
  )
}
