"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { useFinePointer } from "@/hooks/use-fine-pointer";
import { cn } from "@/lib/utils";

/** 3D tilt on pointer move. Falls back to a plain container on touch. */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 180, damping: 20, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [max, -max]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-max, max]),
    springConfig,
  );

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  if (!finePointer) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
