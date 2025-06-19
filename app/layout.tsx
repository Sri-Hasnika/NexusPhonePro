import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "NexusPhone Pro - Beyond Innovation",
  description:
    "Experience the future of mobile technology with NexusPhone Pro. Revolutionary camera system, powerful A17 Pro chip, and stunning titanium design.",
  keywords: "smartphone, mobile, technology, camera, processor, design",
  authors: [{ name: "NexusPhone Team" }],
  openGraph: {
    title: "NexusPhone Pro - Beyond Innovation",
    description: "Experience the future of mobile technology",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
