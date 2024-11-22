'use client'

import React, { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet's default icon path issues
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  coordinates: [number, number]
}

export interface MapProps {
  events: Event[]
}

const MapComponent: React.FC<MapProps> = ({ events }) => {
  const mapRef = useRef<L.Map | null>(null)
  const estoniaCenter: [number, number] = [58.595272, 25.013607]

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(estoniaCenter, 7)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)
    }

    // Clear existing markers
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current!.removeLayer(layer)
        }
      })
    }

    // Add markers
    events.forEach((event) => {
      L.marker(event.coordinates)
        .addTo(mapRef.current!)
        .bindPopup(`
          <h3>${event.title}</h3>
          <p>${event.date} ${event.time}</p>
          <p>${event.location}</p>
        `)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [events])

  return <div id="map" style={{ height: '100%', width: '100%' }} />
}

export default MapComponent

