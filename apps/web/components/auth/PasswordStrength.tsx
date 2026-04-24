"use client";

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  return score;
}

const colors: Record<number, string> = {
  0: "var(--border)",
  1: "var(--red)",
  2: "var(--amber)",
  3: "var(--amber)",
  4: "var(--green)",
};

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = getStrength(password);

  if (!password) return null;

  return (
    <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          style={{
            flex: 1,
            height: 3,
            borderRadius: 100,
            background: bar <= strength ? colors[strength] : "var(--border)",
            transition: "background 0.25s ease",
          }}
        />
      ))}
    </div>
  );
}
