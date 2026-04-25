export default function SettingsPage() {
  return (
    <div style={{ padding: "40px", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 500, marginBottom: 8 }}>Settings</h1>
      <p style={{ color: "var(--muted)", marginBottom: 32 }}>Configure your profile and channels.</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 500, marginBottom: 16 }}>Profile</h2>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Profile settings placeholder</div>
        </div>
        
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 500, marginBottom: 16 }}>Channels</h2>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Channel config placeholder</div>
        </div>
        
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 500, color: "var(--red)", marginBottom: 16 }}>Danger Zone</h2>
          <button style={{ background: "transparent", border: "1px solid var(--red)", color: "var(--red)", padding: "8px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}
