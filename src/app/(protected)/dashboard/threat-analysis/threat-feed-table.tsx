// app/threat-analysis/threat-feed-table.tsx
"use client";

import clsx from "clsx";
import { severityColor } from "./utils";
import { ThreatFeedItem } from "./mock-data";

export default function ThreatFeedTable({
  data,
  onSelect,
}: {
  data: ThreatFeedItem[];
  onSelect: (t: ThreatFeedItem) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-3 py-2 text-left font-medium">ID</th>
            <th className="px-3 py-2 text-left font-medium">Source</th>
            <th className="px-3 py-2 text-left font-medium">Type</th>
            <th className="px-3 py-2 text-left font-medium">Severity</th>
            <th className="px-3 py-2 text-left font-medium">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr
              key={t.id}
              className="cursor-pointer border-b transition-colors hover:bg-muted/40"
              onClick={() => onSelect(t)}
            >
              <td className="px-3 py-2">{t.id}</td>
              <td className="px-3 py-2">{t.source}</td>
              <td className="px-3 py-2">{t.type}</td>
              <td className="px-3 py-2">
                <span
                  className={clsx(
                    "mr-1 inline-block h-2 w-2 rounded-full align-middle",
                    severityColor(t.severity),
                  )}
                />
                {t.severity}
              </td>
              <td className="px-3 py-2">{t.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
