import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './components/Providers'
import NavBar from './components/NavBar'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'SlotThing',
  description: 'Your Ultimate Gaming Destination',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg'
  },
  themeColor: '#FFB000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} font-serif antialiased`}>
        <Providers>
          <div className="relative min-h-screen overflow-hidden">
            {/* Background noise texture */}
            <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none"></div>
            
            {/* Content */}
            <div className="relative">
              <div id="theme-wrapper">
                <NavBar />
                <main>{children}</main>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}