"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";

interface GsbResponse {
  malicious: boolean;
  matches: string[];
  status: "ok" | "error";
}

interface VtResponse {
  is_malicious: boolean;
  malicious_count: number;
  status: "ok" | "error";
  suspicious_count: number;
  threat_score: number;
  total_engines: number;
}

interface UrlAssessmentResponse {
  api_score: number;
  combined_probability: number;
  elapsed_seconds: number;
  gsb_response: GsbResponse;
  label: "benign" | "malicious" | string;
  ml_probability: number;
  rule_score: number;
  threshold_used: number;
  url: string;
  vt_response: VtResponse;
  message?: string;
  status?: number | null;
  finalUrl?: string | null;
}

// Validation function using URL constructor
function isValidHttpUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

export default function CheckUrlStatus() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<UrlAssessmentResponse | null>(null);
  const [error, setError] = useState("");

  const handleCheckUrl = async () => {
    // Validate URL is not empty
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    // Validate URL format and protocol
    if (!isValidHttpUrl(url.trim())) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setIsLoading(true);
    setError("");
    setResponse(null);

    try {
      const apiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/detection/url`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url.trim() }),
        }
      );

      const data: UrlAssessmentResponse = await apiResponse.json();
      if (!apiResponse.ok) {
        const msg =
          data?.message || `Request failed with status ${apiResponse.status}`;
        throw new Error(msg);
      }

      setResponse(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetChecker = () => {
    setUrl("");
    setResponse(null);
    setError("");
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Check URL Status
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Enter a URL to assess risk with combined ML, rules, VT, and GSB
          signals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Input + Actions */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Enter URL</label>
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={isLoading}
              onKeyDown={(e) => e.key === "Enter" && handleCheckUrl()}
            />
            <Button onClick={handleCheckUrl} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Checking…
                </>
              ) : (
                "Check URL"
              )}
            </Button>
            <Button
              variant="secondary"
              onClick={resetChecker}
              disabled={isLoading}
            >
              Clear
            </Button>
          </div>

          {error ? (
            <div className="text-red-600 text-sm" role="alert">
              {error}
            </div>
          ) : null}

          {response?.url ? (
            <a
              href={response.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:underline"
            >
              Open submitted URL <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          ) : null}
        </div>

        {/* Right: Results Panel */}
        <div className="border rounded-md p-4 min-h-[160px]">
          {isLoading ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Spinner className="h-4 w-4" />
              Checking URL status…
            </div>
          ) : response ? (
            <div className="space-y-4">
              {/* Big label */}
              <div
                className={
                  (response.label?.toLowerCase() === "benign"
                    ? "text-green-600"
                    : "text-red-600") + " text-3xl font-semibold"
                }
              >
                {response.label === "benign" ? "Safe" : response.label}
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground">URL</div>
                  <div className="break-all">{response.url}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">
                    Google Safe Browsing
                  </div>
                  <div>{response.gsb_response?.status ?? "unknown"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">VirusTotal</div>
                  <div>{response.vt_response?.status ?? "unknown"}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Enter a URL and click &quot;Check URL&quot; to see its status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
