// app/penetration-testing/page.tsx
"use client";

import { Fragment, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { ShieldCheck, Bug, CircleAlert, BarChart3 } from "lucide-react";

import KpiCard from "./kpi-card";
import ScanTable from "./scan-table";
import VulnModal from "./vuln-modal";
import {
  scanFeed,
  scansOverTime,
  severityBreakdown,
  ScanItem,
} from "./mock-data";

export default function PenTestPage() {
  const [selected, setSelected] = useState<ScanItem | null>(null);

  /* derived stats */
  const openCount = scanFeed.filter((v) => v.status === "Open").length;
  const avgSeverity = useMemo(
    () =>
      (scanFeed.reduce((s, v) => s + v.severity, 0) / scanFeed.length).toFixed(
        1,
      ),
    [],
  );

  return (
    <Fragment>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Penetration Testing</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <KpiCard
          icon={<Bug className="h-5 w-5" />}
          label="Open Findings"
          value={openCount}
        />
        <KpiCard
          icon={<CircleAlert className="h-5 w-5" />}
          label="Avg. Severity"
          value={avgSeverity}
        />
        <KpiCard
          icon={<BarChart3 className="h-5 w-5" />}
          label="30-Day Scans"
          value={scansOverTime.reduce((a, v) => a + v.count, 0)}
        />

        {/* Table */}
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-lg font-medium">Latest Vulnerabilities</h2>
          <ScanTable data={scanFeed} onSelect={setSelected} />
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <ChartCard title="Findings Over Time (5 w)">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scansOverTime}>
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

          <ChartCard title="Severity Breakdown">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityBreakdown}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Modal */}
      <VulnModal item={selected} onClose={() => setSelected(null)} />
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
