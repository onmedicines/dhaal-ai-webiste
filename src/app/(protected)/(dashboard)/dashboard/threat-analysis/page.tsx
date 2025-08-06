// app/threat-analysis/page.tsx
"use client";

import { useState, useMemo, Fragment } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ShieldAlert, Activity, Bell, BarChart3 } from "lucide-react";

import KpiCard from "./kpi-card";
import ThreatFeedTable from "./threat-feed-table";
import AlertModal from "./alert-modal";
import {
  threatFeed,
  threatsOverTime,
  threatTypeBreakdown,
  ThreatFeedItem,
} from "./mock-data";

export default function ThreatAnalysisPage() {
  const [selected, setSelected] = useState<ThreatFeedItem | null>(null);

  const avgSeverity = useMemo(
    () =>
      (
        threatFeed.reduce((sum, t) => sum + t.severity, 0) / threatFeed.length
      ).toFixed(1),
    [],
  );

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <ShieldAlert className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Threat Analysis</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* KPIs */}
        <KpiCard
          icon={<Activity className="h-5 w-5" />}
          label="Open Alerts"
          value={threatFeed.length}
        />
        <KpiCard
          icon={<Bell className="h-5 w-5" />}
          label="Avg. Severity"
          value={avgSeverity}
        />
        <KpiCard
          icon={<BarChart3 className="h-5 w-5" />}
          label="30-Day Threats"
          value={threatsOverTime.reduce((a, v) => a + v.count, 0)}
        />

        {/* Feed */}
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-lg font-medium">Real-time Threat Feed</h2>
          <ThreatFeedTable data={threatFeed} onSelect={setSelected} />
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <ChartCard title="Threats Over Time (5 w)">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={threatsOverTime}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#4f46e5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Threat Type Breakdown">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={threatTypeBreakdown}
                  outerRadius={56}
                  innerRadius={40}
                  paddingAngle={0}
                  label
                >
                  {threatTypeBreakdown.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"][
                          i % 5
                        ]
                      }
                    />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Modal */}
      <AlertModal item={selected} onClose={() => setSelected(null)} />
    </Fragment>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border bg-background p-4">
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      <div className="h-48">{children}</div>
    </div>
  );
}
