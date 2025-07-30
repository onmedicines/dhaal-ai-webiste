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
      // TODO: Replace this with real user fetch/decode logic
      // Simulate fetching user info based on token
      const storedUser = localStorage.getItem("user"); // for example
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // fallback or fetch from API instead
        setUser({
          name: "John Doe",
          email: "john.doe@example.com",
          role: "individual", // or "business"
          avatarUrl: "https://i.pravatar.cc/150?img=12",
        });
      }
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <div>Unable to load user data.</div>;
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      {user.role === "individual" && <SidebarIndividual user={user} />}
      {user.role === "business" && <SidebarBusiness user={user} />}
      <div className="flex-1 flex flex-col">
        <Topbar user={user} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
