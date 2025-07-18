'use client';

import { Clock, User, Package, ShoppingCart, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Activity {
  id: string;
  type: 'user' | 'product' | 'order' | 'system';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'user',
    title: 'New user registered',
    description: 'John Doe created a new account',
    timestamp: '2 minutes ago',
    user: 'System'
  },
  {
    id: '2',
    type: 'order',
    title: 'Order completed',
    description: 'Order #1234 has been delivered',
    timestamp: '5 minutes ago',
    user: 'Admin'
  },
  {
    id: '3',
    type: 'product',
    title: 'Product updated',
    description: 'Wireless Headphones stock updated',
    timestamp: '10 minutes ago',
    user: 'Manager'
  },
  {
    id: '4',
    type: 'system',
    title: 'System backup',
    description: 'Daily backup completed successfully',
    timestamp: '1 hour ago',
    user: 'System'
  },
  {
    id: '5',
    type: 'user',
    title: 'User role changed',
    description: 'Alice Johnson promoted to admin',
    timestamp: '2 hours ago',
    user: 'Super Admin'
  },
];

export function RecentActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'product':
        return <Package className="h-4 w-4 text-green-500" />;
      case 'order':
        return <ShoppingCart className="h-4 w-4 text-purple-500" />;
      case 'system':
        return <Settings className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityBadge = (type: string) => {
    const variants = {
      user: 'default',
      product: 'secondary',
      order: 'outline',
      system: 'destructive'
    } as const;
    
    return variants[type as keyof typeof variants] || 'default';
  };

  return (
    <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="space-y-1 p-4">
            {mockActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 transform hover:scale-102 cursor-pointer group"
              >
                <div className="group-hover:scale-110 transition-all duration-300">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors duration-300">{activity.title}</p>
                    <Badge variant={getActivityBadge(activity.type)} className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      by {activity.user}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}