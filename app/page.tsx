'use client';
import { useState, useEffect } from 'react'
import KultuuriSyndmused from '@/components/kultuuri-syndmused'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'

const Map = dynamic(() => import('@/components/map'), { 
  ssr: false,
  loading: () => <p>Kaart laeb...</p>
});



interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  coordinates: [number, number]
}


export default function Home() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
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
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Kultuurisündmused</h1>
      
      <Tabs defaultValue="list" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Nimekiri</TabsTrigger>
          <TabsTrigger value="map">Kaart</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <KultuuriSyndmused events={events} />


        </TabsContent>
        <TabsContent value="map" className="mt-4">
          <div className="h-[50vh] w-full sm:h-[500px]">
            <Map events={events} />
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </main>
  )
}

