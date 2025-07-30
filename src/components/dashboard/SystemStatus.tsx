"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, Gauge, Server } from "lucide-react";
import type { SystemStatus as SystemStatusType } from "@/data/dummyDashboard";

interface SystemStatusProps {
  status: SystemStatusType;
}

const getStatusBadge = (status: string, value: string) => {
  switch (status) {
    case "good":
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          {value}
        </Badge>
      );
    case "warning":
      return <Badge variant="secondary">{value}</Badge>;
    case "critical":
      return <Badge variant="destructive">{value}</Badge>;
    default:
      return <Badge variant="outline">{value}</Badge>;
  }
};

export default function SystemStatus({ status }: SystemStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Server className="h-5 w-5" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">API Response Time</p>
                <p className="text-sm text-muted-foreground">
                  Average response
                </p>
              </div>
            </div>
            {getStatusBadge(
              status.apiResponseTime.status,
              status.apiResponseTime.value,
            )}
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Detection Accuracy</p>
                <p className="text-sm text-muted-foreground">Model precision</p>
              </div>
            </div>
            {getStatusBadge(
              status.detectionAccuracy.status,
              status.detectionAccuracy.value,
            )}
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-orange-500" />
              <div>
                <p className="font-medium">System Load</p>
                <p className="text-sm text-muted-foreground">Current usage</p>
              </div>
            </div>
            {getStatusBadge(status.systemLoad.status, status.systemLoad.value)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
