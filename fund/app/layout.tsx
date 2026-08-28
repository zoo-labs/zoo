import type { Metadata } from 'next'
import { Zen } from '@hanzo/font'
import './globals.css'
import { Providers } from './providers'

const sans = Zen

export const metadata: Metadata = {
  title: 'Zoo Fund - Conservation DAOs',
  description: 'Decentralized funding for wildlife conservation through specialized DAOs',
  icons: {
    icon: [
      { url: 'https://zoo.ngo/favicon/favicon-32x32.png', sizes: '32x32' },
      { url: 'https://zoo.ngo/favicon/favicon-16x16.png', sizes: '16x16' },
    ],
    apple: 'https://zoo.ngo/favicon/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={sans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
