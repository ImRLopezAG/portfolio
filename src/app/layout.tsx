import './globals.css'
import type { Metadata } from 'next'
import { LandingHeader } from '@/components'

export const metadata: Metadata = {
  title: 'ImRLopezAG',
  description: 'This is Angel Gabriel Lopez\'s portfolio',
  creator: 'Angel Gabriel Lopez',
  icons: {
    icon: '/favicon.tsx'
  }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en' className='dark'>
      <body>
        <LandingHeader />
        {children}
      </body>
    </html>
  )
}
