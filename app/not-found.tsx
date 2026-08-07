import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/visuals/aurora-background";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[70vh] place-items-center overflow-hidden px-6 py-32">
      <AuroraBackground />
      <div className="text-center">
        <p className="text-gold-gradient text-7xl font-extrabold tracking-tight sm:text-8xl">
          404
        </p>
        <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
          This page checked out.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button asChild size="lg" className="mt-8 group">
          <Link href="/">
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to home
          </Link>
        </Button>
      </div>
    </section>
  );
}
