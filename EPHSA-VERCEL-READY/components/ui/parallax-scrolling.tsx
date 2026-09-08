"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function ParallaxSystem({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileLayout = window.matchMedia("(max-width: 900px)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = mobileLayout ? null : new Lenis({ duration: 1.05, smoothWheel: true });
    const update = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
    }

    const context = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
        const distance = Number(element.dataset.parallax ?? 8);
        const anchoredMobileElement = mobileLayout && (element.classList.contains("hero-copy") || element.classList.contains("hero-proof"));
        if (anchoredMobileElement) return;
        const isVisualLayer = element.matches("video, .page-hero-image");
        const mobileScale = isVisualLayer ? 0.75 : 0.32;
        const effectiveDistance = mobileLayout ? distance * mobileScale : distance;
        gsap.fromTo(element, { yPercent: -effectiveDistance / 2 }, {
          yPercent: effectiveDistance / 2,
          ease: "none",
          scrollTrigger: { trigger: element.closest("section") ?? element, start: "top bottom", end: "bottom top", scrub: 0.65 },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    });

    return () => {
      context.revert();
      if (lenis) {
        gsap.ticker.remove(update);
        lenis.destroy();
      }
    };
  }, []);

  return children;
}
