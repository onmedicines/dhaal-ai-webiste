// @/data/dummyFiles.ts

export interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "video" | "document";
  size: string;
  uploadedAt: string;
  status: "processing" | "completed" | "failed";
  authenticity: "authentic" | "fake" | "suspicious" | "pending";
  confidence: number; // 0-100
  url: string; // For preview
  thumbnailUrl?: string; // For video thumbnails
}

export const uploadedFiles: UploadedFile[] = [
  {
    id: "file_001",
    name: "vacation_photo.jpg",
    type: "image",
    size: "2.4 MB",
    uploadedAt: "2025-08-04T01:45:30Z",
    status: "completed",
    authenticity: "authentic",
    confidence: 95,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
  },
  {
    id: "file_002",
    name: "suspicious_document.pdf",
    type: "document",
    size: "890 KB",
    uploadedAt: "2025-08-04T01:30:15Z",
    status: "completed",
    authenticity: "fake",
    confidence: 87,
    url: "/api/files/suspicious_document.pdf",
  },
  {
    id: "file_003",
    name: "news_video.mp4",
    type: "video",
    size: "15.7 MB",
    uploadedAt: "2025-08-04T01:20:45Z",
    status: "completed",
    authenticity: "suspicious",
    confidence: 72,
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&h=150&fit=crop",
  },
  {
    id: "file_004",
    name: "profile_picture.png",
    type: "image",
    size: "156 KB",
    uploadedAt: "2025-08-04T01:15:20Z",
    status: "completed",
    authenticity: "authentic",
    confidence: 98,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop",
  },
  {
    id: "file_005",
    name: "meeting_recording.mp4",
    type: "video",
    size: "45.2 MB",
    uploadedAt: "2025-08-04T01:10:30Z",
    status: "processing",
    authenticity: "pending",
    confidence: 0,
    url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=150&fit=crop",
  },
  {
    id: "file_006",
    name: "certificate.jpg",
    type: "image",
    size: "1.8 MB",
    uploadedAt: "2025-08-04T01:05:15Z",
    status: "failed",
    authenticity: "pending",
    confidence: 0,
    url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=150&fit=crop",
  },
  {
    id: "file_007",
    name: "product_image.webp",
    type: "image",
    size: "340 KB",
    uploadedAt: "2025-08-04T00:58:22Z",
    status: "completed",
    authenticity: "fake",
    confidence: 91,
    url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=150&fit=crop",
  },
  {
    id: "file_008",
    name: "interview_audio.mp3",
    type: "document",
    size: "12.4 MB",
    uploadedAt: "2025-08-04T00:45:10Z",
    status: "completed",
    authenticity: "authentic",
    confidence: 88,
    url: "/api/files/interview_audio.mp3",
  },
];
