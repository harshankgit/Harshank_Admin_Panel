'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { NeuralNetworkVisualizer } from '@/components/admin/NeuralNetworkVisualizer';

export default function NeuralNetworkPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Neural Network Visualizer</h1>
          <p className="text-muted-foreground">
            Interactive visualization of neural network architecture, training, and real-time activity
          </p>
        </div>

        <NeuralNetworkVisualizer />
      </div>
    </AdminLayout>
  );
}