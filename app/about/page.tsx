"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Target,
  Lightbulb,
  Users,
  Award,
  Globe,
  Leaf,
  TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "2018",
    title: "The Vision Begins",
    description:
      "Founded with a mission to revolutionize electric mobility and create sustainable transportation for the future.",
    icon: Lightbulb,
  },
  {
    year: "2019",
    title: "First Prototype",
    description:
      "Unveiled our first electric vehicle prototype, showcasing groundbreaking battery technology and autonomous capabilities.",
    icon: Zap,
  },
  {
    year: "2020",
    title: "Production Launch",
    description:
      "Began mass production of VOLTEX S, our flagship sports sedan, delivering unprecedented performance and range.",
    icon: Target,
  },
  {
    year: "2021",
    title: "Global Expansion",
    description:
      "Expanded operations to 15 countries, establishing charging networks and service centers worldwide.",
    icon: Globe,
  },
  {
    year: "2022",
    title: "Innovation Award",
    description:
      "Received the Global Innovation Award for our revolutionary solid-state battery technology.",
    icon: Award,
  },
  {
    year: "2023",
    title: "SUV Revolution",
    description:
      "Launched VOLTEX X, redefining luxury electric SUVs with advanced AI and unmatched comfort.",
    icon: TrendingUp,
  },
  {
    year: "2024",
    title: "Sustainable Future",
    description:
      "Achieved carbon-neutral production and planted 1 million trees as part of our environmental commitment.",
    icon: Leaf,
  },
];

const values = [
  {
    icon: Zap,
    title: "Innovation First",
    description:
      "Pushing boundaries with cutting-edge technology and relentless pursuit of perfection.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Committed to creating a cleaner planet through sustainable practices and zero-emission vehicles.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description:
      "Designing every detail around the needs and desires of our drivers.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Uncompromising quality in design, engineering, and customer experience.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline events
      gsap.from(".timeline-event", {
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 60%",
        },
        x: -100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Animate value cards
      gsap.from(".value-card", {
        scrollTrigger: {
          trigger: ".values-section",
          start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="pt-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 mb-32">
        <div className="absolute inset-0 grid-bg opacity-10" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-electric-gradient rounded-full flex items-center justify-center mx-auto mb-8 electric-glow"
          >
            <Zap className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-display font-bold text-gradient mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            We're not just building electric cars. We're creating a movement towards
            sustainable, exhilarating, and intelligent mobility for everyone.
          </p>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-20 mb-32 bg-electric-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 to-electric-purple/10" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
              Our Mission
            </h2>
            <p className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed">
              "To accelerate the world's transition to sustainable energy through
              innovative electric vehicles that inspire passion and deliver
              uncompromising performance."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section relative max-w-6xl mx-auto px-6 mb-32">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-display font-bold text-gradient mb-20 text-center"
        >
          Our Journey
        </motion.h2>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-electric-gradient"
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  className="timeline-event relative"
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`flex items-center gap-8 ${
                      isLeft
                        ? "md:flex-row"
                        : "md:flex-row-reverse"
                    } flex-col md:flex-row`}
                  >
                    {/* Content */}
                    <div
                      className={`flex-1 ${
                        isLeft ? "md:text-right" : "md:text-left"
                      } text-left`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass rounded-2xl p-6 md:p-8"
                      >
                        <span className="text-electric-blue font-display font-bold text-2xl">
                          {event.year}
                        </span>
                        <h3 className="text-2xl font-display font-semibold text-white mt-2 mb-3">
                          {event.title}
                        </h3>
                        <p className="text-white/60 leading-relaxed">
                          {event.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10 w-16 h-16 bg-electric-gradient rounded-full flex items-center justify-center electric-glow flex-shrink-0"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section relative py-20 bg-electric-darker">
        <div className="absolute inset-0 grid-bg opacity-10" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-display font-bold text-gradient mb-6">
              Our Values
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              The principles that drive everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="value-card group"
                  whileHover={{ y: -10 }}
                >
                  <div className="glass rounded-2xl p-8 h-full hover:bg-white/10 transition-all">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-electric-gradient rounded-2xl flex items-center justify-center mb-6 electric-glow group-hover:scale-110 transition-transform"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-display font-semibold text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-32 bg-electric-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Vehicles Delivered" },
              { value: "15", label: "Countries" },
              { value: "98%", label: "Customer Satisfaction" },
              { value: "1M", label: "Trees Planted" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center glass rounded-2xl p-8"
              >
                <h3 className="text-5xl md:text-6xl font-display font-bold text-gradient mb-3">
                  {stat.value}
                </h3>
                <p className="text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Join the Revolution
            </h2>
            <p className="text-xl text-white/60 mb-10">
              Be part of the future of sustainable mobility
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-electric px-10 py-5 bg-electric-gradient rounded-full font-semibold text-lg electric-glow"
            >
              Explore Careers
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
