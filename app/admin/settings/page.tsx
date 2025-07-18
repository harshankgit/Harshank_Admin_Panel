'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  Smartphone, 
  Globe, 
  Key, 
  Users, 
  Palette,
  Monitor,
  Wifi,
  HardDrive,
  Activity,
  Lock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const [settings, setSettings] = useState({
    siteName: 'AI Admin Pro',
    siteUrl: 'https://admin.example.com',
    description: 'A comprehensive AI-powered admin panel for managing your business',
    timezone: 'utc',
    language: 'en',
    emailNotifications: true,
    pushNotifications: true,
    orderAlerts: true,
    lowStockWarnings: true,
    systemUpdates: false,
    twoFactorAuth: false,
    sessionTimeout: 60,
    loginNotifications: true,
    apiRateLimit: true,
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 68,
    disk: 34,
    network: 92
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (section: string) => {
    dispatch(addNotification({
      title: 'Settings Saved',
      message: `${section} settings have been updated successfully`,
      type: 'success',
    }));
  };

  const securityFeatures = [
    { name: 'SSL Certificate', status: 'active', description: 'HTTPS encryption enabled' },
    { name: 'Firewall Protection', status: 'active', description: 'Advanced threat protection' },
    { name: 'DDoS Protection', status: 'active', description: 'Cloudflare protection enabled' },
    { name: 'Backup Encryption', status: 'active', description: 'AES-256 encryption' },
    { name: 'Access Logs', status: 'active', description: 'Comprehensive audit trail' },
  ];

  const integrations = [
    { name: 'Stripe', status: 'connected', description: 'Payment processing' },
    { name: 'SendGrid', status: 'connected', description: 'Email delivery service' },
    { name: 'AWS S3', status: 'connected', description: 'File storage' },
    { name: 'Google Analytics', status: 'pending', description: 'Website analytics' },
    { name: 'Slack', status: 'disconnected', description: 'Team notifications' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">
            Manage your application preferences, security, and system configurations
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Site Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure basic application settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="site-name">Site Name</Label>
                      <Input 
                        id="site-name" 
                        value={settings.siteName}
                        onChange={(e) => handleSettingChange('siteName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="site-url">Site URL</Label>
                      <Input 
                        id="site-url" 
                        value={settings.siteUrl}
                        onChange={(e) => handleSettingChange('siteUrl', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={settings.description}
                      onChange={(e) => handleSettingChange('description', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                          <SelectItem value="cet">Central European Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={() => handleSave('General')}>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Appearance & Branding
                  </CardTitle>
                  <CardDescription>
                    Customize the look and feel of your admin panel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm">Light</Button>
                        <Button variant="outline" size="sm">Dark</Button>
                        <Button variant="default" size="sm">Auto</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                        <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                        <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                        <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logo">Logo URL</Label>
                      <Input id="logo" placeholder="https://example.com/logo.png" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="favicon">Favicon URL</Label>
                      <Input id="favicon" placeholder="https://example.com/favicon.ico" />
                    </div>
                  </div>
                  <Button onClick={() => handleSave('Appearance')}>Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Browser push notifications
                      </p>
                    </div>
                    <Switch 
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>New Order Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new orders are placed
                      </p>
                    </div>
                    <Switch 
                      checked={settings.orderAlerts}
                      onCheckedChange={(checked) => handleSettingChange('orderAlerts', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Low Stock Warnings</Label>
                      <p className="text-sm text-muted-foreground">
                        Alert when products are running low
                      </p>
                    </div>
                    <Switch 
                      checked={settings.lowStockWarnings}
                      onCheckedChange={(checked) => handleSettingChange('lowStockWarnings', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications about system maintenance
                      </p>
                    </div>
                    <Switch 
                      checked={settings.systemUpdates}
                      onCheckedChange={(checked) => handleSettingChange('systemUpdates', checked)}
                    />
                  </div>
                  <Button onClick={() => handleSave('Notifications')}>Save Preferences</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Delivery Channels
                  </CardTitle>
                  <CardDescription>
                    Configure how notifications are delivered
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span className="font-medium">Email</span>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">admin@example.com</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span className="font-medium">SMS</span>
                        </div>
                        <Badge variant="secondary">Setup Required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Configure phone number</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <span className="font-medium">Slack</span>
                        </div>
                        <Badge variant="outline">Available</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Connect Slack workspace</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Notification Channel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch 
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="session-timeout" 
                      type="number" 
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Login Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified of new login attempts
                      </p>
                    </div>
                    <Switch 
                      checked={settings.loginNotifications}
                      onCheckedChange={(checked) => handleSettingChange('loginNotifications', checked)}
                    />
                  </div>
                  <Button onClick={() => handleSave('Security')}>Update Security Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security Features
                  </CardTitle>
                  <CardDescription>
                    Current security measures and protections
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{feature.name}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                        {feature.status === 'active' ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        )}
                        {feature.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    System Health
                  </CardTitle>
                  <CardDescription>
                    Monitor system performance and resource usage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">CPU Usage</span>
                        <span className="text-sm">{systemHealth.cpu}%</span>
                      </div>
                      <Progress value={systemHealth.cpu} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Memory Usage</span>
                        <span className="text-sm">{systemHealth.memory}%</span>
                      </div>
                      <Progress value={systemHealth.memory} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Disk Usage</span>
                        <span className="text-sm">{systemHealth.disk}%</span>
                      </div>
                      <Progress value={systemHealth.disk} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Network</span>
                        <span className="text-sm">{systemHealth.network}%</span>
                      </div>
                      <Progress value={systemHealth.network} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Backup & Maintenance
                  </CardTitle>
                  <CardDescription>
                    Configure automated backups and maintenance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable scheduled database backups
                      </p>
                    </div>
                    <Switch 
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Backup Frequency</Label>
                    <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable maintenance mode for updates
                      </p>
                    </div>
                    <Switch 
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Database className="mr-2 h-4 w-4" />
                      Create Manual Backup
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Activity className="mr-2 h-4 w-4" />
                      Run System Diagnostics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Third-Party Integrations
                </CardTitle>
                <CardDescription>
                  Manage connections to external services and APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {integrations.map((integration, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{integration.name}</h3>
                        <Badge variant={
                          integration.status === 'connected' ? 'default' :
                          integration.status === 'pending' ? 'secondary' : 'outline'
                        }>
                          {integration.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                      <Button 
                        variant={integration.status === 'connected' ? 'outline' : 'default'} 
                        size="sm"
                        className="w-full"
                      >
                        {integration.status === 'connected' ? 'Disconnect' :
                         integration.status === 'pending' ? 'Complete Setup' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Configuration
                  </CardTitle>
                  <CardDescription>
                    Manage API keys and external integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="api-key" 
                        type="password" 
                        value="sk-1234567890abcdef" 
                        readOnly 
                      />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input 
                      id="webhook-url" 
                      placeholder="https://your-app.com/webhook"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>API Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable rate limiting for API requests
                      </p>
                    </div>
                    <Switch 
                      checked={settings.apiRateLimit}
                      onCheckedChange={(checked) => handleSettingChange('apiRateLimit', checked)}
                    />
                  </div>
                  <Button onClick={() => handleSave('API')}>Save API Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Developer Options
                  </CardTitle>
                  <CardDescription>
                    Advanced settings for developers and debugging
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable detailed error logging
                      </p>
                    </div>
                    <Switch 
                      checked={settings.debugMode}
                      onCheckedChange={(checked) => handleSettingChange('debugMode', checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Log Level</Label>
                    <Select defaultValue="info">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="debug">Debug</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <HardDrive className="mr-2 h-4 w-4" />
                      Download Logs
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Activity className="mr-2 h-4 w-4" />
                      Clear Cache
                    </Button>
                    <Button variant="destructive" className="w-full">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Reset to Defaults
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}