"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FormInput from "@/components/auth/FormInput";
import PasswordStrength from "@/components/auth/PasswordStrength";
import SubmitButton from "@/components/auth/SubmitButton";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [shakeKey, setShakeKey] = useState(0);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";
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
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
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

      <AnimatePresence mode="wait">
        {success ? (
          /* Success state */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 48,
              width: "100%",
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "var(--green-bg)",
                border: "1px solid #c5e8d5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 22,
              }}
            >
              ✓
            </motion.div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: "var(--text)",
                marginBottom: 8,
              }}
            >
              Account created.
            </h2>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>Redirecting…</p>
          </motion.div>
        ) : (
          /* Form */
          <motion.div
            key={`form-${shakeKey}`}
            initial={{ opacity: 0, y: 12 }}
            animate={
              Object.keys(errors).length > 0
                ? { opacity: 1, x: [0, -8, 8, -4, 4, 0] }
                : { opacity: 1, y: 0, x: 0 }
            }
            exit={{ opacity: 0, y: -12 }}
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
              Create account
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "var(--muted)",
                marginBottom: 28,
              }}
            >
              Start sending notifications in minutes
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              <FormInput
                id="name"
                label="Full name"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                error={errors.name}
                // @ts-expect-error - simplified for demo
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />

              <FormInput
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email}
                // @ts-expect-error - simplified for demo
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <div>
                <FormInput
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  error={errors.password}
                  // @ts-expect-error - simplified for demo
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <PasswordStrength password={password} />
              </div>

              <SubmitButton label="Create account" loading={loading} />
            </form>

            {/* Terms */}
            <p
              style={{
                fontSize: 11,
                color: "var(--muted)",
                textAlign: "center",
                marginTop: 16,
                lineHeight: 1.6,
              }}
            >
              By signing up, you agree to our{" "}
              <a
                href="#"
                style={{
                  color: "var(--text)",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                style={{
                  color: "var(--text)",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                Privacy Policy
              </a>
              .
            </p>

            {/* Switch to login */}
            <p
              style={{
                fontSize: 13,
                color: "var(--muted)",
                textAlign: "center",
                marginTop: 16,
              }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: "var(--text)",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                  fontWeight: 500,
                }}
              >
                Log in
              </Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
