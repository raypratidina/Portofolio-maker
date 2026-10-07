import './admin.css';
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell min-h-screen">{children}</div>;
}
