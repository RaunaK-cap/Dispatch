import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CodeWindow from "@/components/landing/CodeWindow";
import StatBar from "@/components/landing/StatBar";
import BentoGrid from "@/components/landing/BentoGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import AlternatingSections from "@/components/landing/AlternatingSections";
import CTABand from "@/components/landing/CTABand";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Code window */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <CodeWindow />
      </div>

      {/* Stats bar */}
      <div style={{ marginTop: 80 }}>
        <StatBar />
      </div>

      {/* Bento grid */}
      <BentoGrid />

      {/* How it works */}
      <HowItWorks />

      {/* Alternating deep-dive sections */}
      <AlternatingSections />

      {/* CTA Band */}
      <CTABand />

      {/* Footer */}
      <Footer />
    </div>
  );
}
