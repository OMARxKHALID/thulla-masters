import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050512] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-yellow-400 animate-spin opacity-80" />
        <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.3em] animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
