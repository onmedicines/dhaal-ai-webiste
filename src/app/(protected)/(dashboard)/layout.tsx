"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/spinner";
import SidebarIndividual from "@/components/dashboard/individual/SidebarIndividual";
import SidebarBusiness from "@/components/dashboard/business/SidebarBusiness";
import Topbar from "@/components/dashboard/Topbar";
import { UserProvider } from "@/hooks/useUser";
import { UserType } from "@/types/User";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.replace("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("authToken");
            router.replace("/login");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Profile response:", data);

        // Handle the specific structure from your backend
        if (data.success && data.data && data.data.user) {
          const userData = data.data.user;

          // Map the backend response to your frontend User type
          const mappedUser: UserType = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            isActive: userData.isActive,
            lastLogin: userData.lastLogin,
            detectionsCount: userData.detectionsCount || 0,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            // avatarUrl is optional and not provided by backend
            avatarUrl: undefined,
          };

          setUser(mappedUser);
        } else {
          // Handle unsuccessful response or missing data
          throw new Error(data.message || "Invalid user data received");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load user data",
        );

        // If it's an authentication error, redirect to login
        if (error instanceof Error && error.message.includes("401")) {
          localStorage.removeItem("authToken");
          router.replace("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  // Check if user account is inactive
  useEffect(() => {
    if (user && !user.isActive) {
      setError("Your account is inactive. Please contact support.");
    }
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                router.push("/login");
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Unable to load user data.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <UserProvider user={user}>
      <div className="flex h-screen bg-muted/40 overflow-hidden">
        <div className="flex-shrink-0">
          {user.role === "individual" && <SidebarIndividual user={user} />}
          {user.role === "business" && <SidebarBusiness user={user} />}
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-shrink-0">
            <Topbar user={user} />
          </div>

          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </UserProvider>
  );
}
