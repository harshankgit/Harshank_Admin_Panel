'use client';

import { Plus, Upload, Download, RefreshCw, Settings, Users, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

export function QuickActions() {
  const dispatch = useAppDispatch();

  const handleQuickAction = (action: string) => {
    dispatch(addNotification({
      title: 'Quick Action',
      message: `${action} action initiated`,
      type: 'info',
    }));
  };

  const quickActions = [
    { label: 'Add User', icon: Users, action: 'Add User' },
    { label: 'Add Product', icon: Package, action: 'Add Product' },
    { label: 'Import Data', icon: Upload, action: 'Import Data' },
    { label: 'Export Report', icon: Download, action: 'Export Report' },
    { label: 'Sync Data', icon: RefreshCw, action: 'Sync Data' },
    { label: 'System Settings', icon: Settings, action: 'System Settings' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              className="justify-start gap-2 transform hover:scale-105 transition-all duration-300 hover:shadow-md group"
              onClick={() => handleQuickAction(action.action)}
            >
              <action.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}