"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ChannelKey = "email" | "discord" | "telegram" | "whatsapp";
type SendStatus = "idle" | "sending" | "success" | "error";

type RecentSend = {
  id: string;
  channel: ChannelKey;
  destination: string;
  message: string;
  status: "delivered" | "retrying" | "failed";
  latency: string;
  sent: string;
};

const channels: Record<
  ChannelKey,
  {
    label: string;
    connected: boolean;
    lastDelivery: string;
    inputLabel: string;
    placeholder: string;
    status: "connected" | "degraded" | "error";
  }
> = {
  email: {
    label: "Email",
    connected: true,
    lastDelivery: "2 min ago",
    inputLabel: "Recipient email",
    placeholder: "user@example.com",
    status: "connected",
  },
  discord: {
    label: "Discord",
    connected: true,
    lastDelivery: "8 min ago",
    inputLabel: "Webhook URL",
    placeholder: "https://discord.com/api/webhooks/...",
    status: "connected",
  },
  telegram: {
    label: "Telegram",
    connected: false,
    lastDelivery: "Never",
    inputLabel: "Chat ID",
    placeholder: "@username or chat ID",
    status: "error",
  },
  whatsapp: {
    label: "WhatsApp",
    connected: false,
    lastDelivery: "Never",
    inputLabel: "Phone number",
    placeholder: "+91 98XXXXXXXX",
    status: "degraded",
  },
};

const recentSends: RecentSend[] = [
  {
    id: "job_4812",
    channel: "email",
    destination: "user@acme.com",
    message: "Welcome to Dispatch!",
    status: "delivered",
    latency: "43ms",
    sent: "2 min ago",
  },
  {
    id: "job_4811",
    channel: "discord",
    destination: "#alerts",
    message: "CPU spike on api-worker-02",
    status: "retrying",
    latency: "118ms",
    sent: "7 min ago",
  },
  {
    id: "job_4810",
    channel: "telegram",
    destination: "@devbot",
    message: "Build passed on main",
    status: "failed",
    latency: "0ms",
    sent: "12 min ago",
  },
  {
    id: "job_4809",
    channel: "email",
    destination: "ops@linear.dev",
    message: "Daily digest is ready",
    status: "delivered",
    latency: "39ms",
    sent: "24 min ago",
  },
  {
    id: "job_4808",
    channel: "discord",
    destination: "#deploys",
    message: "Production deploy completed",
    status: "delivered",
    latency: "64ms",
    sent: "31 min ago",
  },
];

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "grid" },
  { label: "Send", href: "/dashboard/send", icon: "send" },
  { label: "Logs", href: "/dashboard/logs", icon: "logs" },
  { label: "Channels", href: "/dashboard/channels", icon: "channels" },
  { label: "API Keys", href: "/dashboard/keys", icon: "key" },
];

