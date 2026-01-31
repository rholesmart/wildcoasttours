"use client"

import { useEffect, useRef } from "react"

const ACCENT_COLOR = "#F7931A"

// Coordinates following the Wild Coast coastline from Port Edward to Port St Johns
const coastlineCoordinates: [number, number][] = [
  [-31.0456, 30.2249], // Port Edward
  [-31.0833, 30.1667], // Mzamba River Mouth
  [-31.1200, 30.1200], // Mtentu River
  [-31.1800, 30.0500], // Msikaba River
  [-31.2500, 29.9800], // Mkambati Nature Reserve
  [-31.2833, 29.9500], // Mkambati Falls
  [-31.3200, 29.9000], // Mfihlelo
  [-31.3600, 29.8500], // Lubanzi
  [-31.4000, 29.8000], // Mbotyi
  [-31.4200, 29.7800], // Cathedral Rock area
  [-31.4500, 29.7500], // Manteku
  [-31.4800, 29.7000], // Hluleka
  [-31.5200, 29.6500], // Mdumbi
  [-31.5500, 29.6000], // Coffee Bay area
  [-31.5800, 29.5800], // Hole in the Wall area
  [-31.6000, 29.5500], // Hlungwane
  [-31.6258, 29.5347], // Port St Johns
]

export default function WildCoastMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || mapInstanceRef.current) return

    // Dynamically load Leaflet
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link")
        link.id = "leaflet-css"
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      // Load Leaflet JS
      const L = await import("leaflet")

      // Initialize map centered on Wild Coast
      const map = L.default.map(mapRef.current!, {
        center: [-31.35, 29.85],
        zoom: 9,
        scrollWheelZoom: false,
      })

      mapInstanceRef.current = map

      // Add satellite tile layer (using ESRI World Imagery)
      L.default
        .tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Tiles © Esri",
            maxZoom: 18,
          }
        )
        .addTo(map)

      // Add labels overlay for place names
      L.default
        .tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
          {
            maxZoom: 18,
          }
        )
        .addTo(map)

      // Draw the coastline path
      const coastlinePath = L.default.polyline(coastlineCoordinates, {
        color: ACCENT_COLOR,
        weight: 4,
        opacity: 0.9,
        dashArray: "10, 10",
        lineCap: "round",
        lineJoin: "round",
      })
      coastlinePath.addTo(map)

      // Custom icon for markers
      const createIcon = (color: string) =>
        L.default.divIcon({
          className: "custom-marker",
          html: `<div style="
            background-color: ${color};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          "></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

      // Add start marker (Port Edward)
      L.default
        .marker([-31.0456, 30.2249], { icon: createIcon("#22c55e") })
        .addTo(map)
        .bindPopup("<strong>Port Edward</strong><br/>Start of the Wild Coast Trail")

      // Add end marker (Port St Johns)
      L.default
        .marker([-31.6258, 29.5347], { icon: createIcon("#ef4444") })
        .addTo(map)
        .bindPopup("<strong>Port St Johns</strong><br/>End of the Wild Coast Trail")

      // Add key landmark markers along the trail
      const landmarks = [
        { coords: [-31.0833, 30.1667] as [number, number], name: "Mzamba River", desc: "Fossil-rich beaches" },
        { coords: [-31.2833, 29.9500] as [number, number], name: "Mkambati Nature Reserve", desc: "Pristine wilderness & waterfalls" },
        { coords: [-31.4000, 29.8000] as [number, number], name: "Mbotyi", desc: "Remote coastal village" },
        { coords: [-31.5200, 29.6500] as [number, number], name: "Mdumbi", desc: "Surfing & community tourism" },
        { coords: [-31.5800, 29.5800] as [number, number], name: "Hole in the Wall", desc: "Iconic rock formation" },
      ]

      landmarks.forEach((landmark) => {
        L.default
          .marker(landmark.coords, { icon: createIcon(ACCENT_COLOR) })
          .addTo(map)
          .bindPopup(`<strong>${landmark.name}</strong><br/>${landmark.desc}`)
      })

      // Fit bounds to show the entire trail
      map.fitBounds(coastlinePath.getBounds(), { padding: [30, 30] })
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="absolute inset-0 z-0" />
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg z-[1000]">
        <p className="text-xs font-semibold text-[#1B5F8C] mb-2">Wild Coast Trail</p>
        <div className="flex items-center gap-2 text-xs text-[#1B5F8C]/80 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
          <span>Port Edward (Start)</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#1B5F8C]/80 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
          <span>Port St Johns (End)</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#1B5F8C]/80">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ACCENT_COLOR }}></span>
          <span>Key Landmarks</span>
        </div>
      </div>
    </div>
  )
}
