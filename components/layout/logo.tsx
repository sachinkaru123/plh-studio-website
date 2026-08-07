import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    // 410x137 is the artwork's true size — the source PNG was a 500x500 canvas
    // that was 73% transparent padding, which made every height class render a
    // small logo floating in a huge empty box.
    <Image
      src="/logo.png"
      alt="PLH Studio"
      width={410}
      height={137}
      priority
      className={cn("h-12 w-auto sm:h-14", className)}
    />
  );
}
