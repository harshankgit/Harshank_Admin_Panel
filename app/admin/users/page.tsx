'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataTable } from '@/components/admin/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { MoreHorizontal, UserPlus, Mail, Phone, MapPin, Calendar, Shield, Crown, Star, TrendingUp, Users, Activity } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchUsers, updateUserStatus } from '@/store/slices/usersSlice';
import { addNotification } from '@/store/slices/notificationsSlice';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { users, loading, totalUsers } = useAppSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
    department: '',
    phone: ''
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleStatusChange = (userId: string, status: 'active' | 'inactive') => {
    dispatch(updateUserStatus({ id: userId, status }));
    dispatch(addNotification({
      title: 'User Updated',
      message: `User status changed to ${status}`,
      type: 'success',
    }));
  };

  const handleCreateUser = () => {
    dispatch(addNotification({
      title: 'User Created',
      message: `New user ${newUser.name} has been created`,
      type: 'success',
    }));
    setIsCreateDialogOpen(false);
    setNewUser({ name: '', email: '', role: 'user', department: '', phone: '' });
  };

  const userStats = [
    { label: 'Total Users', value: totalUsers, icon: Users, color: 'text-blue-500' },
    { label: 'Active Users', value: users.filter(u => u.status === 'active').length, icon: Activity, color: 'text-green-500' },
    { label: 'Admins', value: users.filter(u => u.role === 'admin').length, icon: Crown, color: 'text-yellow-500' },
    { label: 'New This Month', value: 12, icon: TrendingUp, color: 'text-purple-500' },
  ];

  const columns = [
    {
      key: 'user',
      label: 'User',
      render: (value: any, row: any) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.avatar} alt={row.name} />
            <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value: string) => (
        <Badge variant="outline" className="capitalize">
          {value === 'admin' && <Crown className="h-3 w-3 mr-1" />}
          {value === 'moderator' && <Shield className="h-3 w-3 mr-1" />}
          {value}
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
    {
      key: 'createdAt',
      label: 'Created',
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
        <DropdownMenuItem onClick={() => setSelectedUser(row)}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Edit User</DropdownMenuItem>
        <DropdownMenuItem>Send Message</DropdownMenuItem>
        <DropdownMenuItem>Reset Password</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange(
            row.id, 
            row.status === 'active' ? 'inactive' : 'active'
          )}
        >
          {row.status === 'active' ? 'Deactivate' : 'Activate'}
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
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage users, roles, and permissions across your platform
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Add a new user to your platform with appropriate permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      placeholder="Engineering"
                    />
                  </div>
                </div>
                <Button onClick={handleCreateUser} className="w-full">
                  Create User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* User Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          {userStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Progress value={75} className="mt-2 h-1" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Users ({totalUsers})</TabsTrigger>
            <TabsTrigger value="active">Active ({users.filter(u => u.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive ({users.filter(u => u.status === 'inactive').length})</TabsTrigger>
            <TabsTrigger value="admins">Admins ({users.filter(u => u.role === 'admin').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={users}
                  columns={columns}
                  actions={actions}
                  onRowClick={(row) => setSelectedUser(row)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={users.filter(u => u.status === 'active')}
                  columns={columns}
                  actions={actions}
                  onRowClick={(row) => setSelectedUser(row)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive">
            <Card>
              <CardHeader>
                <CardTitle>Inactive Users</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={users.filter(u => u.status === 'inactive')}
                  columns={columns}
                  actions={actions}
                  onRowClick={(row) => setSelectedUser(row)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins">
            <Card>
              <CardHeader>
                <CardTitle>Admin Users</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={users.filter(u => u.role === 'admin')}
                  columns={columns}
                  actions={actions}
                  onRowClick={(row) => setSelectedUser(row)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User Profile Dialog */}
        {selectedUser && (
          <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>User Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    <AvatarFallback className="text-lg">{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{selectedUser.role}</Badge>
                      <Badge variant={selectedUser.status === 'active' ? 'default' : 'secondary'}>
                        {selectedUser.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">New York, NY</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Account Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Joined {selectedUser.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Last active 2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">Logged in from New York, NY</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">Updated profile information</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">Changed password</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
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