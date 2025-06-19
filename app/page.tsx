"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import ColorSelector from "@/components/color-selector"
import SpecsSection from "@/components/specs-section"
import NewsletterSection from "@/components/newsletter-section"
import Footer from "@/components/footer"
import Phone3DShowcase from "@/components/phone-3d-showcase"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState("midnight")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="bg-black text-white overflow-x-hidden">
      <HeroSection selectedColor={selectedColor} />
      <ColorSelector selectedColor={selectedColor} onColorChange={setSelectedColor} />
      <Phone3DShowcase selectedColor={selectedColor} />
      <FeatureSection />
      <SpecsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
