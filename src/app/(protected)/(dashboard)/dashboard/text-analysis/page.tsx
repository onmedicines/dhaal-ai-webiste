"use client";

import React, { useState, useRef } from "react";
import {
  Code,
  Play,
  Copy,
  Download,
  Star,
  BarChart3,
  AlertCircle,
  Book,
  Terminal,
  Sparkles,
  Target,
  ExternalLink,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisResult {
  sentiment: {
    score: number;
    label: "positive" | "negative" | "neutral";
    confidence: number;
  };
  entities: Array<{
    text: string;
    type: string;
    confidence: number;
    start: number;
    end: number;
  }>;
  keywords: Array<{
    text: string;
    relevance: number;
    category: string;
  }>;
  topics: Array<{
    name: string;
    confidence: number;
  }>;
  emotions: Array<{
    emotion: string;
    score: number;
  }>;
  language: {
    detected: string;
    confidence: number;
  };
  readability: {
    score: number;
    level: string;
  };
}

const TextAnalysisSDK: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sampleText, setSampleText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sample code examples for different languages
  const codeExamples = {
    javascript: `// Install: npm install @yourcompany/text-analysis-sdk

import { TextAnalyzer } from '@yourcompany/text-analysis-sdk';

const analyzer = new TextAnalyzer({
  apiKey: 'your-api-key',
  endpoint: 'https://api.yourcompany.com/v1'
});

async function analyzeText() {
  try {
    const result = await analyzer.analyze({
      text: "Your text content here",
      features: [
        'sentiment',
        'entities',
        'keywords',
        'topics',
        'emotions'
      ],
      language: 'auto' // or specify: 'en', 'es', 'fr', etc.
    });

    console.log('Sentiment:', result.sentiment);
    console.log('Entities:', result.entities);
    console.log('Keywords:', result.keywords);

    return result;
  } catch (error) {
    console.error('Analysis failed:', error);
  }
}`,

    python: `# Install: pip install yourcompany-text-analysis

from yourcompany_text_analysis import TextAnalyzer

# Initialize the analyzer
analyzer = TextAnalyzer(
    api_key="your-api-key",
    endpoint="https://api.yourcompany.com/v1"
)

def analyze_text():
    try:
        result = analyzer.analyze(
            text="Your text content here",
            features=[
                'sentiment',
                'entities',
                'keywords',
                'topics',
                'emotions'
            ],
            language='auto'  # or specify: 'en', 'es', 'fr', etc.
        )

        print(f"Sentiment: {result.sentiment}")
        print(f"Entities: {result.entities}")
        print(f"Keywords: {result.keywords}")

        return result

    except Exception as error:
        print(f"Analysis failed: {error}")`,

    curl: `# Direct REST API call

curl -X POST "https://api.yourcompany.com/v1/analyze" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Your text content here",
    "features": [
      "sentiment",
      "entities",
      "keywords",
      "topics",
      "emotions"
    ],
    "language": "auto"
  }'`,

    java: `// Add to pom.xml:
// <dependency>
//   <groupId>com.yourcompany</groupId>
//   <artifactId>text-analysis-sdk</artifactId>
//   <version>1.0.0</version>
// </dependency>

import com.yourcompany.textanalysis.TextAnalyzer;
import com.yourcompany.textanalysis.AnalysisRequest;
import com.yourcompany.textanalysis.AnalysisResult;

public class TextAnalysisExample {
    public static void main(String[] args) {
        TextAnalyzer analyzer = new TextAnalyzer.Builder()
            .apiKey("your-api-key")
            .endpoint("https://api.yourcompany.com/v1")
            .build();

        try {
            AnalysisRequest request = AnalysisRequest.builder()
                .text("Your text content here")
                .features(Arrays.asList(
                    "sentiment", "entities", "keywords",
                    "topics", "emotions"
                ))
                .language("auto")
                .build();

            AnalysisResult result = analyzer.analyze(request);

            System.out.println("Sentiment: " + result.getSentiment());
            System.out.println("Entities: " + result.getEntities());
            System.out.println("Keywords: " + result.getKeywords());

        } catch (Exception e) {
            System.err.println("Analysis failed: " + e.getMessage());
        }
    }
}`,
  };

  // Mock analysis function
  const analyzeText = async () => {
    if (!sampleText.trim()) return;

    setIsAnalyzing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock results
    const mockResult: AnalysisResult = {
      sentiment: {
        score: 0.8,
        label: "positive",
        confidence: 0.92,
      },
      entities: [
        {
          text: "customer service",
          type: "SERVICE",
          confidence: 0.95,
          start: 10,
          end: 26,
        },
        {
          text: "product quality",
          type: "ATTRIBUTE",
          confidence: 0.88,
          start: 45,
          end: 59,
        },
      ],
      keywords: [
        { text: "excellent", relevance: 0.95, category: "positive" },
        { text: "quality", relevance: 0.87, category: "attribute" },
        { text: "service", relevance: 0.82, category: "business" },
      ],
      topics: [
        { name: "Customer Experience", confidence: 0.91 },
        { name: "Product Quality", confidence: 0.84 },
      ],
      emotions: [
        { emotion: "joy", score: 0.76 },
        { emotion: "satisfaction", score: 0.68 },
        { emotion: "trust", score: 0.54 },
      ],
      language: {
        detected: "en",
        confidence: 0.99,
      },
      readability: {
        score: 78,
        level: "Easy",
      },
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const getSentimentColor = (label: string) => {
    switch (label) {
      case "positive":
        return "text-green-600 bg-green-50";
      case "negative":
        return "text-red-600 bg-red-50";
      case "neutral":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-left space-y-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Text Analysis SDK
            </h1>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          {/* <TabsTrigger value="pricing">Pricing</TabsTrigger> */}
        </TabsList>

        {/* Overview Tab */}
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Advanced sentiment detection with confidence scores and
                  emotion analysis
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>Positive/Negative/Neutral classification</li>
                  <li>Emotion detection (joy, anger, fear, etc.)</li>
                  <li>Confidence scoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Entity Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Extract and classify named entities from unstructured text
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>People, organizations, locations</li>
                  <li>Dates, currencies, percentages</li>
                  <li>Custom entity types</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Topic Modeling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discover hidden topics and themes in large text collections
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>Automatic topic discovery</li>
                  <li>Topic confidence scores</li>
                  <li>Trend analysis over time</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Use Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <div className="">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Customer Feedback Analysis
                    </h3>
                    <p className="text-sm text-gray-600">
                      Analyze reviews, surveys, and support tickets to
                      understand customer sentiment and identify improvement
                      areas across all touchpoints.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-600 pl-4">
                  <div className="">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Social Media Monitoring
                    </h3>
                    <p className="text-sm text-gray-600">
                      Monitor brand sentiment across social platforms, track
                      mentions, and analyze competitor positioning in real-time.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-green-600 pl-4">
                  <div className="">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Document Processing
                    </h3>
                    <p className="text-sm text-gray-600">
                      Extract insights from contracts, reports, and legal
                      documents to automate classification and compliance
                      checking.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-600 pl-4">
                  <div className="">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Market Research
                    </h3>
                    <p className="text-sm text-gray-600">
                      Analyze market trends, consumer opinions, and competitive
                      intelligence from unstructured data sources.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demo Tab */}
        <TabsContent value="demo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Try Text Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sample-text">Enter text to analyze:</Label>
                <textarea
                  ref={textareaRef}
                  id="sample-text"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  placeholder="Example: I absolutely love the excellent customer service and amazing product quality. The team was incredibly helpful and the delivery was super fast!"
                  className="w-full h-32 p-3 border border-input rounded-lg resize-none"
                />
              </div>

              <Button
                onClick={analyzeText}
                disabled={!sampleText.trim() || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Settings className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Analyze Text
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {analysisResult && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Sentiment */}
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={getSentimentColor(
                          analysisResult.sentiment.label,
                        )}
                      >
                        {analysisResult.sentiment.label.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(analysisResult.sentiment.confidence * 100)}%
                        confidence
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          Sentiment Score
                        </span>
                        <span className="text-sm font-medium">
                          {analysisResult.sentiment.score.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full"
                          style={{
                            width: `${((analysisResult.sentiment.score + 1) / 2) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Emotions Detected</h4>
                      <div className="space-y-2">
                        {analysisResult.emotions.map((emotion, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span className="text-sm capitalize">
                              {emotion.emotion}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-blue-500 h-1.5 rounded-full"
                                  style={{ width: `${emotion.score * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {Math.round(emotion.score * 100)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Entities */}
              <Card>
                <CardHeader>
                  <CardTitle>Named Entities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.entities.map((entity, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{entity.text}</span>
                          <Badge variant="outline" className="text-xs">
                            {entity.type}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>
                            Position: {entity.start}-{entity.end}
                          </span>
                          <span>
                            {Math.round(entity.confidence * 100)}% confidence
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Phrases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.keywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium">{keyword.text}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {keyword.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(keyword.relevance * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Topics */}
              <Card>
                <CardHeader>
                  <CardTitle>Topics Identified</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium">{topic.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${topic.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(topic.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Quick Start Tab */}
        <TabsContent value="quickstart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Language</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(codeExamples).map((lang) => (
                  <Button
                    key={lang}
                    variant={selectedLanguage === lang ? "default" : "outline"}
                    onClick={() => setSelectedLanguage(lang)}
                    className="capitalize"
                  >
                    {lang === "curl" ? "cURL" : lang}
                  </Button>
                ))}
              </div>

              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">
                    {
                      codeExamples[
                        selectedLanguage as keyof typeof codeExamples
                      ]
                    }
                  </code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-3 right-3"
                  onClick={() =>
                    copyCode(
                      codeExamples[
                        selectedLanguage as keyof typeof codeExamples
                      ],
                    )
                  }
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">
                    1
                  </span>
                  Get API Key
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Sign up and get your API key from the dashboard
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Get API Key
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">
                    2
                  </span>
                  Install SDK
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Install our SDK in your preferred language
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  View Installation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                  Start Building
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Make your first API call and start analyzing text
                </p>
                <Button variant="outline" className="w-full">
                  <Book className="w-4 h-4 mr-2" />
                  View Docs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="docs" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-blue-600" />
                  API Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete API documentation with examples and parameters
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-600" />
                  SDK Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Language-specific guides and best practices
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Code Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ready-to-use code snippets and sample applications
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-orange-600" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Setup guides and configuration options
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Error Handling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Error codes, troubleshooting, and best practices
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Step-by-step tutorials for common use cases
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pricing Tab */}
        {/* <TabsContent value="pricing" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="text-2xl font-bold">$49<span className="text-sm font-normal">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>10,000 API calls/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Basic sentiment analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Entity recognition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Professional</CardTitle>
                  <Badge>Popular</Badge>
                </div>
                <div className="text-2xl font-bold">$199<span className="text-sm font-normal">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>100,000 API calls/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Advanced sentiment + emotions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Topic modeling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Custom models</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-2xl font-bold">Custom</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Unlimited API calls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>All features included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>On-premise deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default TextAnalysisSDK;
