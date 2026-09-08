"use client";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { InteractiveLink } from "@/components/ui/interactive-hover-button";

const links = [["/", "Home"], ["/services", "Services"], ["/solutions", "Solutions"], ["/about", "About"], ["/contact", "Contact"]] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.location.assign(href);
  };
  return <div className="site-shell">
    <header className="desktop-header glass-header">
      <a className="brand" href="/" onClick={(event) => navigate(event, "/")} aria-label="EPHSA home"><img src="/ephsa-logo.png" alt="EPHSA" /></a>
      <nav className="glass-nav" aria-label="Primary navigation">{links.map(([href, label]) => <a key={href} className={isActive(href) ? "active" : ""} href={href} onClick={(event) => navigate(event, href)}>{label}</a>)}</nav>
      <InteractiveLink className="header-cta" href="/contact" text="Request support" variant="green" />
    </header>
    <main>{children}</main>
    <footer className="footer"><div><img src="/ephsa-logo.png" alt="EPHSA" /><p>Environmental protection, occupational health and compliance.</p></div><nav aria-label="Footer navigation">{links.slice(1).map(([href, label]) => <a key={href} href={href}>{label}</a>)}<a href="/downloads/ephsa-company-profile.pdf" target="_blank" rel="noreferrer">Company profile</a></nav><p className="footer-note">© {new Date().getFullYear()} EPHSA. All rights reserved.</p></footer>
    <nav className="mobile-dock" aria-label="Primary mobile navigation">
      <a className="mobile-brand" href="/" onClick={(event) => navigate(event, "/")} aria-label="EPHSA home"><img src="/ephsa-logo.png" alt="EPHSA" /></a>
      <div className="mobile-links">{links.map(([href, label]) => <a key={href} className={isActive(href) ? "active" : ""} href={href} onClick={(event) => navigate(event, href)}>{label}</a>)}</div>
    </nav>
  </div>;
}
