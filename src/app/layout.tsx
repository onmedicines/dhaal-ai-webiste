import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

// --- Enhanced Metadata for Dhaal.io ---
export const metadata: Metadata = {
  // --- Basic Metadata ---
  title: {
    default: "Dhaal AI | Your Digital Shield Against Deepfakes & Scams",
    template: `%s | Dhaal AI`,
  },
  description:
    "Protect yourself with Dhaal AI, the leading tool for detecting deepfakes, online scams, and fraudulent content. Instantly analyze images, videos, and URLs to stay safe online.",

  // --- Keywords & SEO Tags ---
  keywords: [
    "Deepfake detection",
    "Scam detector",
    "Fraud prevention",
    "AI security",
    "Online safety",
    "Digital shield",
    "Fake video detector",
    "Image analysis",
    "URL scanner",
    "Misinformation",
    "Disinformation",
    "Phishing protection",
    "Cybersecurity",
    "Dhaal AI",
    "Dhaal.io",
  ],

  // --- Canonical URL and Base ---
  metadataBase: new URL("https://dhaal.io"),
  alternates: {
    canonical: "/",
  },

  // --- Author and Creator Information ---
  creator: "Dhaal AI Team",
  authors: [{ name: "Dhaal AI Team", url: "https://dhaal.io" }],

  // --- Open Graph (OG) Tags for Social Media Sharing ---
  openGraph: {
    title: "Dhaal AI | Your Digital Shield Against Deepfakes & Scams",
    description:
      "Instantly analyze content to detect deepfakes and scams with Dhaal AI.",
    url: "https://dhaal.io",
    siteName: "Dhaal AI",
    // IMPORTANT: Create an engaging image (1200x630px) and place it in your `/public` folder.
    images: [
      {
        url: "/dhaal-og-image.png", // Example: https://dhaal.io/dhaal-og-image.png
        width: 1200,
        height: 630,
        alt: "Dhaal AI - Digital Shield Against Online Scams and Deepfakes",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // --- Twitter Card Tags ---
  twitter: {
    card: "summary_large_image",
    title: "Dhaal AI | Your Digital Shield Against Deepfakes & Scams",
    description:
      "Instantly analyze content to detect deepfakes and scams with Dhaal AI.",
    // IMPORTANT: This can be the same image as the Open Graph image.
    images: ["/dhaal-og-image.png"],
    // IMPORTANT: Replace with your company's actual Twitter handle if you have one.
    creator: "@DhaalAI",
  },

  // --- Favicons and App Icons ---
  // IMPORTANT: Make sure these icons exist in your `/public` folder.
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },

  // --- Search Engine Crawler Instructions ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // --- Optional: Browser UI Theme Color ---
  themeColor: "#111827", // This color will be used on browser tabs (e.g., on mobile Chrome).
};

// --- Original Layout Component ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
