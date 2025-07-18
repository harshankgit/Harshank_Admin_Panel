'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { VoiceControlCenter } from '@/components/admin/VoiceControlCenter';

export default function VoiceControlPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Voice Control Center</h1>
          <p className="text-muted-foreground">
            Control your admin panel with advanced voice commands and AI-powered speech recognition
          </p>
        </div>

        <VoiceControlCenter />
      </div>
    </AdminLayout>
  );
}