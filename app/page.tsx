"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Zap,
  Battery,
  Gauge,
  Wind,
  Shield,
  Sparkles,
  ArrowRight,
  Play,
} from "lucide-react";
import CarScene from "@/components/CarSceneWithModel";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Battery,
    title: "Extended Range",
    description: "Up to 500 miles on a single charge with advanced battery technology",
  },
  {
    icon: Zap,
    title: "Ultra Fast Charging",
    description: "0-80% in just 15 minutes with our hypercharging network",
  },
  {
    icon: Gauge,
    title: "Instant Performance",
    description: "0-60 mph in 2.1 seconds with dual motor all-wheel drive",
  },
  {
    icon: Wind,
    title: "Aerodynamic Design",
    description: "Lowest drag coefficient in its class for maximum efficiency",
  },
  {
    icon: Shield,
    title: "Advanced Safety",
    description: "5-star safety rating with AI-powered collision avoidance",
  },
  {
    icon: Sparkles,
    title: "Autopilot Ready",
    description: "Level 4 autonomous driving with OTA updates",
  },
];

const stats = [
  { value: "500+", label: "Miles Range" },
  { value: "2.1s", label: "0-60 MPH" },
  { value: "1,020", label: "Horsepower" },
  { value: "200", label: "MPH Top Speed" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const carSectionRef = useRef<HTMLDivElement>(null);
  const [carScrollValue, setCarScrollValue] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Track scroll progress specifically for the car section
  const { scrollYProgress: carScrollProgress } = useScroll({
    target: carSectionRef,
    offset: ["start 0.8", "end 0.2"], // Only rotate when section is 80% in view
  });

  // Add threshold - only rotate when section is in view (0.2 to 0.8 range)
  const carRotation = useTransform(
    carScrollProgress,
    [0, 0.2, 0.8, 1], // Input range with threshold
    [0, 0, 1, 1]      // Output range - stays at 0 until 0.2, then rotates, stays at 1 after 0.8
  );

  // Subscribe to carRotation changes and update state
  useEffect(() => {
    const unsubscribe = carRotation.on("change", (latest) => {
      setCarScrollValue(latest);
    });
    return () => unsubscribe();
  }, [carRotation]);

  useEffect(() => {
    // Hero section animations
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        delay: 0.8,
      });

      // Feature cards animation
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Stats animation
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={heroRef} className="overflow-hidden">
      {/* Hero Section */}
      <motion.section
        data-scroll-section
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/50 to-navy-900" />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="hero-title text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-gradient-premium">VOLTEX</span>
            <br />
            <span className="text-pearl-50">The Future</span>
          </motion.h1>

          <p className="hero-subtitle text-xl md:text-2xl text-pearl-200/80 mb-12 max-w-2xl mx-auto">
            Experience the pinnacle of electric performance. Where cutting-edge
            technology meets breathtaking design.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/models">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium px-8 py-4 bg-coral-gradient rounded-full font-semibold text-lg text-pearl-50 flex items-center gap-2 coral-glow"
              >
                Explore Models
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass rounded-full font-semibold text-lg text-pearl-50 flex items-center gap-2 hover:bg-navy-700/30 transition-colors"
            >
              <Play className="w-5 h-5" />
              Watch Video
            </motion.button>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-pearl-300/30 rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1 h-2 bg-teal-500 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 3D Car Showcase Section */}
      <section
        ref={carSectionRef}
        data-scroll-section
        className="relative min-h-screen flex items-center justify-center bg-navy-800"
      >
        <CarScene
          useCustomModel={true}
          modelPath="/models/car.glb"
          modelScale={3}
          scrollProgress={carScrollValue}
        />
      </section>

      {/* Stats Section */}
      <section data-scroll-section className="stats-section relative py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item text-center p-6 glass rounded-2xl"
              >
                <motion.h3
                  className="text-4xl md:text-5xl font-display font-bold text-gradient-premium mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-pearl-300/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section data-scroll-section className="features-section relative py-32 bg-navy-800">
        <div className="absolute inset-0 grid-bg-navy opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-gradient-premium mb-6">
              Revolutionary Features
            </h2>
            <p className="text-xl text-pearl-300/70 max-w-2xl mx-auto">
              Every detail engineered for performance, efficiency, and pure driving pleasure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="feature-card group p-8 glass rounded-2xl hover:bg-navy-700/30 transition-all cursor-pointer"
                  whileHover={{ y: -10 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-premium-gradient rounded-2xl flex items-center justify-center mb-6 teal-glow group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-pearl-50" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-semibold mb-4 text-pearl-50">
                    {feature.title}
                  </h3>
                  <p className="text-pearl-300/70">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-scroll-section className="relative py-32 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-slate-500/20 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold text-pearl-50 mb-8"
          >
            Ready to Experience
            <br />
            <span className="text-gradient-premium">The Future?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-pearl-300/70 mb-12"
          >
            Configure your dream VOLTEX today and join the electric revolution
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/configurator">
              <button className="btn-premium px-12 py-5 bg-coral-gradient rounded-full font-semibold text-xl text-pearl-50 coral-glow hover:scale-105 transition-transform">
                Start Configuring
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
