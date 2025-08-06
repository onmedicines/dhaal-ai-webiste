// app/penetration-testing/mock-data.ts
export type ScanItem = {
  id: string;
  target: string;
  severity: number; // 1-10
  status: "Open" | "Fixed" | "Ignored";
  timestamp: string;
  description: string;
  remediation: string;
};

export const scanFeed: ScanItem[] = [
  {
    id: "VULN-3012",
    target: "api.prod.dhaalai.com",
    severity: 9.1,
    status: "Open",
    timestamp: "2025-08-05 09:05 UTC",
    description: "SQL injection in /v1/orders endpoint",
    remediation: "Parameterize queries, add WAF rule",
  },
  {
    id: "VULN-3013",
    target: "mobile-app-ios",
    severity: 6.4,
    status: "Open",
    timestamp: "2025-08-05 08:50 UTC",
    description: "Insecure TLS version accepted",
    remediation: "Enforce TLS 1.3, drop 1.1/1.0",
  },
  {
    id: "VULN-3014",
    target: "s3://public-assets",
    severity: 4.2,
    status: "Fixed",
    timestamp: "2025-08-04 16:22 UTC",
    description: "Bucket listed as public-read",
    remediation: "Remove public ACL, enable Block Public Access",
  },
  {
    id: "VULN-3015",
    target: "k8s-cluster-prod",
    severity: 8.3,
    status: "Open",
    timestamp: "2025-08-04 12:11 UTC",
    description: "Privilege escalation via hostPath",
    remediation: "Restrict hostPath, enable PSP/OPA policies",
  },
];

export const scansOverTime = [
  { date: "Jul 06", count: 5 },
  { date: "Jul 13", count: 11 },
  { date: "Jul 20", count: 7 },
  { date: "Jul 27", count: 14 },
  { date: "Aug 03", count: 9 },
];

export const severityBreakdown = [
  { name: "Critical", value: 6 },
  { name: "High", value: 10 },
  { name: "Medium", value: 14 },
  { name: "Low", value: 9 },
];
