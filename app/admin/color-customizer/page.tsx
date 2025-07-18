'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { ColorCustomizer } from '@/components/admin/ColorCustomizer';

export default function ColorCustomizerPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Color Customization</h1>
          <p className="text-muted-foreground">
            Customize colors for the entire admin panel and individual modules
          </p>
        </div>

        <ColorCustomizer />
      </div>
    </AdminLayout>
  );
}