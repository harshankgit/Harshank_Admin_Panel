'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdvancedAnalytics } from '@/components/admin/AdvancedAnalytics';

export default function AdvancedAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Real-time analytics, predictive modeling, and machine learning insights
          </p>
        </div>

        <AdvancedAnalytics />
      </div>
    </AdminLayout>
  );
}