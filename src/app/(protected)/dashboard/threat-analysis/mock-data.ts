// app/threat-analysis/mock-data.ts
export type ThreatFeedItem = {
  id: string;
  source: string;
  type: string;
  description: string;
  severity: number; // 1-10
  timestamp: string; // ISO or readable string
  mitigation: string;
};

export const threatFeed: ThreatFeedItem[] = [
  {
    id: "T-1001",
    source: "Dark Web Monitor",
    type: "Credential Leak",
    description: "Corporate email/password pair for sale",
    severity: 8.6,
    timestamp: "2025-08-05 09:02 UTC",
    mitigation: "Force password reset, enable MFA",
  },
  {
    id: "T-1002",
    source: "Network IDS",
    type: "Port Scan",
    description: "Mass scan from 185.199.110.153",
    severity: 4.1,
    timestamp: "2025-08-05 09:10 UTC",
    mitigation: "Block IP, investigate ingress logs",
  },
  {
    id: "T-1003",
    source: "CrowdStrike",
    type: "Malware",
    description: "Emotet binary quarantined on host WS-23",
    severity: 9.2,
    timestamp: "2025-08-05 08:55 UTC",
    mitigation: "Isolate host, run full AV scan",
  },
  {
    id: "T-1004",
    source: "Email Gateway",
    type: "Phishing",
    description: "Suspicious invoice mail blocked",
    severity: 5.8,
    timestamp: "2025-08-05 08:47 UTC",
    mitigation: "User awareness training, DMARC review",
  },
];

export const threatsOverTime = [
  { date: "Jul 06", count: 12 },
  { date: "Jul 13", count: 19 },
  { date: "Jul 20", count: 14 },
  { date: "Jul 27", count: 22 },
  { date: "Aug 03", count: 17 },
];

export const threatTypeBreakdown = [
  { name: "Malware", value: 32 },
  { name: "Phishing", value: 20 },
  { name: "Credential Leak", value: 15 },
  { name: "Port Scan", value: 25 },
  { name: "DDoS", value: 8 },
];
