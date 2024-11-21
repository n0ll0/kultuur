import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { createSupabaseClient } from '@/lib/supabase'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kultuurisündmused',
  description: 'Eesti kultuurisündmuste kalender ja kaart',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    createSupabaseClient()
  } catch (error) {
    console.error('Error initializing Supabase client:', error)
  }
  return (
    <html lang="et">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">Kultuurisündmused</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

