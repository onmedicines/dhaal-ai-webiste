"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
// import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Database,
  DollarSign,
  Shield,
  TrendingUp,
  Users,
  // Globe,
  // Award,
  Lock,
  AlertTriangle,
  // CheckCircle,
  Calculator,
  // FileText,
  // BarChart3,
} from "lucide-react";

interface DataValuationForm {
  // Company Profile
  companyName: string;
  industry: string;
  annualRevenue: number;
  marketCap: number;
  employeeCount: number;

  // Data Classification & Volume
  totalDataVolume: number; // TB
  sensitiveDataPercentage: number;
  crownJewelDataPercentage: number;
  customerRecords: number;

  // Intellectual Property & Trade Secrets
  ipValueEstimate: number;
  rdInvestmentAnnual: number;
  patentCount: number;
  proprietaryAlgorithmsValue: number;

  // Customer & Market Data
  customerLifetimeValue: number;
  revenueFromDataInsights: number;
  marketResearchInvestment: number;
  competitiveAdvantageValue: number;

  // Financial & Revenue Impact
  revenueDataDependency: number; // percentage
  hourlyBusinessInterruptionCost: number;
  dataMaintenanceCostAnnual: number;

  // Replacement & Recovery Costs
  dataRecreationCost: number;
  backupRestoreTime: number; // hours
  complianceDocumentationValue: number;

  // Strategic & Competitive Value
  brandValueAtRisk: number;
  partnershipDataValue: number;
  thirdPartyDataCosts: number;

  // Risk Factors
  previousBreaches: number;
  regulatoryFines: number;
  geographicRisk: string;
  dataRetentionPeriod: number; // years
}

/**
 * PREMIUM CALCULATION LOGIC
 *
 * This function calculates the cyber insurance premium based on comprehensive data valuation.
 * The calculation methodology follows industry standards with custom weightings for data-specific risks.
 *
 * CALCULATION COMPONENTS:
 *
 * 1. BASE DATA VALUE ASSESSMENT (40% weight)
 *    - Total Tangible Data Value = IP Value + Customer Data Value + Operational Data Value
 *    - IP Value = IP Estimate + R&D Investment + Proprietary Algorithms Value
 *    - Customer Data Value = (Customer Records * Customer LTV * 0.1)
 *    - Operational Data Value = Revenue from Data Insights + Market Research Investment
 *
 * 2. BUSINESS INTERRUPTION RISK (25% weight)
 *    - Interruption Value = Hourly Cost * 24 hours * 7 days (assumes week-long outage)
 *    - Revenue Dependency Multiplier = Revenue Data Dependency Percentage / 100
 *    - BI Risk = Interruption Value * Revenue Dependency Multiplier
 *
 * 3. REPLACEMENT & RECOVERY COSTS (20% weight)
 *    - Recovery Costs = Data Recreation Cost + (Backup Restore Time * Hourly Cost)
 *    - Compliance Value = Compliance Documentation Value
 *    - Total Recovery Risk = Recovery Costs + Compliance Value
 *
 * 4. STRATEGIC & REPUTATIONAL RISK (10% weight)
 *    - Strategic Risk = Brand Value at Risk + Partnership Data Value + Competitive Advantage Value
 *    - Third-party dependency risk included
 *
 * 5. HISTORICAL RISK MULTIPLIERS (5% weight)
 *    - Previous Breach Penalty = Previous Breaches * 0.15 (15% increase per breach)
 *    - Regulatory Risk = Regulatory Fines / 1000000 (normalized)
 *    - Geographic Risk Multiplier: Low=1.0, Medium=1.2, High=1.5
 *
 * FINAL CALCULATION:
 * Total Data Value = Sum of all weighted components
 * Base Premium = Total Data Value * 0.02 (2% of total value as base rate)
 * Risk-Adjusted Premium = Base Premium * Risk Multipliers
 * Annual Premium = Risk-Adjusted Premium (capped between 500K and 50M)
 * Monthly Premium = Annual Premium / 12
 *
 * COVERAGE RECOMMENDATION:
 * Recommended Coverage = Total Data Value * 1.5 (150% of assessed value)
 * This accounts for indirect costs, business interruption, and market volatility
 */
