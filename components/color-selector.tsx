"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface ColorSelectorProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

const colors = [
  { name: "midnight", color: "#1a1a1a", label: "Midnight Black" },
  { name: "silver", color: "#e5e5e5", label: "Silver" },
  { name: "gold", color: "#ffd700", label: "Gold" },
  { name: "purple", color: "#8b5cf6", label: "Deep Purple" },
]

export default function ColorSelector({ selectedColor, onColorChange }: ColorSelectorProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-thin mb-4"
        >
          Choose your color
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-400 mb-12"
        >
          Express yourself with four stunning finishes
        </motion.p>

        <div className="flex justify-center items-center space-x-8 mb-8">
          {colors.map((color, index) => (
            <motion.button
              key={color.name}
              initial={{ y: 50, opacity: 0, scale: 0.8 }}
              animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onColorChange(color.name)}
              className={`relative w-16 h-16 rounded-full border-2 transition-all duration-300 ${
                selectedColor === color.name
                  ? "border-white shadow-lg shadow-white/20"
                  : "border-gray-600 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color.color }}
            >
              {selectedColor === color.name && (
                <motion.div
                  layoutId="selected-ring"
                  className="absolute -inset-1 rounded-full border-2 border-white"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-300"
        >
          {colors.find((c) => c.name === selectedColor)?.label}
        </motion.p>
      </div>
    </section>
  )
}
