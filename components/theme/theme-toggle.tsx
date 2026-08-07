"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch.
 *
 * Both icons are always rendered and CSS (`dark:`) decides which is visible.
 * That avoids a hydration mismatch without a `mounted` gate: the server has no
 * idea what theme the visitor prefers, but next-themes has already written the
 * class onto <html> before paint, so the right icon shows immediately and the
 * button never shifts or flashes.
 *
 * The label stays state-independent for the same reason.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle light or dark theme"
      title="Toggle light or dark theme"
      className={cn("text-muted-foreground hover:text-gold", className)}
    >
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
    </Button>
  );
}
