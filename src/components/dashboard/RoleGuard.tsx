"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type UserRole = "individual" | "business" | "admin";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

export default function RoleGuard({
  children,
  allowedRoles,
  fallbackPath = "/login",
}: RoleGuardProps) {
  const router = useRouter();

  useEffect(() => {
    // Get user from localStorage or your auth context
    const userData = localStorage.getItem("user");

    if (!userData) {
      router.replace(fallbackPath);
      return;
    }

    try {
      const user = JSON.parse(userData);

      if (!allowedRoles.includes(user.role)) {
        // Redirect to unauthorized page or dashboard root
        router.replace("/dashboard/overview");
        return;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.replace(fallbackPath);
    }
  }, [allowedRoles, fallbackPath, router]);

  return <>{children}</>;
}