function Icon({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "send") {
    return (
      <svg {...common}>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    );
  }

  if (name === "logs") {
    return (
      <svg {...common}>
        <path d="M8 6h13" />
        <path d="M8 12h13" />
        <path d="M8 18h13" />
        <path d="M3 6h.01" />
        <path d="M3 12h.01" />
        <path d="M3 18h.01" />
      </svg>
    );
  }

  if (name === "channels") {
    return (
      <svg {...common}>
        <path d="M6 8a6 6 0 0 1 12 0" />
        <path d="M9 12a3 3 0 0 1 6 0" />
        <path d="M12 16h.01" />
      </svg>
    );
  }

  if (name === "key") {
    return (
      <svg {...common}>
        <circle cx="7.5" cy="15.5" r="4.5" />
        <path d="m11 12 9-9" />
        <path d="m15 7 2 2" />
        <path d="m18 4 2 2" />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg {...common}>
        <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 8.97 19.35a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.65 8.94a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.57 1.7 1.7 0 0 0 10 3V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.43 9c.25.55.78.91 1.39.97H21a2 2 0 0 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function statusColor(status: "connected" | "degraded" | "error" | RecentSend["status"]) {
  if (status === "connected" || status === "delivered") return "var(--green)";
  if (status === "degraded" || status === "retrying") return "var(--amber)";
  return "var(--red)";
}

export default function DashboardOverview() {
  const [selectedChannel, setSelectedChannel] = useState<ChannelKey>("email");
  const [message, setMessage] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedJob, setSelectedJob] = useState<RecentSend | null>(null);
  const [notice, setNotice] = useState("");
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");

  const selectedChannelData = channels[selectedChannel];

  const buttonLabel = useMemo(() => {
    if (sendStatus === "sending") return "Sending...";
    if (sendStatus === "success") return "Sent";
    if (sendStatus === "error") return "Failed - retry?";
    return "Send";
  }, [sendStatus]);

  function chooseChannel(channel: ChannelKey) {
    setSelectedChannel(channel);
    setSelectedJob(null);
    if (!channels[channel].connected) {
      setNotice("Connect this channel first");
      return;
    }
    setNotice("");
  }

  function selectRecentSend(send: RecentSend) {
    setSelectedJob(send);
    setSelectedChannel(send.channel);
    setDestination(send.destination);
    setMessage(send.message);
    setNotice("");
  }

  function handleSend() {
    if (!selectedChannelData.connected) {
      setNotice("Connect this channel first");
      return;
    }

    setSendStatus("sending");
    window.setTimeout(() => {
      const failed = !destination || !message;
      setSendStatus(failed ? "error" : "success");
      window.setTimeout(() => setSendStatus("idle"), failed ? 2000 : 1500);
    }, 700);
  }

  return (
    <div className="dispatch-dashboard">
      <aside className="dispatch-sidebar">
        <nav className="dispatch-sidebar-nav" aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const active = item.href === "/dashboard" || item.href === "/dashboard/send";
            return (
              <Link
                className={`dispatch-nav-row${active ? " active" : ""}`}
                href={item.href === "/dashboard/send" ? "/dashboard" : item.href}
                key={item.label}

            
              >
                <span className="dispatch-nav-icon">
                  <Icon name={item.icon} />
                </span>
                <span className="dispatch-nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="dispatch-sidebar-bottom">
          <Link className="dispatch-nav-row" href="/dashboard/settings">
            <span className="dispatch-nav-icon">
              <Icon name="settings" />
            </span>
            <span className="dispatch-nav-label">Settings</span>
          </Link>
          <button className="dispatch-avatar-row" type="button" aria-label="Open profile menu">
            <span className="dispatch-avatar">A</span>
            <span className="dispatch-nav-label">Profile</span>
          </button>
        </div>
      </aside>

      <div className="dispatch-workspace">
        <header className="dispatch-topbar">
          <Link href="/"> <h1> Disptach </h1></Link>
          <div className="dispatch-topbar-actions">
            <div className="dispatch-channel-pills" aria-label="Channel status">
              {(Object.keys(channels) as ChannelKey[]).map((channel) => (
                <button
                  className="dispatch-status-pill"
                  key={channel}
                  onClick={() => chooseChannel(channel)}
                  type="button"
                >
                  <span style={{ background: statusColor(channels[channel].status) }} />
                  {channels[channel].label}
                </button>
              ))}
            </div>
            <button className="dispatch-search-button" type="button">
              Search...
              <kbd>K</kbd>
            </button>
          </div>
        </header>

        <div className="dispatch-content">
          <main className="dispatch-main-panel">
            <section className="dispatch-send-panel" aria-labelledby="send-title">
              <div>
                <h2 id="send-title">Send a notification</h2>
                <div className="dispatch-selector" role="listbox" aria-label="Channels">
                  {(Object.keys(channels) as ChannelKey[]).map((channel) => (
                    <button
                      className={`dispatch-channel-button${selectedChannel === channel ? " selected" : ""}`}
                      data-disabled={!channels[channel].connected}
                      key={channel}
                      onClick={() => chooseChannel(channel)}
                      type="button"
                    >
                      {channels[channel].label}
                    </button>
                  ))}
                </div>
                {notice ? (
                  <p className="dispatch-inline-note">
                    {notice} <Link href="/dashboard/channels">Channels</Link>
                  </p>
                ) : null}
              </div>

              <label className="dispatch-field">
                <span>Message</span>
                <span className="dispatch-textarea-wrap">
                  <textarea
                    maxLength={500}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type your message..."
                    value={message}
                  />
                  <span className="dispatch-count">{message.length} / 500</span>
                </span>
              </label>

              <label className="dispatch-field">
                <span>{selectedChannelData.inputLabel}</span>
                <input
                  onChange={(event) => setDestination(event.target.value)}
                  placeholder={selectedChannelData.placeholder}
                  type="text"
                  value={destination}
                />
              </label>

              <button
                className={`dispatch-send-button ${sendStatus}`}
                disabled={sendStatus === "sending"}
                onClick={handleSend}
                type="button"
              >
                {sendStatus === "sending" ? <span className="dispatch-spinner" /> : null}
                {buttonLabel}
              </button>
            </section>

            <section className="dispatch-recent" aria-labelledby="recent-title">
              <h3 id="recent-title">Recent sends</h3>
              <div>
                {recentSends.slice(0, 5).map((send) => (
                  <button
                    className="dispatch-recent-row"
                    key={send.id}
                    onClick={() => selectRecentSend(send)}
                    type="button"
                  >
                    <span className="dispatch-mini-icon">
                      <Icon name={send.channel === "email" ? "send" : "channels"} />
                    </span>
                    <span className="dispatch-recent-destination">{send.destination}</span>
                    <span className="dispatch-recent-message">&quot;{send.message}&quot;</span>
                    <span className="dispatch-row-dot" style={{ background: statusColor(send.status) }} />
                  </button>
                ))}
              </div>
            </section>
          </main>

          <aside className="dispatch-right-panel" aria-label="Context panel">
            {selectedJob ? (
              <JobDetail job={selectedJob} />
            ) : (
              <ChannelContext channel={selectedChannel} />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function ChannelContext({ channel }: { channel: ChannelKey }) {
  const data = channels[channel];

  if (!data.connected) {
    return (
      <section className="dispatch-context-section">
        <h2>Connect {data.label}</h2>
        <p className="dispatch-muted">Configure this channel without leaving the send flow.</p>
        <label className="dispatch-field">
          <span>{data.label === "WhatsApp" ? "Business phone ID" : "Credential"}</span>
          <input placeholder={data.label === "WhatsApp" ? "phone_number_id" : "Paste credential"} type="text" />
        </label>
        <label className="dispatch-field">
          <span>Secret</span>
          <input placeholder="****************" type="password" />
        </label>
        <button className="dispatch-secondary-button" type="button">
          Connect {data.label}
        </button>
      </section>
    );
  }

  return (
    <section className="dispatch-context-section">
      <h2>Getting started</h2>
      <ul className="dispatch-checklist">
        <li className="done">Connect your first channel</li>
        <li className="done">Generate an API key</li>
        <li>Send your first notification</li>
        <li>Explore the logs</li>
      </ul>

      <div className="dispatch-channel-card">
        <div>
          <span className="dispatch-live-dot" />
          <strong>Connected</strong>
        </div>
        <p>{data.label} last delivered {data.lastDelivery}.</p>
        <button className="dispatch-secondary-button" type="button">
          Test connection
        </button>
      </div>
    </section>
  );
}

function JobDetail({ job }: { job: RecentSend }) {
  const timeline = ["Job created", "Pushed to stream", "Worker picked up", "Delivered via Resend"];
  const statusLabel = {
    delivered: "Delivered",
    retrying: "Retrying",
    failed: "Failed",
  }[job.status];

  return (
    <section className="dispatch-context-section">
      <h2>Job detail</h2>
      <dl className="dispatch-detail-list">
        <div>
          <dt>Channel</dt>
          <dd>{channels[job.channel].label}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{statusLabel}</dd>
        </div>
        <div>
          <dt>Sent</dt>
          <dd>{job.sent}</dd>
        </div>
        <div>
          <dt>Destination</dt>
          <dd>{job.destination}</dd>
        </div>
        <div>
          <dt>Message</dt>
          <dd>&quot;{job.message}&quot;</dd>
        </div>
        <div>
          <dt>Latency</dt>
          <dd>{job.latency}</dd>
        </div>
      </dl>

      <h3>Timeline</h3>
      <ol className="dispatch-timeline">
        {timeline.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  );
}
