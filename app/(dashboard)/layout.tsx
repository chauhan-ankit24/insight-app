// NO 'use client' here.
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // This renders instantly on the server.
  // No more "flashes" of null or loading states.
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="no-scrollbar h-full min-w-0 flex-1 overflow-y-auto scroll-smooth p-6">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
