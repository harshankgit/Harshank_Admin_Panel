'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { MoreHorizontal, Plus, Eye, Edit, Trash2, Package, TrendingUp, AlertTriangle, Star, DollarSign, BarChart3 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchProducts, updateProductStatus } from '@/store/slices/productsSlice';
import { addNotification } from '@/store/slices/notificationsSlice';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { products, loading, totalProducts } = useAppSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    sku: ''
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleStatusChange = (productId: string, status: 'active' | 'inactive') => {
    dispatch(updateProductStatus({ id: productId, status }));
    dispatch(addNotification({
      title: 'Product Updated',
      message: `Product status changed to ${status}`,
      type: 'success',
    }));
  };

  const handleCreateProduct = () => {
    dispatch(addNotification({
      title: 'Product Created',
      message: `New product ${newProduct.name} has been created`,
      type: 'success',
    }));
    setIsCreateDialogOpen(false);
    setNewProduct({ name: '', description: '', price: '', stock: '', category: '', sku: '' });
  };

  const productStats = [
    { 
      label: 'Total Products', 
      value: totalProducts, 
      icon: Package, 
      color: 'text-blue-500',
      change: '+12%'
    },
    { 
      label: 'Active Products', 
      value: products.filter(p => p.status === 'active').length, 
      icon: TrendingUp, 
      color: 'text-green-500',
      change: '+8%'
    },
    { 
      label: 'Low Stock', 
      value: products.filter(p => p.stock < 20).length, 
      icon: AlertTriangle, 
      color: 'text-yellow-500',
      change: '-5%'
    },
    { 
      label: 'Total Value', 
      value: `$${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}`, 
      icon: DollarSign, 
      color: 'text-purple-500',
      change: '+15%'
    },
  ];

  const topCategories = [
    { name: 'Electronics', count: 45, revenue: '$125,000', growth: '+23%' },
    { name: 'Appliances', count: 28, revenue: '$89,000', growth: '+18%' },
    { name: 'Accessories', count: 16, revenue: '$34,000', growth: '+12%' },
  ];

  const columns = [
    {
      key: 'product',
      label: 'Product',
      render: (value: any, row: any) => (
        <div className="flex items-center space-x-3">
          <img
            src={row.image}
            alt={row.name}
            className="h-10 w-10 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
              {row.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (value: number) => `$${value}`,
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (value: number) => (
        <Badge variant={value > 20 ? 'default' : value > 10 ? 'secondary' : 'destructive'}>
          {value} units
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
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
        <DropdownMenuItem onClick={() => setSelectedProduct(row)}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit Product
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BarChart3 className="mr-2 h-4 w-4" />
          View Analytics
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange(
            row.id, 
            row.status === 'active' ? 'inactive' : 'active'
          )}
        >
          {row.status === 'active' ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
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
            <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
            <p className="text-muted-foreground">
              Manage your product inventory, pricing, and availability
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogDescription>
                  Add a new product to your inventory with all necessary details.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="Wireless Headphones"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                      placeholder="WH-001"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="High-quality wireless headphones with noise cancellation..."
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="299.99"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      placeholder="50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Appliances">Appliances</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Clothing">Clothing</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleCreateProduct} className="w-full">
                  Create Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Product Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          {productStats.map((stat, index) => (
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
                <TabsTrigger value="all">All Products ({totalProducts})</TabsTrigger>
                <TabsTrigger value="active">Active ({products.filter(p => p.status === 'active').length})</TabsTrigger>
                <TabsTrigger value="low-stock">Low Stock ({products.filter(p => p.stock < 20).length})</TabsTrigger>
                <TabsTrigger value="inactive">Inactive ({products.filter(p => p.status === 'inactive').length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>All Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      data={products}
                      columns={columns}
                      actions={actions}
                      onRowClick={(row) => setSelectedProduct(row)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="active">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      data={products.filter(p => p.status === 'active')}
                      columns={columns}
                      actions={actions}
                      onRowClick={(row) => setSelectedProduct(row)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="low-stock">
                <Card>
                  <CardHeader>
                    <CardTitle>Low Stock Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      data={products.filter(p => p.stock < 20)}
                      columns={columns}
                      actions={actions}
                      onRowClick={(row) => setSelectedProduct(row)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inactive">
                <Card>
                  <CardHeader>
                    <CardTitle>Inactive Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      data={products.filter(p => p.status === 'inactive')}
                      columns={columns}
                      actions={actions}
                      onRowClick={(row) => setSelectedProduct(row)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Category Overview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="outline">{category.count} products</Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{category.revenue}</span>
                      <span className="text-green-600">{category.growth}</span>
                    </div>
                    <Progress value={(category.count / totalProducts) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Bulk Import Products
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Check Low Stock
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4" />
                  Featured Products
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Dialog */}
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Product Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Price</Label>
                      <p className="text-2xl font-bold">${selectedProduct.price}</p>
                    </div>
                    <div>
                      <Label>Stock</Label>
                      <p className="text-2xl font-bold">{selectedProduct.stock} units</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                    <p className="text-muted-foreground">{selectedProduct.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <p className="font-medium">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Badge variant={selectedProduct.status === 'active' ? 'default' : 'secondary'}>
                        {selectedProduct.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label>Performance Metrics</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Sales This Month</span>
                        <span className="text-sm font-medium">24 units</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <div className="flex justify-between">
                        <span className="text-sm">Revenue Generated</span>
                        <span className="text-sm font-medium">$7,199.76</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Product
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
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