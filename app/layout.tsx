import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VOLTEX - Future of Electric Mobility",
  description: "Experience the future with VOLTEX electric vehicles. Premium design, cutting-edge technology, and sustainable performance.",
  keywords: ["electric cars", "EV", "sustainable transport", "luxury electric vehicles"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <Navbar />
          <ScrollIndicator />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
