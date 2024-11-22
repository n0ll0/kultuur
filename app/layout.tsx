import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

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
  return (
    <html lang="et">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">Kultuurisündmused</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
          </div>
        </nav>
        <div className='container mx-auto px-4 py-8'>
        {children}
        </div>
      </body>
    </html>
  )
}

