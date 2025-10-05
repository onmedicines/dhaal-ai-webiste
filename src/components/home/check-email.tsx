"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface EmailAssessmentResponse {
  prediction: string; // "spam" | "benign" | string
  confidence: number; // 0..1
  explanation: string; // markdown-friendly string
  model_used: string; // e.g., "DistilBERT"
  message?: string;
}

export default function CheckEmailStatus() {
  const [text, setText] = useState("URGENT: Click here to claim your prize!");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<EmailAssessmentResponse | null>(
    null
  );
  const [error, setError] = useState("");

  const handleCheckEmail = async () => {
    if (!text.trim()) {
      setError("Please paste or type an email text.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResponse(null);

    try {
      const apiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/detection/email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      const data: EmailAssessmentResponse = await apiResponse.json();

      if (!apiResponse.ok) {
        const msg =
          data?.message || `Request failed with status ${apiResponse.status}`;
        throw new Error(msg);
      }

      setResponse(data);
    } catch (err) {
      setResponse(null);
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
    setText("");
    setResponse(null);
    setError("");
    setIsLoading(false);
  };

  const isBenign = (response?.prediction ?? "").toLowerCase() === "ham";

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pt-10">
      {/* Centered Heading + Paragraph */}

      {!response ? (
        <>
          <div className="mb-6 text-center">
            <p className="text-muted-foreground mx-auto text-lg">
              Paste an email snippet to check if it’s spam or benign using our
              classifier.
            </p>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium">Email text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Paste email content, e.g. "URGENT: Click here to claim your prize!"'
              disabled={isLoading}
              rows={10}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (e.ctrlKey || e.metaKey) &&
                handleCheckEmail()
              }
            />

            <div className="flex gap-2 justify-center md:justify-start">
              <Button onClick={handleCheckEmail} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Checking…
                  </>
                ) : (
                  "Check Email"
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
              <div
                className="text-red-600 text-sm text-center md:text-left"
                role="alert"
              >
                {error}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="border rounded-md p-4 min-h-[220px] space-y-4">
          <div
            className={
              (isBenign ? "text-green-600" : "text-red-600") +
              " text-3xl font-semibold"
            }
          >
            {response.prediction === "ham" ? "safe" : response.prediction}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Confidence</div>
              <div>{response.confidence}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Model</div>
              <div>{response.model_used}</div>
            </div>
          </div>

          <Separator />

          <div className="text-sm">
            <div className="text-muted-foreground mb-1">Explanation</div>
            <pre className="whitespace-pre-wrap text-sm">
              {response.explanation}
            </pre>
          </div>

          <div className="flex justify-center md:justify-start">
            <Button onClick={resetChecker}>Try Again</Button>
          </div>
        </div>
      )}
    </div>
  );
}
