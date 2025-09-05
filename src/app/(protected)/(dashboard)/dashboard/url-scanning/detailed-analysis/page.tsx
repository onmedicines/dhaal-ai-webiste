"use client";

import React, { useState, useRef } from "react";
import {
  Globe,
  Search,
  RefreshCw,
  AlertTriangle,
  Copy,
  Shield,
  Database,
  Server,
  Code,
  // Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TechnologyItem {
  name: string;
  version: string | null;
}

interface ApiResponse {
  success: boolean;
  error: string | null;
  data: {
    url: string;
    timestamp: string;
    technology: {
      frontend?: TechnologyItem[];
      css?: TechnologyItem[];
      buildTools?: TechnologyItem[];
      backend?: TechnologyItem[];
      cms?: TechnologyItem[];
      cdn?: TechnologyItem[];
      infrastructure?: TechnologyItem[];
      analytics?: TechnologyItem[];
      security?: {
        present: string[];
        missing: string[];
        counts: { present: number; missing: number };
      };
      performance?: TechnologyItem[];
    };
    vulnerabilities: {
      riskScore: number;
      riskLevel: string;
      recommendations: string[];
      // categories: any; // simplified for now
    };
    whois: {
      domainName: string;
      registrar: string | null;
      registrarIanaId: string | null;
      registrarUrl: string | null;
      abuseContact: {
        email: string | null;
        phone: string | null;
      };
      createdDate: string | null;
      updatedDate: string | null;
      expiryDate: string | null;
      status: string[];
      nameServers: string[];
      dnssec: string | null;
    };
  };
}

const TechAnalysisDemo: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ApiResponse | null>(
    null,
  );
  const [error, setError] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const normalizeUrl = (rawUrl: string) => {
    if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
      return `https://${rawUrl}`;
    }
    return rawUrl;
  };

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    const normalizedUrl = normalizeUrl(url);

    setIsAnalyzing(true);
    setError("");
    setAnalysisResult(null);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/url/generate-report`;
      if (!apiUrl) throw new Error("API endpoint not configured");

      const token = localStorage.getItem("authToken");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  const renderTechCategory = (title: string, items?: TechnologyItem[]) => {
    if (!items || items.length === 0) return null;
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code className="w-5 h-5 text-blue-600" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm">
            {items.map((tech, i) => (
              <li key={i} className="flex justify-between">
                <span>{tech.name}</span>
                {tech.version && (
                  <span className="text-muted-foreground">{tech.version}</span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tech & Security Analysis</CardTitle>
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
                Checking site...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Analyze
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {analysisResult?.success && (
        <div className="space-y-6">
          {/* Tech Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-purple-600" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderTechCategory(
                "Frontend",
                analysisResult.data.technology.frontend,
              )}
              {renderTechCategory("CSS", analysisResult.data.technology.css)}
              {renderTechCategory(
                "Build Tools",
                analysisResult.data.technology.buildTools,
              )}
              {renderTechCategory(
                "Backend",
                analysisResult.data.technology.backend,
              )}
              {renderTechCategory("CMS", analysisResult.data.technology.cms)}
              {renderTechCategory("CDN", analysisResult.data.technology.cdn)}
              {renderTechCategory(
                "Infrastructure",
                analysisResult.data.technology.infrastructure,
              )}
              {renderTechCategory(
                "Analytics",
                analysisResult.data.technology.analytics,
              )}
              {renderTechCategory(
                "Performance",
                analysisResult.data.technology.performance,
              )}
            </CardContent>
          </Card>

          {/* Vulnerabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                Vulnerabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Risk Level:</span>{" "}
                {analysisResult.data.vulnerabilities.riskLevel}
              </div>
              <div>
                <span className="font-medium">Risk Score:</span>{" "}
                {analysisResult.data.vulnerabilities.riskScore}
              </div>
              {analysisResult.data.vulnerabilities.recommendations.length >
                0 && (
                <div>
                  <span className="font-medium">Recommendations:</span>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {analysisResult.data.vulnerabilities.recommendations.map(
                      (rec, i) => (
                        <li key={i}>{rec}</li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Whois */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-green-600" />
                Whois Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Domain:</span>{" "}
                {analysisResult.data.whois.domainName}
              </div>
              {analysisResult.data.whois.registrar && (
                <div>
                  <span className="font-medium">Registrar:</span>{" "}
                  {analysisResult.data.whois.registrar}
                </div>
              )}
              {analysisResult.data.whois.createdDate && (
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {analysisResult.data.whois.createdDate}
                </div>
              )}
              {analysisResult.data.whois.expiryDate && (
                <div>
                  <span className="font-medium">Expiry:</span>{" "}
                  {analysisResult.data.whois.expiryDate}
                </div>
              )}
              {analysisResult.data.whois.nameServers.length > 0 && (
                <div>
                  <span className="font-medium">Name Servers:</span>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {analysisResult.data.whois.nameServers.map((ns, i) => (
                      <li key={i}>{ns}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TechAnalysisDemo;
