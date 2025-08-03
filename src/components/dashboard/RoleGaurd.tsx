"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

type UserRole = "individual" | "business";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
  user?: {
    role: UserRole;
    name: string;
  } | null;
}

export default function RoleGuard({
  children,
  allowedRoles,
  fallbackPath = "/dashboard",
  user,
}: RoleGuardProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // If no user data, redirect to login
      router.replace("/login");
      return;
    }

    if (allowedRoles.includes(user.role)) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [user, allowedRoles, router]);

  // Loading state
  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Unauthorized state
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-xl">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You don not have permission to access this page. This page is only
              available for{" "}
              <span className="font-semibold">
                {allowedRoles.join(" and ")} users
              </span>
              .
            </p>
            <p className="text-sm text-muted-foreground">
              Your current role:{" "}
              <span className="font-semibold capitalize">{user?.role}</span>
            </p>
            <div className="space-y-2">
              <Button
                onClick={() => router.push(fallbackPath)}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/settings")}
                className="w-full"
              >
                Account Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authorized - render children
  return <>{children}</>;
}
