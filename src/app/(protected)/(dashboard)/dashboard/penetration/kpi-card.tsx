// app/penetration-testing/kpi-card.tsx
"use client";

import { ReactNode } from "react";

export default function KpiCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-md border bg-background p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
        {icon}
      </div>
      <div>
        <div className="text-xl font-semibold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
