"use client";

import Header from "@/components/global/header";
import { motion } from "framer-motion";
import { Shield, Eye, Zap, Globe } from "lucide-react";

export default function LearnMorePage() {
  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen bg-gradient-to-b from-background via-secondary/5 to-background">
        <div className="container mx-auto px-4 py-16">
          <article className="max-w-4xl mx-auto">
            {/* Hero Heading */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dhaal IO
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Understanding the future of digital trust and protection in an
                AI-driven world
              </p>
            </motion.header>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="prose prose-lg prose-slate dark:prose-invert max-w-none space-y-8"
            >
              {/* Introduction Section */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  What is Dhaal IO?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Dhaal IO is a cutting-edge artificial intelligence platform
                  specifically designed to combat the growing threat of
                  deepfakes—sophisticated, AI-generated fake images and videos
                  that are becoming increasingly difficult to detect with the
                  human eye. Our technology serves as a digital shield,
                  protecting businesses and individuals from the potentially
                  devastating consequences of deepfake attacks.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  In today&apos;s digital landscape, where seeing is no longer
                  believing, Dhaal IO provides the critical verification layer
                  needed to maintain trust in multimedia content. Our advanced
                  detection algorithms analyze digital media at the pixel level,
                  identifying subtle inconsistencies and artifacts that reveal
                  artificial manipulation.
                </p>
              </section>

              {/* Technology Section */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Eye className="text-blue-500" />
                  Our Technology
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At the heart of Dhaal IO lies state-of-the-art image forensics
                  technology powered by deep neural networks. Our detection
                  models achieve over 98% accuracy in identifying deepfakes,
                  even those created with the most sophisticated generation
                  techniques. The system performs real-time analysis, providing
                  instant verification results without compromising on accuracy.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our upcoming video analysis module will extend these
                  capabilities to moving images, enabling comprehensive
                  protection across all multimedia formats. This advancement
                  positions Dhaal IO as the most complete deepfake detection
                  solution available in the market.
                </p>
              </section>

              {/* Integration Section */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Zap className="text-purple-500" />
                  Seamless Integration
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Dhaal IO is designed to integrate effortlessly with your
                  existing security infrastructure. Our robust API allows for
                  easy implementation into content management systems, social
                  media platforms, news organizations, and enterprise security
                  suites. The intuitive dashboard provides real-time monitoring,
                  detailed analysis reports, and actionable insights.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you need batch processing for large media libraries or
                  real-time verification for live content streams, Dhaal IO
                  adapts to your workflow requirements. Our flexible deployment
                  options include cloud-based solutions and on-premises
                  installations for organizations with strict data privacy
                  requirements.
                </p>
              </section>

              {/* Continuous Evolution */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Globe className="text-cyan-500" />
                  Always Evolving
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The deepfake landscape is constantly evolving, with new
                  generation techniques emerging regularly. Dhaal IO stays ahead
                  of these threats through continuous model updates and training
                  on the latest deepfake samples. Our research team actively
                  monitors emerging AI generation technologies to ensure our
                  detection capabilities remain cutting-edge.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  This commitment to innovation means that when you choose Dhaal
                  IO, you&apos;re not just getting today&apos;s best detection
                  technology—you&apos;re investing in a solution that will
                  continue to protect you against tomorrow&apos;s threats.
                </p>
              </section>

              {/* Who We Serve */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Shield className="text-green-500" />
                  Who We Protect
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong>For Businesses:</strong> Dhaal IO safeguards brand
                  reputation, prevents fraud, and maintains customer trust. From
                  protecting against fake CEO videos used in financial scams to
                  ensuring authentic marketing content, our technology serves as
                  a crucial defense layer for modern enterprises.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong>For Individuals:</strong> Personal identity protection
                  is increasingly important in our digital age. Dhaal IO helps
                  individuals verify suspicious content, protect against revenge
                  porn, and maintain control over their digital likeness. Our
                  technology empowers people to confidently navigate the digital
                  world.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong>For Organizations:</strong> News agencies, educational
                  institutions, legal firms, and government bodies rely on Dhaal
                  IO to verify content authenticity, maintain information
                  integrity, and make informed decisions based on trusted
                  multimedia evidence.
                </p>
              </section>

              {/* Call to Action (optional) */}
              {/* <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-border/50 text-center space-y-4"
              >
                <h3 className="text-2xl font-bold text-foreground">
                  Ready to Secure Your Digital Future?
                </h3>
                <p className="text-lg text-muted-foreground">
                  Join the growing community of organizations and individuals
                  who trust Dhaal IO to protect their digital reality.
                </p>
              </motion.section> */}
            </motion.div>
          </article>
        </div>
      </div>
    </>
  );
}
