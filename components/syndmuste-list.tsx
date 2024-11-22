'use client';

import { supabase, Event } from "@/lib/supabase";
import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from 'next/link';


export default function SyndmusteList({props}:{props:{big?: boolean}}) {
const big = props?.big??false;
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*');

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data as Event[]);
    }
  }
  if (big === true) {

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
      </div>);
  } else {

    return (<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map(event => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>
              <div className="flex ">
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
              </div>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={`/event/${event.id}`}>Vaata lähemalt</Link>
          </CardFooter>
        </Card>
      ))}
    </div>
    );
  }
}