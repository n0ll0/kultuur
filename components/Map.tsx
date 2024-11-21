'use client'

import React, {useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl
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

interface MapProps {
  events: Event[]
}

const Map: React.FC<MapProps> = ({ events }) => {
  // Calculate the center of Estonia
  const estoniaCenter: [number, number] = [58.595272, 25.013607]

  useEffect(() => {
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer 
      center={estoniaCenter} 
      zoom={7} 
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      dragging={!L.Browser.mobile}
      tap={!L.Browser.mobile}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map((event) => (
        <Marker key={event.id} position={event.coordinates}>
          <Popup>
            <div>
              <h3>{event.title}</h3>
              <p>{event.date} {event.time}</p>
              <p>{event.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map

