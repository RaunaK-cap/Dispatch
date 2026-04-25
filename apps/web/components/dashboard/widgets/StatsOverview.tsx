"use client";

export default function StatsOverview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, height: "100%" }}>
      {/* Cell A - Today's Numbers */}
      <div style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, height: "100%" }}>
          {/* Total Sent */}
          <div>
            <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.5px", marginBottom: 8, textTransform: "uppercase" }}>Total sent today</div>
            <div style={{ fontSize: 28, fontWeight: 500, color: "var(--text)" }}>2,345</div>
          </div>
          
          {/* Delivery rate */}
          <div>
            <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.5px", marginBottom: 8, textTransform: "uppercase" }}>Delivery Rate</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 500, color: "var(--green)" }}>99.8%</span>
              {/* tiny sparkline placeholder */}
              <div style={{ width: 30, height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: "99.8%", height: "100%", background: "var(--green)" }} />
              </div>
            </div>
          </div>

          {/* Avg Latency */}
          <div>
            <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.5px", marginBottom: 8, textTransform: "uppercase" }}>Avg Latency</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "var(--text)" }}>43<span style={{ fontSize: 14, color: "var(--muted)", marginLeft: 2 }}>ms</span></div>
          </div>

          {/* Failed count */}
          <div>
            <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.5px", marginBottom: 8, textTransform: "uppercase" }}>Failed Jobs</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "var(--red)" }}>3</div>
          </div>
        </div>
      </div>

      {/* Cell B - 7-day Trend */}
      <div style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>7-day Trend</div>
        
        {/* Simple Bar Chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, flex: 1, paddingBottom: 12 }}>
          {[80, 95, 90, 40, 99, 98, 99.8].map((val, i) => {
            const color = val > 95 ? "var(--green)" : val > 70 ? "var(--amber)" : "var(--red)";
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${val}%`,
                  background: color,
                  borderRadius: "2px 2px 0 0",
                  opacity: 0.8,
                  cursor: "pointer",
                  transition: "opacity 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
                title={`Day ${i + 1}: ${val}% delivery rate`}
              />
            );
          })}
        </div>

        <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "var(--green)" }}>↑ 12%</span>
          <span>delivery rate vs last week</span>
        </div>
      </div>
    </div>
  );
}
