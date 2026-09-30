import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "OBLIQUE // Digital Craft & Computational Atelier",
  description:
    "An independent digital craft studio engineering high-fidelity spatial web experiences, procedural shaders, and kinetic typography.",
  keywords: [
    "digital craft",
    "creative development",
    "three.js",
    "webgl",
    "awwwards",
    "fwa",
    "computational design",
    "gsap"
  ],
  authors: [{ name: "OBLIQUE Atelier" }],
  openGraph: {
    title: "OBLIQUE // Digital Craft & Computational Atelier",
    description:
      "Sculpting the unseen edge of spatial computing, generative shaders, and kinetic typography.",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "OBLIQUE // Digital Craft Atelier",
    description:
      "Sculpting the unseen edge of spatial computing, generative shaders, and kinetic typography."
  }
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${spaceMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#08080a] text-[#f4f4f0] antialiased selection:bg-[#d4ff00] selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
