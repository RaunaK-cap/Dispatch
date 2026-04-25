"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ChannelStatusPill from "./ChannelStatusPill";

const navItems = [
  { name: "Overview", href: "/dashboard" },
  { name: "Logs", href: "/dashboard/logs" },
  { name: "API Keys", href: "/dashboard/keys" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function CommandBar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        height: 56,
        background: "#ffffff",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/dashboard" style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>
            Dispatch
          </Link>
          <div style={{ width: 1, height: 20, background: "var(--border)" }} />
        </div>

        <nav style={{ display: "flex", gap: 24, height: 56 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: isActive ? "var(--text)" : "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget.style.color = "var(--text)");
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget.style.color = "var(--muted)");
                }}
              >
                {item.name}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "var(--text)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Center Section: Channel Health Pills */}
      <div className="hidden md:flex" style={{ alignItems: "center", gap: 8 }}>
        <ChannelStatusPill name="Email" status="connected" />
        <ChannelStatusPill name="Discord" status="connected" />
        <ChannelStatusPill name="Telegram" status="error" />
        <ChannelStatusPill name="WhatsApp" status="degraded" />
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 6,
            color: "var(--muted)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg)";
            e.currentTarget.style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--muted)";
          }}
          title="Search (⌘K)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        <button
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 6,
            color: "var(--muted)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg)";
            e.currentTarget.style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--muted)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <div
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--red)",
            }}
          />
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
        >
          <div
            style={{
               width: 24,
               height: 24,
               borderRadius: "50%",
               background: "var(--text)",
               color: "#fff",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               fontSize: 10,
               fontWeight: 600,
            }}
          >
            A
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </header>
  );
}
