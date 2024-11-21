'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  coordinates: [number, number]
}

interface EditEventProps {
  id: number
  onCancel: () => void
  onSave: () => void
}

export default function EditEvent({ id, onCancel, onSave }: EditEventProps) {
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetchEvent()
  }, [id])

  async function fetchEvent() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching event:', error)
    } else {
      setEvent(data)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!event) return

    const { error } = await supabase
      .from('events')
      .update(event)
      .eq('id', id)
    
    if (error) {
      console.error('Error updating event:', error)
    } else {
      onSave()
    }
  }

  if (!event) return <div>Loading...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Title"
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
            />
            <Input
              type="date"
              value={event.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
            />
          <Input
            type="time"
            value={event.time}
            onChange={(e) => setEvent({ ...event, time: e.target.value })}
          />
          <Input
            placeholder="Location"
            value={event.location}
            onChange={(e) => setEvent({ ...event, location: e.target.value })}
          />
          <Input
            placeholder="Latitude"
            type="number"
            value={event.coordinates[0]}
            onChange={(e) => setEvent({ ...event, coordinates: [parseFloat(e.target.value), event.coordinates[1]] })}
          />
          <Input
            placeholder="Longitude"
            type="number"
            value={event.coordinates[1]}
            onChange={(e) => setEvent({ ...event, coordinates: [event.coordinates[0], parseFloat(e.target.value)] })}
          />
          <Textarea
            placeholder="Description"
            value={event.description}
            onChange={(e) => setEvent({ ...event, description: e.target.value })}
          />
          <div className="space-x-2">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

