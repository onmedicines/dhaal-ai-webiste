"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cases = [
  {
    img: "/unsplash.jpg",
    headline: "The €240k CEO Voice Scam",
    body: "Criminals used an AI-generated voice clone of a UK energy CEO to convince a finance director to wire €240,000 to a fraudulent 'supplier'. The voice was so convincing that the director never questioned the unusual request, highlighting how sophisticated these attacks have become.",
  },
  {
    img: "/unsplash2.jpg",
    headline: "Crypto Founder Deepfake AMA",
    body: "Investors lost millions after a fake live-streamed AMA featuring a deepfaked founder reassured backers hours before the rug-pull. The realistic video convinced thousands of investors that the project was legitimate, demonstrating the power of visual deception in financial fraud.",
  },
  {
    img: "/unsplash.jpg", // Make sure this is a different image
    headline: "Celebrity Face Swap Hoax",
    body: "A viral fake video placed a Hollywood actor at a controversial political rally, sparking international backlash and trending hashtags before being debunked. The incident showed how deepfakes can be weaponized to damage reputations and influence public opinion within hours.",
  },
];

function CaseItem({
  caseData,
  index,
  onInView,
}: {
  caseData: (typeof cases)[0];
  index: number;
  onInView: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const isIntersecting = entry.isIntersecting;

        if (isIntersecting && ratio > 0.4) {
          onInView(index);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "0px 0px -40% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [index, onInView]);

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <article className="space-y-6 max-w-lg">
        <motion.h3
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          {caseData.headline}
        </motion.h3>
        <motion.p
          className="text-muted-foreground text-lg leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
        >
          {caseData.body}
        </motion.p>
      </article>
    </motion.div>
  );
}

export default function RealCasesSection() {
  const [active, setActive] = useState(0);

  const handleInView = (index: number) => {
    if (index !== active) {
      setActive(index);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Real{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Deepfake
            </span>{" "}
            Cases
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These are not theoretical threats—they are real incidents that have
            already caused significant damage.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Fixed/Pinned image column - LEFT SIDE */}
          <div className="lg:sticky lg:top-24 h-[400px] lg:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${active}`}
                initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotateY: 10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={cases[active].img}
                  alt={cases[active].headline}
                  fill
                  className="object-cover rounded-lg shadow-xl"
                  priority={active === 0}
                />

                {/* Case counter overlay */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    className="bg-black/80 text-white px-3 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                    key={`counter-${active}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {active + 1} / {cases.length}
                  </motion.div>
                </div>

                {/* Subtle gradient overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scrollable text column - RIGHT SIDE */}
          <div className="relative">
            {cases.map((caseData, idx) => (
              <CaseItem
                key={`case-${idx}`}
                caseData={caseData}
                index={idx}
                onInView={handleInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
