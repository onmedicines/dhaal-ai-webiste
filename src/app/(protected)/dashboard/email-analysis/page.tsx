"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search, CheckCircle, AlertTriangle } from "lucide-react";

interface ApiResponse {
  prediction: "spam" | "benign";
  confidence: number;
  explanation: string;
  model_used: string;
  message?: string;
}

const EmailSpamDetector: React.FC = () => {
  const [emailText, setEmailText] = useState(
    "URGENT: Click here to claim your prize!"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string>("");

  const handleAnalyze = async () => {
    if (!emailText.trim()) {
      setError("Please paste or type an email text.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/detection/email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: emailText }),
        }
      );

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        const msg = data?.message || `API error: ${response.status}`;
        throw new Error(msg);
      }

      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isHam = (result?.prediction ?? "").toLowerCase() === "ham";

  const getPredictionBar = (prediction: string, confidence: number) => {
    const percent = (confidence * 100).toFixed(2);
    const ham = prediction === "ham";
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>{ham ? "Benign" : "Spam"}</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 ${ham ? "bg-green-500" : "bg-red-500"}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Left: Email Input */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Email Detection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="email-text">Paste any email text to analyze</Label>
          <Textarea
            id="email-text"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder='Paste email content, e.g. "URGENT: Click here to claim your prize!"'
            rows={12}
            className="text-sm"
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex gap-2 items-center">
              <AlertTriangle className="w-4 h-4" /> {error}
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={!emailText.trim() || isAnalyzing}
            className="w-full h-12"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                Checking…
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Check Email
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Right: Prediction Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>🔍 Prediction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold justify-center">
              {isHam ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-red-600" />
              )}
              <span
                className={
                  (isHam ? "text-green-600" : "text-red-600") +
                  " text-2xl font-semibold"
                }
              >
                {result.prediction}
              </span>
            </div>

            {getPredictionBar(result.prediction, result.confidence)}

            <div className="space-y-2 text-sm">
              <div>
                <div className="text-muted-foreground">Confidence</div>
                <div>{result.confidence}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Model</div>
                <div>{result.model_used}</div>
              </div>
            </div>

            <div className="text-sm">
              <div className="text-muted-foreground mb-1">Explanation</div>
              <pre className="whitespace-pre-wrap text-sm">
                {result.explanation}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailSpamDetector;
