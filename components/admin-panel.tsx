'use client';

import React, { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  coordinates: [number, number];
}

export default function AdminPanel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [stats, setStats] = useState({ totalEvents: 0, upcomingEvents: 0 });

  useEffect(() => {
    fetchEvents();
    fetchStats();
  }, []);

  async function fetchEvents() {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from('events')
      .select('*');

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data as Event[]);
    }
  }

  async function fetchStats() {
    const supabase = createSupabaseClient();
    const { data: allEvents, error: allEventsError } = await supabase
      .from('events')
      .select('date');

    const { data: upcomingEvents, error: upcomingEventsError } = await supabase
      .from('events')
      .select('id')
      .gte('date', new Date().toISOString().split('T')[0]);

    if (allEventsError || upcomingEventsError) {
      console.error('Error fetching stats:', allEventsError || upcomingEventsError);
    } else {
      setStats({
        totalEvents: allEvents?.length || 0,
        upcomingEvents: upcomingEvents?.length || 0
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createSupabaseClient();
    if (editingEvent) {
      const { error } = await supabase
        .from('events')
        .update(newEvent)
        .eq('id', editingEvent.id);

      if (error) {
        console.error('Error updating event:', error);
      } else {
        setEditingEvent(null);
      }
    } else {
      const { error } = await supabase
        .from('events')
        .insert(newEvent);

      if (error) {
        console.error('Error creating event:', error);
      }
    }
    setNewEvent({});
    fetchEvents();
    fetchStats();
  }

  async function handleDelete(id: number) {
    const supabase = createSupabaseClient();
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
    } else {
      fetchEvents();
      fetchStats();
    }
  }

  function handleDuplicate(event: Event) {
    const duplicatedEvent = { ...event } as Partial<Pick<Event,'id'>>;
    delete duplicatedEvent.id;
    setNewEvent(duplicatedEvent);
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.totalEvents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.upcomingEvents}</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Title"
            value={newEvent.title || ''}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <Input
            type="date"
            value={newEvent.date || ''}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <Input
            type="time"
            value={newEvent.time || ''}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <Input
            placeholder="Location"
            value={newEvent.location || ''}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          />
          <Input
            placeholder="Latitude"
            type="number"
            value={newEvent.coordinates ? newEvent.coordinates[0] : ''}
            onChange={(e) => setNewEvent({ ...newEvent, coordinates: [parseFloat(e.target.value), newEvent.coordinates ? newEvent.coordinates[1] : 0] })}
          />
          <Input
            placeholder="Longitude"
            type="number"
            value={newEvent.coordinates ? newEvent.coordinates[1] : ''}
            onChange={(e) => setNewEvent({ ...newEvent, coordinates: [newEvent.coordinates ? newEvent.coordinates[0] : 0, parseFloat(e.target.value)] })}
          />
          <Textarea
            placeholder="Description"
            value={newEvent.description || ''}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="col-span-2"
          />
        </div>
        <Button type="submit" className="mt-4">
          {editingEvent ? 'Update Event' : 'Add Event'}
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{event.date} {event.time}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
              <div className="mt-4 space-x-2">
                <Button onClick={() => setEditingEvent(event)}>Edit</Button>
                <Button onClick={() => handleDelete(event.id)} variant="destructive">Delete</Button>
                <Button onClick={() => handleDuplicate(event)} variant="outline">Duplicate</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

