"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Battery, Gauge, Zap, ArrowRight, Filter } from "lucide-react";

type CarCategory = "all" | "sport" | "suv" | "sedan";

interface CarModel {
  id: string;
  name: string;
  tagline: string;
  category: CarCategory;
  price: string;
  range: string;
  acceleration: string;
  topSpeed: string;
  power: string;
  image: string;
  gradient: string;
}

const carModels: CarModel[] = [
  {
    id: "voltex-s",
    name: "VOLTEX S",
    tagline: "Pure Performance",
    category: "sport",
    price: "$89,990",
    range: "520 miles",
    acceleration: "1.9s",
    topSpeed: "200 mph",
    power: "1,020 hp",
    image: "/models/voltex-s.jpg",
    gradient: "from-electric-blue to-electric-cyan",
  },
  {
    id: "voltex-x",
    name: "VOLTEX X",
    tagline: "Luxury Redefined",
    category: "suv",
    price: "$99,990",
    range: "480 miles",
    acceleration: "2.5s",
    topSpeed: "180 mph",
    power: "850 hp",
    image: "/models/voltex-x.jpg",
    gradient: "from-electric-purple to-pink-500",
  },
  {
    id: "voltex-r",
    name: "VOLTEX R",
    tagline: "Racing DNA",
    category: "sport",
    price: "$129,990",
    range: "450 miles",
    acceleration: "1.7s",
    topSpeed: "220 mph",
    power: "1,200 hp",
    image: "/models/voltex-r.jpg",
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "voltex-m",
    name: "VOLTEX M",
    tagline: "Everyday Excellence",
    category: "sedan",
    price: "$69,990",
    range: "500 miles",
    acceleration: "3.1s",
    topSpeed: "155 mph",
    power: "680 hp",
    image: "/models/voltex-m.jpg",
    gradient: "from-blue-500 to-electric-blue",
  },
  {
    id: "voltex-pro",
    name: "VOLTEX PRO",
    tagline: "Professional Grade",
    category: "suv",
    price: "$84,990",
    range: "460 miles",
    acceleration: "2.8s",
    topSpeed: "170 mph",
    power: "780 hp",
    image: "/models/voltex-pro.jpg",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "voltex-ultra",
    name: "VOLTEX ULTRA",
    tagline: "Ultimate Electric",
    category: "sedan",
    price: "$109,990",
    range: "530 miles",
    acceleration: "2.3s",
    topSpeed: "190 mph",
    power: "920 hp",
    image: "/models/voltex-ultra.jpg",
    gradient: "from-electric-cyan to-blue-400",
  },
];

const categories = [
  { id: "all" as CarCategory, name: "All Models", icon: Filter },
  { id: "sport" as CarCategory, name: "Sport", icon: Gauge },
  { id: "suv" as CarCategory, name: "SUV", icon: Battery },
  { id: "sedan" as CarCategory, name: "Sedan", icon: Zap },
];

export default function ModelsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>("all");
  const [filteredModels, setFilteredModels] = useState(carModels);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredModels(carModels);
    } else {
      setFilteredModels(
        carModels.filter((model) => model.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <main className="pt-32 pb-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-7xl font-display font-bold text-gradient mb-6">
            Our Models
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Choose from our range of cutting-edge electric vehicles, each designed
            to deliver unparalleled performance and luxury.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? "bg-electric-gradient electric-glow"
                    : "glass hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>
      </section>

      {/* Models Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative glass rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${model.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Image Placeholder with 3D Effect */}
                <div className="relative h-64 bg-gradient-to-br from-white/5 to-white/10 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotateY: 5 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Car Silhouette */}
                    <div className="w-full h-full relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="text-8xl font-display font-bold text-white/10"
                        >
                          {model.name.split(" ")[1]}
                        </motion.div>
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t ${model.gradient} opacity-50 blur-3xl`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-3xl font-display font-bold text-white mb-2">
                    {model.name}
                  </h3>
                  <p className="text-white/60 mb-6">{model.tagline}</p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-white/40 text-sm mb-1">Range</p>
                      <p className="text-electric-blue font-semibold">
                        {model.range}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">0-60 MPH</p>
                      <p className="text-electric-blue font-semibold">
                        {model.acceleration}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Top Speed</p>
                      <p className="text-electric-blue font-semibold">
                        {model.topSpeed}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Power</p>
                      <p className="text-electric-blue font-semibold">
                        {model.power}
                      </p>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-sm mb-1">Starting at</p>
                      <p className="text-2xl font-display font-bold text-white">
                        {model.price}
                      </p>
                    </div>
                    <Link href={`/configurator?model=${model.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-electric-gradient rounded-full flex items-center justify-center electric-glow"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-electric-blue/50 rounded-3xl transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Compare CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-12"
        >
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Can't Decide?
          </h2>
          <p className="text-white/60 mb-8">
            Compare models side-by-side or configure your dream VOLTEX
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Compare Models
            </motion.button>
            <Link href="/configurator">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-electric px-8 py-4 bg-electric-gradient rounded-full font-semibold electric-glow"
              >
                Start Configuring
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
