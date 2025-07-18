'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataVisualization3D } from '@/components/admin/DataVisualization3D';

export default function DataVisualization3DPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">3D Data Visualization</h1>
          <p className="text-muted-foreground">
            Interactive 3D data visualization with real-time rendering and advanced analytics
          </p>
        </div>

        <DataVisualization3D />
      </div>
    </AdminLayout>
  );
}