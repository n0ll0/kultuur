'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'
import { createSupabaseClient } from '@/lib/supabase'

const Map = dynamic(() => import('./map'), { 
  ssr: false,
  loading: () => <p>Kaart laeb...</p>
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

export default function KultuuriSyndmused() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('events')
      .select('*')
  
    if (error) {
      console.error('Error fetching events:', error)
    } else {
      setEvents(data as Event[])
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Kultuurisündmused</h1>
      
      <Tabs defaultValue="list" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Nimekiri</TabsTrigger>
          <TabsTrigger value="map">Kaart</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map(event => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🕒</span>
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      {event.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button>Vaata lähemalt</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="map" className="mt-4">
          <div className="h-[50vh] w-full sm:h-[500px]">
            <Map events={events} />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Järgmised sündmused</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map(event => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🕒</span>
                    {event.time}
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Soovitused</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map(event => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <span className="mr-2">👍</span>
                  Soovita sõbrale
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

