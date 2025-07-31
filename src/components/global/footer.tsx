"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import DhaalAndName from "../logo/dhaalandname";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 border-t border-gray-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              {/* <Shield className="w-8 h-8 text-slate-700 dark:text-slate-300" />
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                Dhaal AI
              </span> */}
              <DhaalAndName size="lg" />
            </motion.div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Advanced AI-powered deepfake detection technology protecting
              businesses and individuals from sophisticated digital threats.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {[
                "Image Detection",
                "Video Analysis",
                "API Access",
                "Dashboard",
                "Pricing",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press Kit", "Blog", "Security"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-500 dark:text-slate-500" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">
                  hello@dhaal.ai
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-500 dark:text-slate-500" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-500" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6">
            {[
              { name: "Privacy Policy", href: "/privacy_policy" },
              { name: "Terms of Service", href: "/t&c" },
              { name: "Cookie Policy", href: "/cookie-policy" },
              { name: "GDPR Compliance", href: "/gdpr-compliance" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © 2025 Dhaal AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
