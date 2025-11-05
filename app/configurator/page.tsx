"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

interface Color {
  id: string;
  name: string;
  hex: string;
  gradient: string;
}

interface Wheel {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Interior {
  id: string;
  name: string;
  price: number;
  color: string;
}

const colors: Color[] = [
  {
    id: "midnight-black",
    name: "Midnight Black",
    hex: "#0a0a0f",
    gradient: "from-gray-900 to-black",
  },
  {
    id: "pearl-white",
    name: "Pearl White",
    hex: "#f8f8ff",
    gradient: "from-gray-100 to-white",
  },
  {
    id: "electric-blue",
    name: "Electric Blue",
    hex: "#00D9FF",
    gradient: "from-blue-400 to-cyan-300",
  },
  {
    id: "cosmic-purple",
    name: "Cosmic Purple",
    hex: "#B026FF",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "racing-red",
    name: "Racing Red",
    hex: "#FF0040",
    gradient: "from-red-500 to-rose-600",
  },
  {
    id: "stealth-gray",
    name: "Stealth Gray",
    hex: "#4a4a5e",
    gradient: "from-gray-600 to-gray-700",
  },
];

const wheels: Wheel[] = [
  { id: "aero-19", name: '19" Aero Wheels', price: 0, image: "🔘" },
  { id: "sport-20", name: '20" Sport Wheels', price: 2500, image: "⚙️" },
  { id: "performance-21", name: '21" Performance', price: 4500, image: "🎯" },
  { id: "carbon-22", name: '22" Carbon Fiber', price: 8500, image: "💎" },
];

const interiors: Interior[] = [
  { id: "black", name: "All Black", price: 0, color: "#1a1a1a" },
  { id: "white", name: "Black & White", price: 1500, color: "#ffffff" },
  { id: "cream", name: "Cream", price: 2000, color: "#f5e6d3" },
  { id: "red", name: "Carbon & Red", price: 3500, color: "#ff0040" },
];

const autopilotOptions = [
  { id: "basic", name: "Basic Autopilot", price: 0 },
  { id: "enhanced", name: "Enhanced Autopilot", price: 6000 },
  { id: "full", name: "Full Self-Driving", price: 15000 },
];

export default function ConfiguratorPage() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedWheels, setSelectedWheels] = useState(wheels[0]);
  const [selectedInterior, setSelectedInterior] = useState(interiors[0]);
  const [selectedAutopilot, setSelectedAutopilot] = useState(autopilotOptions[0]);

  const basePrice = 89990;
  const totalPrice =
    basePrice +
    selectedWheels.price +
    selectedInterior.price +
    selectedAutopilot.price;

  return (
    <main className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-display font-bold text-gradient mb-12 text-center"
        >
          Configure Your VOLTEX
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 3D Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="sticky top-32">
              <div className="glass rounded-3xl p-8 min-h-[600px] flex items-center justify-center relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 grid-bg opacity-20" />

                {/* Car Preview with animated glow based on selected color */}
                <motion.div
                  key={selectedColor.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Car Body */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        y: [0, -15, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-9xl font-display font-bold"
                      style={{ color: selectedColor.hex }}
                    >
                      🏎️
                    </motion.div>

                    {/* Dynamic Glow */}
                    <motion.div
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r ${selectedColor.gradient} blur-3xl -z-10`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Color Name Display */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-8"
                  >
                    <p className="text-2xl font-display font-semibold text-white">
                      {selectedColor.name}
                    </p>
                    <p className="text-white/40">Exterior Color</p>
                  </motion.div>
                </motion.div>

                {/* Rotation Hint */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <p className="text-white/40 text-sm">360° View</p>
                </div>
              </div>

              {/* Price Summary */}
              <motion.div
                className="glass rounded-2xl p-6 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60">Base Price</span>
                  <span className="text-white font-semibold">
                    ${basePrice.toLocaleString()}
                  </span>
                </div>
                {selectedWheels.price > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/60">{selectedWheels.name}</span>
                    <span className="text-white font-semibold">
                      +${selectedWheels.price.toLocaleString()}
                    </span>
                  </div>
                )}
                {selectedInterior.price > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/60">{selectedInterior.name}</span>
                    <span className="text-white font-semibold">
                      +${selectedInterior.price.toLocaleString()}
                    </span>
                  </div>
                )}
                {selectedAutopilot.price > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/60">{selectedAutopilot.name}</span>
                    <span className="text-white font-semibold">
                      +${selectedAutopilot.price.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-display font-bold text-white">
                      Total Price
                    </span>
                    <span className="text-3xl font-display font-bold text-gradient">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 btn-electric px-6 py-4 bg-electric-gradient rounded-full font-semibold text-lg electric-glow flex items-center justify-center gap-2"
                >
                  Order Now
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Configuration Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Exterior Color */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-white mb-6">
                Exterior Color
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {colors.map((color) => (
                  <motion.button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-4 glass rounded-2xl transition-all ${
                      selectedColor.id === color.id
                        ? "ring-2 ring-electric-blue"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-full h-20 rounded-xl mb-3 bg-gradient-to-br ${color.gradient}`}
                    />
                    <p className="text-white text-sm font-medium">{color.name}</p>
                    {selectedColor.id === color.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Wheels */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-white mb-6">
                Wheels
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {wheels.map((wheel) => (
                  <motion.button
                    key={wheel.id}
                    onClick={() => setSelectedWheels(wheel)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-6 glass rounded-2xl transition-all text-left ${
                      selectedWheels.id === wheel.id
                        ? "ring-2 ring-electric-blue"
                        : ""
                    }`}
                  >
                    <div className="text-4xl mb-3">{wheel.image}</div>
                    <p className="text-white font-semibold mb-1">{wheel.name}</p>
                    <p className="text-electric-blue text-sm">
                      {wheel.price === 0 ? "Included" : `+$${wheel.price.toLocaleString()}`}
                    </p>
                    {selectedWheels.id === wheel.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Interior */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-white mb-6">
                Interior
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {interiors.map((interior) => (
                  <motion.button
                    key={interior.id}
                    onClick={() => setSelectedInterior(interior)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-6 glass rounded-2xl transition-all text-left ${
                      selectedInterior.id === interior.id
                        ? "ring-2 ring-electric-blue"
                        : ""
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-full mb-3"
                      style={{ backgroundColor: interior.color }}
                    />
                    <p className="text-white font-semibold mb-1">{interior.name}</p>
                    <p className="text-electric-blue text-sm">
                      {interior.price === 0
                        ? "Included"
                        : `+$${interior.price.toLocaleString()}`}
                    </p>
                    {selectedInterior.id === interior.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Autopilot */}
            <div>
              <h2 className="text-2xl font-display font-semibold text-white mb-6">
                Autopilot
              </h2>
              <div className="space-y-3">
                {autopilotOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => setSelectedAutopilot(option)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`relative w-full p-6 glass rounded-2xl transition-all text-left ${
                      selectedAutopilot.id === option.id
                        ? "ring-2 ring-electric-blue"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-semibold mb-1">{option.name}</p>
                        <p className="text-white/40 text-sm">
                          {option.id === "basic" && "Traffic-aware cruise control"}
                          {option.id === "enhanced" && "Navigate on autopilot"}
                          {option.id === "full" && "City street self-driving"}
                        </p>
                      </div>
                      <p className="text-electric-blue font-semibold">
                        {option.price === 0
                          ? "Included"
                          : `+$${option.price.toLocaleString()}`}
                      </p>
                    </div>
                    {selectedAutopilot.id === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
