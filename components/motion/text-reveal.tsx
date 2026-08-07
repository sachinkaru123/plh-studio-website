"use client";

import { motion } from "motion/react";
import { EASE_LUXE } from "@/lib/motion";

/**
 * Per-word blur reveal for hero headlines.
 *
 * Accessibility: the complete string is rendered once in an `sr-only` node and
 * the animated word spans are `aria-hidden`, so a screen reader reads one clean
 * sentence rather than one word per element.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline-block"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block whitespace-pre"
            variants={{
              hidden: { opacity: 0, y: "0.4em", filter: "blur(12px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.9, ease: EASE_LUXE },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