const calculateDataInsurancePremium = (data: DataValuationForm) => {
  // 1. Base Data Value Assessment (40% weight)
  const ipValue =
    data.ipValueEstimate +
    data.rdInvestmentAnnual +
    data.proprietaryAlgorithmsValue;
  const customerDataValue =
    data.customerRecords * data.customerLifetimeValue * 0.1; // 10% of total customer value
  const operationalDataValue =
    data.revenueFromDataInsights + data.marketResearchInvestment;
  const totalTangibleDataValue =
    ipValue + customerDataValue + operationalDataValue;

  // 2. Business Interruption Risk (25% weight)
  const weeklyInterruptionCost = data.hourlyBusinessInterruptionCost * 24 * 7; // Assume week-long outage
  const revenueDependencyMultiplier = data.revenueDataDependency / 100;
  const businessInterruptionRisk =
    weeklyInterruptionCost * revenueDependencyMultiplier;

  // 3. Replacement & Recovery Costs (20% weight)
  const recoveryCosts =
    data.dataRecreationCost +
    data.backupRestoreTime * data.hourlyBusinessInterruptionCost;
  const replacementRecoveryRisk =
    recoveryCosts + data.complianceDocumentationValue;

  // 4. Strategic & Reputational Risk (10% weight)
  const strategicRisk =
    data.brandValueAtRisk +
    data.partnershipDataValue +
    data.competitiveAdvantageValue;

  // 5. Risk Multipliers (5% weight)
  const breachPenalty = 1 + data.previousBreaches * 0.15; // 15% increase per previous breach
  const regulatoryRiskFactor = 1 + data.regulatoryFines / 10000000; // Normalized regulatory risk

  const geographicMultipliers = { low: 1.0, medium: 1.2, high: 1.5 };
  const geographicMultiplier =
    geographicMultipliers[
      data.geographicRisk as keyof typeof geographicMultipliers
    ] || 1.0;

  // Calculate weighted total data value
  const weightedDataValue =
    totalTangibleDataValue * 0.4 +
    businessInterruptionRisk * 0.25 +
    replacementRecoveryRisk * 0.2 +
    strategicRisk * 0.1 +
    data.thirdPartyDataCosts * 0.05;

  // Base premium calculation (2% of total value)
  const basePremium = weightedDataValue * 0.02;

  // Apply risk multipliers
  const riskAdjustedPremium =
    basePremium * breachPenalty * regulatoryRiskFactor * geographicMultiplier;

  // Cap the premium between reasonable bounds
  const annualPremium = Math.max(
    500000,
    Math.min(50000000, riskAdjustedPremium),
  );
  const monthlyPremium = annualPremium / 12;

  // Recommended coverage (150% of assessed value for safety margin)
  const recommendedCoverage = weightedDataValue * 1.5;

  return {
    totalDataValue: Math.round(weightedDataValue),
    annualPremium: Math.round(annualPremium),
    monthlyPremium: Math.round(monthlyPremium),
    recommendedCoverage: Math.round(recommendedCoverage),
    breakdown: {
      tangibleDataValue: Math.round(totalTangibleDataValue),
      businessInterruptionRisk: Math.round(businessInterruptionRisk),
      replacementRecoveryRisk: Math.round(replacementRecoveryRisk),
      strategicRisk: Math.round(strategicRisk),
      riskMultiplier:
        Math.round(
          breachPenalty * regulatoryRiskFactor * geographicMultiplier * 100,
        ) / 100,
    },
  };
};

