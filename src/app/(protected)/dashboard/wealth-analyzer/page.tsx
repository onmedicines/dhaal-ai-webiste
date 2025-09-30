"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Building2,
  Database,
  DollarSign,
  Shield,
  TrendingUp,
  Users,
  Lock,
  AlertTriangle,
  Calculator,
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
 * ENHANCED PREMIUM CALCULATION LOGIC
 *
 * Updated with realistic values for mid-size to large companies
 */
const calculateDataInsurancePremium = (data: DataValuationForm) => {
  // Industry Risk Multipliers
  const industryMultipliers = {
    technology: 1.2,
    entertainment: 1.0,
    finance: 1.5,
    healthcare: 1.4,
    retail: 1.1,
    manufacturing: 0.9,
  };

  const industryMultiplier =
    industryMultipliers[data.industry as keyof typeof industryMultipliers] ||
    1.0;

  // Company Size Risk Factor (adjusted for realistic ranges)
  const companySizeMultiplier =
    Math.log10(data.annualRevenue / 5000000) * 0.15 + 1; // Adjusted for smaller revenue base
  const employeeSizeMultiplier = Math.log10(data.employeeCount / 50) * 0.1 + 1; // Adjusted for smaller employee base

  // 1. Base Data Value Assessment (40% weight)
  const ipValue =
    data.ipValueEstimate +
    data.rdInvestmentAnnual +
    data.proprietaryAlgorithmsValue;

  // Enhanced patent value calculation (reduced for realistic companies)
  const patentValue = data.patentCount * 200000; // ₹2 Lakhs per patent average

  const customerDataValue =
    data.customerRecords * data.customerLifetimeValue * 0.1;
  const operationalDataValue =
    data.revenueFromDataInsights + data.marketResearchInvestment;
  const totalTangibleDataValue =
    ipValue + customerDataValue + operationalDataValue + patentValue;

  // 2. Business Interruption Risk (25% weight)
  const weeklyInterruptionCost = data.hourlyBusinessInterruptionCost * 24 * 7;
  const revenueDependencyMultiplier = data.revenueDataDependency / 100;

  // Adjusted revenue impact factor for realistic companies
  const revenueImpactFactor =
    data.annualRevenue * (data.revenueDataDependency / 100) * 0.05; // Reduced to 5%
  const businessInterruptionRisk =
    weeklyInterruptionCost * revenueDependencyMultiplier + revenueImpactFactor;

  // 3. Replacement & Recovery Costs (20% weight)
  const dataVolumeMultiplier = Math.log10(data.totalDataVolume) * 0.1 + 1;
  const recoveryCosts =
    data.dataRecreationCost +
    data.backupRestoreTime * data.hourlyBusinessInterruptionCost;
  const replacementRecoveryRisk =
    (recoveryCosts + data.complianceDocumentationValue) * dataVolumeMultiplier;

  // 4. Strategic & Reputational Risk (10% weight)
  const strategicRisk =
    data.brandValueAtRisk +
    data.partnershipDataValue +
    data.competitiveAdvantageValue;

  // Adjusted market cap influence for realistic companies
  const marketCapInfluence = data.marketCap * 0.02; // Reduced from 5% to 2%
  const enhancedStrategicRisk = strategicRisk + marketCapInfluence;

  // 5. Data Sensitivity Risk (10% weight)
  const sensitivityMultiplier =
    (data.sensitiveDataPercentage / 100) * 1.5 +
    (data.crownJewelDataPercentage / 100) * 2;
  const dataSensitivityRisk = totalTangibleDataValue * sensitivityMultiplier;

  // 6. Operational Risk (5% weight)
  const operationalRisk = data.dataMaintenanceCostAnnual * 1.5; // Reduced multiplier

  // 7. Risk Multipliers
  const breachPenalty = 1 + data.previousBreaches * 0.15;
  const regulatoryRiskFactor = 1 + data.regulatoryFines / 5000000; // Adjusted for smaller fines

  const geographicMultipliers = { low: 1.0, medium: 1.2, high: 1.5 };
  const geographicMultiplier =
    geographicMultipliers[
      data.geographicRisk as keyof typeof geographicMultipliers
    ] || 1.0;

  const retentionRiskMultiplier = 1 + data.dataRetentionPeriod * 0.02;

  // Calculate weighted total data value
  const weightedDataValue =
    totalTangibleDataValue * 0.3 +
    businessInterruptionRisk * 0.25 +
    replacementRecoveryRisk * 0.2 +
    enhancedStrategicRisk * 0.1 +
    dataSensitivityRisk * 0.1 +
    operationalRisk * 0.05;

  const thirdPartyRisk = data.thirdPartyDataCosts * 0.5;
  const totalRiskValue = weightedDataValue + thirdPartyRisk;

  // Base premium calculation (adjusted rate for realistic companies)
  const basePremium = totalRiskValue * 0.025; // Increased base rate to 2.5%

  // Apply risk multipliers
  const riskAdjustedPremium =
    basePremium *
    breachPenalty *
    regulatoryRiskFactor *
    geographicMultiplier *
    industryMultiplier *
    companySizeMultiplier *
    employeeSizeMultiplier *
    retentionRiskMultiplier;

  // Realistic premium bounds for mid-size companies
  const annualPremium = Math.max(
    150000,
    Math.min(15000000, riskAdjustedPremium),
  ); // ₹1.5L to ₹1.5Cr
  const monthlyPremium = annualPremium / 12;

  // Coverage recommendation
  const coverageMultiplier =
    1.5 +
    (data.sensitiveDataPercentage / 100) * 0.5 +
    (data.crownJewelDataPercentage / 100) * 1.0;
  const recommendedCoverage = totalRiskValue * coverageMultiplier;

  // Risk score calculation
  const riskScore = Math.min(
    100,
    data.previousBreaches * 10 +
      data.sensitiveDataPercentage * 0.3 +
      data.crownJewelDataPercentage * 0.8 +
      data.revenueDataDependency * 0.2 +
      geographicMultipliers[
        data.geographicRisk as keyof typeof geographicMultipliers
      ] *
        20,
  );

  return {
    totalDataValue: Math.round(totalRiskValue),
    annualPremium: Math.round(annualPremium),
    monthlyPremium: Math.round(monthlyPremium),
    recommendedCoverage: Math.round(recommendedCoverage),
    riskScore: Math.round(riskScore),
    breakdown: {
      tangibleDataValue: Math.round(totalTangibleDataValue),
      businessInterruptionRisk: Math.round(businessInterruptionRisk),
      replacementRecoveryRisk: Math.round(replacementRecoveryRisk),
      strategicRisk: Math.round(enhancedStrategicRisk),
      dataSensitivityRisk: Math.round(dataSensitivityRisk),
      operationalRisk: Math.round(operationalRisk),
      thirdPartyRisk: Math.round(thirdPartyRisk),
      riskMultiplier:
        Math.round(
          breachPenalty *
            regulatoryRiskFactor *
            geographicMultiplier *
            industryMultiplier *
            companySizeMultiplier *
            employeeSizeMultiplier *
            retentionRiskMultiplier *
            100,
        ) / 100,
    },
  };
};

