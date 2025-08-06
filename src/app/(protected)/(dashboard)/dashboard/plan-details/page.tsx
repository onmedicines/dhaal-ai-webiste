"use client";

import React, { useState } from "react";
import {
  Shield,
  Search,
  FileText,
  CheckCircle,
  Clock,
  Mail,
  User,
  Building2,
  DollarSign,
  TrendingUp,
  Lock,
  Heart,
  RefreshCw,
} from "lucide-react";
import { PolicyType } from "@/types/Policy";
import { dummyPolicy } from "@/data/dummyPolicy";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const InsuranceTrackingDashboard: React.FC = () => {
  const policies: PolicyType[] = dummyPolicy;

  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "expired":
        return "text-red-600 bg-red-50";
      case "cancelled":
        return "text-muted-foreground bg-muted";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "cyber":
        return Shield;
      case "professional":
        return User;
      case "directors":
        return Building2;
      case "general":
        return Heart;
      case "crime":
        return Lock;
      default:
        return FileText;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const handlePolicyClick = (policy: PolicyType) => {
    setSelectedPolicy(policy);
    setIsDialogOpen(true);
  };

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || policy.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPremium = policies.reduce(
    (sum, policy) => sum + policy.premium,
    0,
  );
  const activePolicies = policies.filter((p) => p.status === "active").length;
  const pendingRenewals = policies.filter((p) => {
    const endDate = new Date(p.endDate);
    const today = new Date();
    const thirtyDaysLater = new Date(
      today.getTime() + 30 * 24 * 60 * 60 * 1000,
    );
    return endDate <= thirtyDaysLater && p.status === "active";
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Insurance Tracking Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage and track all your insurance policies in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Policies</p>
                <p className="text-2xl font-bold text-foreground">
                  {activePolicies}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Premium</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalPremium)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Renewals</p>
                <p className="text-2xl font-bold text-foreground">
                  {pendingRenewals}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Coverage</p>
                <p className="text-2xl font-bold text-foreground">
                  ₹
                  {(
                    policies.reduce((sum, p) => sum + p.coverage, 0) / 10000000
                  ).toFixed(1)}
                  Cr
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policies List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Policies</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredPolicies.map((policy) => {
              const Icon = getTypeIcon(policy.type);
              return (
                <div
                  key={policy.id}
                  onClick={() => handlePolicyClick(policy)}
                  className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {policy.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className={getStatusColor(policy.status)}
                          >
                            {policy.status.charAt(0).toUpperCase() +
                              policy.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Policy ID: {policy.id}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Premium:{" "}
                            <span className="font-medium text-foreground">
                              {formatCurrency(policy.premium)}
                            </span>
                          </span>
                          <span className="text-muted-foreground">
                            Coverage:{" "}
                            <span className="font-medium text-foreground">
                              ₹{(policy.coverage / 100000).toFixed(0)}L
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">
                        Expires {formatDate(policy.endDate)}
                      </div>
                      <div
                        className={`text-sm font-medium ${getRiskColor(policy.riskScore)}`}
                      >
                        {policy.riskScore.toUpperCase()} RISK
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Policy Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedPolicy && (
                <>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    {React.createElement(getTypeIcon(selectedPolicy.type), {
                      className: "w-5 h-5 text-white",
                    })}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      {selectedPolicy.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-normal">
                      {selectedPolicy.provider}
                    </p>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedPolicy && (
            <div className="space-y-6">
              {/* Policy Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Policy Status
                    </Label>
                    <Badge
                      variant="outline"
                      className={`mt-1 ${getStatusColor(selectedPolicy.status)}`}
                    >
                      {selectedPolicy.status.charAt(0).toUpperCase() +
                        selectedPolicy.status.slice(1)}
                    </Badge>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Annual Premium
                    </Label>
                    <div className="text-2xl font-bold text-primary">
                      {formatCurrency(selectedPolicy.premium)}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Coverage Amount
                    </Label>
                    <div className="text-xl font-semibold text-foreground">
                      ₹{(selectedPolicy.coverage / 100000).toFixed(0)}L
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Coverage Period
                    </Label>
                    <div className="text-foreground font-medium">
                      {formatDate(selectedPolicy.startDate)} -{" "}
                      {formatDate(selectedPolicy.endDate)}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Policy ID
                    </Label>
                    <div className="text-foreground font-medium">
                      {selectedPolicy.id}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Risk Level
                    </Label>
                    <div
                      className={`font-medium ${getRiskColor(selectedPolicy.riskScore)}`}
                    >
                      {selectedPolicy.riskScore.toUpperCase()} RISK
                    </div>
                  </div>
                </div>
              </div>

              {/* Claims Usage */}
              {selectedPolicy.status === "active" && (
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Claims Usage
                  </Label>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(selectedPolicy.claimsUsed / selectedPolicy.claimsLimit) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedPolicy.claimsUsed}/{selectedPolicy.claimsLimit}
                    </span>
                  </div>
                </div>
              )}

              {/* Coverage Benefits */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">
                  Coverage Benefits
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedPolicy.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auto-Renewal Status */}
              {selectedPolicy.status === "active" && (
                <div
                  className={`rounded-xl p-4 ${
                    selectedPolicy.autoRenew
                      ? "bg-green-50 border border-green-200"
                      : "bg-yellow-50 border border-yellow-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <RefreshCw
                      className={`w-5 h-5 ${
                        selectedPolicy.autoRenew
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    />
                    <h4
                      className={`font-semibold ${
                        selectedPolicy.autoRenew
                          ? "text-green-800"
                          : "text-yellow-800"
                      }`}
                    >
                      Auto-Renewal
                    </h4>
                  </div>
                  <p
                    className={`text-sm ${
                      selectedPolicy.autoRenew
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {selectedPolicy.autoRenew
                      ? "Your policy will automatically renew on the expiry date."
                      : "Auto-renewal is disabled. You'll need to manually renew this policy."}
                  </p>
                  {selectedPolicy.nextPayment && (
                    <div
                      className={`text-xs mt-2 ${
                        selectedPolicy.autoRenew
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      Next payment: {formatDate(selectedPolicy.nextPayment)}
                    </div>
                  )}
                </div>
              )}

              {/* Quick Actions */}
              <div className="">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsuranceTrackingDashboard;
