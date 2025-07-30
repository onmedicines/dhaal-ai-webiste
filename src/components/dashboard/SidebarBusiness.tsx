"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BarChart3,
  Search,
  Lock,
  Shield,
  Eye,
  DollarSign,
  FileText,
  TrendingUp,
  ImageIcon,
  Video,
  Mic,
  FileSearch,
  Phone,
  LinkIcon,
  Menu,
  ChevronLeft,
  ChevronDown,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type User = {
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  detectionsCount?: number;
};

interface SidebarProps {
  user: User;
}

const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
];

const securityPlugins = [
  { name: "Threat Analysis", href: "/dashboard/threat-analysis", icon: Search },
  { name: "Penetration", href: "/dashboard/penetration", icon: Lock },
  { name: "Security Check", href: "/dashboard/security-check", icon: Shield },
  { name: "Overview Data", href: "/dashboard/overview-data", icon: Eye },
];

const otherItems = [
  {
    name: "Wealth Analyzer",
    href: "/dashboard/wealth-analyzer",
    icon: DollarSign,
  },
  { name: "Plan Details", href: "/dashboard/plan-details", icon: FileText },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
];

const sdkApiProviders = [
  {
    name: "Image Detection",
    href: "/dashboard/image-detection",
    icon: ImageIcon,
  },
  { name: "Video Detection", href: "/dashboard/video-detection", icon: Video },
  { name: "Audio Detection", href: "/dashboard/audio-detection", icon: Mic },
  { name: "Text Analysis", href: "/dashboard/text-analysis", icon: FileSearch },
  { name: "Call Analysis", href: "/dashboard/call-analysis", icon: Phone },
  { name: "URL Scanning", href: "/dashboard/url-scanning", icon: LinkIcon },
];

export default function SidebarIndividual({ user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [securityExpanded, setSecurityExpanded] = useState(true);
  const [sdkExpanded, setSdkExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{
        width: collapsed ? "4rem" : "16rem",
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="bg-card border-r border-border h-full flex flex-col"
    >
      {/* Header with User Info - Fixed */}
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="flex items-center space-x-3"
          >
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl || "/default-avatar.png"}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 p-2 bg-muted rounded-full" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate text-sm">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
              <Badge variant="secondary" className="text-xs mt-1">
                Individual
              </Badge>
            </div>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronLeft className="h-4 w-4 rotate-180" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {/* Main Dashboard */}
          {mainNavItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <div key={name}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-accent text-accent-foreground",
                    collapsed && "justify-center",
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {name}
                    </motion.span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Security Plugins Section */}
        <div className="mt-6">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.3 }}
              className="px-3 mb-2"
            >
              <button
                onClick={() => setSecurityExpanded(!securityExpanded)}
                className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Security Plugins
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    !securityExpanded && "-rotate-90",
                  )}
                />
              </button>
            </motion.div>
          )}

          {(securityExpanded || collapsed) && (
            <div className="space-y-1 px-3">
              {securityPlugins.map(({ name, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <div key={name}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        isActive && "bg-accent text-accent-foreground",
                        collapsed && "justify-center",
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.3 }}
                        >
                          {name}
                        </motion.span>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Other Items */}
        <div className="mt-6 space-y-1 px-3">
          {otherItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <div key={name}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-accent text-accent-foreground",
                    collapsed && "justify-center",
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {name}
                    </motion.span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* SDK & API Providers Section */}
        <div className="mt-6">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.3 }}
              className="px-3 mb-2"
            >
              <button
                onClick={() => setSdkExpanded(!sdkExpanded)}
                className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                SDK & API Providers
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    !sdkExpanded && "-rotate-90",
                  )}
                />
              </button>
            </motion.div>
          )}

          {(sdkExpanded || collapsed) && (
            <div className="space-y-1 px-3">
              {sdkApiProviders.map(({ name, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <div key={name}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        isActive && "bg-accent text-accent-foreground",
                        collapsed && "justify-center",
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.3 }}
                        >
                          {name}
                        </motion.span>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Detection Count Footer - Fixed */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
          className="p-4 border-t border-border flex-shrink-0"
        >
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {user.detectionsCount || 0}
            </p>
            <p className="text-xs text-muted-foreground">Total Detections</p>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}
