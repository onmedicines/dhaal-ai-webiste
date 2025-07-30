import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // optional utility for conditional classNames

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2
        className={cn("h-16 w-16 text-primary/60 animate-spin", className)}
        aria-label="Loading"
      />
    </div>
  );
};

export default Loader;
