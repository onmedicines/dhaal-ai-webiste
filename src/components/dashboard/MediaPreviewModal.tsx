// @/components/dashboard/MediaPreviewModal.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Shield,
  Clock,
  FileText,
  ImageIcon,
  Video,
  Volume2,
} from "lucide-react";
import { UploadedFile } from "@/data/dummyFiles";
import { formatDistanceToNow } from "date-fns";

interface MediaPreviewModalProps {
  file: UploadedFile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MediaPreviewModal({
  file,
  open,
  onOpenChange,
}: MediaPreviewModalProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  if (!file) return null;

  const getAuthenticityColor = (authenticity: string) => {
    switch (authenticity) {
      case "authentic":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "fake":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "suspicious":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "processing":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "failed":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "document":
        return file.name.includes(".mp3") ? (
          <Volume2 className="h-4 w-4" />
        ) : (
          <FileText className="h-4 w-4" />
        );
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const renderMediaPreview = () => {
    if (file.type === "image" && !imageError) {
      return (
        <div className="relative w-full max-h-[500px] flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden">
          <Image
            width={500}
            height={500}
            src={file.url}
            alt={file.name}
            className="max-w-full max-h-[500px] object-contain"
            onError={() => setImageError(true)}
          />
        </div>
      );
    }

    if (file.type === "video" && !videoError) {
      return (
        <div className="relative w-full max-h-[500px] bg-muted/30 rounded-lg overflow-hidden">
          <video
            src={file.url}
            controls
            className="w-full max-h-[500px] object-contain"
            onError={() => setVideoError(true)}
            poster={file.thumbnailUrl}
          />
        </div>
      );
    }

    // Fallback for documents or errors
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        {getFileIcon(file.type)}
        <p className="text-sm text-muted-foreground mt-2">
          {file.type === "document"
            ? "Document preview not available"
            : "Preview not available"}
        </p>
        <p className="text-xs text-muted-foreground">
          Click download to view file
        </p>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-scroll">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            {getFileIcon(file.type)}
            <DialogTitle className="text-lg font-semibold truncate">
              {file.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Preview */}
          <div>{renderMediaPreview()}</div>

          <Separator />

          {/* File Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                File Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">File Size</span>
                  <span className="text-sm text-muted-foreground">
                    {file.size}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">File Type</span>
                  <span className="text-sm text-muted-foreground capitalize">
                    {file.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Uploaded</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(file.uploadedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status</span>
                  <Badge
                    variant="outline"
                    className={getStatusColor(file.status)}
                  >
                    {file.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Analysis Results
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Authenticity</span>
                  <Badge
                    variant="outline"
                    className={getAuthenticityColor(file.authenticity)}
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    {file.authenticity}
                  </Badge>
                </div>
                {file.confidence > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Confidence</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${file.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {file.confidence}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1 gap-2"
              onClick={() => window.open(file.url, "_blank")}
            >
              <Download className="h-4 w-4" />
              Download File
            </Button>
            <Button variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
              Re-analyze
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
