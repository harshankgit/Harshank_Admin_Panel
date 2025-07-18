'use client';

import { useAppSelector } from '@/hooks/useRedux';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { PrivateRoute } from '@/components/auth/PrivateRoute';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div
          className={cn(
            'transition-all duration-300 ease-in-out',
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          )}
        >
          <Header />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}