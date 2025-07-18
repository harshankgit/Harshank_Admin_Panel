'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { GestureControl } from '@/components/admin/GestureControl';

export default function GestureControlPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gesture & Eye Tracking</h1>
          <p className="text-muted-foreground">
            Navigate and control the interface using hand gestures and eye tracking technology
          </p>
        </div>

        <GestureControl />
      </div>
    </AdminLayout>
  );
}