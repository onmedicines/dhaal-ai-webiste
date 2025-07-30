export interface Asset {
  id: string;
  name: string;
  type: "image" | "video" | "voice";
  uploadDate: string;
  size: string;
  status: "monitored" | "processing" | "inactive";
  leakDetected: boolean;
  confidenceScore?: number;
  lastScan: string;
  thumbnail?: string;
}

export const dummyAssets: Asset[] = [
  {
    id: "asset-1",
    name: "profile_photo_2024.jpg",
    type: "image",
    uploadDate: "2024-12-15",
    size: "2.4 MB",
    status: "monitored",
    leakDetected: false,
    lastScan: "2025-01-30T08:30:00Z",
    thumbnail: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "asset-2",
    name: "company_presentation.mp4",
    type: "video",
    uploadDate: "2024-11-22",
    size: "45.2 MB",
    status: "monitored",
    leakDetected: true,
    confidenceScore: 94,
    lastScan: "2025-01-30T10:15:00Z",
    thumbnail: "https://via.placeholder.com/150x100/4f46e5/ffffff?text=Video",
  },
  {
    id: "asset-3",
    name: "voice_sample_intro.wav",
    type: "voice",
    uploadDate: "2024-10-10",
    size: "8.7 MB",
    status: "processing",
    leakDetected: false,
    lastScan: "2025-01-30T07:45:00Z",
  },
  {
    id: "asset-4",
    name: "team_photo_2024.jpg",
    type: "image",
    uploadDate: "2024-09-05",
    size: "5.1 MB",
    status: "monitored",
    leakDetected: true,
    confidenceScore: 87,
    lastScan: "2025-01-29T16:20:00Z",
    thumbnail: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "asset-5",
    name: "ceo_interview.mp4",
    type: "video",
    uploadDate: "2024-08-18",
    size: "120.8 MB",
    status: "inactive",
    leakDetected: false,
    lastScan: "2025-01-25T12:00:00Z",
    thumbnail: "https://via.placeholder.com/150x100/059669/ffffff?text=CEO",
  },
];
