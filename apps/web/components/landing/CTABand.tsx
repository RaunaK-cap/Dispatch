"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTABand() {
  return (
    <section style={{ padding: "0 40px", margin: "80px auto", maxWidth: 1100 }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background: "var(--text)",
          borderRadius: 20,
          padding: 64,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.03,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.03,
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "1.2px",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Let&apos;s go
          </div>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: "-0.8px",
              color: "#fff",
              marginBottom: 12,
            }}
          >
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span 
                style={{ display: "block" }}
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                Start dispatching today.
              </motion.span>
            </span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.45)",
              marginBottom: 28,
            }}
          >
            Free tier includes 1,000 notifications/month. No credit card required.
          </p>
          <Link
            href="/signup"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text)",
              background: "#fff",
              padding: "10px 24px",
              borderRadius: 10,
              display: "inline-block",
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
          >
            Get started free
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
