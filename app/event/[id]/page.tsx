import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Event, supabase } from '@/lib/supabase';
import SyndmusteList from '@/components/syndmuste-list';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, MapPinIcon, InfoIcon, UserIcon, TagIcon } from 'lucide-react';

async function fetchEvent(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }
  return data;
}

export default async function Syndmus({params}: {params: {id: string}}) {
  const event = await fetchEvent(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            <div className="flex items-center mt-2">
              <CalendarIcon className="mr-2 h-5 w-5" />
              {event.date}
              <ClockIcon className="ml-4 mr-2 h-5 w-5" />
              {event.time}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {event.featured_image_url && (
            <div className="mb-6 relative h-64 md:h-96">
              <Image 
                src={event.featured_image_url} 
                alt={event.title} 
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              {event.featured_image_caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                  {event.featured_image_caption}
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Event Details</h3>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <div className="flex items-center mb-2">
                <MapPinIcon className="mr-2 h-5 w-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center mb-2">
                <InfoIcon className="mr-2 h-5 w-5" />
                <span>Status: {event.status}</span>
              </div>
              {event.organizer && (
                <div className="flex items-center mb-2">
                  <UserIcon className="mr-2 h-5 w-5" />
                  <span>Organizer: {event.organizer}</span>
                </div>
              )}
              {event.category && (
                <div className="flex items-center mb-2">
                  <TagIcon className="mr-2 h-5 w-5" />
                  <span>Category: {event.category}</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
              {event.additional_info && <p className="text-gray-700 mb-4">{event.additional_info}</p>}
              {event.contact_info && (
                <div className="mb-2">
                  <strong>Contact:</strong> {event.contact_info}
                </div>
              )}
              {event.participants && (
                <div className="mb-2">
                  <strong>Participants:</strong> {event.participants}
                </div>
              )}
              {event.featured_image_credit && (
                <div className="text-sm text-gray-500 mt-2">
                  Image credit: {event.featured_image_credit}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Register for Event</Button>
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Other Events</h2>
      <Suspense fallback={<div>Loading events...</div>}>
        <SyndmusteList />
      </Suspense>
    </div>
  );
}

