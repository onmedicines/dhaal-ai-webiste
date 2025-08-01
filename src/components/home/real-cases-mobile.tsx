"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

export default function MobileRealCasesSection() {
  return (
    <section id="cases" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Real{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Deepfake
            </span>{" "}
            Cases
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            These are not theoretical threats—they are real incidents that have
            already caused significant damage.
          </p>
        </motion.div>

        {/* Cases */}
        <div className="space-y-16">
          {cases.map((caseData, index) => (
            <div key={index} className="space-y-6">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={caseData.img}
                  alt={caseData.headline}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Case counter overlay */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/80 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                    {index + 1} / {cases.length}
                  </div>
                </div>

                {/* Subtle gradient overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Text Content */}
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl md:text-2xl font-bold leading-tight">
                  {caseData.headline}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {caseData.body}
                </p>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
