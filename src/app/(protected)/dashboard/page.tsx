"use client";
import { useUser } from "@/app/(protected)/layout";
import { useRouter } from "next/navigation";
import IMain from "@/components/dashboard/individual/Main";
import BMain from "@/components/dashboard/business/Main";

export default function DashboardPage() {
  const user = useUser();
  const router = useRouter();
  if (!user) {
    return router.push("/login");
  }

  if (user.role === "individual") {
    return <IMain />;
  }

  if (user.role === "business") {
    return <BMain />;
  }

  localStorage.removeItem("authToken");
  router.replace("/login");

  return (
    <div>
      <p>The role is not recognized. please login again</p>
    </div>
  );
}
