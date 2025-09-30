"use client";

import React, { useState, useRef } from "react";
import {
  Globe,
  Search,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Copy,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ApiResponse {
  confidence: number;
  prediction: "safe" | "unsafe";
  probability: number;
  status: string;
  threshold: number;
  url: string;
}

const URLAnalysisDemo: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ApiResponse | null>(
    null,
  );
  const [urlHistory, setUrlHistory] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  // normalize input url → add https:// if no scheme is present
  const normalizeUrl = (rawUrl: string) => {
    if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
      return `https://${rawUrl}`;
    }
    return rawUrl;
  };

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    const normalizedUrl = normalizeUrl(url);

    if (!urlHistory.includes(normalizedUrl)) {
      setUrlHistory((prev) => [normalizedUrl, ...prev.slice(0, 4)]);
    }

    setIsAnalyzing(true);
    setError("");
    setAnalysisResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_URL_ANALYZER_AI;
      if (!apiUrl) throw new Error("API endpoint not configured");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.includes(".")) {
        setUrl(text);
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const getPredictionBadge = (prediction: string) => {
    if (prediction === "safe") {
      return (
        <Badge
          variant="outline"
          className="text-green-600 bg-green-50 border-green-200 text-base px-4 py-2 flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Safe
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="text-red-600 bg-red-50 border-red-200 text-base px-4 py-2 flex items-center gap-2"
      >
        <AlertTriangle className="w-5 h-5" />
        Unsafe
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>AI URL Authenticity Checker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Enter URL to analyze
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="example.com or https://example.com"
                className="pl-11 pr-20 py-3 text-lg h-12"
                onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
              />
              <button
                onClick={handlePasteFromClipboard}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground"
                title="Paste from clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-800">{error}</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={!url.trim() || isAnalyzing}
            className="w-full h-12"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                Checking URL...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Analyze URL
              </>
            )}
          </Button>

          {/* URL History */}
          {urlHistory.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                Recent Analyses
              </h3>
              <div className="flex flex-wrap gap-2">
                {urlHistory.map((historyUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setUrl(historyUrl)}
                    className="text-left p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-foreground truncate max-w-[200px]">
                        {historyUrl}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              {getPredictionBadge(analysisResult.prediction)}
              <span className="text-sm text-muted-foreground">
                {analysisResult.url}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="block text-muted-foreground">Confidence</span>
                <span className="font-medium">
                  {(analysisResult.confidence * 100).toFixed(2)}%
                </span>
              </div>
              {/* <div>
                <span className="block text-muted-foreground">Probability</span>
                <span className="font-medium">
                  {(analysisResult.probability * 100).toFixed(2)}%
                </span>
              </div>
              <div>
                <span className="block text-muted-foreground">Threshold</span>
                <span className="font-medium">
                  {(analysisResult.threshold * 100).toFixed(2)}%
                </span>
              </div> */}
              <div>
                <span className="block text-muted-foreground">Status</span>
                <span className="font-medium">{analysisResult.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default URLAnalysisDemo;
