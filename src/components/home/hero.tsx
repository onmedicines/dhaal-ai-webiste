"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import Link from "next/link";

// Animated Background Component
const AnimatedShieldBackground = () => {
  // Define line paths - expanded to cover full viewport
  const lines = [
    // Top area lines
    {
      startX: 0,
      startY: -200,
      midX: 0,
      midY: -400,
      endX: -300,
      endY: -400,
      delay: 0,
    },
    {
      startX: 0,
      startY: -200,
      midX: 0,
      midY: -450,
      endX: 350,
      endY: -450,
      delay: 0.3,
    },

    // Right area lines
    {
      startX: 150,
      startY: -50,
      midX: 400,
      midY: -50,
      endX: 400,
      endY: -250,
      delay: 0.6,
    },
    {
      startX: 150,
      startY: 80,
      midX: 450,
      midY: 80,
      endX: 450,
      endY: 300,
      delay: 0.9,
    },

    // Bottom area lines
    {
      startX: 0,
      startY: 200,
      midX: 0,
      midY: 400,
      endX: -350,
      endY: 400,
      delay: 1.2,
    },
    {
      startX: 0,
      startY: 200,
      midX: 0,
      midY: 450,
      endX: 320,
      endY: 450,
      delay: 1.5,
    },

    // Left area lines
    {
      startX: -150,
      startY: -50,
      midX: -400,
      midY: -50,
      endX: -400,
      endY: -280,
      delay: 1.8,
    },
    {
      startX: -150,
      startY: 100,
      midX: -450,
      midY: 100,
      endX: -450,
      endY: 320,
      delay: 2.1,
    },

    // Diagonal spanning lines
    {
      startX: 120,
      startY: -120,
      midX: 300,
      midY: -300,
      endX: 500,
      endY: -300,
      delay: 2.4,
    },
    {
      startX: -120,
      startY: 120,
      midX: -300,
      midY: 300,
      endX: -500,
      endY: 300,
      delay: 2.7,
    },

    // Additional cross-viewport lines
    {
      startX: -200,
      startY: -200,
      midX: -400,
      midY: -400,
      endX: -400,
      endY: -200,
      delay: 3.0,
    },
    {
      startX: 200,
      startY: 200,
      midX: 400,
      midY: 400,
      endX: 400,
      endY: 200,
      delay: 3.3,
    },

    // Long spanning horizontal lines
    {
      startX: -100,
      startY: 0,
      midX: -500,
      midY: 0,
      endX: -500,
      endY: 150,
      delay: 3.6,
    },
    {
      startX: 100,
      startY: 0,
      midX: 500,
      midY: 0,
      endX: 500,
      endY: -150,
      delay: 3.9,
    },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-25 dark:opacity-35">
      <div className="relative">
        {/* Central Shield - Made larger */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.3, 1],
            opacity: [0, 0.9, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          className="relative z-10"
        >
          <Shield
            size={180}
            className="text-blue-500 drop-shadow-lg"
            fill="currentColor"
          />
        </motion.div>

        {/* Animated Circuit Lines - Full viewport coverage */}
        <svg
          className="absolute"
          style={{
            width: "100vw",
            height: "100vh",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          viewBox="-800 -500 1600 1000" // Expanded width from 1200 to 1600 for longer horizontal lines
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
            </radialGradient>
          </defs>

          {lines.map((line, index) => (
            <g key={index}>
              {/* Line Path - Made brighter */}
              <motion.path
                d={`M ${line.startX} ${line.startY} L ${line.midX} ${line.midY} L ${line.endX} ${line.endY}`}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 0.9, 0.7],
                }}
                transition={{
                  duration: 3,
                  delay: line.delay,
                  ease: "easeInOut",
                }}
              />

              {/* End Node - Made brighter */}
              <motion.circle
                cx={line.endX}
                cy={line.endY}
                r="5"
                fill="url(#nodeGradient)"
                stroke="#3b82f6"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0.9],
                }}
                transition={{
                  duration: 0.8,
                  delay: line.delay + 2.5,
                  ease: "easeOut",
                }}
              />

              {/* Pulsing effect on nodes - Made brighter */}
              <motion.circle
                cx={line.endX}
                cy={line.endY}
                r="5"
                fill="none"
                stroke="url(#nodeGradient)"
                strokeWidth="2"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.8, 0.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  delay: line.delay + 4,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </g>
          ))}

          {/* Additional ambient lines that span across the viewport - Made much longer horizontally */}
          <motion.path
            d="M -800 -200 L 800 -200"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeOpacity="0.6"
            strokeDasharray="10,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1 }}
          />
          <motion.path
            d="M -800 200 L 800 200"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeOpacity="0.6"
            strokeDasharray="10,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1.5 }}
          />
          <motion.path
            d="M -300 -500 L -300 500"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeOpacity="0.6"
            strokeDasharray="10,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 2 }}
          />
          <motion.path
            d="M 300 -500 L 300 500"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeOpacity="0.6"
            strokeDasharray="10,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 2.5 }}
          />

          {/* Additional long horizontal lines for better coverage */}
          <motion.path
            d="M -750 -100 L 750 -100"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray="15,15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, delay: 3 }}
          />
          <motion.path
            d="M -750 100 L 750 100"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray="15,15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, delay: 3.5 }}
          />
        </svg>

        {/* Floating particles spread across larger area - Made brighter */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/80 rounded-full"
            style={{
              left: (Math.random() - 0.5) * 1200, // Increased horizontal spread to match new viewBox
              top: (Math.random() - 0.5) * 800,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
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
