import {
  Building,
  Building2,
  CalendarCheck,
  CalendarRange,
  Camera,
  CircleHelp,
  Clapperboard,
  ClipboardCheck,
  Code2,
  Compass,
  Feather,
  Gauge,
  Gem,
  Home,
  LayoutTemplate,
  LineChart,
  Lock,
  MonitorSmartphone,
  Palmtree,
  PenTool,
  QrCode,
  RefreshCw,
  Rocket,
  Search,
  ServerCog,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TicketCheck,
  TrendingUp,
  Zap,
  type LucideProps,
} from "lucide-react";

/**
 * Explicit registry — NOT `import * as Lucide`.
 *
 * Content files store icon names as strings because a React component cannot be
 * serialized across a Server → Client props boundary. Listing the icons by name
 * keeps tree-shaking intact; a namespace import would pull all ~1500 icons.
 */
const registry = {
  Building,
  Building2,
  CalendarCheck,
  CalendarRange,
  Camera,
  Clapperboard,
  ClipboardCheck,
  Code2,
  Compass,
  Feather,
  Gauge,
  Gem,
  Home,
  LayoutTemplate,
  LineChart,
  Lock,
  MonitorSmartphone,
  Palmtree,
  PenTool,
  QrCode,
  RefreshCw,
  Rocket,
  Search,
  ServerCog,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TicketCheck,
  TrendingUp,
  Zap,
} satisfies Record<string, React.ComponentType<LucideProps>>;

export type RegisteredIcon = keyof typeof registry;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = registry[name as RegisteredIcon] ?? CircleHelp;
  return <Component aria-hidden="true" {...props} />;
}
