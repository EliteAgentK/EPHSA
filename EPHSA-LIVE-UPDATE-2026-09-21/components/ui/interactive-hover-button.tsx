"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveLink({ href, text, variant = "green", className }: { href: string; text: string; variant?: "green" | "glass" | "navy"; className?: string }) {
  return <a href={href} className={cn("interactive-link", `interactive-link--${variant}`, className)}>
    <span className="interactive-link__label">{text}</span>
    <span className="interactive-link__active"><span>{text}</span><ArrowUpRight size={18} strokeWidth={2} /></span>
    <span className="interactive-link__fill" aria-hidden="true" />
  </a>;
}
