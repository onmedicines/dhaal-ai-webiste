"use client";

import { motion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DhaalAndName from "../logo/dhaalandname";
import DhaalAndNameLight from "../logo/dhaalandnamelight";
import { useTheme } from "next-themes";

export default function HomePageHeader() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { resolvedTheme } = useTheme();

  const navigationItems = [
    { label: "About", href: "/about", isExternal: true },
    { label: "Cases", href: "#cases", isExternal: false },
    { label: "Protection", href: "#protection", isExternal: false },
    { label: "Articles", href: "/articles", isExternal: true },
  ];

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      // Show header when scrolled down 150px or more
      setIsVisible(latest > 150);
    });

    return () => unsubscribe();
  }, [scrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      // For same-page anchor links
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
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
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: isVisible ? 0.2 : 0, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                {resolvedTheme === "light" ? (
                  <DhaalAndName size="sm" />
                ) : (
                  <DhaalAndNameLight size="sm" />
                )}
              </motion.div>
            </Link>

            {/* Desktop Navigation Links */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: isVisible ? 0.3 : 0, duration: 0.4 }}
              className="hidden md:flex items-center gap-8"
            >
              {navigationItems.map((item) => (
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

            {/* Mobile Menu Button + Desktop CTA Button */}
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger Menu Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                }
                transition={{ delay: isVisible ? 0.4 : 0, duration: 0.4 }}
                className="md:hidden"
              >
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-sm"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 text-foreground" />
                  ) : (
                    <Menu className="h-5 w-5 text-foreground" />
                  )}
                </button>
              </motion.div>

              {/* Desktop + Mobile CTA Button (Always Visible) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                }
                transition={{ delay: isVisible ? 0.4 : 0, duration: 0.4 }}
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                  onClick={() => router.push("/dashboard")}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Custom Mobile Menu - Animated from Right */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${isMobileMenuOpen ? "visible" : "invisible"}`}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Panel - Slides from right */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4,
          }}
          className="fixed top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-xl shadow-xl border-l border-border/20"
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-6">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : 30,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: isMobileMenuOpen ? index * 0.1 + 0.2 : 0,
                  }}
                >
                  {item.isExternal ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-muted/50"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className="block w-full text-left text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-muted/50 bg-transparent border-none cursor-pointer"
                    >
                      {item.label}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Footer with Get Started Button */}
          <div className="p-6 border-t border-border/20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{
                duration: 0.3,
                delay: isMobileMenuOpen ? 0.6 : 0,
              }}
            >
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                onClick={() => {
                  router.push("/dashboard");
                  setIsMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
