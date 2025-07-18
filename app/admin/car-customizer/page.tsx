'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { CarCustomizer3D } from '@/components/admin/CarCustomizer3D';

export default function CarCustomizerPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            3D Car Customization Studio
          </h1>
          <p className="text-muted-foreground">
            Experience immersive 3D car visualization with 360° rotation, real-time customization, and premium animations
          </p>
        </div>

        <CarCustomizer3D />
      </div>
    </AdminLayout>
  );
}