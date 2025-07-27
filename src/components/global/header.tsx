"use client";

import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
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
    <header className="fixed top-0 left-0 right-0 z-50 h-16 w-full backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-b-lg">
      <nav className="h-full">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dhaal AI
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", href: "/", isExternal: true },
              { label: "About", href: "/about", isExternal: true },
              { label: "Articles", href: "/articles", isExternal: true },
            ].map((item) => (
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

          {/* CTA Button */}
          <div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
              onClick={() => alert("Get started coming soon!")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
