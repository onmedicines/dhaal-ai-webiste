"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DhaalLogo from "@/components/logo/dhaal";
import Link from "next/link";
import Header from "@/components/global/header";

// Section component for visual consistency
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mb-12 max-w-3xl mx-auto"
  >
    <h2 className="text-2xl font-bold mb-3">{title}</h2>
    <div className="space-y-4 text-muted-foreground text-base">{children}</div>
  </motion.section>
);

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen py-20 px-4 bg-background">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center mb-16">
          {/* Optional animated background: reuse your AnimatedShieldBackground for coherence */}
          <DhaalLogo size={90} />
          <Badge variant="secondary" className="mb-4">
            Terms of Use
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold text-center mb-2"
          >
            Dhaal.AI Terms &amp; Conditions
          </motion.h1>
          <div className="text-muted-foreground text-lg text-center max-w-xl">
            Effective Date: March 21, 2025
          </div>
        </section>

        <Section title="1. Agreement to Terms">
          <p>
            Welcome to <b>Dhaal.AI</b>. These Terms &amp; Conditions
            (&quot;Terms&quot;) govern your access to and use of the Dhaal.AI
            mobile app and related services (&quot;Services&quot;) provided by
            us.
          </p>
          <p>
            By creating an account or using our Services, you agree to be bound
            by these Terms and our{" "}
            <Link href="/privacy-policy" className="underline text-primary">
              Privacy Policy
            </Link>
            . If you do not agree, you must not use our Services.
          </p>
        </Section>

        <Section title="2. Description of Services">
          <p>
            Dhaal.AI provides digital protection to help identify and protect
            you from online scams, fraud, deepfakes, and other malicious
            content. Services include analysis of user-submitted media (images,
            videos, audio), text, URLs, and community-based reporting/alert
            features.
          </p>
        </Section>

        <Section title="3. User Accounts">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <b>Account Creation:</b> To access most features, you must
              register. Please provide accurate and complete information.
            </li>
            <li>
              <b>Account Responsibility:</b> Keep your password safe. Notify us
              immediately (
              <Link
                href="mailto:Support@dhaal.io"
                className="underline text-primary"
              >
                Support@dhaal.io
              </Link>
              ) of any unauthorized use.
            </li>
            <li>
              <b>Eligibility:</b> You must be at least 13 years old (or the
              legal age in your region) to have an account.
            </li>
          </ul>
        </Section>

        <Section title="4. User Conduct and Responsibilities">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Use the Services lawfully and only as permitted by these Terms.
            </li>
            <li>
              <b>Do not:</b>
              <ul className="list-disc ml-6">
                <li>
                  Upload or share content that is illegal, harmful, infringing,
                  or abusive.
                </li>
                <li>Use the Services to harass, abuse, or harm any person.</li>
                <li>Reverse engineer or decompile the App.</li>
                <li>
                  Use bots or automated means to access our Services without
                  written permission.
                </li>
                <li>
                  Disrupt the integrity or performance of the Services or
                  others’ data.
                </li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="5. Content You Provide">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <b>Your Ownership:</b> You keep all rights to content (photos,
              videos, reports, URLs) you submit.
            </li>
            <li>
              <b>License to Us:</b> By submitting content, you grant Dhaal.AI a
              global, non-exclusive, royalty-free license to use, store,
              analyze, reproduce, and prepare derivatives (such as anonymized
              datasets) of your content for operating, improving, and developing
              our Services—including AI training.
              <br />
              <b>Note:</b> This license continues for anonymized data sets only,
              even if you stop using the Services.
            </li>
          </ul>
        </Section>

        <Section title="6. Our Intellectual Property">
          <p>
            Dhaal.AI and its licensors own all rights to the Services, including
            designs, software, logos, and technology. The Services are protected
            by copyright and trademark laws. Do not use the Dhaal.AI name,
            trademarks, or logos without written permission.
          </p>
        </Section>

        <Section title="7. Disclaimers of Warranties">
          <ul className="list-disc list-inside space-y-2">
            <li>
              The Services are provided <b>&quot;as is&quot;</b> and{" "}
              <b>&quot;as available&quot;</b> with no warranties, express or
              implied.
            </li>
            <li>
              Dhaal.AI does <b>not</b> guarantee:{" "}
              <ul className="list-disc ml-6">
                <li>
                  100% accuracy in analysis or that all scams/frauds/deepfakes
                  are detected.
                </li>
                <li>
                  Uninterrupted, secure operation free from bugs, errors,
                  viruses, or harm.
                </li>
              </ul>
            </li>
            <li>
              All analysis is informational and <b>not a substitute</b> for your
              own personal or financial decision-making.
            </li>
          </ul>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            To the extent permitted by law, Dhaal.AI and its team will{" "}
            <b>not</b> be liable for indirect, incidental, special,
            consequential, or punitive damages—including loss of profits, data,
            goodwill, or use—arising from use of our Services, third-party
            content, or unauthorized access, whether based on warranty,
            contract, tort, or any other legal theory.
          </p>
        </Section>

        <Section title="9. Indemnification">
          <p>
            You agree to indemnify and hold harmless Dhaal.AI and its team from
            all claims, damages, or costs (including legal fees) arising out of
            your use of the Services or violation of these Terms.
          </p>
        </Section>

        <Section title="10. Termination">
          <p>
            We may suspend or terminate your access at any time, with or without
            notice, including for violations of these Terms.
          </p>
          <p>
            You may terminate your account anytime via the app or by contacting{" "}
            <Link
              href="mailto:Support@dhaal.io"
              className="underline text-primary"
            >
              Support@dhaal.io
            </Link>
            . On termination, your right to use the Services ends.
          </p>
        </Section>

        <Section title="11. Governing Law and Dispute Resolution">
          <p>
            These Terms are governed by the laws of India. Disputes will be
            resolved in courts located in Lucknow, Uttar Pradesh, India.
          </p>
        </Section>

        <Section title="12. Changes to Terms">
          <p>
            Dhaal.AI may update these Terms at any time, at its sole discretion.
            Material changes will be announced by notice in the App or other
            channels, with at least 30 days’ notice. Continued use after changes
            means acceptance.
          </p>
        </Section>

        <Section title="13. Contact Us">
          <div className="space-y-2">
            <div>
              <b>Email:</b>{" "}
              <Link
                href="mailto:Support@dhaal.io"
                className="underline text-primary"
              >
                Support@dhaal.io
              </Link>
            </div>
            <div>
              <b>Phone:</b> +91 9250696982, +91 6307910429
            </div>
            <div>
              <b>Address:</b> B-2013, Indira Nagar Rd, opposite of PNB, B Block,
              Indira Nagar, Lucknow, Uttar Pradesh 226016, India.
            </div>
          </div>
        </Section>

        <div className="flex justify-center gap-6 mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="link" size="lg">
            <Link href="/privacy_policy">Read Privacy Policy</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
