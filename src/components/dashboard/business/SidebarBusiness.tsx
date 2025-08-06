"use client";

import { useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BarChart3,
  Search,
  Lock,
  DollarSign,
  FileText,
  // TrendingUp,
  FileSearch,
  Phone,
  LinkIcon,
  Menu,
  ChevronLeft,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useUser } from "@/hooks/useUser";

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
  { name: "My Data", href: "/dashboard/data", icon: FileText },
];

const securityPlugins = [
  { name: "Threat Analysis", href: "/dashboard/threat-analysis", icon: Search },
  { name: "Penetration", href: "/dashboard/penetration", icon: Lock },
];

const financeItems = [
  {
    name: "Wealth Analyzer",
    href: "/dashboard/wealth-analyzer",
    icon: DollarSign,
  },
  { name: "Plan Details", href: "/dashboard/plan-details", icon: FileText },
  // { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
];

const sdkApiProviders = [
  { name: "Text Analysis", href: "/dashboard/text-analysis", icon: FileSearch },
  { name: "Call Analysis", href: "/dashboard/call-analysis", icon: Phone },
  { name: "URL Scanning", href: "/dashboard/url-scanning", icon: LinkIcon },
];

export default function SidebarIndividual({ user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  /* ───────── helpers ───────── */
  const renderLinks = (items: typeof securityPlugins) =>
    items.map(({ name, href, icon: Icon }) => {
      const isActive = pathname === href;
      return (
        <Link
          key={name}
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
      );
    });

  /* ───────── component ───────── */
  return (
    <motion.aside
      animate={{ width: collapsed ? "4rem" : "16rem" }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="bg-card border-r border-border h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        {!collapsed && <h3>Menu</h3>}
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

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {/* Main */}
        <div className="space-y-1 px-3">{renderLinks(mainNavItems)}</div>

        {/* Security Plugins */}
        {!collapsed && (
          <p className="mt-6 mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Security Plugins
          </p>
        )}
        <div className="space-y-1 px-3">{renderLinks(securityPlugins)}</div>

        {/* Finance & Insights */}
        {!collapsed && (
          <p className="mt-6 mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Finance & Insights
          </p>
        )}
        <div className="space-y-1 px-3">{renderLinks(financeItems)}</div>

        {/* SDK & API Providers */}
        {!collapsed && (
          <p className="mt-6 mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            SDK & API Providers
          </p>
        )}
        <div className="space-y-1 px-3">{renderLinks(sdkApiProviders)}</div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
