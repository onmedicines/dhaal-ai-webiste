// import { Suspense } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Search,
//   Shield,
//   Zap,
//   Users,
//   TrendingUp,
//   TrendingDown,
//   Bell,
// } from "lucide-react";
// import DashboardCharts from "@/components/dashboard/DashboardCharts";
// import ThreatAnalysisUpload from "@/components/dashboard/ThreatAnalysisUpload";
// // import RecentDetections from "@/components/dashboard/RecentDetections";
// import RecentScans from "@/components/dashboard/RecentScans";
// import SystemStatus from "@/components/dashboard/SystemStatus";
// import {
//   dashboardStats,
//   // recentThreatDetections,
//   recentScans,
//   mediaTypeDetections,
//   threatDistribution,
//   systemStatus,
// } from "@/data/dummyDashboard";

// // Loading component for charts
// function ChartsLoading() {
//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <Skeleton className="h-6 w-48" />
//         </CardHeader>
//         <CardContent>
//           <Skeleton className="h-[300px] w-full" />
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <Skeleton className="h-6 w-40" />
//         </CardHeader>
//         <CardContent>
//           <Skeleton className="h-[300px] w-full" />
//         </CardContent>
//       </Card>
//     </>
//   );
// }

// export default function DashboardOverview() {
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
//           <p className="text-muted-foreground">Enterprise Model Dashboard</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <Badge variant="outline" className="text-sm">
//             Credits: 2,847
//           </Badge>
//           <Button variant="outline" size="sm">
//             <Bell className="h-4 w-4 mr-2" />
//             Alerts
//           </Button>
//           <Button className="gap-2">
//             <Search className="h-4 w-4" />
//             Quick Scan
//           </Button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Scans Today
//             </CardTitle>
//             <Search className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {dashboardStats.totalScansToday.value.toLocaleString()}
//             </div>
//             <div className="flex items-center text-xs text-green-600">
//               <TrendingUp className="h-3 w-3 mr-1" />
//               {dashboardStats.totalScansToday.change}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Threats Detected
//             </CardTitle>
//             <Shield className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {dashboardStats.threatsDetected.value}
//             </div>
//             <div className="flex items-center text-xs text-green-600">
//               <TrendingUp className="h-3 w-3 mr-1" />
//               {dashboardStats.threatsDetected.change}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">API Calls</CardTitle>
//             <Zap className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {dashboardStats.apiCalls.value}
//             </div>
//             <div className="flex items-center text-xs text-green-600">
//               <TrendingUp className="h-3 w-3 mr-1" />
//               {dashboardStats.apiCalls.change}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Users</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {dashboardStats.activeUsers.value}
//             </div>
//             <div className="flex items-center text-xs text-red-600">
//               <TrendingDown className="h-3 w-3 mr-1" />
//               {dashboardStats.activeUsers.change}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Threat Analysis Upload */}
//         <div className="lg:col-span-2">
//           <ThreatAnalysisUpload />
//         </div>

//         {/* Recent Scans */}
//         <div>
//           <RecentScans scans={recentScans} />
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Suspense fallback={<ChartsLoading />}>
//           <DashboardCharts
//             mediaTypeData={mediaTypeDetections}
//             threatDistribution={threatDistribution}
//           />
//         </Suspense>
//       </div>

//       {/* System Status */}
//       <SystemStatus status={systemStatus} />
//     </div>
//   );
// }
