'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { SmartInsights } from '@/components/admin/SmartInsights';

export default function AIInsightsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">
            Advanced AI-powered business intelligence and predictive analytics
          </p>
        </div>

        <SmartInsights />
      </div>
    </AdminLayout>
  );
}