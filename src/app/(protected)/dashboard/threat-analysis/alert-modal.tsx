// app/threat-analysis/alert-modal.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import clsx from "clsx";
import { ThreatFeedItem } from "./mock-data";
import { severityColor } from "./utils";

export default function AlertModal({
  item,
  onClose,
}: {
  item: ThreatFeedItem | null;
  onClose: () => void;
}) {
  return (
    <Dialog.Root open={!!item} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium">
              Threat Details
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-1 hover:bg-muted">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {item && (
            <div className="space-y-3 text-sm">
              <Detail label="ID" value={item.id} />
              <Detail label="Source" value={item.source} />
              <Detail label="Type" value={item.type} />
              <Detail
                label="Severity"
                value={item.severity}
                dotClass={severityColor(item.severity)}
              />
              <Detail label="Time" value={item.timestamp} />
              <Block label="Description" text={item.description} />
              <Block label="Mitigation" text={item.mitigation} />
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Dialog.Close className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Detail({
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
