'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { AIContentGenerator } from '@/components/admin/AIContentGenerator';

export default function AIContentPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Content Generator</h1>
          <p className="text-muted-foreground">
            Generate high-quality content using advanced AI models for text, code, images, and more
          </p>
        </div>

        <AIContentGenerator />
      </div>
    </AdminLayout>
  );
}