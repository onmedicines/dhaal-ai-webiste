// app/penetration-testing/vuln-modal.tsx
"use client";

// import { X } from "lucide-react";
import clsx from "clsx";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { ScanItem } from "./mock-data";
import { severityColor } from "./utils";

export default function VulnModal({
  item,
  onClose,
}: {
  item: ScanItem | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader className="mb-4 flex items-center justify-between">
          <DialogTitle className="text-lg font-medium">
            Vulnerability Details
          </DialogTitle>
          {/* <DialogClose asChild>
            <button className="rounded-md p-1 hover:bg-muted">
              <X className="h-5 w-5" />
            </button>
          </DialogClose> */}
        </DialogHeader>

        {item && (
          <div className="space-y-3 text-sm">
            <Row label="ID" value={item.id} />
            <Row label="Target" value={item.target} />
            <Row
              label="Severity"
              value={item.severity}
              dotClass={severityColor(item.severity)}
            />
            <Row label="Status" value={item.status} />
            <Row label="Time" value={item.timestamp} />
            <Block label="Description" text={item.description} />
            <Block label="Remediation" text={item.remediation} />
          </div>
        )}

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <button className="rounded-md bg-primary px-4 py-2 text-primary hover:bg-primary/90">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Row({
  label,
  value,
  dotClass,
}: {
  label: string;
  value: React.ReactNode;
  dotClass?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 font-medium">{label}</div>
      {dotClass ? (
        <>
          <span className={clsx("h-2 w-2 rounded-full", dotClass)} />
          <span>{value}</span>
        </>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}
function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="font-medium">{label}</div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
