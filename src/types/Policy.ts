// export interface PolicyType {
//   id: string;
//   name: string;
//   type: "cyber" | "professional" | "directors" | "general" | "crime";
//   status: "active" | "pending" | "expired" | "cancelled";
//   premium: number;
//   coverage: number;
//   startDate: string;
//   endDate: string;
//   purchaseDate: string;
//   claimsUsed: number;
//   claimsLimit: number;
//   documents: string[];
//   nextPayment?: string;
//   autoRenew: boolean;
//   riskScore: "low" | "medium" | "high";
//   provider: string;
//   benefits: string[];
// }
export interface PolicyType {
  id: string;
  name: string;
  type: "cyber" | "professional" | "directors" | "general" | "crime";
  status: "active" | "pending" | "expired" | "cancelled";
  premium: number;
  coverage: number;
  startDate: string;
  endDate: string;
  purchaseDate: string;
  claimsUsed: number;
  claimsLimit: number;
  documents: string[];
  nextPayment?: string;
  autoRenew: boolean;
  riskScore: "low" | "medium" | "high";
  provider: string;
  benefits: string[];
}
