"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/spinner";
import SidebarIndividual from "@/components/dashboard/SidebarIndividual";
import SidebarBusiness from "@/components/dashboard/SidebarBusiness";
import Topbar from "@/components/dashboard/Topbar";

type User = {
  name: string;
  email: string;
  role: "individual" | "business";
  avatarUrl?: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.replace("/login");
    } else {
      const user = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        console.log(data);
        setUser(data.data.user);
      };
      user();
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <div>Unable to load user data.</div>;
  }

  return (
    <div className="flex h-screen bg-muted/40 overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="flex-shrink-0">
        {user.role === "individual" && <SidebarIndividual user={user} />}
        {user.role === "business" && <SidebarBusiness user={user} />}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Fixed Topbar */}
        <div className="flex-shrink-0">
          <Topbar user={user} />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
