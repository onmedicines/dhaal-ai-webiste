"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
// import { ExternalLink } from "lucide-react";

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

// URL validation function
function isValidHttpUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;

  const urlRegex = /^https?:\/\/.*?\..+/i;

  return urlRegex.test(url);
}

export default function CheckUrlStatus() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<UrlAssessmentResponse | null>(null);
  const [error, setError] = useState("");

  const handleCheckUrl = async () => {
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }
    if (!isValidHttpUrl(url.trim())) {
      setError("Please enter a valid URL");
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
    <div className="w-full max-w-5xl mx-auto p-6 pt-10">
      {/* Heading */}

      {/* Conditionally show input or result */}
      {!response ? (
        <>
          <div className="mb-6 text-center">
            <p className="text-muted-foreground mx-auto text-lg">
              Enter a URL to assess risk with combined ML, rules, VT, and GSB
              signals.
            </p>
          </div>
          {/* Input + actions */}
          <div className="">
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
            {error && (
              <div className="text-red-600 text-sm" role="alert">
                {error}
              </div>
            )}
            {/* {response?.url && (
              <a
                href={response.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:underline"
              >
                Open submitted URL <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            )} */}
          </div>
        </>
      ) : (
        // Show results + Try Again button
        <div className="border rounded-md p-4 min-h-[160px] space-y-4">
          {/* Result display */}
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
              <div className="text-muted-foreground">Google Safe Browsing</div>
              <div>{response.gsb_response?.status ?? "unknown"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">VirusTotal</div>
              <div>{response.vt_response?.status ?? "unknown"}</div>
            </div>
          </div>
          {/* Try Again Button */}
          <div className="flex justify-center md:justify-start">
            <Button onClick={resetChecker}>Try Again</Button>
          </div>
        </div>
      )}
    </div>
  );
}
