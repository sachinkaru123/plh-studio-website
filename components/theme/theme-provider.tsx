"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme root.
 *
 * `defaultTheme="system"` + `enableSystem` means a first-time visitor gets
 * whatever their OS is set to, and keeps following it until they press the
 * toggle — at which point the choice is pinned in localStorage.
 *
 * next-themes injects a tiny blocking script that writes the `dark` class onto
 * <html> before first paint, so there is no flash of the wrong theme. That works
 * under `output: "export"` because it runs entirely client-side.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
