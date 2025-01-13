import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './context/ThemeContext'
import NavBar from './components/NavBar'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Slot Thing - Next-Gen Slot Gaming',
  description: 'Experience the thrill of next-gen slot gaming with Slot Thing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} font-serif antialiased`}>
        <ThemeProvider>
          <div className="relative min-h-screen overflow-hidden">
            {/* Background noise texture */}
            <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none"></div>
            
            {/* Content */}
            <div className="relative">
              <NavBar />
              <main>{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}