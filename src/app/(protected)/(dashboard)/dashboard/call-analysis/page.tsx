"use client";

import React, { useState, useRef } from "react";
import {
  FileAudio,
  Shield,
  AlertTriangle,
  CheckCircle,
  X,
  Play,
  Pause,
  Download,
  Share2,
  RefreshCw,
  Zap,
  Brain,
  BarChart3,
  Eye,
  Lock,
} from "lucide-react";

interface AudioFile {
  file: File;
  url: string;
  duration: number;
  size: number;
  type: string;
}

interface AnalysisResult {
  isAuthentic: boolean;
  confidence: number;
  riskScore: number;
  detectedAnomalies: string[];
  technicalAnalysis: {
    frequencyAnalysis: number;
    spectralConsistency: number;
    backgroundNoise: number;
    compressionArtifacts: number;
    voicePrint: number;
  };
  aiDetection: {
    deepfakeScore: number;
    synthesisMarkers: string[];
    voiceCloning: number;
    artificialPatterns: number;
  };
  metadata: {
    recordingDevice: string;
    timestamp: string;
    modifications: string[];
    editingMarkers: number;
  };
  recommendations: string[];
}

const CallAuthenticityChecker: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock analysis function - replace with actual AI service
  const analyzeAudio = async (file: File): Promise<AnalysisResult> => {
    // Simulate API call delay
    console.log(file);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock results - replace with actual analysis
    const mockResult: AnalysisResult = {
      isAuthentic: Math.random() > 0.3,
      confidence: Math.random() * 40 + 60, // 60-100%
      riskScore: Math.random() * 30 + 10, // 10-40%
      detectedAnomalies: [
        "Spectral discontinuities detected",
        "Unusual background noise patterns",
        "Compression artifacts present",
      ],
      technicalAnalysis: {
        frequencyAnalysis: Math.random() * 20 + 80,
        spectralConsistency: Math.random() * 30 + 70,
        backgroundNoise: Math.random() * 40 + 60,
        compressionArtifacts: Math.random() * 50 + 50,
        voicePrint: Math.random() * 25 + 75,
      },
      aiDetection: {
        deepfakeScore: Math.random() * 30 + 5,
        synthesisMarkers: ["Pitch variations", "Formant inconsistencies"],
        voiceCloning: Math.random() * 25 + 10,
        artificialPatterns: Math.random() * 35 + 15,
      },
      metadata: {
        recordingDevice: "iPhone 14 Pro",
        timestamp: new Date().toISOString(),
        modifications: ["Noise reduction applied", "Volume normalization"],
        editingMarkers: Math.floor(Math.random() * 5),
      },
      recommendations: [
        "Cross-reference with known voice samples",
        "Perform additional forensic analysis",
        "Verify metadata authenticity",
      ],
    };

    return mockResult;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("audio/")) {
      handleFileUpload(droppedFile);
    }
  };

  const handleFileUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);

    audio.onloadedmetadata = () => {
      const audioFileData: AudioFile = {
        file,
        url,
        duration: audio.duration,
        size: file.size,
        type: file.type,
      };
      setAudioFile(audioFileData);

      // Start analysis
      setIsAnalyzing(true);
      analyzeAudio(file).then((result) => {
        setAnalysisResult(result);
        setIsAnalyzing(false);
      });
    };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetAnalysis = () => {
    setAudioFile(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getAuthenticityColor = (isAuthentic: boolean, confidence: number) => {
    if (isAuthentic && confidence > 80)
      return "text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400";
    if (isAuthentic && confidence > 60)
      return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400";
  };

  const CircularProgress = ({
    value,
    size = 120,
    strokeWidth = 8,
    color = "blue",
  }: {
    value: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    const colorClasses = {
      blue: "text-blue-500",
      green: "text-green-500",
      red: "text-red-500",
      yellow: "text-yellow-500",
    };

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-1000 ${colorClasses[color as keyof typeof colorClasses]}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(value)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Call Authenticity Checker
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Upload your audio recording and let our AI analyze if it is
              authentic or potentially manipulated
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!audioFile ? (
          /* Upload Section */
          <div className="max-w-2xl mx-auto">
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
                dragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="space-y-6">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <FileAudio className="w-12 h-12 text-gray-400" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Drop your audio file here
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Or click to browse and select an audio file
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Choose File
                  </button>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Supported formats: MP3, WAV, M4A, FLAC (Max 50MB)
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  AI-Powered Analysis
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Advanced machine learning algorithms detect deepfakes and
                  audio manipulation
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {/* <Waveform className="w-6 h-6 text-green-600 dark:text-green-400" /> */}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Spectral Analysis
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deep frequency analysis to identify artificial patterns and
                  inconsistencies
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Secure Processing
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your audio files are processed securely and never stored
                  permanently
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Section */
          <div className="space-y-8">
            {/* File Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <FileAudio className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {audioFile.file.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{formatFileSize(audioFile.size)}</span>
                      <span>{formatTime(audioFile.duration)}</span>
                      <span>{audioFile.type}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetAnalysis}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Audio Player */}
              <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePlayPause}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(currentTime / audioFile.duration) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                    {formatTime(currentTime)}
                  </span>
                </div>
                <audio
                  ref={audioRef}
                  src={audioFile.url}
                  onTimeUpdate={(e) =>
                    setCurrentTime((e.target as HTMLAudioElement).currentTime)
                  }
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            </div>

            {isAnalyzing ? (
              /* Loading State */
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Analyzing Audio...
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Our AI is examining your audio file for authenticity markers
                </p>
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>Analyzing...</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full animate-pulse"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              analysisResult && (
                /* Results */
                <div className="grid lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-3">
                    {/* Main Result */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 mb-8">
                      <div className="text-center">
                        <div className="flex justify-center mb-6">
                          <CircularProgress
                            value={analysisResult.confidence}
                            color={analysisResult.isAuthentic ? "green" : "red"}
                            size={140}
                          />
                        </div>

                        <div
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold mb-4 ${getAuthenticityColor(
                            analysisResult.isAuthentic,
                            analysisResult.confidence,
                          )}`}
                        >
                          {analysisResult.isAuthentic ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <AlertTriangle className="w-6 h-6" />
                          )}
                          {analysisResult.isAuthentic
                            ? "Likely Authentic"
                            : "Potentially Fake"}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                          Confidence Level:{" "}
                          {Math.round(analysisResult.confidence)}%
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {Math.round(analysisResult.riskScore)}%
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Risk Score
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {analysisResult.detectedAnomalies.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Anomalies
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {Math.round(
                                analysisResult.aiDetection.deepfakeScore,
                              )}
                              %
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              AI Detection
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Analysis Tabs */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                      <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex space-x-8 px-6 pt-6">
                          {[
                            { id: "overview", label: "Overview", icon: Eye },
                            {
                              id: "technical",
                              label: "Technical",
                              icon: BarChart3,
                            },
                            {
                              id: "ai-detection",
                              label: "AI Detection",
                              icon: Brain,
                            },
                            {
                              id: "metadata",
                              label: "Metadata",
                              icon: FileAudio,
                            },
                          ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                  activeTab === tab.id
                                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                              </button>
                            );
                          })}
                        </nav>
                      </div>

                      <div className="p-6">
                        {activeTab === "overview" && (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Detected Anomalies
                              </h3>
                              <div className="space-y-3">
                                {analysisResult.detectedAnomalies.map(
                                  (anomaly, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                                    >
                                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                                      <span className="text-gray-800 dark:text-gray-200">
                                        {anomaly}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === "technical" && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Technical Analysis
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                              {Object.entries(
                                analysisResult.technicalAnalysis,
                              ).map(([key, value]) => (
                                <div
                                  key={key}
                                  className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                      {key.replace(/([A-Z])/g, " $1").trim()}
                                    </span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                      {Math.round(value)}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${
                                        value > 80
                                          ? "bg-green-500"
                                          : value > 60
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      }`}
                                      style={{ width: `${value}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeTab === "ai-detection" && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              AI Detection Results
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                                  Deepfake Score
                                </h4>
                                <div className="text-center">
                                  <CircularProgress
                                    value={
                                      analysisResult.aiDetection.deepfakeScore
                                    }
                                    color={
                                      analysisResult.aiDetection.deepfakeScore <
                                      30
                                        ? "green"
                                        : "red"
                                    }
                                    size={100}
                                  />
                                </div>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                                  Synthesis Markers
                                </h4>
                                <div className="space-y-2">
                                  {analysisResult.aiDetection.synthesisMarkers.map(
                                    (marker, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2"
                                      >
                                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                          {marker}
                                        </span>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === "metadata" && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Metadata Analysis
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Recording Device
                                  </label>
                                  <div className="text-lg text-gray-900 dark:text-white">
                                    {analysisResult.metadata.recordingDevice}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Timestamp
                                  </label>
                                  <div className="text-lg text-gray-900 dark:text-white">
                                    {new Date(
                                      analysisResult.metadata.timestamp,
                                    ).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Modifications Detected
                                  </label>
                                  <div className="space-y-1 mt-2">
                                    {analysisResult.metadata.modifications.map(
                                      (mod, index) => (
                                        <div
                                          key={index}
                                          className="text-sm text-gray-700 dark:text-gray-300"
                                        >
                                          • {mod}
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Actions
                      </h3>
                      <div className="space-y-3">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm">
                          <Download className="w-4 h-4" />
                          Download Report
                        </button>
                        <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm">
                          <Share2 className="w-4 h-4" />
                          Share Results
                        </button>
                        <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm">
                          <RefreshCw className="w-4 h-4" />
                          Re-analyze
                        </button>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Recommendations
                      </h3>
                      <div className="space-y-3">
                        {analysisResult.recommendations.map((rec, index) => (
                          <div
                            key={index}
                            className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                          >
                            <div className="flex items-start gap-2">
                              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-blue-800 dark:text-blue-300">
                                {rec}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Risk Level
                      </h3>
                      <div className="text-center">
                        <div
                          className={`text-4xl font-bold mb-2 ${
                            analysisResult.riskScore < 20
                              ? "text-green-600 dark:text-green-400"
                              : analysisResult.riskScore < 50
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {analysisResult.riskScore < 20
                            ? "LOW"
                            : analysisResult.riskScore < 50
                              ? "MEDIUM"
                              : "HIGH"}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Based on detected anomalies and AI analysis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* New Analysis Button */}
            <div className="text-center">
              <button
                onClick={resetAnalysis}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium"
              >
                Analyze Another File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallAuthenticityChecker;
