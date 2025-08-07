'use client';

import React, { useState, useRef } from 'react';
import {
  Globe, Shield, AlertTriangle, CheckCircle, Search,
  RefreshCw, Eye, BarChart3,
  Lock, FileText, MapPin, Clock,
  Copy, Info, AlertCircle, Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { findLegitimateURL, generatePhishingMetrics, URLData } from '@/data/urlDatabase';

interface URLAnalysisResult {
  url: string;
  isLegitimate: boolean;
  confidence: number;
  riskScore: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  detectedIssues: string[];
  securityAnalysis: {
    databaseResult: {
      inDatabase: boolean;
      verified: boolean;
      source: string;
    };
    sslCertificate: {
      valid: boolean;
      protocol: string;
    };
    domainAnalysis: {
      suspicious: boolean;
      reasons: string[];
    };
  };
  technicalDetails: {
    domain: string;
    protocol: string;
    domainAge: string;
    registrar: string;
    location: string;
    technologies: string[];
    submittedAt: string;
  };
  legitimacyMarkers: string[];
  contentQuality: number;
  recommendations: string[];
}

const URLAuthenticityChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<URLAnalysisResult | null>(null);
  const [urlHistory, setUrlHistory] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Additional domain analysis for suspicious patterns
  const analyzeDomain = (inputUrl: string) => {
    try {
      const urlObj = new URL(inputUrl);
      const domain = urlObj.hostname.toLowerCase();
      const suspicious = [];
      
      // Check for suspicious patterns
      if (domain.includes('-') && domain.split('-').length > 3) {
        suspicious.push('Multiple hyphens in domain');
      }
      
      if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(domain)) {
        suspicious.push('IP address instead of domain name');
      }
      
      if (domain.length > 30) {
        suspicious.push('Unusually long domain name');
      }
      
      if (/[0-9]{4,}/.test(domain)) {
        suspicious.push('Domain contains long number sequences');
      }
      
      // Common phishing keywords
      const suspiciousKeywords = [
        'secure', 'verification', 'update', 'confirm', 'account', 
        'login', 'banking', 'paypal', 'amazon', 'microsoft',
        'apple', 'google', 'facebook', 'twitter', 'instagram'
      ];
      
      const hasSuspiciousKeywords = suspiciousKeywords.some(keyword => 
        domain.includes(keyword) && !domain.endsWith('.com') && !domain.endsWith('.org')
      );
      
      if (hasSuspiciousKeywords) {
        suspicious.push('Contains brand names often used in phishing');
      }
      
      // Check for homograph attacks (similar looking characters)
      if (/[а-я]/.test(domain) || /[àáâãäåæçèéêëìíîïñòóôõöøùúûüý]/.test(domain)) {
        suspicious.push('Contains non-Latin characters that may be deceptive');
      }
      
      return {
        suspicious: suspicious.length > 0,
        reasons: suspicious
      };
    } catch (error) {
      return { suspicious: false, reasons: [] };
    }
  };

  // Main analysis function using offline database
  const analyzeURL = async (inputUrl: string): Promise<URLAnalysisResult> => {
    setError('');
    
    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Ensure URL has protocol
      let processedUrl = inputUrl;
      if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
        processedUrl = 'https://' + inputUrl;
      }
      
      // Parse URL
      const urlObj = new URL(processedUrl);
      
      // Check if URL is in our legitimate database
      const legitimateData = findLegitimateURL(processedUrl);
      const domainAnalysis = analyzeDomain(processedUrl);
      
      // Create default structure to avoid undefined errors
      const baseResult = {
        url: processedUrl,
        securityAnalysis: {
          databaseResult: {
            inDatabase: false,
            verified: false,
            source: 'Offline Database Check'
          },
          sslCertificate: {
            valid: urlObj.protocol === 'https:',
            protocol: urlObj.protocol
          },
          domainAnalysis: {
            suspicious: domainAnalysis.suspicious,
            reasons: domainAnalysis.reasons
          }
        },
        technicalDetails: {
          domain: urlObj.hostname,
          protocol: urlObj.protocol,
          domainAge: 'Unknown',
          registrar: 'Unknown',
          location: 'Unknown',
          technologies: [],
          submittedAt: new Date().toISOString()
        },
        legitimacyMarkers: [],
        contentQuality: 0,
        detectedIssues: [],
        recommendations: []
      };
      
      if (legitimateData) {
        // URL is in our legitimate database
        return {
          ...baseResult,
          isLegitimate: true,
          confidence: legitimateData.confidence,
          riskScore: legitimateData.riskScore,
          threatLevel: legitimateData.threatLevel,
          detectedIssues: domainAnalysis.suspicious ? domainAnalysis.reasons : [],
          securityAnalysis: {
            ...baseResult.securityAnalysis,
            databaseResult: {
              inDatabase: true,
              verified: true,
              source: 'Legitimate URL Database'
            }
          },
          technicalDetails: {
            ...baseResult.technicalDetails,
            domainAge: legitimateData.domainAge,
            registrar: legitimateData.registrar,
            location: legitimateData.location,
            technologies: legitimateData.technologies
          },
          legitimacyMarkers: legitimateData.legitimacyMarkers,
          contentQuality: legitimateData.contentQuality,
          recommendations: [
            'URL is verified as legitimate',
            'Always check the exact spelling of URLs',
            'Look for HTTPS encryption',
            'Bookmark legitimate sites to avoid typos'
          ]
        };
      } else {
        // URL not in database - treat as potential phishing
        const phishingData = generatePhishingMetrics(processedUrl);
        
        const detectedIssues = [
          'URL not found in legitimate database',
          'Potentially suspicious or unknown website',
          ...domainAnalysis.reasons
        ];
        
        if (!baseResult.securityAnalysis.sslCertificate.valid) {
          detectedIssues.push('Missing or invalid SSL certificate');
        }
        
        return {
          ...baseResult,
          isLegitimate: false,
          confidence: 95,
          riskScore: 85 + (domainAnalysis.suspicious ? 10 : 0),
          threatLevel: 'critical' as const,
          detectedIssues,
          securityAnalysis: {
            ...baseResult.securityAnalysis,
            databaseResult: {
              inDatabase: false,
              verified: false,
              source: 'Not in legitimate URL database'
            }
          },
          technicalDetails: {
            ...baseResult.technicalDetails,
            domainAge: phishingData.domainAge,
            registrar: phishingData.registrar,
            location: phishingData.location,
            technologies: phishingData.technologies
          },
          contentQuality: phishingData.contentQuality,
          recommendations: [
            'Exercise extreme caution with this URL',
            'Do not enter personal or financial information',
            'Verify the website through official channels',
            'Consider using well-known, bookmarked sites instead',
            'Report suspicious websites to authorities'
          ]
        };
      }
      
    } catch (error) {
      console.error('Analysis failed:', error);
      throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    
    // Add to history
    if (!urlHistory.includes(url)) {
      setUrlHistory(prev => [url, ...prev.slice(0, 4)]);
    }
    
    setIsAnalyzing(true);
    setError('');
    
    try {
      const result = await analyzeURL(url);
      setAnalysisResult(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.includes('.')) { // Basic check for URL-like content
        setUrl(text);
      }
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const CircularProgress = ({ value, size = 80, strokeWidth = 6, color = 'blue' }: {
    value: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;
    
    const colorClasses = {
      blue: 'text-blue-500',
      green: 'text-green-500',
      red: 'text-red-500',
      yellow: 'text-yellow-500',
      orange: 'text-orange-500'
    };

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-1000 ${colorClasses[color as keyof typeof colorClasses]}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-foreground">
            {Math.round(value)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          URL Authenticity Checker
        </h1>
        {/* <p className="text-muted-foreground max-w-2xl mx-auto">
          Verify if a website is legitimate using our curated database of trusted URLs (completely offline)
        </p> */}
      </div>

      {/* Input Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
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
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
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
                  Checking database...
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
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Main Status */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CircularProgress 
                    value={analysisResult.confidence} 
                    color={analysisResult.isLegitimate ? 'green' : 'red'}
                    size={80}
                  />
                  <div>
                    <Badge 
                      variant="outline" 
                      className={`mb-2 text-base px-4 py-2 ${
                        analysisResult.isLegitimate 
                          ? 'text-green-600 bg-green-50 border-green-200'
                          : 'text-red-600 bg-red-50 border-red-200'
                      }`}
                    >
                      {analysisResult.isLegitimate ? (
                        <CheckCircle className="w-5 h-5 mr-2" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 mr-2" />
                      )}
                      {analysisResult.isLegitimate ? 'Verified Legitimate' : 'Potentially Dangerous'}
                    </Badge>
                    <p className="text-muted-foreground">
                      Confidence Level: {Math.round(analysisResult.confidence)}%
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">Analyzed:</div>
                  <div className="text-sm font-medium text-foreground max-w-[300px] truncate">
                    {analysisResult.url}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Database Results */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Database Check
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">In Database</span>
                    <span className={`text-sm font-medium ${
                      analysisResult?.securityAnalysis?.databaseResult?.inDatabase ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analysisResult?.securityAnalysis?.databaseResult?.inDatabase ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className={`text-sm font-medium ${
                      analysisResult?.securityAnalysis?.databaseResult?.verified ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analysisResult?.securityAnalysis?.databaseResult?.verified ? 'Verified' : 'Unknown'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Source: {analysisResult?.securityAnalysis?.databaseResult?.source || 'Unknown'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Quality */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5 text-purple-600" />
                  Content Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-foreground">
                    {analysisResult.contentQuality}%
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${
                        analysisResult.contentQuality > 70 ? 'bg-green-500' : 
                        analysisResult.contentQuality > 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${analysisResult.contentQuality}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {analysisResult.legitimacyMarkers.length} legitimacy markers
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Threat Assessment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Threat Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-2 ${getThreatColor(analysisResult.threatLevel).split(' ')[0]}`}>
                    {analysisResult.threatLevel.toUpperCase()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Risk Score: {Math.round(analysisResult.riskScore)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {analysisResult.detectedIssues.length} issues detected
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Technical
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Domain:</span>
                    <span className="text-foreground font-medium text-xs">{analysisResult.technicalDetails.domain}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Protocol:</span>
                    <span className={`text-sm font-medium ${
                      analysisResult.technicalDetails.protocol === 'https:' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analysisResult.technicalDetails.protocol}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Age:</span>
                    <span className="text-foreground font-medium text-xs">{analysisResult.technicalDetails.domainAge}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Issues and Recommendations */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Detected Issues */}
            {analysisResult.detectedIssues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    {analysisResult.isLegitimate ? 'Notes' : 'Security Issues'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysisResult.detectedIssues.slice(0, 4).map((issue, index) => (
                      <div key={index} className={`flex items-start gap-3 p-2 rounded-lg ${
                        analysisResult.isLegitimate ? 'bg-blue-50' : 'bg-red-50'
                      }`}>
                        <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          analysisResult.isLegitimate ? 'text-blue-600' : 'text-red-600'
                        }`} />
                        <span className="text-sm text-black">{issue}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysisResult.recommendations.slice(0, 4).map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 bg-blue-50 rounded-lg">
                      <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-black">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legitimacy Markers (only show for legitimate URLs) */}
          {analysisResult.isLegitimate && analysisResult.legitimacyMarkers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Legitimacy Markers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-2">
                  {analysisResult.legitimacyMarkers.map((marker, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-foreground">{marker}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default URLAuthenticityChecker;
