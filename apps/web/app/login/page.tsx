"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FormInput from "@/components/auth/FormInput";
import SubmitButton from "@/components/auth/SubmitButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [shakeKey, setShakeKey] = useState(0);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email.";
    if (!password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShakeKey((k) => k + 1);
      return;
    }
    setErrors({});
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 20px",
      }}
    >
      {/* Back link */}
      <Link
        href="/"
        style={{
          alignSelf: "flex-start",
          maxWidth: 400,
          width: "100%",
          margin: "0 auto 40px",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--muted)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "color 0.15s ease",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.color = "var(--text)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
        }
      >
        ← Dispatch
      </Link>

      {/* Form box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`form-${shakeKey}`}
          initial={{ opacity: 0, y: 12 }}
          animate={
            Object.keys(errors).length > 0
              ? { opacity: 1, x: [0, -8, 8, -4, 4, 0] }
              : { opacity: 1, y: 0, x: 0 }
          }
          transition={{
            opacity: { duration: 0.4, ease: "easeOut" },
            y: { duration: 0.4, ease: "easeOut" },
            x: { duration: 0.4, ease: "easeOut" },
          }}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 36,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <h1
            style={{
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "-0.5px",
              color: "var(--text)",
              marginBottom: 6,
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              marginBottom: 28,
            }}
          >
            Log in to your account
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email}
              // @ts-expect-error - simplified for demo
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password}
              rightLabel={
                <a
                  href="#"
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--text)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--muted)")
                  }
                >
                  Forgot password?
                </a>
              }
              // @ts-expect-error - simplified for demo
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            <SubmitButton label="Log in" loading={loading} />
          </form>

          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              style={{
                color: "var(--text)",
                textDecoration: "underline",
                textUnderlineOffset: 2,
                fontWeight: 500,
              }}
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
