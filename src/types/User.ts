export type UserType = {
  id: string;
  name: string;
  email: string;
  role: "individual" | "business";
  isActive: boolean;
  lastLogin: string | null;
  detectionsCount: number;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string; // Optional field not in backend
};
