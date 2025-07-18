'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { BlockchainIntegration } from '@/components/admin/BlockchainIntegration';

export default function BlockchainPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blockchain Integration</h1>
          <p className="text-muted-foreground">
            Secure blockchain-powered data integrity, smart contracts, and decentralized operations
          </p>
        </div>

        <BlockchainIntegration />
      </div>
    </AdminLayout>
  );
}