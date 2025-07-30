"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  FileVideo,
  FileAudio,
  FileImage,
  FileText,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import type { RecentScan } from "@/data/dummyDashboard";

interface RecentScansProps {
  scans: RecentScan[];
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "video":
      return <FileVideo className="h-4 w-4" />;
    case "audio":
      return <FileAudio className="h-4 w-4" />;
    case "image":
      return <FileImage className="h-4 w-4" />;
    case "document":
      return <FileText className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: string, confidence: number) => {
  switch (status) {
    case "high_risk":
      return <Badge variant="destructive">{confidence}%</Badge>;
    case "medium_risk":
      return <Badge variant="secondary">{confidence}%</Badge>;
    case "low_risk":
      return <Badge variant="outline">{confidence}%</Badge>;
    case "clean":
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          {confidence}%
        </Badge>
      );
    default:
      return <Badge variant="outline">{confidence}%</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "high_risk":
      return <AlertTriangle className="h-3 w-3 text-red-500" />;
    case "medium_risk":
      return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
    case "clean":
    case "low_risk":
      return <CheckCircle className="h-3 w-3 text-green-500" />;
    default:
      return null;
  }
};

export default function RecentScans({ scans }: RecentScansProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Recent Scans
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scans.map((scan) => (
            <div
              key={scan.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {getFileIcon(scan.type)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{scan.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {scan.timestamp}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(scan.status)}
                {getStatusBadge(scan.status, scan.confidence)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
