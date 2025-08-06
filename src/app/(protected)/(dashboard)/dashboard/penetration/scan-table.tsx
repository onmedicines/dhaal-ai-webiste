// app/penetration-testing/scan-table.tsx
"use client";

import clsx from "clsx";
import { ScanItem } from "./mock-data";
import { severityColor } from "./utils";

export default function ScanTable({
  data,
  onSelect,
}: {
  data: ScanItem[];
  onSelect: (v: ScanItem) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-3 py-2 text-left font-medium">ID</th>
            <th className="px-3 py-2 text-left font-medium">Target</th>
            <th className="px-3 py-2 text-left font-medium">Severity</th>
            <th className="px-3 py-2 text-left font-medium">Status</th>
            <th className="px-3 py-2 text-left font-medium">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <tr
              key={v.id}
              onClick={() => onSelect(v)}
              className="cursor-pointer border-b transition-colors hover:bg-muted/40"
            >
              <td className="px-3 py-2">{v.id}</td>
              <td className="px-3 py-2">{v.target}</td>
              <td className="px-3 py-2">
                <span
                  className={clsx(
                    "mr-1 inline-block h-2 w-2 rounded-full align-middle",
                    severityColor(v.severity),
                  )}
                />
                {v.severity}
              </td>
              <td className="px-3 py-2">{v.status}</td>
              <td className="px-3 py-2">{v.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
