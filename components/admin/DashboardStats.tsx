'use client';

import { TrendingUp, TrendingDown, Users, Package, ShoppingCart, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/hooks/useRedux';

export function DashboardStats() {
  const { data } = useAppSelector((state) => state.analytics);

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${data?.totalRevenue?.toLocaleString() || '0'}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: data?.totalOrders?.toString() || '0',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: 'Total Users',
      value: data?.totalUsers?.toLocaleString() || '0',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Total Products',
      value: data?.totalProducts?.toString() || '0',
      change: '-2.1%',
      trend: 'down',
      icon: Package,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {stat.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-500 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 group-hover:scale-110 transition-transform duration-300" />
              )}
              <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {stat.change}
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}