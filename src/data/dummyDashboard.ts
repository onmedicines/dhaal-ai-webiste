// Dashboard Overview Data
export interface DashboardStats {
  totalScansToday: {
    value: number;
    change: string;
    trend: "up" | "down";
  };
  threatsDetected: {
    value: number;
    change: string;
    trend: "up" | "down";
  };
  apiCalls: {
    value: string;
    change: string;
    trend: "up" | "down";
  };
  activeUsers: {
    value: number;
    change: string;
    trend: "up" | "down";
  };
}

export interface ThreatDetection {
  id: string;
  type: "deepfake" | "audio_manipulation" | "image_tampering";
  model: string;
  confidence: number;
  timestamp: string;
  status: "critical" | "warning" | "resolved";
}

export interface RecentScan {
  id: string;
  fileName: string;
  type: "video" | "audio" | "image" | "document";
  confidence: number;
  timestamp: string;
  status: "high_risk" | "medium_risk" | "low_risk" | "clean";
}

export interface MediaTypeDetection {
  type: string;
  detections: number;
  threats: number;
}

export interface ThreatDistribution {
  deepfake: number;
  tampering: number;
  clean: number;
}

export interface SystemStatus {
  apiResponseTime: {
    value: string;
    status: "good" | "warning" | "critical";
  };
  detectionAccuracy: {
    value: string;
    status: "good" | "warning" | "critical";
  };
  systemLoad: {
    value: string;
    status: "good" | "warning" | "critical";
  };
}

// Dummy Data
export const dashboardStats: DashboardStats = {
  totalScansToday: {
    value: 1247,
    change: "+12%",
    trend: "up",
  },
  threatsDetected: {
    value: 89,
    change: "+23%",
    trend: "up",
  },
  apiCalls: {
    value: "15.2K",
    change: "+8%",
    trend: "up",
  },
  activeUsers: {
    value: 342,
    change: "-2%",
    trend: "down",
  },
};

export const recentThreatDetections: ThreatDetection[] = [
  {
    id: "1",
    type: "deepfake",
    model: "ResNet-50",
    confidence: 94,
    timestamp: "2 min ago",
    status: "critical",
  },
  {
    id: "2",
    type: "audio_manipulation",
    model: "DeepSpeech",
    confidence: 78,
    timestamp: "5 min ago",
    status: "warning",
  },
  {
    id: "3",
    type: "image_tampering",
    model: "CNN-VGG",
    confidence: 23,
    timestamp: "8 min ago",
    status: "resolved",
  },
];

export const recentScans: RecentScan[] = [
  {
    id: "1",
    fileName: "video_sample.mp4",
    type: "video",
    confidence: 94,
    timestamp: "2 min ago",
    status: "high_risk",
  },
  {
    id: "2",
    fileName: "audio_clip.wav",
    type: "audio",
    confidence: 12,
    timestamp: "5 min ago",
    status: "clean",
  },
  {
    id: "3",
    fileName: "image_test.jpg",
    type: "image",
    confidence: 67,
    timestamp: "8 min ago",
    status: "medium_risk",
  },
  {
    id: "4",
    fileName: "document.pdf",
    type: "document",
    confidence: 8,
    timestamp: "12 min ago",
    status: "clean",
  },
];

export const mediaTypeDetections: MediaTypeDetection[] = [
  { type: "Images", detections: 850, threats: 250 },
  { type: "Videos", detections: 620, threats: 180 },
  { type: "Audio", detections: 430, threats: 120 },
  { type: "Text", detections: 380, threats: 95 },
  { type: "URLs", detections: 290, threats: 85 },
];

export const threatDistribution: ThreatDistribution = {
  deepfake: 35,
  tampering: 25,
  clean: 40,
};

export const systemStatus: SystemStatus = {
  apiResponseTime: {
    value: "234ms",
    status: "good",
  },
  detectionAccuracy: {
    value: "97.8%",
    status: "good",
  },
  systemLoad: {
    value: "68%",
    status: "warning",
  },
};
