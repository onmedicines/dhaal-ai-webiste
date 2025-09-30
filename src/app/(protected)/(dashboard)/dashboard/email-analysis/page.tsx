"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search, CheckCircle, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ApiResponse {
  prediction: "spam" | "benign";
  confidence: number;
  explanation: string;
  model_used: string;
}

const EmailSpamDetector: React.FC = () => {
  const [emailText, setEmailText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string>("");

  const handleAnalyze = async () => {
    if (!emailText.trim()) return;

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

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data: ApiResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPredictionBar = (prediction: string, confidence: number) => {
    const percent = (confidence * 100).toFixed(2);
    const isBenign = prediction === "benign";
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>{isBenign ? "Benign" : "Spam"}</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 ${isBenign ? "bg-green-500" : "bg-red-500"}`}
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
            placeholder="Write or paste email content here..."
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
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Submit
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
            <div className="flex items-center gap-2 text-lg font-semibold">
              {result.prediction === "benign" ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-red-600" />
              )}
              {result.prediction === "benign" ? "Benign" : "Spam"}
            </div>

            {getPredictionBar(result.prediction, result.confidence)}

            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{result.explanation}</ReactMarkdown>
            </div>
            <div className="text-xs text-muted-foreground">
              Model used: {result.model_used}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailSpamDetector;
