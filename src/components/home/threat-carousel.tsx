"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Users,
  TrendingDown,
  DollarSign,
  Heart,
  Briefcase,
  Smartphone,
} from "lucide-react";

const businessSlides = [
  {
    title: "Voice Cloning Fraud",
    desc: "Criminals create fake audio of company executives to authorize fraudulent money transfers, causing millions in losses.",
    icon: Users,
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    title: "Brand Damage",
    desc: "Fake videos showing false product recalls or negative statements destroy customer trust and company reputation.",
    icon: TrendingDown,
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    title: "Market Manipulation",
    desc: "False videos of executives making fake announcements are used to artificially move stock prices up or down.",
    icon: DollarSign,
    gradient: "from-yellow-500/20 to-red-500/20",
  },
];

const individualSlides = [
  {
    title: "Personal Image Abuse",
    desc: "Someone's face is digitally swapped into inappropriate content without consent, causing emotional trauma.",
    icon: Heart,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Fake Job Interviews",
    desc: "Scammers create fake video interviews with made-up recruiters to steal personal information and money.",
    icon: Briefcase,
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Social Media Lies",
    desc: "Fake videos make it appear someone said or did things they never did, ruining their reputation online.",
    icon: Smartphone,
    gradient: "from-purple-500/20 to-blue-500/20",
  },
];

const tabButtons: Array<{ id: "biz" | "ind"; label: string }> = [
  { id: "biz", label: "Business Threats" },
  { id: "ind", label: "Individual Threats" },
];

export default function ThreatCarousel() {
  const [tab, setTab] = useState<"biz" | "ind">("biz");
  const slides = tab === "biz" ? businessSlides : individualSlides;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
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
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            How Deepfakes Are Used to{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Harm People
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            These fake videos and audio clips are being used right now to scam,
            deceive, and hurt both businesses and everyday people.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tabButtons.map(({ id, label }) => (
            <Button
              key={id}
              variant={tab === id ? "default" : "secondary"}
              onClick={() => setTab(id)}
              className={cn(
                "px-8 py-3 transition-all duration-300",
                tab === id && "ring-2 ring-ring shadow-lg",
              )}
            >
              {label}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {slides.map(({ title, desc, icon: Icon, gradient }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className={cn(
                    "h-full bg-gradient-to-br border-0 shadow-lg hover:shadow-xl transition-shadow duration-300",
                    gradient,
                  )}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-full">
                      <Icon size={32} className="text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">
                      {title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      {desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
