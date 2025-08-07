"use client";

import React, { useState } from "react";
import {
  Mic,
  Phone,
  Volume2,
  // Users,
  Shield,
  // Zap,
  // Clock,
  BarChart3,
  Info,
  Flag,
  AlertTriangle,
  // FileInput,
  Copy,
  Download,
  // AlertCircle,
  Settings,
  File,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CallAnalysisResult {
  filename: string;
  duration: string;
  speakerCount: number;
  detectedSpeech: Array<{
    start: string;
    end: string;
    speaker: string;
    text: string;
  }>;
  sentiment: {
    overall: "positive" | "negative" | "neutral";
    confidence: number;
  };
  emotionAnalysis: Array<{ speaker: string; emotion: string; score: number }>;
  topicSegmentation: Array<{
    start: string;
    end: string;
    topic: string;
    confidence: number;
  }>;
  detectedEntities: Array<{ entity: string; type: string; relevance: number }>;
  securityAlerts: Array<{
    alert: string;
    severity: "low" | "medium" | "high" | "critical";
  }>;
  metadata: {
    channels: number;
    sampleRate: string;
    format: string;
  };
}

const CallAnalysisSDK: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<CallAnalysisResult | null>(null);

  // This is a mock function for UI demonstration
  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Mock analysis data for showcase
    const mockResult: CallAnalysisResult = {
      filename: file.name,
      duration: "01:45",
      speakerCount: 3,
      detectedSpeech: [
        {
          start: "00:10",
          end: "00:35",
          speaker: "Agent 1",
          text: "Hello, how may I help you today?",
        },
        {
          start: "00:36",
          end: "01:12",
          speaker: "Customer",
          text: "I'm having issues with my billing.",
        },
        {
          start: "01:13",
          end: "01:45",
          speaker: "Agent 2",
          text: "Let me look into that for you. Can you please confirm your account details?",
        },
      ],
      sentiment: {
        overall: "neutral",
        confidence: 0.85,
      },
      emotionAnalysis: [
        { speaker: "Agent 1", emotion: "calm", score: 0.9 },
        { speaker: "Customer", emotion: "frustrated", score: 0.75 },
        { speaker: "Agent 2", emotion: "calm", score: 0.88 },
      ],
      topicSegmentation: [
        { start: "00:10", end: "00:35", topic: "Greeting", confidence: 0.92 },
        {
          start: "00:36",
          end: "01:12",
          topic: "Billing Issues",
          confidence: 0.88,
        },
        {
          start: "01:13",
          end: "01:45",
          topic: "Account Verification",
          confidence: 0.86,
        },
      ],
      detectedEntities: [
        { entity: "John Doe", type: "Person", relevance: 0.97 },
        { entity: "Account #123456", type: "Account Number", relevance: 0.84 },
      ],
      securityAlerts: [
        { alert: "No security anomalies detected", severity: "low" },
      ],
      metadata: {
        channels: 1,
        sampleRate: "8kHz",
        format: "WAV",
      },
    };
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "high":
        return "text-orange-600 bg-orange-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-left space-y-4">
        <div className="flex items-center gap-3">
          <Phone className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Call Analysis SDK
            </h1>
            <p className="text-muted-foreground">
              Powerful conversation insights for call centers, compliance, and
              security
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">How It Works</TabsTrigger>
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-blue-600" />
                  Speaker Identification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Detect and distinguish between speakers in real time
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>Multi-speaker diarization</li>
                  <li>Speaker role tagging (agent, customer, etc.)</li>
                  <li>Speaker change event detection</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-purple-600" />
                  Sentiment & Emotion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Analyze emotional tone and customer/agent sentiment at scale
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>Real-time sentiment scoring</li>
                  <li>Per-speaker emotion analysis (calm, frustrated, etc.)</li>
                  <li>Sentiment timeline</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Security & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Monitor for sensitive info and compliance risks
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>Sensitive data redaction</li>
                  <li>PCI, PII, and account number detection</li>
                  <li>Custom alerting rules</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* How It Works Process */}
          <Card>
            <CardHeader>
              <CardTitle>Call Processing Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="mx-auto bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <File className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium">1. Upload/Stream</div>
                </div>
                <div className="text-center">
                  <div className="mx-auto bg-purple-50 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Mic className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium">2. Audio Processing</div>
                </div>
                <div className="text-center">
                  <div className="mx-auto bg-green-50 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-sm font-medium">3. Security Scan</div>
                </div>
                <div className="text-center">
                  <div className="mx-auto bg-yellow-50 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <BarChart3 className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-sm font-medium">4. Analysis</div>
                </div>
                <div className="text-center">
                  <div className="mx-auto bg-orange-50 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                    <Info className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium">5. Results</div>
                </div>
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                <p>
                  dhaal.io Call Analysis SDK processes call audio in real time
                  or post-call, applying speaker identification, sentiment
                  analysis, entity detection, compliance scanning, and topic
                  segmentation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Use Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-blue-600" />
                      Call Center Coaching
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Identify opportunities for agent coaching with sentiment
                      and topic insights.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-orange-600" />
                      Compliance Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Automatically detect and redact sensitive data for
                      compliance and security.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      Contact Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Aggregate trending topics, sentiment, and satisfaction
                      across all customer interactions.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="w-5 h-5 text-purple-600" />
                      Quality Assurance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Flag calls for manual review based on analysis of
                      sentiment, security, and keywords.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Demo Tab */}
        <TabsContent value="demo" className="space-y-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Call Example</CardTitle>
              <p className="text-sm text-muted-foreground">
                Upload a call recording (WAV, MP3, etc.) to see how dhaal.io
                Call Analysis works.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label className="text-sm font-medium mb-3 block">
                  Select a sample call recording
                </Label>
                <Input
                  type="file"
                  accept=".wav,.mp3,.ogg"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  disabled={isAnalyzing}
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Settings className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing call...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Analyze Call
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section - only shown if analyzed */}
          {isAnalyzing && (
            <div className="text-muted-foreground flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Processing your call recording...
            </div>
          )}

          {analysisResult && (
            <div className="space-y-6">
              {/* Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Call Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm">Filename</Label>
                      <p className="font-medium">{analysisResult.filename}</p>
                    </div>
                    <div>
                      <Label className="text-sm">Duration</Label>
                      <p className="font-medium">{analysisResult.duration}</p>
                    </div>
                    <div>
                      <Label className="text-sm">Speaker Count</Label>
                      <p className="font-medium">
                        {analysisResult.speakerCount}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm">Format</Label>
                      <p className="font-medium">
                        {analysisResult.metadata.format}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sentiment & Emotion */}
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment & Emotion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-base px-3 py-2">
                        {analysisResult.sentiment.overall.toUpperCase()}
                        <span className="ml-2 text-muted-foreground">
                          {Math.round(
                            analysisResult.sentiment.confidence * 100,
                          )}
                          % confidence
                        </span>
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Emotions Detected</Label>
                      {analysisResult.emotionAnalysis.map((emo, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center py-1"
                        >
                          <span className="font-medium">{emo.speaker}</span>
                          <div className="inline-flex gap-3 items-center">
                            <Badge variant="outline" className="text-xs">
                              {emo.emotion}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {Math.round(emo.score * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Speaker Transcript */}
              <Card>
                <CardHeader>
                  <CardTitle>Speaker Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label className="text-sm">Detected Speech Segments</Label>
                    {analysisResult.detectedSpeech.map((seg, i) => (
                      <div key={i} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{seg.speaker}</span>
                          <Badge variant="outline" className="text-xs">
                            {seg.start}–{seg.end}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground">{seg.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Topics */}
              <Card>
                <CardHeader>
                  <CardTitle>Topic Segments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysisResult.topicSegmentation.map((topic, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-1"
                      >
                        <span className="font-medium">{topic.topic}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {topic.start}–{topic.end}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(topic.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card>
                <CardHeader>
                  <CardTitle>Security & Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysisResult.securityAlerts.map((alert, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg flex items-center gap-3 ${getSeverityColor(alert.severity)}`}
                      >
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">{alert.alert}</span>
                          <div className="text-xs capitalize">
                            {alert.severity} severity
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* SDK Demo */}
          <Card>
            {/*<CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-blue-600" />
                Developer Experience
              </CardTitle>
            </CardHeader>*/}
            <CardContent>
              <div className="p-3 bg-muted rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>
                    {`// Example: Call Analysis SDK Integration (JavaScript)

import { CallAnalyzer } from '@dhaal/call-analysis-sdk';

const analyzer = new CallAnalyzer({
  apiKey: 'your-api-key',
  endpoint: 'https://api.dhaal.io/v1/call'
});

async function analyzeCall(audioFile) {
  const result = await analyzer.analyze({ file: audioFile });
  console.log('Speaker count:', result.speakerCount);
  console.log('Sentiment:', result.sentiment.overall);
  console.log('Detected entities:', result.detectedEntities);
}
`}
                  </code>
                </pre>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Example
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download SDK
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CallAnalysisSDK;
