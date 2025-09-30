"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileImage,
  FileVideo,
  FileAudio,
  File,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Trash2,
  Shield,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ScanResult {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: "image" | "video" | "audio" | "document";
  scanStatus: "scanning" | "completed" | "failed";
  detectionResult?: {
    isDeepfake: boolean;
    isTampering: boolean;
    confidenceScore: number;
    threatLevel: "clean" | "low" | "medium" | "high" | "critical";
    detectionModel: string;
  };
  processingTime?: number;
  scannedAt: Date;
  error?: string;
  previewUrl?: string;
}

export default function ScanPage() {
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const getFileIcon = useCallback((fileType: string) => {
    switch (fileType) {
      case "image":
        return <FileImage className="h-5 w-5" />;
      case "video":
        return <FileVideo className="h-5 w-5" />;
      case "audio":
        return <FileAudio className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  }, []);

  const getThreatIcon = useCallback((threatLevel: string) => {
    switch (threatLevel) {
      case "clean":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "low":
        return <Shield className="h-4 w-4 text-yellow-500" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "high":
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  }, []);

  const getThreatBadge = useCallback(
    (result: ScanResult["detectionResult"]) => {
      if (!result) return null;

      const { threatLevel, confidenceScore, isDeepfake, isTampering } = result;

      let variant: "default" | "secondary" | "destructive" | "outline" =
        "secondary";
      let label = "Clean";

      if (isDeepfake || isTampering) {
        switch (threatLevel) {
          case "low":
            variant = "secondary";
            label = `Low Risk (${confidenceScore}%)`;
            break;
          case "medium":
            variant = "outline";
            label = `Medium Risk (${confidenceScore}%)`;
            break;
          case "high":
          case "critical":
            variant = "destructive";
            label = `High Risk (${confidenceScore}%)`;
            break;
        }
      } else {
        variant = "default";
        label = `Clean (${confidenceScore}%)`;
      }

      return <Badge variant={variant}>{label}</Badge>;
    },
    [],
  );

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  const getFileType = useCallback(
    (file: File): "image" | "video" | "audio" | "document" => {
      if (file.type.startsWith("image/")) return "image";
      if (file.type.startsWith("video/")) return "video";
      if (file.type.startsWith("audio/")) return "audio";
      return "document";
    },
    [],
  );

  const simulateScanning = useCallback(
    async (file: File): Promise<ScanResult["detectionResult"]> => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate random results for demo
      const isDeepfake = Math.random() > 0.7;
      const isTampering = !isDeepfake && Math.random() > 0.8;
      const confidenceScore = Math.round(Math.random() * 40 + 60); // 60-100%

      let threatLevel: "clean" | "low" | "medium" | "high" | "critical" =
        "clean";

      if (isDeepfake || isTampering) {
        if (confidenceScore >= 90) threatLevel = "critical";
        else if (confidenceScore >= 80) threatLevel = "high";
        else if (confidenceScore >= 70) threatLevel = "medium";
        else threatLevel = "low";
      }

      return {
        isDeepfake,
        isTampering,
        confidenceScore,
        threatLevel,
        detectionModel: file.type.startsWith("image/")
          ? "ResNet-50"
          : file.type.startsWith("video/")
            ? "DeepSpeech"
            : "CNN-VGG",
      };
    },
    [],
  );

  const handleFileScan = useCallback(
    async (file: File) => {
      setIsScanning(true);
      setScanProgress(0);

      const fileId = Date.now().toString();
      const fileType = getFileType(file);
      const previewUrl = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined;

      // Add initial scan result
      const initialScanResult: ScanResult = {
        id: fileId,
        fileName: file.name,
        fileSize: file.size,
        fileType,
        scanStatus: "scanning",
        scannedAt: new Date(),
        previewUrl,
      };

      setScanResults((prev) => [initialScanResult, ...prev]);

      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setScanProgress((prev) => {
            const newProgress = prev + Math.random() * 20;
            return newProgress > 95 ? 95 : newProgress;
          });
        }, 300);

        const startTime = Date.now();
        const detectionResult = await simulateScanning(file);
        const processingTime = Date.now() - startTime;

        clearInterval(progressInterval);
        setScanProgress(100);

        // Update scan result
        setScanResults((prev) =>
          prev.map((result) =>
            result.id === fileId
              ? {
                  ...result,
                  scanStatus: "completed" as const,
                  detectionResult,
                  processingTime,
                }
              : result,
          ),
        );
      } catch (error) {
        console.error(error);
        setScanResults((prev) =>
          prev.map((result) =>
            result.id === fileId
              ? {
                  ...result,
                  scanStatus: "failed" as const,
                  error: "Failed to scan file",
                }
              : result,
          ),
        );
      } finally {
        setIsScanning(false);
        setScanProgress(0);
      }
    },
    [getFileType, simulateScanning],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileScan(acceptedFiles[0]); // Only process first file
      }
    },
    [handleFileScan],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
        "video/*": [".mp4", ".avi", ".mov", ".mkv"],
        "audio/*": [".mp3", ".wav", ".ogg", ".m4a"],
        "application/pdf": [".pdf"],
      },
      disabled: isScanning,
    });

  const handleDeleteResult = useCallback((id: string) => {
    setScanResults((prev) => {
      const result = prev.find((r) => r.id === id);
      if (result?.previewUrl) {
        URL.revokeObjectURL(result.previewUrl);
      }
      return prev.filter((r) => r.id !== id);
    });
  }, []);

  const handleClearAll = useCallback(() => {
    scanResults.forEach((result) => {
      if (result.previewUrl) {
        URL.revokeObjectURL(result.previewUrl);
      }
    });
    setScanResults([]);
  }, [scanResults]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">File Scanner</h1>
        <p className="text-muted-foreground">
          Upload and scan files for deepfake detection and manipulation analysis
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload File for Scanning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive && !isDragReject && "border-primary bg-primary/5",
              isDragReject && "border-red-500 bg-red-50",
              isScanning && "pointer-events-none opacity-50",
              !isDragActive &&
                !isDragReject &&
                "border-muted-foreground/25 hover:border-muted-foreground/50",
            )}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-muted p-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>

              {isDragActive ? (
                <div>
                  <p className="text-lg font-semibold">Drop your file here</p>
                  <p className="text-sm text-muted-foreground">
                    Single file upload only
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold">
                    Drag & drop a file here, or click to select
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supports: Images (PNG, JPG, GIF), Videos (MP4, AVI, MOV),
                    Audio (MP3, WAV), Documents (PDF)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum file size: 100MB
                  </p>
                </div>
              )}

              {!isDragActive && (
                <Button variant="outline" disabled={isScanning}>
                  {isScanning ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    "Choose File"
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isScanning && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Scanning file...</span>
                <span>{Math.round(scanProgress)}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Results */}
      {scanResults.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Scan Results ({scanResults.length})
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scanResults.map((result) => (
                <div
                  key={result.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  {/* File Info Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(result.fileType)}
                      <div>
                        <p className="font-medium">{result.fileName}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(result.fileSize)} • {result.fileType}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {result.scanStatus === "scanning" && (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Scanning...</span>
                        </div>
                      )}

                      {result.scanStatus === "completed" &&
                        result.detectionResult && (
                          <>
                            {getThreatIcon(result.detectionResult.threatLevel)}
                            {getThreatBadge(result.detectionResult)}
                          </>
                        )}

                      {result.scanStatus === "failed" && (
                        <Badge variant="destructive">Failed</Badge>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteResult(result.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Preview and Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Preview */}
                    {result.previewUrl && (
                      <div className="lg:col-span-1">
                        <Image
                          width={300}
                          height={300}
                          src={result.previewUrl}
                          alt={result.fileName}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}

                    {/* Scan Details */}
                    <div
                      className={cn(
                        "space-y-2",
                        result.previewUrl ? "lg:col-span-3" : "lg:col-span-4",
                      )}
                    >
                      {result.scanStatus === "completed" &&
                        result.detectionResult && (
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">
                                Threat Level
                              </p>
                              <p className="font-medium capitalize">
                                {result.detectionResult.threatLevel}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Confidence
                              </p>
                              <p className="font-medium">
                                {result.detectionResult.confidenceScore}%
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Model</p>
                              <p className="font-medium">
                                {result.detectionResult.detectionModel}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Processing Time
                              </p>
                              <p className="font-medium">
                                {result.processingTime}ms
                              </p>
                            </div>
                          </div>
                        )}

                      {result.scanStatus === "completed" &&
                        result.detectionResult && (
                          <div className="text-sm">
                            <p className="text-muted-foreground mb-1">
                              Detection Results:
                            </p>
                            <div className="space-y-1">
                              <p>
                                Deepfake:{" "}
                                <span
                                  className={
                                    result.detectionResult.isDeepfake
                                      ? "text-red-600 font-medium"
                                      : "text-green-600"
                                  }
                                >
                                  {result.detectionResult.isDeepfake
                                    ? "Detected"
                                    : "Not Detected"}
                                </span>
                              </p>
                              <p>
                                Tampering:{" "}
                                <span
                                  className={
                                    result.detectionResult.isTampering
                                      ? "text-red-600 font-medium"
                                      : "text-green-600"
                                  }
                                >
                                  {result.detectionResult.isTampering
                                    ? "Detected"
                                    : "Not Detected"}
                                </span>
                              </p>
                            </div>
                          </div>
                        )}

                      {result.error && (
                        <p className="text-sm text-red-600">{result.error}</p>
                      )}

                      <p className="text-xs text-muted-foreground">
                        Scanned at: {result.scannedAt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
