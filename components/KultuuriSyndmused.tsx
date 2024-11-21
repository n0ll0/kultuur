"use client";
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'

// Dünaamiline import Map komponendile, et vältida SSR probleeme
const Map = dynamic(() => import('./Map'), { 
  ssr: false,
  loading: () => <p>Kaart laeb...</p>
})

// Näidisandmed sündmuste jaoks
const events = [
  {
    id: 1,
    title: "Tallinna Muusikafestival",
    date: "2023-08-15",
    time: "19:00",
    location: "Tallinna Lauluväljak",
    description: "Iga-aastane muusikafestival parimatelt Eesti artistidelt.",
    coordinates: [59.444, 24.810]
  },
  {
    id: 2,
    title: "Tartu Teatripäevad",
    date: "2023-09-01",
    time: "18:00",
    location: "Tartu Uus Teater",
    description: "Kolmepäevane teatrifestival Tartu südames.",
    coordinates: [58.378, 26.728]
  },
  {
    id: 3,
    title: "Pärnu Filmifestival",
    date: "2023-07-10",
    time: "20:00",
    location: "Pärnu Keskus",
    description: "Rahvusvaheline filmifestival Pärnu südames.",
    coordinates: [58.385, 24.496]
  }
]

export default function KultuuriSyndmused() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Kultuurisündmused</h1>
      
      <Tabs defaultValue="list" className="mb-6">
        <TabsList>
          <TabsTrigger value="list">Nimekiri</TabsTrigger>
          <TabsTrigger value="map">Kaart</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <TabsContent value="map">
          <div className="h-[500px] w-full">
            <Map events={events} />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Järgmised sündmused</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

