"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Zap, Link, RotateCcw } from "lucide-react";

export default function ProtectionSection() {
  const features = [
    {
      title: "Advanced Detection",
      desc: "State-of-the-art image forensics with >98% accuracy rate using neural networks",
      icon: Search,
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Real-time Analysis",
      desc: "Upcoming video analysis module for live streams and instant uploads",
      icon: Zap,
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Easy Integration",
      desc: "Seamless API & dashboard integrations with your existing security systems",
      icon: Link,
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Always Updated",
      desc: "Continuous model updates against emerging deepfake techniques and threats",
      icon: RotateCcw,
      gradient: "from-orange-500/20 to-red-500/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="protection"
      className="bg-gradient-to-b from-background via-secondary/10 to-background py-24 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // Add this
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            How{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Dhaal IO
            </span>{" "}
            Keeps You Safe
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Our cutting-edge AI technology provides comprehensive, multi-layered
            protection against sophisticated deepfake threats in real-time.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Changed once: false to once: true
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {features.map(({ title, desc, icon: Icon, gradient }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{
                scale: 1.01,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              className={`p-6 rounded-xl bg-gradient-to-br ${gradient} border border-border/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm">
                  <Icon size={24} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-3">{title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // Add this
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={() => alert("Demo video coming soon!")}
              className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
