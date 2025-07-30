"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";
import type { ThreatDetection } from "@/data/dummyDashboard";

interface RecentDetectionsProps {
  detections: ThreatDetection[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "critical":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "resolved":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (confidence: number) => {
  if (confidence >= 80)
    return <Badge variant="destructive">{confidence}% confidence</Badge>;
  if (confidence >= 50)
    return <Badge variant="secondary">{confidence}% confidence</Badge>;
  return <Badge variant="outline">{confidence}% confidence</Badge>;
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "deepfake":
      return "Deepfake Video";
    case "audio_manipulation":
      return "Audio Manipulation";
    case "image_tampering":
      return "Image Tampering";
    default:
      return "Unknown Threat";
  }
};

export default function RecentDetections({
  detections,
}: RecentDetectionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Detections
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {detections.map((detection) => (
            <div
              key={detection.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(detection.status)}
                <div>
                  <p className="font-medium">{getTypeLabel(detection.type)}</p>
                  <p className="text-sm text-muted-foreground">
                    Model: {detection.model} • {detection.timestamp}
                  </p>
                </div>
              </div>
              {getStatusBadge(detection.confidence)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
