"use client";

import { motion, type Variants } from "framer-motion";
import StreamVisual from "../bento/StreamVisual";
import ChannelGrid from "../bento/ChannelGrid";
import RetryBars from "../bento/RetryBars";
import KeyList from "../bento/KeyList";

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.07 },
  }),
};

function BentoCell({
  tag,
  title,
  description,
  children,
  style,
  index,
}: {
  tag: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={cellVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "tween", duration: 0.2 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: 32,
        transition: "border-color 0.2s ease",
        cursor: "default",
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#ccc";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.8px",
          color: "var(--muted)",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {tag}
      </div>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: "-0.3px",
          color: "var(--text)",
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 13,
          color: "var(--muted)",
          lineHeight: 1.6,
          maxWidth: 300,
          marginBottom: 24,
        }}
      >
        {description}
      </p>
      {children}
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section
      style={{
        maxWidth: 1100,
        margin: "80px auto 0",
        padding: "0 40px",
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "1.2px",
          color: "var(--muted)",
          textTransform: "uppercase",
          marginBottom: 48,
        }}
      >
        Features
      </div>

      {/* Row 1 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          gap: 12,
          marginBottom: 12,
        }}
        className="bento-row"
      >
        <BentoCell
          tag="Core"
          title="Event-driven pipeline"
          description="Every notification becomes a durable job. Your requests never get lost — they queue, process, and confirm delivery."
          index={0}
        >
          <StreamVisual />
        </BentoCell>

        <BentoCell
          tag="Channels"
          title="Four channels, one API"
          description="Email, Discord, Telegram, WhatsApp. Add more channels without changing your integration."
          index={1}
        >
          <ChannelGrid />
        </BentoCell>
      </div>

      {/* Row 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 8fr",
          gap: 12,
        }}
        className="bento-row"
      >
        <BentoCell
          tag="Reliability"
          title="Auto-retry with DLQ"
          description="Failed jobs retry up to 3 times with exponential backoff. Unrecoverable jobs land in the dead letter queue."
          index={2}
        >
          <RetryBars />
        </BentoCell>

        <BentoCell
          tag="Security"
          title="API key management"
          description="Generate, rotate, and revoke API keys from the dashboard. Each key scoped to specific channels."
          index={3}
        >
          <KeyList />
        </BentoCell>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bento-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
