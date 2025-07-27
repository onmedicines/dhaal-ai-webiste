"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // Add this
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Frosted Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} // Add this
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-12 rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-2xl"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 space-y-8">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} // Add this
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Ready to Defend Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Reality
                </span>
                ?
              </motion.h2>

              <motion.p
                className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} // Add this
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Do not wait for deepfakes to target you. Start protecting
                yourself and your business today with our advanced AI detection
                technology.
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} // Add this
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-4"
              >
                <Button
                  size="lg"
                  className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
                  onClick={() => alert("Signup flow coming soon")}
                >
                  Protect Yourself Now
                </Button>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/3 left-4 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse delay-500"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
