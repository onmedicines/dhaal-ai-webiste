import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // optional utility for conditional classNames

const Loader = ({
  className,
  height = "min-h-full", // default to min-h-full
}: {
  className?: string;
  height?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        height, // applies the height prop
        className,
      )}
    >
      <Loader2
        className="h-16 w-16 text-primary/60 animate-spin"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loader;
