'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { AutomationCenter } from '@/components/admin/AutomationCenter';

export default function AutomationPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automation Center</h1>
          <p className="text-muted-foreground">
            Intelligent workflow automation and business process optimization
          </p>
        </div>

        <AutomationCenter />
      </div>
    </AdminLayout>
  );
}