"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Models", href: "/models" },
    { name: "Configurator", href: "/configurator" },
    { name: "Test Drive", href: "/contact" },
    { name: "Charging", href: "/charging" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Investors", href: "/investors" },
  ],
  Support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact", href: "/contact" },
    { name: "Service", href: "/service" },
    { name: "Warranty", href: "/warranty" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 border-t border-slate-500/20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-bg-navy opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-premium-gradient rounded-lg flex items-center justify-center teal-glow"
              >
                <Zap className="w-7 h-7 text-pearl-50" />
              </motion.div>
              <span className="text-3xl font-display font-bold text-gradient-premium">
                VOLTEX
              </span>
            </Link>
            <p className="text-pearl-300/80 mb-6 max-w-sm">
              Pioneering the future of electric mobility with cutting-edge technology,
              sustainable innovation, and unparalleled performance.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-navy-800/50 border border-slate-500/30 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-pearl-100 placeholder:text-pearl-400/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-coral-gradient rounded-lg coral-glow"
              >
                <Mail className="w-5 h-5 text-pearl-50" />
              </motion.button>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display font-semibold text-pearl-50 mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-pearl-300/70 hover:text-teal-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-pearl-400/60 text-sm">
            © 2024 VOLTEX. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-navy-800/50 hover:bg-premium-gradient rounded-full flex items-center justify-center transition-all text-pearl-300 hover:text-pearl-50 teal-glow"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          <div className="flex gap-6 text-sm text-pearl-400/60">
            <Link href="/privacy" className="hover:text-pearl-50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-pearl-50 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
