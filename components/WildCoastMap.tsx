"use client"

import { useEffect, useRef } from "react"

const ACCENT_COLOR = "#F7931A"

// Coordinates following the Wild Coast coastline exactly along the shore from Port Edward to Port St Johns
const coastlineCoordinates: [number, number][] = [
  [-31.0456, 30.2249], // Port Edward
  [-31.0520, 30.2150], // Coast south of Port Edward
  [-31.0600, 30.2050], // Coastal point
  [-31.0700, 30.1950], // Mzamba north
  [-31.0780, 30.1850], // Mzamba Beach
  [-31.0850, 30.1750], // Mzamba River area
  [-31.0950, 30.1650], // South Mzamba
  [-31.1050, 30.1520], // Coastal stretch
  [-31.1150, 30.1400], // Mtentu north
  [-31.1250, 30.1280], // Mtentu River
  [-31.1350, 30.1150], // South Mtentu
  [-31.1450, 30.1020], // Coastal point
  [-31.1550, 30.0900], // Msikaba north
  [-31.1650, 30.0780], // Msikaba area
  [-31.1750, 30.0650], // Msikaba River
  [-31.1850, 30.0520], // South Msikaba
  [-31.1950, 30.0400], // Coastal stretch
  [-31.2050, 30.0280], // Mkambati north approach
  [-31.2150, 30.0160], // North Mkambati
  [-31.2250, 30.0050], // Mkambati coast
  [-31.2350, 29.9950], // Mkambati beach
  [-31.2450, 29.9850], // Mkambati Nature Reserve
  [-31.2550, 29.9750], // Central Mkambati
  [-31.2650, 29.9650], // Mkambati south
  [-31.2750, 29.9550], // Mkambati Falls area
  [-31.2850, 29.9450], // South Mkambati
  [-31.2950, 29.9350], // Coastal point
  [-31.3050, 29.9250], // Mfihlelo north
  [-31.3150, 29.9150], // Mfihlelo coast
  [-31.3250, 29.9050], // South Mfihlelo
  [-31.3350, 29.8950], // Coastal stretch
  [-31.3450, 29.8850], // Lubanzi north
  [-31.3550, 29.8750], // Lubanzi area
  [-31.3650, 29.8650], // South Lubanzi
  [-31.3750, 29.8550], // Mbotyi north approach
  [-31.3850, 29.8450], // North Mbotyi
  [-31.3950, 29.8350], // Mbotyi
  [-31.4050, 29.8250], // South Mbotyi
  [-31.4150, 29.8150], // Coastal point
  [-31.4250, 29.8050], // Cathedral Rock north
  [-31.4350, 29.7950], // Cathedral Rock
  [-31.4450, 29.7850], // Manteku area
  [-31.4550, 29.7750], // South Manteku
  [-31.4650, 29.7650], // Coastal stretch
  [-31.4750, 29.7550], // Hluleka north
  [-31.4850, 29.7450], // Hluleka approach
  [-31.4950, 29.7350], // Hluleka
  [-31.5050, 29.7200], // South Hluleka
  [-31.5150, 29.7050], // Coastal point
  [-31.5250, 29.6900], // Mdumbi north
  [-31.5350, 29.6750], // Mdumbi approach
  [-31.5450, 29.6600], // Mdumbi
  [-31.5500, 29.6450], // South Mdumbi
  [-31.5550, 29.6300], // Coffee Bay north
  [-31.5620, 29.6150], // Coffee Bay approach
  [-31.5700, 29.6000], // Coffee Bay
  [-31.5780, 29.5900], // South Coffee Bay
  [-31.5860, 29.5800], // Hole in the Wall north
  [-31.5940, 29.5720], // Hole in the Wall
  [-31.6020, 29.5640], // South Hole in the Wall
  [-31.6100, 29.5560], // Hlungwane area
  [-31.6180, 29.5480], // Approaching Port St Johns
  [-31.6258, 29.5347], // Port St Johns
]

export default function WildCoastMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return
    
    // If map already exists, don't reinitialize
    if (mapInstanceRef.current) return

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
