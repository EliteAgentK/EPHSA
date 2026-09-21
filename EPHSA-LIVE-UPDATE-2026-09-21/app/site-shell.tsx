"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { InteractiveLink } from "@/components/ui/interactive-hover-button";

const links = [["/", "Home"], ["/services", "Services"], ["/solutions", "Solutions"], ["/about", "About"], ["/contact", "Contact"]] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return <div className="site-shell">
    <header className="desktop-header glass-header">
      <Link className="brand" href="/" aria-label="EPHSA home"><Image src="/ephsa-logo.png" alt="EPHSA" width={320} height={120} priority /></Link>
      <nav className="glass-nav" aria-label="Primary navigation">{links.map(([href, label]) => <Link key={href} className={isActive(href) ? "active" : ""} href={href}>{label}</Link>)}</nav>
      <InteractiveLink className="header-cta" href="/contact" text="Request support" variant="green" />
    </header>
    <main>{children}</main>
    <footer className="footer"><div><Image src="/ephsa-logo.png" alt="EPHSA" width={320} height={120} /><p>Environmental protection, occupational health and compliance.</p><p className="footer-accreditation">Sampling and analysis through SANAS-accredited laboratories.</p></div><nav aria-label="Footer navigation">{links.slice(1).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<a href="/downloads/ephsa-company-profile.pdf" target="_blank" rel="noreferrer">Company profile</a></nav><p className="footer-note">© {new Date().getFullYear()} EPHSA. All rights reserved.</p></footer>
    <nav className="mobile-dock" aria-label="Primary mobile navigation">
      <Link className="mobile-brand" href="/" aria-label="EPHSA home"><Image src="/ephsa-logo.png" alt="EPHSA" width={160} height={70} /></Link>
      <div className="mobile-links">{links.map(([href, label]) => <Link key={href} className={isActive(href) ? "active" : ""} href={href}>{label}</Link>)}</div>
    </nav>
  </div>;
}
