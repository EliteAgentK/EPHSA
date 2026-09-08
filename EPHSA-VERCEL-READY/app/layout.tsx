import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "./site-shell";
import { ParallaxSystem } from "@/components/ui/parallax-scrolling";

export const metadata: Metadata = {
  title: "EPHSA — Environmental, Occupational Health & Compliance",
  description: "End-to-end environmental risk management for heavy industry, maritime logistics and state-owned enterprises.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><ParallaxSystem><SiteShell>{children}</SiteShell></ParallaxSystem></body>
    </html>
  );
}
