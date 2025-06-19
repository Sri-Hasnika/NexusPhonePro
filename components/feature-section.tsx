"use client"

import { motion, useScroll } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Camera, Cpu, Battery, Shield } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Pro Camera System",
    description: "Revolutionary 108MP triple-lens system with AI-powered computational photography",
    detail: "Capture stunning photos in any light with our advanced night mode and portrait capabilities",
  },
  {
    icon: Cpu,
    title: "Nexus A17 Pro Chip",
    description: "The most powerful smartphone processor ever created, built on 3nm technology",
    detail: "Experience lightning-fast performance and incredible energy efficiency",
  },
  {
    icon: Battery,
    title: "All-Day Battery",
    description: "5000mAh battery with 65W fast charging and wireless charging capabilities",
    detail: "Power through your day and charge from 0 to 80% in just 30 minutes",
  },
  {
    icon: Shield,
    title: "Titanium Design",
    description: "Aerospace-grade titanium construction with Ceramic Shield front",
    detail: "The strongest smartphone ever built, designed to withstand life's adventures",
  },
]

export default function FeatureSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <section ref={containerRef} className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-thin mb-6">
            Engineered for
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Every detail meticulously crafted to deliver an unparalleled mobile experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-500"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6"
        >
          <feature.icon className="w-8 h-8 text-white" />
        </motion.div>

        <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">{feature.title}</h3>

        <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>

        <p className="text-gray-500 text-sm leading-relaxed">{feature.detail}</p>
      </motion.div>
    </motion.div>
  )
}
