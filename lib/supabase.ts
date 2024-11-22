import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL??(""), process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??(""))

export type Event = {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  coordinates: [number, number]
}