import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'K Mart — Daily Essentials, Delivered',
  description: 'Groceries and daily essentials delivered from your nearest K Mart store.',
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
