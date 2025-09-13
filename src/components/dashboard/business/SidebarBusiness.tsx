"use client";

import { useState } from "react";
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
  FileSearch,
  Phone,
  LinkIcon,
  Menu,
  ChevronLeft,
  ChevronDown,
  LucideIcon,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Accordion from "@radix-ui/react-accordion";

// shadcn dropdown wrapper components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

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
  { name: "Threat Analysis", href: "/dashboard/threat-analysis", icon: Search as LucideIcon },
  { name: "Penetration", href: "/dashboard/penetration", icon: Lock as LucideIcon },
];

const financeItems = [
  { name: "Wealth Analyzer", href: "/dashboard/wealth-analyzer", icon: DollarSign as LucideIcon },
  { name: "Plan Details", href: "/dashboard/plan-details", icon: FileText as LucideIcon },
];

const sdkApiProvidersBase = [
  { name: "Text Analysis", href: "/dashboard/text-analysis", icon: FileSearch as LucideIcon },
  { name: "Call Analysis", href: "/dashboard/call-analysis", icon: Phone as LucideIcon },
  // URL Scanning will be handled separately to attach a dropdown trigger
];

export default function SidebarIndividual({ user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const LinkItem = ({
    name,
    href,
    Icon,
  }: {
    name: string;
    href: string;
    Icon: LucideIcon;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive && "bg-accent text-accent-foreground",
          collapsed && "justify-center"
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
  };

  // URL Scanning row with dropdown actions
const UrlScanningDropdown = () => {
  const isActive = pathname === "/dashboard/url-scanning";

  return (
    <div>
      <div
        className={cn(
          "flex items-center rounded-lg text-sm transition-colors",
          isActive && "bg-accent text-accent-foreground"
        )}
      >
        {/* Left: normal link like other tabs */}
        <Link
          href="/dashboard/url-scanning"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 font-medium rounded-l-lg flex-1",
            "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <LinkIcon className="h-5 w-5 flex-shrink-0" />
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.3 }}
            >
              URL Scanning
            </motion.span>
          )}
        </Link>

        {/* Right: arrow trigger opening dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="URL Scanning options"
              onClick={(e) => e.preventDefault()}
              className={cn(
                "flex items-center justify-center px-2 py-2 rounded-r-lg",
                "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/url-scanning/scan">Quick scan</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/url-scanning/detailed-analysis">Detailed analysis</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};


  // Accordion section: inline expansion for a group of links
  const SectionAccordion = ({
    value,
    label,
    items,
    defaultOpen = false,
    extraBottomSlot,
  }: {
    value: string;
    label: string;
    items: { name: string; href: string; icon: LucideIcon }[];
    defaultOpen?: boolean;
    extraBottomSlot?: React.ReactNode; // For URL Scanning dropdown row
  }) => {
    if (collapsed) {
      return (
        <div className="space-y-1 px-3">
          {items.map(({ name, href, icon }) => (
            <LinkItem key={name} name={name} href={href} Icon={icon} />
          ))}
          {extraBottomSlot}
        </div>
      );
    }

    return (
      <Accordion.Root
        type="single"
        collapsible
        defaultValue={defaultOpen ? value : undefined}
        className="mt-6"
      >
        <Accordion.Item value={value} className="border-b-0">
          <Accordion.Header className="px-2">
            <Accordion.Trigger
              className={cn(
                "w-full flex items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider",
                "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                "data-[state=open]:text-foreground"
              )}
            >
              <span>{label}</span>
              <ChevronDown
                className="h-4 w-4 transition-transform data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className={cn(
              "overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            )}
          >
            <div className="mt-1 space-y-1 px-3">
              {items.map(({ name, href, icon }) => (
                <LinkItem key={name} name={name} href={href} Icon={icon} />
              ))}
              {extraBottomSlot}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? "4rem" : "16rem" }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="bg-card border-r border-border h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        {!collapsed && <h3>Menu</h3>}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronLeft className="h-4 w-4 rotate-180" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {/* Main */}
        <div className="space-y-1 px-3">
          {mainNavItems.map(({ name, href, icon }) => (
            <LinkItem key={name} name={name} href={href} Icon={icon as unknown as LucideIcon} />
          ))}
        </div>

        {/* Security Plugins (Accordion) */}
        <SectionAccordion value="security" label="Security Plugins" items={securityPlugins} />

        {/* Finance & Insights (Accordion) */}
        <SectionAccordion value="finance" label="Finance & Insights" items={financeItems} />

        {/* SDK & API Providers (Accordion) with URL Scanning dropdown at the bottom */}
        <SectionAccordion
          value="sdk"
          label="SDK & API Providers"
          items={sdkApiProvidersBase}
          extraBottomSlot={<UrlScanningDropdown />}
        />
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
            <p className="text-lg font-semibold text-foreground">{user.detectionsCount || 0}</p>
            <p className="text-xs text-muted-foreground">Total Detections</p>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}
