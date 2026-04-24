"use client";

interface SubmitButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "submit" | "button";
}

export default function SubmitButton({
  label,
  loading = false,
  disabled = false,
  onClick,
  type = "submit",
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        width: "100%",
        padding: "11px",
        background: disabled || loading ? "#444" : "var(--text)",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 500,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        transition: "opacity 0.15s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: "Inter, sans-serif",
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading)
          (e.currentTarget as HTMLElement).style.opacity = "0.8";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = "1";
      }}
    >
      {loading ? (
        <>
          <svg
            style={{ animation: "spin 0.8s linear infinite" }}
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx={12} cy={12} r={9} strokeOpacity={0.25} />
            <path d="M12 3a9 9 0 019 9" />
          </svg>
          <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
          Processing…
        </>
      ) : (
        label
      )}
    </button>
  );
}
