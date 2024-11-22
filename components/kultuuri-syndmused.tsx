'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from 'next/link'

import { type Event } from '@/lib/supabase'

export default function KultuuriSyndmused({events}:{events:Event[]}) {

  return (
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
                  <Link href={`/event/${event.id}`}>Vaata lähemalt</Link>
                </CardFooter>
              </Card>
            ))}
          </div>
  )
}

