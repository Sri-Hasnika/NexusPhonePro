"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const specs = [
  { label: "Display", value: '6.7" Super Retina XDR' },
  { label: "Processor", value: "Nexus A17 Pro (3nm)" },
  { label: "Storage", value: "256GB / 512GB / 1TB" },
  { label: "Camera", value: "108MP Triple System" },
  { label: "Battery", value: "5000mAh with 65W Fast Charging" },
  { label: "Materials", value: "Titanium & Ceramic Shield" },
  { label: "Water Resistance", value: "IP68 (6m for 30 min)" },
  { label: "Connectivity", value: "5G, Wi-Fi 7, Bluetooth 5.3" },
]

export default function SpecsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-thin mb-6">Technical Specifications</h2>
          <p className="text-xl text-gray-400">Power meets precision in every detail</p>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="flex justify-between items-center py-4 border-b border-gray-800 last:border-b-0"
              >
                <span className="text-gray-400 font-medium">{spec.label}</span>
                <span className="text-white font-semibold text-right">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
