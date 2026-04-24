"use client";

import { forwardRef } from "react";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  rightLabel?: React.ReactNode;
  autoComplete?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, type = "text", placeholder, error, rightLabel, autoComplete }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label
            htmlFor={id}
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text)",
              letterSpacing: "0.1px",
            }}
          >
            {label}
          </label>
          {rightLabel}
        </div>
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          style={{
            padding: "10px 14px",
            border: `1px solid ${error ? "var(--red)" : "var(--border)"}`,
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 400,
            color: "var(--text)",
            background: "var(--surface)",
            outline: "none",
            transition: "border-color 0.2s ease",
            width: "100%",
            fontFamily: "Inter, sans-serif",
          }}
          onFocus={(e) => {
            if (!error)
              (e.target as HTMLInputElement).style.borderColor = "#999";
          }}
          onBlur={(e) => {
            if (!error)
              (e.target as HTMLInputElement).style.borderColor = "var(--border)";
          }}
        />
        {error && (
          <span style={{ fontSize: 12, color: "var(--red)", marginTop: 2 }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
