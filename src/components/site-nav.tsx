"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radar } from "lucide-react";
import { cn } from "@/lib/utils";

const ROUTES = [
  { href: "/", label: "Risk Index" },
  { href: "/regulations", label: "Foreign Investment" },
  { href: "/political", label: "Political Landscape" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-surface-2 ring-1 ring-border">
            <Radar className="h-4 w-4 text-accent" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Korea<span className="text-kr">Reg</span>Radar
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {ROUTES.map((r) => {
            const active = r.href === "/" ? pathname === "/" : pathname.startsWith(r.href);
            return (
              <Link
                key={r.href}
                href={r.href}
                className={cn(
                  "rounded-md px-3 py-1.5 transition-colors",
                  active
                    ? "bg-surface-2 text-text"
                    : "text-muted hover:bg-surface hover:text-text",
                )}
              >
                {r.label}
              </Link>
            );
          })}
        </nav>

        <span className="ml-auto hidden items-center gap-2 text-xs text-muted sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-regcon-5" />
          <span className="tabular">Republic of Korea · EN</span>
        </span>
      </div>
    </header>
  );
}
