"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import {
  Link,
  Search,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ServerCrash,
} from "lucide-react";

// Define the structure of the API response
interface UrlStatusResponse {
  exists: boolean;
  finalUrl: string | null;
  status: number | null;
  message: string;
}

// Result styling helpers
const resultColor = (exists: boolean) => {
  return exists ? "text-green-600" : "text-red-600";
};

const barColor = (exists: boolean) => {
  return exists ? "bg-green-500" : "bg-red-500";
};

const labelFromStatus = (exists: boolean) => {
  return exists ? "Online & Reachable" : "Potentially Fake";
};

export default function CheckUrlStatus() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<UrlStatusResponse | null>(null);
  const [error, setError] = useState<string>("");

  const handleCheckUrl = async () => {
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResponse(null);

    try {
      const apiResponse = await fetch(
        "https://dhaal-ai-backend.onrender.com/api/detection/url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        },
      );

      const data: UrlStatusResponse = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(data.message || "An unknown error occurred.");
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
    <section className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-6xl p-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Check URL Status
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Enter a URL to verify if it is online, reachable, and not leading to
            a dead end.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Input + Actions */}
          <div>
            <div className="border rounded-lg p-6 bg-muted/20 space-y-4">
              <label htmlFor="url-input" className="font-medium">
                Enter URL
              </label>
              <Input
                id="url-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                disabled={isLoading}
                onKeyPress={(e) => e.key === "Enter" && handleCheckUrl()}
              />
            </div>
            <div className="mt-4 flex gap-3">
              <Button
                className="flex-1"
                onClick={handleCheckUrl}
                disabled={isLoading || !url.trim()}
              >
                {isLoading ? "Checking…" : "Check URL"}
              </Button>
              <Button variant="outline" onClick={resetChecker}>
                Clear
              </Button>
            </div>
            {error ? (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            ) : null}
          </div>

          {/* Right: Results Panel */}
          <div className="border rounded-lg p-4 flex items-center justify-center min-h-[180px] max-h-full">
            {isLoading ? (
              <div className="flex flex-col items-center gap-3">
                <Spinner height="h-8" />
                <p className="text-sm text-muted-foreground">
                  Checking URL status…
                </p>
              </div>
            ) : response ? (
              <div className="w-full">
                <h2
                  className={`text-xl font-semibold ${resultColor(response.exists)}`}
                >
                  {labelFromStatus(response.exists)}
                </h2>
                <Separator className="my-4" />

                {/* Status Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Reachability
                    </span>
                    <span
                      className={`text-sm font-medium ${resultColor(response.exists)}`}
                    >
                      {response.exists ? "100%" : "0%"}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${barColor(response.exists)}`}
                      style={{
                        width: `${response.exists ? 100 : 0}%`,
                        transition: "width 400ms ease",
                      }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Message:</span>
                    <span className="text-right ml-2">
                      {response.status == 200
                        ? response.message
                        : 'Failed to connect to "dhaal.oo" on any known protocol. The domain may be fake.'}
                    </span>
                  </div>
                  {response.finalUrl && (
                    <div className="flex items-center justify-between">
                      <span>Final URL:</span>
                      <a
                        href={response.finalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-500 hover:underline"
                      >
                        {response.finalUrl}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                  {response.status && (
                    <div className="flex items-center justify-between">
                      <span>HTTP Status:</span>
                      <span>{response.status}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Enter a URL and click “Check URL” to see its status.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
