'use client';

import { useState, useEffect } from 'react';
import { Server, Database, Wifi, HardDrive, Cpu, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface SystemMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  icon: React.ComponentType<any>;
  unit: string;
}

export function SystemStatus() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 45, status: 'healthy', icon: Cpu, unit: '%' },
    { name: 'Memory', value: 68, status: 'warning', icon: HardDrive, unit: '%' },
    { name: 'Database', value: 92, status: 'healthy', icon: Database, unit: '%' },
    { name: 'Network', value: 23, status: 'healthy', icon: Wifi, unit: 'MB/s' },
    { name: 'Server Load', value: 34, status: 'healthy', icon: Server, unit: '%' },
    { name: 'Response Time', value: 156, status: 'healthy', icon: Activity, unit: 'ms' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10)),
        status: metric.value > 80 ? 'critical' : metric.value > 60 ? 'warning' : 'healthy'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'critical':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="space-y-2 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <metric.icon className={`h-4 w-4 ${getStatusColor(metric.status)} group-hover:scale-110 transition-all duration-300`} />
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {metric.value.toFixed(0)}{metric.unit}
                </span>
                <Badge variant={getStatusBadge(metric.status)} className="text-xs">
                  {metric.status}
                </Badge>
              </div>
            </div>
            <Progress 
              value={metric.value} 
              className={`h-2 transition-all duration-500 hover:h-3 ${
                metric.status === 'critical' ? '[&>div]:bg-red-500' :
                metric.status === 'warning' ? '[&>div]:bg-yellow-500' :
                '[&>div]:bg-green-500'
              }`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}