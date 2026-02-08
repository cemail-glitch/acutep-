import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PancreaScan-AI™ | Next-Gen AI Diagnosis',
  description: 'A high-end multi-modal AI diagnostic system for acute pancreatitis',
  alternates: {
    canonical: 'https://ap-project.asia',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
