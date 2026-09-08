import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { advantages, services } from "./data";
import { InteractiveLink } from "@/components/ui/interactive-hover-button";

export default function Home() {
  return <>
    <section className="hero-wrap"><div className="hero-media">
      <video data-parallax="7" className="desktop-film" autoPlay muted loop playsInline preload="metadata" poster="/media/ephsa-hero-poster.jpg" aria-hidden="true"><source src="/media/ephsa-hero.mp4" type="video/mp4" /></video>
      <video data-parallax="4" className="mobile-film" autoPlay muted loop playsInline preload="metadata" poster="/media/ephsa-hero-mobile-poster.jpg" aria-hidden="true"><source src="/media/ephsa-hero-mobile.mp4" type="video/mp4" /></video><div className="hero-shade" />
      <div className="hero-copy" data-parallax="-4"><p className="descriptor">Environmental · Occupational Health · Compliance</p><h1>Regulatory compliance. Operational execution.</h1><p className="hero-intro">EPHSA bridges the gap between the two through end-to-end environmental risk management solutions.</p><div className="actions"><InteractiveLink href="/contact" text="Request support" /><InteractiveLink href="/services" text="Explore services" variant="glass" /></div></div>
      <div className="hero-proof glass-panel"><span><strong>7</strong> specialist capabilities</span><span><strong>3</strong> specialised founding partners</span><span><strong>1</strong> point of accountability</span></div>
    </div></section>
    <section className="capability-section compact-section"><div className="section-heading-row" data-parallax="-3"><h2>Capability across the full environmental and occupational health lifecycle.</h2><Link className="text-link" href="/services">See every service</Link></div><div className="capability-list" data-parallax="2">{services.map(service => <div className="pop-shell" key={service.slug}><Link href={`/services#${service.slug}`} className="capability-row"><span>{service.title}</span><p>{service.summary}</p><b aria-hidden="true"><ArrowUpRight size={22} strokeWidth={2} /></b></Link></div>)}</div></section>
    <section className="advantage-section compact-section"><div className="section-heading-row" data-parallax="-3"><h2>The EPHSA advantage</h2></div><div className="advantage-grid" data-parallax="3">{advantages.map(item => <div className="pop-shell" key={item.title}><article className="outline-card"><h3>{item.title}</h3><p>{item.text}</p></article></div>)}</div></section>
    <section className="closing-cta compact-section"><div><h2>A single, accountable partner for environmental compliance.</h2><p>From baseline monitoring and workforce training through to certified remediation and legal sign-off.</p></div><InteractiveLink href="/contact" text="Discuss your project" /></section>
  </>;
}
