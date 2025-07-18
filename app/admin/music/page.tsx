'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { MusicPlayer } from '@/components/admin/MusicPlayer';

export default function MusicPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Music Player</h1>
          <p className="text-muted-foreground">
            Intelligent music player with AI-powered recommendations, ambient sound generation, and productivity-focused playlists
          </p>
        </div>

        <MusicPlayer />
      </div>
    </AdminLayout>
  );
}