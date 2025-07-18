'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { RealTimeCollaboration } from '@/components/admin/RealTimeCollaboration';

export default function CollaborationPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Real-Time Collaboration</h1>
          <p className="text-muted-foreground">
            Collaborate with your team in real-time with live cursors, chat, and shared workspaces
          </p>
        </div>

        <RealTimeCollaboration />
      </div>
    </AdminLayout>
  );
}