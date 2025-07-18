'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MoreHorizontal, Eye, Truck, Package, CheckCircle, Clock, DollarSign, ShoppingCart, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchOrders, updateOrderStatus } from '@/store/slices/ordersSlice';
import { addNotification } from '@/store/slices/notificationsSlice';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { orders, loading, totalOrders } = useAppSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    dispatch(updateOrderStatus({ id: orderId, status }));
    dispatch(addNotification({
      title: 'Order Updated',
      message: `Order #${orderId} status changed to ${status}`,
      type: 'success',
    }));
  };

  const orderStats = [
    { 
      label: 'Total Orders', 
      value: totalOrders, 
      icon: ShoppingCart, 
      color: 'text-blue-500',
      change: '+12%'
    },
    { 
      label: 'Pending Orders', 
      value: orders.filter(o => o.status === 'pending').length, 
      icon: Clock, 
      color: 'text-yellow-500',
      change: '+5%'
    },
    { 
      label: 'Delivered', 
      value: orders.filter(o => o.status === 'delivered').length, 
      icon: CheckCircle, 
      color: 'text-green-500',
      change: '+18%'
    },
    { 
      label: 'Total Revenue', 
      value: `$${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, 
      icon: DollarSign, 
      color: 'text-purple-500',
      change: '+23%'
    },
  ];

  const recentActivity = [
    { action: 'Order #1234 shipped', time: '2 minutes ago', type: 'shipped' },
    { action: 'Order #1235 delivered', time: '15 minutes ago', type: 'delivered' },
    { action: 'New order #1236 received', time: '1 hour ago', type: 'new' },
    { action: 'Order #1237 cancelled', time: '2 hours ago', type: 'cancelled' },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'processing':
        return 'outline';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-500';
      case 'shipped': return 'text-blue-500';
      case 'processing': return 'text-yellow-500';
      case 'pending': return 'text-orange-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (value: string) => (
        <span className="font-mono">#{value}</span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (value: any, row: any) => (
        <div>
          <div className="font-medium">{row.customerName}</div>
          <div className="text-sm text-muted-foreground">{row.customerEmail}</div>
        </div>
      ),
    },
    {
      key: 'items',
      label: 'Items',
      render: (value: any[]) => (
        <div>
          <span className="font-medium">{value.length} item{value.length > 1 ? 's' : ''}</span>
          <div className="text-sm text-muted-foreground">
            {value[0]?.productName}{value.length > 1 ? ` +${value.length - 1} more` : ''}
          </div>
        </div>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">${value}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={getStatusVariant(value)} className="capitalize">
          {value}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
    },
  ];

  const actions = (row: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setSelectedOrder(row)}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange(row.id, 'processing')}
          disabled={row.status === 'processing' || row.status === 'shipped' || row.status === 'delivered'}
        >
          <Package className="mr-2 h-4 w-4" />
          Mark Processing
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange(row.id, 'shipped')}
          disabled={row.status === 'shipped' || row.status === 'delivered' || row.status === 'pending'}
        >
          <Truck className="mr-2 h-4 w-4" />
          Mark Shipped
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange(row.id, 'delivered')}
          disabled={row.status === 'delivered' || row.status !== 'shipped'}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark Delivered
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
            <p className="text-muted-foreground">
              Track and manage customer orders from placement to delivery
            </p>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          {orderStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  {' '}from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Orders ({totalOrders})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({orders.filter(o => o.status === 'pending').length})</TabsTrigger>
                <TabsTrigger value="processing">Processing ({orders.filter(o => o.status === 'processing').length})</TabsTrigger>
                <TabsTrigger value="shipped">Shipped ({orders.filter(o => o.status === 'shipped').length})</TabsTrigger>
                <TabsTrigger value="delivered">Delivered ({orders.filter(o => o.status === 'delivered').length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      data={orders}
                      columns={columns}
                      actions={actions}
                      onRowClick={(row) => setSelectedOrder(row)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {['pending', 'processing', 'shipped', 'delivered'].map((status) => (
                <TabsContent key={status} value={status}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="capitalize">{status} Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DataTable
                        data={orders.filter(o => o.status === status)}
                        columns={columns}
                        actions={actions}
                        onRowClick={(row) => setSelectedOrder(row)}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Order Activity & Quick Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`h-2 w-2 rounded-full ${
                      activity.type === 'delivered' ? 'bg-green-500' :
                      activity.type === 'shipped' ? 'bg-blue-500' :
                      activity.type === 'new' ? 'bg-purple-500' :
                      'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['pending', 'processing', 'shipped', 'delivered'].map((status) => {
                  const count = orders.filter(o => o.status === status).length;
                  const percentage = (count / totalOrders) * 100;
                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">{status}</span>
                        <span className="text-sm text-muted-foreground">{count} orders</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Bulk Process Orders
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Truck className="mr-2 h-4 w-4" />
                  Generate Shipping Labels
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Export Order Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  View Pending Actions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Details Dialog */}
        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Order Details - #{selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  Complete order information and tracking details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Customer Information</h3>
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                      <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">123 Main St, New York, NY 10001</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Ordered on {selectedOrder.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Order Status</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusVariant(selectedOrder.status)} className="capitalize">
                        {selectedOrder.status}
                      </Badge>
                      <span className={`text-sm ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status === 'delivered' ? 'Delivered successfully' :
                         selectedOrder.status === 'shipped' ? 'In transit' :
                         selectedOrder.status === 'processing' ? 'Being prepared' :
                         'Awaiting processing'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Order Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                        <div>
                          <p className="text-sm font-medium">Order Placed</p>
                          <p className="text-xs text-muted-foreground">{selectedOrder.createdAt}</p>
                        </div>
                      </div>
                      {selectedOrder.status !== 'pending' && (
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                          <div>
                            <p className="text-sm font-medium">Processing Started</p>
                            <p className="text-xs text-muted-foreground">1 hour after order</p>
                          </div>
                        </div>
                      )}
                      {(selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered') && (
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-blue-500 rounded-full" />
                          <div>
                            <p className="text-sm font-medium">Shipped</p>
                            <p className="text-xs text-muted-foreground">Tracking: TRK123456789</p>
                          </div>
                        </div>
                      )}
                      {selectedOrder.status === 'delivered' && (
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                          <div>
                            <p className="text-sm font-medium">Delivered</p>
                            <p className="text-xs text-muted-foreground">Signed by customer</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">${item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Order Summary</h3>
                    <div className="space-y-2 p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${(selectedOrder.total * 0.9).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>${(selectedOrder.total * 0.05).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${(selectedOrder.total * 0.05).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${selectedOrder.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Package className="mr-2 h-4 w-4" />
                      Update Status
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Truck className="mr-2 h-4 w-4" />
                      Track Package
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
}