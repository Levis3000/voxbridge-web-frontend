import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GlotBridge - Live Translation Over VoIP Calls',
  description: 'Experience seamless communication with real-time translation during your VoIP calls. Speak your language, hear theirs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