export default function DataValuationInsuranceDashboard() {
  const [formData, setFormData] = useState<DataValuationForm>({
    // Company Profile
    companyName: "",
    industry: "technology",
    annualRevenue: 1000000000, // 1B
    marketCap: 5000000000, // 5B
    employeeCount: 10000,

    // Data Classification & Volume
    totalDataVolume: 100, // TB
    sensitiveDataPercentage: 30,
    crownJewelDataPercentage: 10,
    customerRecords: 50000000, // 50M

    // Intellectual Property & Trade Secrets
    ipValueEstimate: 500000000, // 500M
    rdInvestmentAnnual: 100000000, // 100M
    patentCount: 1000,
    proprietaryAlgorithmsValue: 200000000, // 200M

    // Customer & Market Data
    customerLifetimeValue: 150,
    revenueFromDataInsights: 300000000, // 300M
    marketResearchInvestment: 50000000, // 50M
    competitiveAdvantageValue: 1000000000, // 1B

    // Financial & Revenue Impact
    revenueDataDependency: 60,
    hourlyBusinessInterruptionCost: 1000000, // 1M per hour
    dataMaintenanceCostAnnual: 200000000, // 200M

    // Replacement & Recovery Costs
    dataRecreationCost: 2000000000, // 2B
    backupRestoreTime: 48,
    complianceDocumentationValue: 100000000, // 100M

    // Strategic & Competitive Value
    brandValueAtRisk: 5000000000, // 5B
    partnershipDataValue: 500000000, // 500M
    thirdPartyDataCosts: 50000000, // 50M annually

    // Risk Factors
    previousBreaches: 1,
    regulatoryFines: 100000000, // 100M
    geographicRisk: "medium",
    dataRetentionPeriod: 7,
  });

  const updateField = (
    field: keyof DataValuationForm,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculationResult = useMemo(() => {
    return calculateDataInsurancePremium(formData);
  }, [formData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (amount: number) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Data Valuation Insurance Calculator
        </h1>
        <p className="text-muted-foreground">
          Comprehensive data asset valuation and cyber insurance premium
          assessment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    placeholder="e.g., Sony Corporation"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <select
                    value={formData.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="technology">Technology</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    Annual Revenue: ₹{formatNumber(formData.annualRevenue)} Cr
                  </Label>
                  <Slider
                    value={[formData.annualRevenue / 10000000]}
                    onValueChange={(value) =>
                      updateField("annualRevenue", value[0] * 10000000)
                    }
                    min={1}
                    max={5000}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹1 Cr</span>
                    <span>₹5000 Cr</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    Employee Count: {formatNumber(formData.employeeCount)}
                  </Label>
                  <Slider
                    value={[formData.employeeCount]}
                    onValueChange={(value) =>
                      updateField("employeeCount", value[0])
                    }
                    min={100}
                    max={500000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>100</span>
                    <span>500,000</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Classification & Volume */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Classification & Volume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Total Data Volume: {formData.totalDataVolume} TB
                  </Label>
                  <Slider
                    value={[formData.totalDataVolume]}
                    onValueChange={(value) =>
                      updateField("totalDataVolume", value[0])
                    }
                    min={1}
                    max={10000}
                    step={10}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Customer Records: {formatNumber(formData.customerRecords)}
                  </Label>
                  <Slider
                    value={[formData.customerRecords / 1000000]}
                    onValueChange={(value) =>
                      updateField("customerRecords", value[0] * 1000000)
                    }
                    min={1}
                    max={1000}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Sensitive Data: {formData.sensitiveDataPercentage}%
                  </Label>
                  <Slider
                    value={[formData.sensitiveDataPercentage]}
                    onValueChange={(value) =>
                      updateField("sensitiveDataPercentage", value[0])
                    }
                    min={5}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Crown Jewel Data: {formData.crownJewelDataPercentage}%
                  </Label>
                  <Slider
                    value={[formData.crownJewelDataPercentage]}
                    onValueChange={(value) =>
                      updateField("crownJewelDataPercentage", value[0])
                    }
                    min={1}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property & Trade Secrets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Intellectual Property & Trade Secrets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>IP Value Estimate (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.ipValueEstimate / 10000000}
                    onChange={(e) =>
                      updateField(
                        "ipValueEstimate",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="500"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Annual R&D Investment (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.rdInvestmentAnnual / 10000000}
                    onChange={(e) =>
                      updateField(
                        "rdInvestmentAnnual",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patent Count</Label>
                  <Input
                    type="number"
                    value={formData.patentCount}
                    onChange={(e) =>
                      updateField("patentCount", parseInt(e.target.value))
                    }
                    placeholder="1000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Proprietary Algorithms Value (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.proprietaryAlgorithmsValue / 10000000}
                    onChange={(e) =>
                      updateField(
                        "proprietaryAlgorithmsValue",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer & Market Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer & Market Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Customer Lifetime Value (₹)</Label>
                  <Input
                    type="number"
                    value={formData.customerLifetimeValue}
                    onChange={(e) =>
                      updateField(
                        "customerLifetimeValue",
                        parseFloat(e.target.value),
                      )
                    }
                    placeholder="150"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Revenue from Data Insights (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.revenueFromDataInsights / 10000000}
                    onChange={(e) =>
                      updateField(
                        "revenueFromDataInsights",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="300"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Market Research Investment (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.marketResearchInvestment / 10000000}
                    onChange={(e) =>
                      updateField(
                        "marketResearchInvestment",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Competitive Advantage Value (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.competitiveAdvantageValue / 10000000}
                    onChange={(e) =>
                      updateField(
                        "competitiveAdvantageValue",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="1000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial & Revenue Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial & Revenue Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>
                  Revenue Data Dependency: {formData.revenueDataDependency}%
                </Label>
                <Slider
                  value={[formData.revenueDataDependency]}
                  onValueChange={(value) =>
                    updateField("revenueDataDependency", value[0])
                  }
                  min={10}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hourly Business Interruption Cost (₹ Lakhs)</Label>
                  <Input
                    type="number"
                    value={formData.hourlyBusinessInterruptionCost / 100000}
                    onChange={(e) =>
                      updateField(
                        "hourlyBusinessInterruptionCost",
                        parseFloat(e.target.value) * 100000,
                      )
                    }
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Annual Data Maintenance Cost (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.dataMaintenanceCostAnnual / 10000000}
                    onChange={(e) =>
                      updateField(
                        "dataMaintenanceCostAnnual",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replacement & Recovery Costs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Replacement & Recovery Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data Recreation Cost (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.dataRecreationCost / 10000000}
                    onChange={(e) =>
                      updateField(
                        "dataRecreationCost",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="2000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Backup Restore Time (Hours)</Label>
                  <Input
                    type="number"
                    value={formData.backupRestoreTime}
                    onChange={(e) =>
                      updateField("backupRestoreTime", parseInt(e.target.value))
                    }
                    placeholder="48"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Compliance Documentation Value (₹ Cr)</Label>
                <Input
                  type="number"
                  value={formData.complianceDocumentationValue / 10000000}
                  onChange={(e) =>
                    updateField(
                      "complianceDocumentationValue",
                      parseFloat(e.target.value) * 10000000,
                    )
                  }
                  placeholder="100"
                />
              </div>
            </CardContent>
          </Card>

          {/* Strategic & Competitive Value */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Strategic & Competitive Value
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Brand Value at Risk (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.brandValueAtRisk / 10000000}
                    onChange={(e) =>
                      updateField(
                        "brandValueAtRisk",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="5000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Partnership Data Value (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.partnershipDataValue / 10000000}
                    onChange={(e) =>
                      updateField(
                        "partnershipDataValue",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Third-party Data Costs (₹ Cr/year)</Label>
                <Input
                  type="number"
                  value={formData.thirdPartyDataCosts / 10000000}
                  onChange={(e) =>
                    updateField(
                      "thirdPartyDataCosts",
                      parseFloat(e.target.value) * 10000000,
                    )
                  }
                  placeholder="50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Previous Breaches (Last 5 Years)</Label>
                  <Input
                    type="number"
                    value={formData.previousBreaches}
                    onChange={(e) =>
                      updateField("previousBreaches", parseInt(e.target.value))
                    }
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Regulatory Fines Paid (₹ Cr)</Label>
                  <Input
                    type="number"
                    value={formData.regulatoryFines / 10000000}
                    onChange={(e) =>
                      updateField(
                        "regulatoryFines",
                        parseFloat(e.target.value) * 10000000,
                      )
                    }
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Geographic Risk Level</Label>
                  <select
                    value={formData.geographicRisk}
                    onChange={(e) =>
                      updateField("geographicRisk", e.target.value)
                    }
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="low">Low Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="high">High Risk</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Data Retention Period (Years)</Label>
                  <Input
                    type="number"
                    value={formData.dataRetentionPeriod}
                    onChange={(e) =>
                      updateField(
                        "dataRetentionPeriod",
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="7"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Total Data Value */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Total Data Value</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(calculationResult.totalDataValue)}
              </div>
              <div className="text-sm text-muted-foreground">
                Assessed Total Value
              </div>
            </CardContent>
          </Card>

          {/* Premium Calculation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Insurance Premium</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(calculationResult.annualPremium)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Annual Premium
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xl font-semibold">
                  {formatCurrency(calculationResult.monthlyPremium)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Monthly Premium
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Coverage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Recommended Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(calculationResult.recommendedCoverage)}
              </div>
              <div className="text-sm text-muted-foreground">
                150% of assessed value for comprehensive protection
              </div>
            </CardContent>
          </Card>

          {/* Risk Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Value Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Tangible Data Value:</span>
                  <span>
                    {formatCurrency(
                      calculationResult.breakdown.tangibleDataValue,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Business Interruption:</span>
                  <span>
                    {formatCurrency(
                      calculationResult.breakdown.businessInterruptionRisk,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Recovery Costs:</span>
                  <span>
                    {formatCurrency(
                      calculationResult.breakdown.replacementRecoveryRisk,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Strategic Risk:</span>
                  <span>
                    {formatCurrency(calculationResult.breakdown.strategicRisk)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Risk Multiplier:</span>
                  <span>{calculationResult.breakdown.riskMultiplier}x</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <Button className="w-full" size="lg">
            Generate Detailed Quote
          </Button>

          {/* Calculation Methodology */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Calculation Methodology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-2 text-muted-foreground">
                <p>
                  <strong>Base Rate:</strong> 2% of total data value
                </p>
                <p>
                  <strong>Components:</strong> IP (40%), Business Interruption
                  (25%), Recovery Costs (20%), Strategic Value (10%),
                  Third-party Costs (5%)
                </p>
                <p>
                  <strong>Risk Adjustments:</strong> Previous breaches,
                  regulatory history, geographic factors
                </p>
                <p>
                  <strong>Coverage:</strong> 150% of assessed value recommended
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
