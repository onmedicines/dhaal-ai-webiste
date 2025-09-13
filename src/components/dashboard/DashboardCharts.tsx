"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts";
import type {
  MediaTypeDetection,
  ThreatDistribution,
} from "@/data/dummyDashboard";

interface DashboardChartsProps {
  mediaTypeData: MediaTypeDetection[];
  threatDistribution: ThreatDistribution;
}

// Define proper types for tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color?: string;
    dataKey?: string;
    value?: number;
    name?: string;
  }>;
  label?: string;
}

interface PieTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    payload?: {
      color: string;
    };
  }>;
}

// Custom Tooltip for Bar Chart
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value ?? 0}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Pie Chart
const PieTooltip: React.FC<PieTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm" style={{ color: data.payload?.color }}>
          {`${data.value ?? 0}%`}
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardCharts({
  mediaTypeData,
  threatDistribution,
}: DashboardChartsProps) {
  // Transform data for bar chart
  const barChartData = mediaTypeData.map((item) => ({
    name: item.type,
    detections: item.detections,
    threats: item.threats,
    clean: item.detections - item.threats,
  }));

  // Transform data for pie chart
  const pieChartData = [
    { name: "Malicious", value: threatDistribution.malicious, color: "#ef4444" },
    // {
    //   name: "Tampering",
    //   value: threatDistribution.tampering,
    //   color: "#f59e0b",
    // },
    { name: "Clean", value: threatDistribution.clean, color: "#10b981" },
  ];

  const COLORS = ["#ef4444", "#f59e0b", "#10b981"];

  // Fixed label function with proper typing
  const renderPieLabel = (props: { name?: string; percent?: number }) => {
    const { name, percent } = props;
    return `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`;
  };

  return (
    <>
      {/* Detection by Media Type */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">
            Detection by Media Type
          </CardTitle>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                // className="text-muted-foreground"
                // fontSize={12}
                tick={false}
                axisLine={false}
              />
              <YAxis className="text-muted-foreground" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="clean"
                stackId="a"
                fill="#10b981"
                name="Clean"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="threats"
                stackId="a"
                fill="#ef4444"
                name="Threats"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Threat Distribution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">
            Threat Distribution
          </CardTitle>
          <PieChart className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderPieLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex justify-center mt-4 space-x-6">
            {pieChartData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium">{entry.name}</span>
                <span className="text-sm text-muted-foreground">
                  {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