export default function DataValuationInsuranceDashboard() {
  const [formData, setFormData] = useState<DataValuationForm>({
    // Company Profile - Realistic mid-size company values
    companyName: "",
    industry: "technology",
    annualRevenue: 50000000, // ₹50 Cr (realistic for mid-size)
    marketCap: 150000000, // ₹150 Cr
    employeeCount: 500, // 500 employees

    // Data Classification & Volume - Realistic for mid-size companies
    totalDataVolume: 25, // 25 TB
    sensitiveDataPercentage: 25,
    crownJewelDataPercentage: 5,
    customerRecords: 1000000, // 1M customers

    // Intellectual Property & Trade Secrets - Realistic values
    ipValueEstimate: 25000000, // ₹25 Cr
    rdInvestmentAnnual: 5000000, // ₹5 Cr
    patentCount: 15, // 15 patents
    proprietaryAlgorithmsValue: 10000000, // ₹10 Cr

    // Customer & Market Data - Realistic values
    customerLifetimeValue: 1200, // ₹1,200 per customer
    revenueFromDataInsights: 8000000, // ₹8 Cr
    marketResearchInvestment: 2000000, // ₹2 Cr
    competitiveAdvantageValue: 20000000, // ₹20 Cr

    // Financial & Revenue Impact - Realistic for mid-size companies
    revenueDataDependency: 45, // 45% dependency
    hourlyBusinessInterruptionCost: 50000, // ₹50K per hour
    dataMaintenanceCostAnnual: 3000000, // ₹3 Cr

    // Replacement & Recovery Costs - Realistic values
    dataRecreationCost: 15000000, // ₹15 Cr
    backupRestoreTime: 24, // 24 hours
    complianceDocumentationValue: 2000000, // ₹2 Cr

    // Strategic & Competitive Value - Realistic for mid-size companies
    brandValueAtRisk: 30000000, // ₹30 Cr
    partnershipDataValue: 5000000, // ₹5 Cr
    thirdPartyDataCosts: 1000000, // ₹1 Cr annually

    // Risk Factors - Realistic values
    previousBreaches: 0, // No previous breaches (typical)
    regulatoryFines: 0, // No previous fines
    geographicRisk: "medium",
    dataRetentionPeriod: 5, // 5 years
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

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: "Low", color: "text-green-600" };
    if (score < 60) return { level: "Medium", color: "text-yellow-600" };
    return { level: "High", color: "text-red-600" };
  };

  const riskLevel = getRiskLevel(calculationResult.riskScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Data Valuation Insurance Calculator
        </h1>
        <p className="text-muted-foreground">
          Comprehensive data asset valuation and cyber insurance premium
          assessment for mid-size companies
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
                    placeholder="e.g., TechCorp Solutions"
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
                    Annual Revenue: ₹
                    {formatNumber(formData.annualRevenue / 10000000)} Cr
                  </Label>
                  <Slider
                    value={[formData.annualRevenue / 10000000]}
                    onValueChange={(value) =>
                      updateField("annualRevenue", value[0] * 10000000)
                    }
                    min={1}
                    max={300} // Max ₹300 Cr - realistic for companies needing cyber insurance
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹1 Cr</span>
                    <span>₹300 Cr</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    Market Cap: ₹{formatNumber(formData.marketCap / 10000000)}{" "}
                    Cr
                  </Label>
                  <Slider
                    value={[formData.marketCap / 10000000]}
                    onValueChange={(value) =>
                      updateField("marketCap", value[0] * 10000000)
                    }
                    min={5}
                    max={1000} // Max ₹1000 Cr - realistic range
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹5 Cr</span>
                    <span>₹1000 Cr</span>
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
                    min={50}
                    max={5000} // Realistic range for companies needing cyber insurance
                    step={25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50</span>
                    <span>5,000</span>
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
                    max={500} // Realistic max for mid-size companies
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Customer Records: {formatNumber(formData.customerRecords)}
                  </Label>
                  <Slider
                    value={[formData.customerRecords / 100000]}
                    onValueChange={(value) =>
                      updateField("customerRecords", value[0] * 100000)
                    }
                    min={1}
                    max={100} // Max 10M customers - realistic for mid-size
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>100K</span>
                    <span>10M</span>
                  </div>
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
                    max={80} // Reduced max - very few companies have 100% sensitive data
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
                    max={25} // Reduced max - crown jewel data is typically small percentage
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="25"
                    max="100" // Realistic max for mid-size companies
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="5"
                    max="50" // Realistic max
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
                      updateField(
                        "patentCount",
                        parseInt(e.target.value || "0"),
                      )
                    }
                    placeholder="15"
                    max="200" // Realistic max for mid-size companies
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="10"
                    max="75" // Realistic max
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
                        parseFloat(e.target.value || "0"),
                      )
                    }
                    placeholder="1200"
                    max="10000" // Realistic max CLV
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="8"
                    max="50" // Realistic max
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="2"
                    max="20" // Realistic max
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="20"
                    max="100" // Realistic max
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
                  max={90} // Most companies won't be 100% data dependent
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hourly Business Interruption Cost (₹ Thousands)</Label>
                  <Input
                    type="number"
                    value={formData.hourlyBusinessInterruptionCost / 1000}
                    onChange={(e) =>
                      updateField(
                        "hourlyBusinessInterruptionCost",
                        parseFloat(e.target.value || "0") * 1000,
                      )
                    }
                    placeholder="50"
                    max="500" // Realistic max for mid-size companies
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="3"
                    max="25" // Realistic max
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="15"
                    max="100" // Realistic max
                  />
                </div>
                <div className="space-y-2">
                  <Label>Backup Restore Time (Hours)</Label>
                  <Input
                    type="number"
                    value={formData.backupRestoreTime}
                    onChange={(e) =>
                      updateField(
                        "backupRestoreTime",
                        parseInt(e.target.value || "0"),
                      )
                    }
                    placeholder="24"
                    max="168" // Max 1 week
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
                      parseFloat(e.target.value || "0") * 10000000,
                    )
                  }
                  placeholder="2"
                  max="20" // Realistic max
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="30"
                    max="200" // Realistic max for mid-size companies
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="5"
                    max="50" // Realistic max
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
                      parseFloat(e.target.value || "0") * 10000000,
                    )
                  }
                  placeholder="1"
                  max="10" // Realistic max
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
                      updateField(
                        "previousBreaches",
                        parseInt(e.target.value || "0"),
                      )
                    }
                    placeholder="0"
                    max="5" // Realistic max
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
                        parseFloat(e.target.value || "0") * 10000000,
                      )
                    }
                    placeholder="0"
                    max="50" // Realistic max for mid-size companies
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
                        parseInt(e.target.value || "0"),
                      )
                    }
                    placeholder="5"
                    max="15" // Realistic max
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Risk Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className={`text-3xl font-bold ${riskLevel.color}`}>
                {calculationResult.riskScore}/100
              </div>
              <div className={`text-lg font-semibold ${riskLevel.color}`}>
                {riskLevel.level} Risk
              </div>
              <div className="text-sm text-muted-foreground">
                Overall Risk Score
              </div>
            </CardContent>
          </Card>

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
                Enhanced coverage for comprehensive protection
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Risk Breakdown */}
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
                <div className="flex justify-between">
                  <span>Data Sensitivity Risk:</span>
                  <span>
                    {formatCurrency(
                      calculationResult.breakdown.dataSensitivityRisk,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Operational Risk:</span>
                  <span>
                    {formatCurrency(
                      calculationResult.breakdown.operationalRisk,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Third Party Risk:</span>
                  <span>
                    {formatCurrency(calculationResult.breakdown.thirdPartyRisk)}
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
            Get Detailed Quote
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
                  <strong>Base Rate:</strong> 2.5% of total data value
                </p>
                <p>
                  <strong>Target Market:</strong> Mid-size companies (₹1-300 Cr
                  revenue, 50-5000 employees)
                </p>
                <p>
                  <strong>Premium Range:</strong> ₹1.5L - ₹1.5Cr annually
                </p>
                <p>
                  <strong>Core Components:</strong> Tangible Data (30%),
                  Business Interruption (25%), Recovery Costs (20%), Strategic
                  Value (10%), Data Sensitivity (10%), Operational Risk (5%)
                </p>
                <p>
                  <strong>Risk Multipliers:</strong> Industry type, company
                  size, previous breaches, regulatory history, geographic
                  factors
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
