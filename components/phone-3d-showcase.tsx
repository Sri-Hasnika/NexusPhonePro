"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Phone3DShowcaseProps {
  selectedColor: string
}

const colorMap = {
  midnight: {
    primary: "#1a1a1a",
    secondary: "#2d2d2d",
    accent: "#404040",
    name: "Midnight Black",
  },
  silver: {
    primary: "#e5e5e5",
    secondary: "#f5f5f5",
    accent: "#d0d0d0",
    name: "Silver",
  },
  gold: {
    primary: "#ffd700",
    secondary: "#ffed4e",
    accent: "#e6c200",
    name: "Gold",
  },
  purple: {
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    accent: "#7c3aed",
    name: "Deep Purple",
  },
}

export default function Phone3DShowcase({ selectedColor }: Phone3DShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [rotation, setRotation] = useState({ x: -10, y: 20 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])

  const currentColor = colorMap[selectedColor as keyof typeof colorMap]

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    setRotation((prev) => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }))

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetView = () => {
    setRotation({ x: -10, y: 20 })
    setZoom(1)
  }

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      const newZoom = direction === "in" ? prev * 1.2 : prev / 1.2
      return Math.max(0.5, Math.min(2, newZoom))
    })
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y

      setRotation((prev) => ({
        x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.5)),
        y: prev.y + deltaX * 0.5,
      }))

      setDragStart({ x: e.clientX, y: e.clientY })
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging, dragStart])

  return (
    <section ref={ref} className="py-16 px-4 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-thin mb-6">
            Experience the
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Design</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
            Interact with the NexusPhone Pro in stunning detail
          </p>
          <p className="text-lg text-gray-500">
            Currently viewing: <span className="text-white font-medium">{currentColor.name}</span>
          </p>
        </motion.div>

        <div className="relative">
          {/* 3D Phone Container */}
          <motion.div style={{ y }} className="relative h-[600px] md:h-[700px] flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Interactive 3D Phone */}
              <motion.div
                className={`relative cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
                style={{
                  transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateY: rotation.y,
                  rotateX: rotation.x,
                  scale: zoom,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                {/* Phone Body */}
                <motion.div
                  className="relative w-64 h-96 md:w-80 md:h-[480px] rounded-3xl shadow-2xl"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Front Face - Screen */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${currentColor.primary} 0%, ${currentColor.secondary} 50%, ${currentColor.accent} 100%)`,
                      transform: "translateZ(5px)",
                    }}
                    animate={{
                      background: `linear-gradient(135deg, ${currentColor.primary} 0%, ${currentColor.secondary} 50%, ${currentColor.accent} 100%)`,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Screen Bezel */}
                    <div className="absolute inset-2 bg-black rounded-2xl overflow-hidden">
                      {/* Actual Screen Content */}
                      <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black flex flex-col">
                        {/* Dynamic Island */}
                        <div className="flex justify-center pt-2">
                          <div className="w-24 h-6 bg-black rounded-full" />
                        </div>

                        {/* Status Bar */}
                        <div className="flex justify-between items-center px-6 py-2 text-white text-xs">
                          <span>9:41</span>
                          <div className="flex space-x-1">
                            <div className="w-4 h-2 bg-white rounded-sm opacity-60" />
                            <div className="w-4 h-2 bg-white rounded-sm opacity-80" />
                            <div className="w-4 h-2 bg-white rounded-sm" />
                          </div>
                        </div>

                        {/* App Icons Grid */}
                        <div className="flex-1 p-6">
                          <div className="grid grid-cols-4 gap-3 mb-6">
                            {Array.from({ length: 16 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-80"
                                animate={{
                                  scale: [1, 1.05, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "reverse",
                                }}
                              />
                            ))}
                          </div>

                          {/* Dock */}
                          <div className="flex justify-center space-x-3 mt-auto">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Front Camera (in Dynamic Island) */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full" />
                  </motion.div>

                  {/* Back Face - Back Cover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${currentColor.primary} 0%, ${currentColor.secondary} 50%, ${currentColor.accent} 100%)`,
                      transform: "translateZ(-5px) rotateY(180deg)",
                    }}
                    animate={{
                      background: `linear-gradient(135deg, ${currentColor.primary} 0%, ${currentColor.secondary} 50%, ${currentColor.accent} 100%)`,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Camera Module */}
                    <motion.div
                      className="absolute top-6 left-6 w-20 h-16 rounded-2xl shadow-lg"
                      style={{
                        background: `linear-gradient(45deg, ${currentColor.accent}, rgba(0,0,0,0.3))`,
                        transform: "translateZ(3px)",
                      }}
                      animate={{
                        background: `linear-gradient(45deg, ${currentColor.accent}, rgba(0,0,0,0.3))`,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Triple Camera Lenses */}
                      <div className="relative w-full h-full p-2">
                        {/* Main Camera */}
                        <div className="absolute top-2 left-2 w-6 h-6 bg-black rounded-full border-2 border-gray-700">
                          <div className="w-4 h-4 bg-gray-900 rounded-full m-0.5" />
                        </div>
                        {/* Ultra Wide Camera */}
                        <div className="absolute top-2 right-2 w-6 h-6 bg-black rounded-full border-2 border-gray-700">
                          <div className="w-4 h-4 bg-gray-900 rounded-full m-0.5" />
                        </div>
                        {/* Telephoto Camera */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-black rounded-full border-2 border-gray-700">
                          <div className="w-4 h-4 bg-gray-900 rounded-full m-0.5" />
                        </div>
                        {/* Flash */}
                        <div className="absolute bottom-2 right-2 w-3 h-3 bg-yellow-200 rounded-full opacity-80" />
                      </div>
                    </motion.div>

                    {/* Brand Logo */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-thin text-white opacity-40 mb-1">NexusPhone</div>
                        <div className="text-sm text-white opacity-30">Pro</div>
                      </div>
                    </motion.div>

                    {/* Back Texture/Pattern */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-20"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
                     radial-gradient(circle at 70% 70%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
                      }}
                    />

                    {/* Regulatory Text */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white opacity-20 text-center">
                      <div>Designed by NexusPhone</div>
                    </div>

                    {/* Side Edges */}
                  </motion.div>

                  {/* Side Edges */}
                  <div
                    className="absolute left-0 top-0 w-1 h-full rounded-l-3xl"
                    style={{
                      background: `linear-gradient(to bottom, ${currentColor.accent}, ${currentColor.primary})`,
                      transform: "translateZ(2.5px) rotateY(-90deg) translateX(-0.5px)",
                      transformOrigin: "left center",
                    }}
                  />
                  <div
                    className="absolute right-0 top-0 w-1 h-full rounded-r-3xl"
                    style={{
                      background: `linear-gradient(to bottom, ${currentColor.accent}, ${currentColor.primary})`,
                      transform: "translateZ(2.5px) rotateY(90deg) translateX(0.5px)",
                      transformOrigin: "right center",
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 w-full h-1 rounded-t-3xl"
                    style={{
                      background: `linear-gradient(to right, ${currentColor.accent}, ${currentColor.primary})`,
                      transform: "translateZ(2.5px) rotateX(90deg) translateY(-0.5px)",
                      transformOrigin: "top center",
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-full h-1 rounded-b-3xl"
                    style={{
                      background: `linear-gradient(to right, ${currentColor.accent}, ${currentColor.primary})`,
                      transform: "translateZ(2.5px) rotateX(-90deg) translateY(0.5px)",
                      transformOrigin: "bottom center",
                    }}
                  />

                  {/* Physical Buttons */}
                  {/* Volume Buttons */}
                  <div
                    className="absolute left-0 top-20 w-1 h-8 rounded-r-full"
                    style={{
                      backgroundColor: currentColor.accent,
                      transform: "translateZ(6px) translateX(-1px)",
                    }}
                  />
                  <div
                    className="absolute left-0 top-32 w-1 h-12 rounded-r-full"
                    style={{
                      backgroundColor: currentColor.accent,
                      transform: "translateZ(6px) translateX(-1px)",
                    }}
                  />
                  {/* Power Button */}
                  <div
                    className="absolute right-0 top-24 w-1 h-16 rounded-l-full"
                    style={{
                      backgroundColor: currentColor.accent,
                      transform: "translateZ(6px) translateX(1px)",
                    }}
                  />
                </motion.div>

                {/* Reflection/Shadow */}
                <motion.div
                  className="absolute inset-0 w-64 h-96 md:w-80 md:h-[480px] rounded-3xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    transform: "translateZ(11px)",
                  }}
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-10 -left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-10 -right-10 w-6 h-6 bg-purple-500 rounded-full opacity-40"
                animate={{
                  y: [0, 15, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-4 mt-8"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom("out")}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetView}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom("in")}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Instructions */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center text-gray-500 mt-4 text-sm"
          >
            Drag to rotate • Use controls to zoom • Changes with color selection
          </motion.p>
        </div>
      </div>
    </section>
  )
}
