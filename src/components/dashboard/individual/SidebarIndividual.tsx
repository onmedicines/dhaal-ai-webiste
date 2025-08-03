"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Bell,
  Shield,
  CreditCard,
  LifeBuoy,
  Settings,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
  detectionsCount: number;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
};

interface SidebarProps {
  user: User;
}

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "My Data", href: "/dashboard/data", icon: FileText },
  // { name: "Registered Assets", href: "/dashboard/assets", icon: FileText },
  { name: "Insurance & Claims", href: "/dashboard/insurance", icon: Shield },
  { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
  { name: "Alert Center", href: "/dashboard/alerts", icon: Bell },
  { name: "Help & Support", href: "/dashboard/support", icon: LifeBuoy },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function SidebarIndividual({ user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // px values for animation (Tailwind w-16 = 64px, w-64 = 256px)
  const collapsedWidth = 64;
  const expandedWidth = 256;

  return (
    <motion.aside
      initial={{ width: expandedWidth }}
      animate={{ width: collapsed ? collapsedWidth : expandedWidth }}
      transition={{ type: "tween", duration: 0.25 }}
      className="bg-card border-r border-border h-screen flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              key="menuLabel"
              className="font-semibold"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              Menu
            </motion.span>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed((p) => !p)}
        >
          {collapsed ? (
            <ChevronLeft className="h-4 w-4 rotate-180" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={name}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-accent text-accent-foreground",
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />

                  {/* Label animation */}
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span
                        key={name}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.15 }}
                        className="whitespace-nowrap"
                      >
                        {name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="footer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="p-4 border-t border-border text-center"
          >
            <p className="text-lg font-semibold text-foreground">
              {user.detectionsCount ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Total Detections</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
