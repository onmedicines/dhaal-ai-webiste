"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import Link from "next/link";

// Animated Background Component
const AnimatedShieldBackground = () => {
  // Define line paths - scaled down to be smaller relative to shield
  const lines = [
    // Top lines
    {
      startX: 0,
      startY: -72, // was -120
      midX: 0,
      midY: -132, // was -220
      endX: -72, // was -120
      endY: -132, // was -220
      delay: 0,
    },
    {
      startX: 0,
      startY: -72, // was -120
      midX: 0,
      midY: -168, // was -280
      endX: 90, // was 150
      endY: -168, // was -280
      delay: 0.3,
    },

    // Right lines
    {
      startX: 48, // was 80
      startY: -18, // was -30
      midX: 120, // was 200
      midY: -18, // was -30
      endX: 120, // was 200
      endY: -90, // was -150
      delay: 0.6,
    },
    {
      startX: 48, // was 80
      startY: 24, // was 40
      midX: 150, // was 250
      midY: 24, // was 40
      endX: 150, // was 250
      endY: 84, // was 140
      delay: 0.9,
    },

    // Bottom lines
    {
      startX: 0,
      startY: 72, // was 120
      midX: 0,
      midY: 132, // was 220
      endX: -78, // was -130
      endY: 132, // was 220
      delay: 1.2,
    },
    {
      startX: 0,
      startY: 72, // was 120
      midX: 0,
      midY: 168, // was 280
      endX: 96, // was 160
      endY: 168, // was 280
      delay: 1.5,
    },

    // Left lines
    {
      startX: -48, // was -80
      startY: -18, // was -30
      midX: -120, // was -200
      midY: -18, // was -30
      endX: -120, // was -200
      endY: -84, // was -140
      delay: 1.8,
    },
    {
      startX: -48, // was -80
      startY: 30, // was 50
      midX: -144, // was -240
      midY: 30, // was 50
      endX: -144, // was -240
      endY: 102, // was 170
      delay: 2.1,
    },

    // Additional diagonal lines for more coverage
    {
      startX: 36, // was 60
      startY: -36, // was -60
      midX: 108, // was 180
      midY: -108, // was -180
      endX: 168, // was 280
      endY: -108, // was -180
      delay: 2.4,
    },
    {
      startX: -36, // was -60
      startY: 36, // was 60
      midX: -108, // was -180
      midY: 108, // was 180
      endX: -168, // was -280
      endY: 108, // was 180
      delay: 2.7,
    },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-15 dark:opacity-25">
      <div className="relative scale-150">
        {/* Central Shield - Made larger */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.3, 1],
            opacity: [0, 0.8, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          className="relative z-10"
        >
          <Shield
            size={150}
            className="text-blue-500 drop-shadow-lg"
            fill="currentColor"
          />
        </motion.div>

        {/* Animated Circuit Lines - Properly centered SVG */}
        <svg
          className="absolute"
          style={{
            width: "400px", // Reduced from 800px
            height: "400px", // Reduced from 800px
            left: "50%", // Center horizontally
            top: "50%", // Center vertically
            transform: "translate(-50%, -50%)", // Perfect centering
          }}
          viewBox="-200 -200 400 400" // Reduced from -400 -400 800 800
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
            </radialGradient>
          </defs>

          {lines.map((line, index) => (
            <g key={index}>
              {/* Line Path */}
              <motion.path
                d={`M ${line.startX} ${line.startY} L ${line.midX} ${line.midY} L ${line.endX} ${line.endY}`}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3" // Reduced from 4
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 1],
                }}
                transition={{
                  duration: 2.5,
                  delay: line.delay,
                  ease: "easeInOut",
                }}
              />

              {/* End Node */}
              <motion.circle
                cx={line.endX}
                cy={line.endY}
                r="6" // Reduced from 8
                fill="url(#nodeGradient)"
                stroke="#3b82f6"
                strokeWidth="2" // Reduced from 3
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.4, 1],
                  opacity: [0, 1, 1],
                }}
                transition={{
                  duration: 0.6,
                  delay: line.delay + 2,
                  ease: "easeOut",
                }}
              />

              {/* Pulsing effect on nodes */}
              <motion.circle
                cx={line.endX}
                cy={line.endY}
                r="6" // Reduced from 8
                fill="url(#nodeGradient)"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.8, 0.2, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  delay: line.delay + 3,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </g>
          ))}
        </svg>

        {/* More floating particles scattered across smaller area */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full" // Reduced from w-3 h-3
            style={{
              left: Math.random() * 300 - 150, // Reduced from 600 - 300
              top: Math.random() * 300 - 150, // Reduced from 600 - 300
            }}
            animate={{
              y: [0, -20, 0], // Reduced from -30
              x: [0, Math.random() * 15 - 7.5, 0], // Reduced from 20 - 10
              opacity: [0.2, 0.7, 0.2],
              scale: [0.5, 1.0, 0.5], // Reduced from 1.2
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center text-center px-4 overflow-hidden">
      {/* Animated Background */}
      <AnimatedShieldBackground />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto relative z-20"
      >
        <Badge variant="secondary" className="mb-6">
          AI-Powered Protection
        </Badge>
        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-8">
          Shield Your Reality with{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dhaal AI
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Advanced deepfake detection software for images and videos—helping
          businesses and individuals stay safe from AI-generated threats.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/about"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
          >
            Learn More
          </Link>
          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
