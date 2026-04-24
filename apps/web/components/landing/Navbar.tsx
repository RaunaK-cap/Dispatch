"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 56,
        borderBottom: "1px solid var(--border)",
        background: "rgba(249,249,247,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 40px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: "-0.3px",
            color: "var(--text)",
          }}
        >
          Dispatch
        </Link>

        {/* Center Nav — desktop */}
        <nav className="hidden md:flex" style={{ gap: 32 }}>
          {["Docs", "Pricing", "Changelog"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: 13,
                color: "var(--muted)",
                transition: "color 0.15s ease",
                fontWeight: 400,
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--muted)")
              }
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right buttons — desktop */}
        <div className="hidden md:flex" style={{ gap: 8, alignItems: "center" }}>
          <Link
            href="/login"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--text)",
              padding: "6px 14px",
              borderRadius: 8,
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "var(--accent-light)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "transparent")
            }
          >
            Log in
          </Link>
          <Link
            href="/signup"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#fff",
              background: "var(--text)",
              padding: "6px 14px",
              borderRadius: 8,
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.8")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
          >
            Get started
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            color: "var(--text)",
          }}
          aria-label="Toggle menu"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(249,249,247,0.97)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid var(--border)",
              padding: "16px 24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {["Docs", "Pricing", "Changelog"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <Link
                href="/login"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text)",
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  flex: 1,
                  textAlign: "center",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#fff",
                  background: "var(--text)",
                  padding: "8px 16px",
                  borderRadius: 8,
                  flex: 1,
                  textAlign: "center",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
