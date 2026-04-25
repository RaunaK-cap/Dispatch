"use client";

import { motion } from "framer-motion";

const channels = [
  { label: "Email", x: 220, y: 20, color: "#3b82f6" },
  { label: "Discord", x: 340, y: 130, color: "#7c3aed" },
  { label: "Telegram", x: 220, y: 240, color: "#0ea5e9" },
  { label: "WhatsApp", x: 60, y: 130, color: "#16a34a" },
];

// Center point
const cx = 200;
const cy = 130;

export default function NodeDiagram() {
  return (
    <div style={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
      <svg viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lines from center to each channel */}
        {channels.map((ch, i) => (
          <g key={ch.label}>
            <motion.line
              x1={cx}
              y1={cy}
              x2={ch.x + 40}
              y2={ch.y + 18}
              stroke={ch.color}
              strokeWidth={1.5}
              strokeOpacity={0.25}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: i * 0.15 }}
            />
            {/* Traveling dot */}
            <motion.circle
              r={3}
              fill={ch.color}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
                delay: i * 0.5,
                repeatDelay: 0.5,
              }}
            >
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
                path={`M ${cx} ${cy} L ${ch.x + 40} ${ch.y + 18}`}
              />
            </motion.circle>
          </g>
        ))}

        {/* Center node */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={36}
          fill="var(--surface)"
          stroke="var(--border)"
          strokeWidth={1}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontSize={11}
          fontWeight={500}
          fill="var(--muted)"
          fontFamily="Inter, sans-serif"
          letterSpacing="-0.3"
        >
          Dispatch
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fontSize={9}
          fill="var(--green)"
          fontFamily="Inter, sans-serif"
          fontWeight={500}
        >
          API
        </text>

        {/* Channel nodes */}
        {channels.map((ch, i) => (
          <motion.g
            key={ch.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + i * 0.1 }}
          >
            <rect
              x={ch.x}
              y={ch.y}
              width={84}
              height={36}
              rx={10}
              fill="var(--surface)"
              stroke={ch.color}
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            <text
              x={ch.x + 42}
              y={ch.y + 22}
              textAnchor="middle"
              fontSize={12}
              fontWeight={500}
              fill="var(--text)"
              fontFamily="Inter, sans-serif"
              letterSpacing="-0.3"
            >
              {ch.label}
            </text>
            {/* Pulse ring */}
            <motion.circle
              cx={ch.x + 8}
              cy={ch.y + 18}
              r={3}
              fill={ch.color}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
