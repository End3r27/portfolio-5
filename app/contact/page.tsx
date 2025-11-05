"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Car } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: Mail,
    title: "Email",
    details: "hello@voltex.com",
    link: "mailto:hello@voltex.com",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    details: "123 Innovation Drive, Silicon Valley, CA 94025",
    link: "#",
  },
];

const bookingTypes = [
  { id: "test-drive", label: "Test Drive", icon: Car },
  { id: "consultation", label: "Consultation", icon: Clock },
  { id: "service", label: "Service Appointment", icon: CheckCircle },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bookingType: "test-drive",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        bookingType: "test-drive",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            Get in Touch
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Ready to experience the future? Book a test drive or get in touch with
            our team.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group glass rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 bg-electric-gradient rounded-2xl flex items-center justify-center mb-4 electric-glow group-hover:scale-110 transition-transform"
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-white/60">{info.details}</p>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onMouseMove={handleMouseMove}
            className="relative glass rounded-3xl p-8 overflow-hidden"
          >
            {/* Cursor Glow Effect */}
            <motion.div
              className="absolute w-64 h-64 bg-electric-blue/20 rounded-full blur-3xl pointer-events-none"
              style={{
                left: springX,
                top: springY,
                x: "-50%",
                y: "-50%",
              }}
            />

            <div className="relative z-10">
              <h2 className="text-3xl font-display font-bold text-white mb-8">
                Book Your Experience
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    Full Name
                  </label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    animate={{
                      scale: focusedField === "name" ? 1.02 : 1,
                    }}
                    className={`w-full px-4 py-3 bg-white/5 border-2 rounded-xl focus:outline-none transition-all text-white placeholder:text-white/40 ${
                      focusedField === "name"
                        ? "border-electric-blue electric-glow"
                        : "border-white/10"
                    }`}
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    animate={{
                      scale: focusedField === "email" ? 1.02 : 1,
                    }}
                    className={`w-full px-4 py-3 bg-white/5 border-2 rounded-xl focus:outline-none transition-all text-white placeholder:text-white/40 ${
                      focusedField === "email"
                        ? "border-electric-blue electric-glow"
                        : "border-white/10"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    Phone Number
                  </label>
                  <motion.input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    required
                    animate={{
                      scale: focusedField === "phone" ? 1.02 : 1,
                    }}
                    className={`w-full px-4 py-3 bg-white/5 border-2 rounded-xl focus:outline-none transition-all text-white placeholder:text-white/40 ${
                      focusedField === "phone"
                        ? "border-electric-blue electric-glow"
                        : "border-white/10"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Booking Type */}
                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {bookingTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <motion.label
                          key={type.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                            formData.bookingType === type.id
                              ? "border-electric-blue bg-electric-blue/10 electric-glow"
                              : "border-white/10 bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <input
                            type="radio"
                            name="bookingType"
                            value={type.id}
                            checked={formData.bookingType === type.id}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <Icon
                            className={`w-6 h-6 mx-auto mb-2 ${
                              formData.bookingType === type.id
                                ? "text-electric-blue"
                                : "text-white/60"
                            }`}
                          />
                          <p
                            className={`text-xs text-center ${
                              formData.bookingType === type.id
                                ? "text-white font-semibold"
                                : "text-white/60"
                            }`}
                          >
                            {type.label}
                          </p>
                        </motion.label>
                      );
                    })}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    Message
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    animate={{
                      scale: focusedField === "message" ? 1.02 : 1,
                    }}
                    className={`w-full px-4 py-3 bg-white/5 border-2 rounded-xl focus:outline-none transition-all text-white placeholder:text-white/40 resize-none ${
                      focusedField === "message"
                        ? "border-electric-blue electric-glow"
                        : "border-white/10"
                    }`}
                    placeholder="Tell us more about your interest..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitted}
                  className="w-full btn-electric px-8 py-4 bg-electric-gradient rounded-full font-semibold text-lg electric-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Hours */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Business Hours
              </h3>
              <div className="space-y-4">
                {[
                  { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
                  { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
                  { day: "Sunday", hours: "11:00 AM - 5:00 PM" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0"
                  >
                    <span className="text-white/80">{schedule.day}</span>
                    <span className="text-electric-blue font-semibold">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Quick Answers
              </h3>
              <div className="space-y-4">
                {[
                  {
                    q: "How long is a test drive?",
                    a: "Approximately 30-45 minutes",
                  },
                  {
                    q: "Do I need to make a deposit?",
                    a: "No deposit required for test drives",
                  },
                  {
                    q: "Can I customize my order?",
                    a: "Yes, full customization available",
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <p className="text-white font-semibold mb-1">{faq.q}</p>
                    <p className="text-white/60 text-sm">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass rounded-2xl p-8 h-64 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="relative z-10 text-center">
                <MapPin className="w-12 h-12 text-electric-blue mx-auto mb-4" />
                <p className="text-white/60">
                  Interactive map would go here
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Message Overlay */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="glass rounded-3xl p-12 text-center max-w-md mx-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-electric-gradient rounded-full flex items-center justify-center mx-auto mb-6 electric-glow"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-3xl font-display font-bold text-white mb-4">
              Thank You!
            </h3>
            <p className="text-white/60">
              We've received your message and will get back to you within 24 hours.
            </p>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
