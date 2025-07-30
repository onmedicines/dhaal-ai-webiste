"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  BellRing,
  FileText,
  ShieldCheck,
  CreditCard,
  LifeBuoy,
  Settings,
  Menu,
  ChevronLeft,
  UserCog,
  BarChart3,
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

const navItems = [
  { name: "Overview", href: "/dashboard/overview", icon: Building2 },
  { name: "Assets Management", href: "/dashboard/assets", icon: FileText },
  { name: "Alerts & Incidents", href: "/dashboard/alerts", icon: BellRing },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  {
    name: "Insurance Policies",
    href: "/dashboard/insurance",
    icon: ShieldCheck,
  },
  { name: "Team & Roles", href: "/dashboard/team", icon: Users },
  { name: "Admin Tools", href: "/dashboard/admin", icon: UserCog },
  { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
  { name: "Help & Support", href: "/dashboard/support", icon: LifeBuoy },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function SidebarBusiness({ user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-card border-r border-border h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header with User Info */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <Image
              src={user.avatarUrl || "/default-avatar.png"}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate text-sm">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
              <Badge variant="outline" className="text-xs mt-1">
                Business
              </Badge>
            </div>
          </div>
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
                    collapsed && "justify-center",
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Detection Count Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {user.detectionsCount || 0}
            </p>
            <p className="text-xs text-muted-foreground">Total Detections</p>
          </div>
        </div>
      )}
    </aside>
  );
}
