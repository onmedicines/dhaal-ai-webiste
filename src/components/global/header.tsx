"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DhaalAndName from "../logo/dhaalandname";
import DhaalAndNameLight from "../logo/dhaalandnamelight";
import { useTheme } from "next-themes";

export default function Header() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Home", href: "/", isExternal: true },
    { label: "About", href: "/about", isExternal: true },
    { label: "Articles", href: "/articles", isExternal: true },
  ];

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
      <header className="fixed top-0 left-0 right-0 z-50 h-16 w-full backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-b-lg">
        <nav className="h-full">
          <div className="container mx-auto px-6 h-full flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                {resolvedTheme === "light" ? (
                  <DhaalAndName size="sm" />
                ) : (
                  <DhaalAndNameLight size="sm" />
                )}
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <div
                  key={item.label}
                  className="hover:scale-105 transition-transform duration-200"
                >
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
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button + CTA Button */}
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger Menu Button */}
              <div className="md:hidden">
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
              </div>

              {/* CTA Button (Always Visible) */}
              <div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                  onClick={() => router.push("/dashboard")}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Custom Mobile Menu - Animated from Right */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Panel - Slides from right */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-xl shadow-xl border-l border-border/20 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
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
                <div
                  key={item.label}
                  className={`transform transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${index * 100 + 200}ms`
                      : "0ms",
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
                </div>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Footer with Get Started Button */}
          <div className="p-6 border-t border-border/20">
            <div
              className={`transform transition-all duration-300 ease-out ${
                isMobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? "600ms" : "0ms",
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
