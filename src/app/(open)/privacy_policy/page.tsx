"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DhaalLogo from "@/components/logo/dhaal";
import Link from "next/link";
import Header from "@/components/global/header";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-12 max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold mb-3">{title}</h2>
    <div className="space-y-4 text-muted-foreground text-base">{children}</div>
  </section>
);

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen py-20 px-4 bg-background">
        {/* Animated Hero */}
        <section className="relative flex flex-col items-center mb-16">
          {/* Optional animated background: reuse your AnimatedShieldBackground here */}
          <DhaalLogo size={90} />
          <Badge variant="secondary" className="mb-4">
            Privacy First
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-2">
            Dhaal.io Privacy Policy
          </h1>
          <div className="text-muted-foreground text-lg text-center max-w-xl">
            Effective Date: March 20, 2025
          </div>
        </section>

        {/* Core sections */}
        <Section title="1. Introduction">
          <p>
            Welcome to <b>Dhaal.io</b> (
            <i>&quot;we,&quot; &quot;us,&quot; &quot;our&quot;</i>). Your
            privacy is our priority. Dhaal.io is a digital shield designed to
            protect you from online scams, fraud, and deepfakes by analyzing
            media and text. This policy explains what we collect, how we use it,
            your rights, and how we protect your data.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <b>Account Info:</b> Name, email, and password when you sign up.
            </li>
            <li>
              <b>User Content:</b> Media and text you upload for analysis
              (images, videos, audio, scam reports, suspicious URLs).
            </li>
            <li>
              <b>Usage Data:</b> App feature usage, scam reports submitted,
              achievements earned, interactions.
            </li>
            <li>
              <b>Device Info:</b> IP address, device ID, OS, mobile network
              info.
            </li>
            <li>
              <b>Notifications:</b> (If enabled) Device tokens for security
              alerts.
            </li>
            <li>
              <b>Auto-Scan Media:</b> (If enabled by you) Dhaal.io can access
              and auto-scan new media on your device for risks—only flagged
              files get uploaded for deeper scan.
            </li>
            <li>
              <b>Communications:</b> Support requests and your correspondence
              with us.
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc list-inside space-y-2">
            <li>Operate and maintain app features and your account</li>
            <li>
              Analyze uploaded content for fake detection, generate reports
            </li>
            <li>
              <b>Anonymized</b> samples are used to improve our AI detection
              models
            </li>
            <li>Send you security alerts and important updates</li>
            <li>
              Personalize your app experience (impact stats, points earned)
            </li>
            <li>Spot and prevent fraud or abuse</li>
            <li>Comply with laws and regulations</li>
          </ul>
        </Section>

        <Section title="4. How We Share Data">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <b>Never sold</b> to anyone. Only shared when necessary:
            </li>
            <li>
              With trusted
              <br className="hidden md:inline" /> service providers (hosting,
              analytics, support)—they can&apos;t use your data for anything
              else.
            </li>
            <li>When required by law or court/government order.</li>
            <li>During a company merger/acquisition—with advance notice.</li>
            <li>Aggregated/anonymous data for research or trends.</li>
            <li>With your explicit consent for any other reason.</li>
          </ul>
        </Section>

        <Section title="5. Data Security">
          <p>
            We use <b>encryption (SSL/TLS)</b> for data in transit and strict
            internal access controls. Still, no method can be 100% secure—let us
            know immediately if you spot any suspicious activity.
          </p>
        </Section>

        <Section title="6. Data Retention & Deletion">
          <ul className="list-disc list-inside space-y-2">
            <li>
              We keep your data only as long as your account is active or as
              needed for our services and legal obligations.
            </li>
            <li>
              Delete your account anytime from the app
              <br />
              <b>Or:</b>{" "}
              <Link
                href="mailto:Support@dhaal.io?subject=Account Deletion Request"
                className="underline text-primary"
              >
                Email Support@dhaal.io
              </Link>
              .
            </li>
            <li>
              Your account and linked data will be permanently deleted from our
              production systems in a reasonable time in line with the law.
            </li>
          </ul>
        </Section>

        <Section title="7. Your Rights & Choices">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <b>Review/update</b> your account info in the app
            </li>
            <li>
              <b>Opt out</b> of push notifications or auto-scan in app settings
            </li>
            <li>
              <b>Request account/data deletion</b> at any time
            </li>
          </ul>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            Dhaal.io is <b>not for children under 13</b>. If we learn a
            child&apos;s information was collected, we&apos;ll delete it
            promptly.
          </p>
        </Section>

        <Section title="9. Policy Updates">
          <p>
            We update this policy as needed, announcing big changes in-app or by
            email. Please review it regularly for updates. <b>Latest update:</b>{" "}
            July 31, 2025.
          </p>
        </Section>

        <Section title="10. Contact Us">
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

        {/* Optional: Back/home button */}
        <div className="flex justify-center gap-6 mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
