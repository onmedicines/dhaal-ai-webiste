"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  Shield,
  AlertTriangle,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const URLAuthenticityChecker: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Internal Navbar */}
      <header className="flex items-center justify-between">
        {/* Left: Smaller Heading */}
        <h1 className="text-lg font-semibold text-foreground">
          URL Authenticity Checker
        </h1>

        {/* Right: Nav Links (dummy) */}
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/dashboard/url-scanning/scan"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Scan
          </Link>
          <Link
            href="/dashboard/url-scanning/detailed-analysis"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Detailed Analysis
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Guides
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Changelog
          </Link>
        </nav>
      </header>

      {/* Key Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Curated Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Offline verification using our comprehensive database of
              legitimate websites
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>Verified legitimate URLs</li>
              <li>No external API dependencies</li>
              <li>Real-time local analysis</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Security Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Multi-layer security assessment to detect potential threats
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>Domain pattern analysis</li>
              <li>SSL certificate validation</li>
              <li>Phishing detection algorithms</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Instant Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get immediate feedback on URL safety and legitimacy
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>Real-time threat assessment</li>
              <li>Confidence scoring</li>
              <li>Actionable recommendations</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* How It Works Process */}
      <Card>
        <CardHeader>
          <CardTitle>Our Verification Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  1. Database Lookup
                </h3>
                <p className="text-sm text-gray-600">
                  First, we check if the URL exists in our curated database of
                  verified legitimate websites. This includes major brands,
                  financial institutions, and trusted services.
                </p>
              </div>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  2. Domain Pattern Analysis
                </h3>
                <p className="text-sm text-gray-600">
                  We analyze the domain structure for suspicious patterns like
                  excessive hyphens, IP addresses instead of domains, and common
                  phishing techniques.
                </p>
              </div>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  3. Security Assessment
                </h3>
                <p className="text-sm text-gray-600">
                  SSL certificate validation, protocol analysis, and detection
                  of homograph attacks or suspicious character usage in domains.
                </p>
              </div>
            </div>
            <div className="border-l-4 border-orange-600 pl-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  4. Risk Scoring & Recommendations
                </h3>
                <p className="text-sm text-gray-600">
                  Generate confidence scores, threat levels, and provide
                  actionable recommendations based on our comprehensive
                  analysis.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Protection Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Employee Protection
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Help employees verify suspicious links before clicking,
                    reducing corporate phishing risks.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Personal Security
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Verify banking, shopping, and social media links to protect
                    personal information.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Educational Use
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Teach students and staff about phishing threats with
                    real-time URL analysis.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    Incident Response
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Quickly assess reported suspicious links during security
                    incidents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default URLAuthenticityChecker;
