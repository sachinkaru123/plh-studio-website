import type { ProcessStep } from "@/types/content";

export const processSteps: readonly ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    blurb:
      "We learn your property, your guests, and the numbers your current site is leaving on the table.",
    icon: "Compass",
  },
  {
    index: "02",
    title: "Design",
    blurb:
      "Art direction and interface design that carry your brand rather than a template's.",
    icon: "PenTool",
  },
  {
    index: "03",
    title: "Develop",
    blurb:
      "Scalable front-end and booking integration, built to load fast on every device.",
    icon: "Code2",
  },
  {
    index: "04",
    title: "Test",
    blurb:
      "Cross-device QA, accessibility review, and a full pass through the reservation flow.",
    icon: "ClipboardCheck",
  },
  {
    index: "05",
    title: "Launch",
    blurb:
      "Migration, redirects, and monitoring — deployed without losing your search equity.",
    icon: "Rocket",
  },
  {
    index: "06",
    title: "Grow",
    blurb:
      "Ongoing optimisation against real booking data, month after month.",
    icon: "LineChart",
  },
];
