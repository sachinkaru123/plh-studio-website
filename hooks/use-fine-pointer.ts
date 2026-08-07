"use client";

import { useEffect, useState } from "react";

/**
 * True when the device has a precise pointer (mouse/trackpad).
 *
 * Starts `false` so the server-rendered HTML and the first client render agree —
 * hover-only embellishments then switch on after mount.
 */
export function useFinePointer() {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return finePointer;
}
