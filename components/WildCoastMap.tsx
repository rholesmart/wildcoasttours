"use client"

import { useEffect, useRef } from "react"

const ACCENT_COLOR = "#F7931A"

// Coordinates following the Wild Coast coastline precisely from Port Edward to Port St Johns
const coastlineCoordinates: [number, number][] = [
  [-31.0456, 30.2249], // Port Edward
  [-31.0550, 30.2000], // South of Port Edward
  [-31.0700, 30.1750], // Mzamba Beach
  [-31.0833, 30.1667], // Mzamba River Mouth
  [-31.0950, 30.1450], // Coastline south
  [-31.1100, 30.1200], // Mtentu area
  [-31.1250, 30.0950], // Coastal point
  [-31.1400, 30.0700], // Msikaba north
  [-31.1600, 30.0450], // Msikaba River
  [-31.1800, 30.0200], // South of Msikaba
  [-31.2000, 29.9950], // Coastal stretch
  [-31.2200, 29.9750], // Mkambati north
  [-31.2400, 29.9600], // Mkambati beach
  [-31.2600, 29.9450], // Mkambati Nature Reserve
  [-31.2833, 29.9300], // Mkambati Falls area
  [-31.3000, 29.9100], // South Mkambati
  [-31.3200, 29.8900], // Mfihlelo coast
  [-31.3400, 29.8700], // Coastal point
  [-31.3600, 29.8500], // Lubanzi area
  [-31.3800, 29.8300], // North of Mbotyi
  [-31.4000, 29.8100], // Mbotyi
  [-31.4150, 29.7900], // South Mbotyi
  [-31.4300, 29.7700], // Cathedral Rock
  [-31.4450, 29.7500], // Manteku
  [-31.4600, 29.7300], // Coastal stretch
  [-31.4800, 29.7100], // Hluleka north
  [-31.5000, 29.6850], // Hluleka
  [-31.5150, 29.6650], // South Hluleka
  [-31.5300, 29.6450], // Mdumbi north
  [-31.5450, 29.6250], // Mdumbi
  [-31.5550, 29.6050], // Coffee Bay north
  [-31.5700, 29.5900], // Coffee Bay
  [-31.5850, 29.5750], // Hole in the Wall
  [-31.6000, 29.5600], // South of Hole in the Wall
  [-31.6100, 29.5500], // Hlungwane
  [-31.6200, 29.5420], // Approaching Port St Johns
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
    </div>
  )
}
