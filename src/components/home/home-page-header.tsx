"use client";

import { motion, useScroll } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePageHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      // Show header when scrolled down 150px or more
      setIsVisible(latest > 150);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      // For same-page anchor links
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // For external links like "/about", Next.js Link will handle it
  };

  return (
    <motion.header
      className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 h-16 w-full max-w-screen-xl backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-b-lg"
      initial={{ opacity: 0, width: "0%", scale: 0.5 }}
      animate={
        isVisible
          ? { opacity: 1, width: "100%", scale: 1 }
          : { opacity: 0, width: "0%", scale: 0.5 }
      }
      transition={{
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <div className="h-full">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: isVisible ? 0.2 : 0, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dhaal AI
            </span>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: isVisible ? 0.3 : 0, duration: 0.4 }}
            className="hidden md:flex items-center gap-8"
          >
            {[
              { label: "About", href: "/about", isExternal: true },
              { label: "Cases", href: "#cases", isExternal: false },
              { label: "Features", href: "#features", isExternal: false },
              { label: "Protection", href: "#protection", isExternal: false },
              { label: "Articles", href: "/articles", isExternal: true },
            ].map((item) => (
              <motion.div key={item.label} whileHover={{ scale: 1.05 }}>
                {item.isExternal ? (
                  <Link
                    href={item.href}
                    className="text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm font-medium bg-transparent border-none cursor-pointer"
                  >
                    {item.label}
                  </button>
                )}
              </motion.div>
            ))}
          </motion.nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: isVisible ? 0.4 : 0, duration: 0.4 }}
          >
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
              onClick={() => alert("Get started coming soon!")}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
