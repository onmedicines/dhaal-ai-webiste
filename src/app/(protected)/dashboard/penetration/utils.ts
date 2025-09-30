// app/penetration-testing/utils.ts
export const severityColor = (s: number) =>
  s >= 9
    ? "bg-red-600"
    : s >= 7
      ? "bg-orange-500"
      : s >= 4
        ? "bg-yellow-500"
        : "bg-emerald-500";
