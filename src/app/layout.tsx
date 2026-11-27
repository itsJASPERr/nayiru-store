import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/cinzel";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "NAYIRU", template: "%s · NAYIRU" },
  description:
    "Artesanía, memoria y cultura viva. Explora las colecciones de NAYIRU.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
