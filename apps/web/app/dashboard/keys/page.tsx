export default function KeysPage() {
  return (
    <div style={{ padding: "40px", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 500, marginBottom: 8 }}>API Keys</h1>
      <p style={{ color: "var(--muted)", marginBottom: 32 }}>Manage your Dispatch API keys.</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "6fr 4fr", gap: 24 }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 40, textAlign: "center", color: "var(--muted)" }}>
          Key Management Placeholder
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 40, textAlign: "center", color: "var(--muted)" }}>
          Usage Guide Placeholder
        </div>
      </div>
    </div>
  );
}
