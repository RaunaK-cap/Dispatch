export const metadata = {
  title: "Dashboard - Dispatch",
  description: "Manage your notification pipeline",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ background: "#ffffff", minHeight: "100vh" }}>{children}</div>;
}
