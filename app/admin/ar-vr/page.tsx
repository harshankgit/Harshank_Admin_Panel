'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { ARVRInterface } from '@/components/admin/ARVRInterface';

export default function ARVRPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AR/VR Interface</h1>
          <p className="text-muted-foreground">
            Immersive augmented and virtual reality interface for next-generation data interaction
          </p>
        </div>

        <ARVRInterface />
      </div>
    </AdminLayout>
  );
}