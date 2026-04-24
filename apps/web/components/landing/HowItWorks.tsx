"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Sign up",
    description: "Create your account and generate an API key in under 60 seconds.",
  },
  {
    number: "2",
    title: "Connect channels",
    description: "Add a Discord webhook, Telegram bot token, email address, or WhatsApp number.",
  },
  {
    number: "3",
    title: "Send a notification",
    description: "One POST request. Dispatch handles routing, queuing, and delivery.",
  },
  {
    number: "4",
    title: "Monitor logs",
    description: "Watch delivery status, retries, and latency in your dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        maxWidth: 1100,
        margin: "80px auto 0",
        padding: "0 40px",
      }}
    >
      {/* Label */}
      <div className="text-[11px] font-medium tracking-[1.2px] text-[#888882] uppercase mb-12">
        How it works
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
        
        {/* Single continuous background line — desktop only */}
        <div 
          className="hidden md:block absolute top-5 left-5 h-[1px] bg-[#e8e8e4]" 
          style={{ width: "calc(75% + 1.125rem)", zIndex: 0 }} 
        />
        
        {/* Single continuous animated line — desktop only */}
        <motion.div 
          className="hidden md:block absolute top-5 left-5 h-[1px] bg-[#111110] origin-left" 
          style={{ width: "calc(75% + 1.125rem)", zIndex: 1 }} 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "linear" }}
        />

        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
            className="flex flex-col relative"
            style={{ zIndex: 10 }}
          >
            {/* Step number circle */}
            <motion.div
              initial={{ borderColor: "#e8e8e4", color: "#888882" }}
              whileInView={{ borderColor: "#111110", color: "#111110" }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.5 }}
              className="w-10 h-10 rounded-full border flex items-center justify-center text-[13px] font-medium mb-5 transition-colors relative"
              style={{ zIndex: 20, backgroundColor: "var(--bg)" }}
            >
              {step.number}
            </motion.div>

            <h3 className="text-[14px] font-medium text-[#111110] mb-2 tracking-[-0.2px]">
              {step.title}
            </h3>
            <p className="text-[12px] text-[#888882] leading-[1.6] font-normal pr-4">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
