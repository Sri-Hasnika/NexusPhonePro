"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  selectedColor: string
}

const colorMap = {
  midnight: "#1a1a1a",
  silver: "#e5e5e5",
  gold: "#ffd700",
  purple: "#8b5cf6",
}

export default function HeroSection({ selectedColor }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />

      {/* Animated background elements */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-20" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full opacity-30" />
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-25" />
      </motion.div>

      <motion.div className="text-center z-10 px-4" style={{ opacity }}>
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-thin mb-4"
        >
          NexusPhone
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-2xl md:text-3xl text-gray-300 mb-2"
        >
          Pro
        </motion.p>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Beyond innovation. Beyond imagination. The future of mobile technology is here.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="space-x-4"
        >
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-medium rounded-full"
          >
            Pre-order now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-black hover:bg-white hover:text-black px-8 py-3 text-lg font-medium rounded-full"
          >
            Learn more
          </Button>
        </motion.div>
      </motion.div>

      {/* Phone mockup */}
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="absolute bottom-0 right-10 hidden lg:block"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
      >
        <div
          className="w-64 h-96 rounded-3xl shadow-2xl"
          style={{ backgroundColor: colorMap[selectedColor as keyof typeof colorMap] }}
        >
          <div className="w-full h-full rounded-3xl bg-gradient-to-b from-gray-800 to-gray-900 p-2">
            <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full mx-auto mb-4 opacity-20" />
                <div className="text-white text-xs opacity-40">NexusPhone Pro</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
