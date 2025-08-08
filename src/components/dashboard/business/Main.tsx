import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Shield, Zap, TrendingUp } from "lucide-react";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RecentScans from "@/components/dashboard/RecentScans";
import {
  dashboardStats,
  recentScans,
  mediaTypeDetections,
  threatDistribution,
} from "@/data/dummyDashboard";
// import Link from "next/link";

// Types for better type safety
interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  isPositive?: boolean;
}

// Extracted stat card component for reusability
function StatCard({
  title,
  value,
  change,
  icon,
  isPositive = true,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div
          className={`flex items-center text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          <TrendingUp className="h-3 w-3 mr-1" />
          {change}
        </div>
      </CardContent>
    </Card>
  );
}

// Loading component for charts
function ChartsLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Main dashboard header component
function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 className="text-3xl font-bold text-foreground">Overview</h1>

      <div className="flex items-center gap-3">
        <Badge variant="outline" className="text-sm font-medium">
          Credits: 2,847
        </Badge>
        {/*<Button variant="outline" size="sm" className="hidden sm:flex">
          <Bell className="h-4 w-4 mr-2" />
          Alerts
        </Button>
        <Link href="/dashboard/scan">
          <Button className="gap-2 cursor-pointer">
            <Search className="h-4 w-4" />
            Quick Scan
          </Button>
        </Link>*/}
      </div>
    </div>
  );
}

// Stats data configuration
const statsConfig = [
  {
    title: "Total Deepfakes",
    value: dashboardStats.totalScansToday.value,
    change: dashboardStats.totalScansToday.change,
    icon: <Search className="h-4 w-4 text-muted-foreground" />,
    isPositive: true,
  },
  {
    title: "Threats Detected",
    value: dashboardStats.threatsDetected.value,
    change: dashboardStats.threatsDetected.change,
    icon: <Shield className="h-4 w-4 text-muted-foreground" />,
    isPositive: true,
  },
  {
    title: "API Calls",
    value: dashboardStats.apiCalls.value,
    change: dashboardStats.apiCalls.change,
    icon: <Zap className="h-4 w-4 text-muted-foreground" />,
    isPositive: true,
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <DashboardHeader />

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statsConfig.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            isPositive={stat.isPositive}
          />
        ))}
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Recent Scans - Takes 1 column on xl screens */}
        <div className="xl:col-span-1">
          <RecentScans scans={recentScans} />
        </div>

        {/* Charts Section - Takes 3 columns on xl screens */}
        <div className="xl:col-span-3">
          <Suspense fallback={<ChartsLoading />}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCharts
                mediaTypeData={mediaTypeDetections}
                threatDistribution={threatDistribution}
              />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
