import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zoo ID - Decentralized Identity',
  description: 'Self-sovereign identity for the Zoo Network ecosystem',
  keywords: 'Zoo,identity,DID,blockchain,decentralized,Web3',
  openGraph: {
    title: 'Zoo ID',
    description: 'Decentralized Identity for Zoo Network',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Zoo ID',
    description: 'Decentralized Identity for Zoo Network',
  },
  themeColor: '#10B981',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0f] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
