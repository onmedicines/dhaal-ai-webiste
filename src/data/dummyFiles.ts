export interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "video" | "document";
  size: string;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
  status: "completed" | "processing" | "failed";
  authenticity: "authentic" | "fake" | "suspicious" | "pending";
  confidence: number;
}

export const dummyUploadedFiles: UploadedFile[] = [
  {
    id: "file-1",
    name: "profile_photo_2024.jpg",
    type: "image",
    size: "2.4 MB",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=face",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    uploadedAt: "2024-12-15T10:30:00Z",
    status: "completed",
    authenticity: "authentic",
    confidence: 96,
  },
  {
    id: "file-2",
    name: "suspicious_deepfake_video.mp4",
    type: "video",
    size: "45.2 MB",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "https://via.placeholder.com/150x100/ef4444/ffffff?text=FAKE",
    uploadedAt: "2024-11-22T14:15:00Z",
    status: "completed",
    authenticity: "fake",
    confidence: 94,
  },
  {
    id: "file-3",
    name: "voice_cloning_sample.wav",
    type: "document",
    size: "8.7 MB",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    uploadedAt: "2024-10-10T09:45:00Z",
    status: "processing",
    authenticity: "pending",
    confidence: 0,
  },
  {
    id: "file-4",
    name: "manipulated_group_photo.jpg",
    type: "image",
    size: "5.1 MB",
    url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=500&fit=crop",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop",
    uploadedAt: "2024-09-05T16:20:00Z",
    status: "completed",
    authenticity: "suspicious",
    confidence: 87,
  },
  {
    id: "file-5",
    name: "contract_document.pdf",
    type: "document",
    size: "1.2 MB",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    uploadedAt: "2024-08-18T12:00:00Z",
    status: "failed",
    authenticity: "pending",
    confidence: 0,
  },
  {
    id: "file-6",
    name: "ceo_interview_original.mp4",
    type: "video",
    size: "120.8 MB",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "https://via.placeholder.com/150x100/10b981/ffffff?text=REAL",
    uploadedAt: "2024-08-01T12:00:00Z",
    status: "completed",
    authenticity: "authentic",
    confidence: 98,
  },
  {
    id: "file-7",
    name: "generated_portrait.jpg",
    type: "image",
    size: "3.2 MB",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    uploadedAt: "2024-07-20T08:15:00Z",
    status: "completed",
    authenticity: "fake",
    confidence: 91,
  },
  {
    id: "file-8",
    name: "podcast_episode_12.mp3",
    type: "document",
    size: "25.4 MB",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    uploadedAt: "2024-07-15T19:30:00Z",
    status: "completed",
    authenticity: "suspicious",
    confidence: 73,
  },
  {
    id: "file-9",
    name: "conference_recording.mp4",
    type: "video",
    size: "234.1 MB",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://via.placeholder.com/150x100/3b82f6/ffffff?text=CONF",
    uploadedAt: "2024-06-30T14:45:00Z",
    status: "completed",
    authenticity: "authentic",
    confidence: 99,
  },
  {
    id: "file-10",
    name: "staff_headshots_batch.zip",
    type: "document",
    size: "89.7 MB",
    url: "#",
    uploadedAt: "2024-06-25T11:20:00Z",
    status: "processing",
    authenticity: "pending",
    confidence: 0,
  },
  {
    id: "file-11",
    name: "social_media_video.mp4",
    type: "video",
    size: "15.8 MB",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://via.placeholder.com/150x100/f59e0b/ffffff?text=SUSP",
    uploadedAt: "2024-06-10T16:00:00Z",
    status: "completed",
    authenticity: "suspicious",
    confidence: 68,
  },
  {
    id: "file-12",
    name: "customer_testimonial.wav",
    type: "document",
    size: "12.3 MB",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    uploadedAt: "2024-05-28T13:10:00Z",
    status: "completed",
    authenticity: "authentic",
    confidence: 89,
  },
  {
    id: "file-13",
    name: "ai_generated_artwork.jpg",
    type: "image",
    size: "4.7 MB",
    url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&h=500&fit=crop&crop=face",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    uploadedAt: "2024-05-15T10:25:00Z",
    status: "completed",
    authenticity: "fake",
    confidence: 88,
  },
  {
    id: "file-14",
    name: "quarterly_presentation.pptx",
    type: "document",
    size: "18.9 MB",
    url: "#",
    uploadedAt: "2024-05-01T09:00:00Z",
    status: "failed",
    authenticity: "pending",
    confidence: 0,
  },
  {
    id: "file-15",
    name: "training_video_final.mp4",
    type: "video",
    size: "67.4 MB",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl:
      "https://via.placeholder.com/150x100/10b981/ffffff?text=TRAIN",
    uploadedAt: "2024-04-18T15:30:00Z",
    status: "completed",
    authenticity: "authentic",
    confidence: 95,
  },
];

// Helper functions for working with the dummy data
export const getFilesByType = (type: "image" | "video" | "document") => {
  return dummyUploadedFiles.filter((file) => file.type === type);
};

export const getFilesByStatus = (
  status: "completed" | "processing" | "failed",
) => {
  return dummyUploadedFiles.filter((file) => file.status === status);
};

export const getFilesByAuthenticity = (
  authenticity: "authentic" | "fake" | "suspicious" | "pending",
) => {
  return dummyUploadedFiles.filter(
    (file) => file.authenticity === authenticity,
  );
};

export const getFileById = (id: string): UploadedFile | undefined => {
  return dummyUploadedFiles.find((file) => file.id === id);
};

export const getRecentFiles = (count: number = 5) => {
  return dummyUploadedFiles
    .sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    )
    .slice(0, count);
};

export const getFileStats = () => {
  const total = dummyUploadedFiles.length;
  const authentic = dummyUploadedFiles.filter(
    (f) => f.authenticity === "authentic",
  ).length;
  const fake = dummyUploadedFiles.filter(
    (f) => f.authenticity === "fake",
  ).length;
  const suspicious = dummyUploadedFiles.filter(
    (f) => f.authenticity === "suspicious",
  ).length;
  const pending = dummyUploadedFiles.filter(
    (f) => f.authenticity === "pending",
  ).length;

  return {
    total,
    authentic,
    fake,
    suspicious,
    pending,
    completed: dummyUploadedFiles.filter((f) => f.status === "completed")
      .length,
    processing: dummyUploadedFiles.filter((f) => f.status === "processing")
      .length,
    failed: dummyUploadedFiles.filter((f) => f.status === "failed").length,
  };
};
