'use client';

import { useState, useEffect } from 'react';
import { Glasses, Smartphone, Monitor, Headphones, Zap, Eye, Hand, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface ARObject {
  id: string;
  type: 'chart' | 'widget' | 'notification' | 'menu';
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
  visible: boolean;
  interactive: boolean;
}

interface VREnvironment {
  id: string;
  name: string;
  description: string;
  active: boolean;
  objects: ARObject[];
}

export function ARVRInterface() {
  const [isAREnabled, setIsAREnabled] = useState(false);
  const [isVREnabled, setIsVREnabled] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [arObjects, setArObjects] = useState<ARObject[]>([]);
  const [vrEnvironments, setVrEnvironments] = useState<VREnvironment[]>([
    {
      id: '1',
      name: 'Executive Dashboard',
      description: 'Immersive 3D dashboard with floating analytics panels',
      active: false,
      objects: []
    },
    {
      id: '2',
      name: 'Data Visualization Space',
      description: '360° data visualization environment with interactive charts',
      active: false,
      objects: []
    },
    {
      id: '3',
      name: 'Collaboration Room',
      description: 'Virtual meeting space for team collaboration',
      active: true,
      objects: []
    }
  ]);
  const [headsetStatus, setHeadsetStatus] = useState({
    battery: 85,
    temperature: 32,
    fps: 90,
    latency: 18
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Simulate device detection
    const checkDevices = () => {
      setDeviceConnected(Math.random() > 0.3);
    };

    checkDevices();
    const interval = setInterval(checkDevices, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isAREnabled) {
      initializeAR();
    }
  }, [isAREnabled]);

  useEffect(() => {
    if (isVREnabled) {
      initializeVR();
    }
  }, [isVREnabled]);

  const initializeAR = () => {
    // Create initial AR objects
    const initialObjects: ARObject[] = [
      {
        id: '1',
        type: 'chart',
        position: { x: 0, y: 1.5, z: -2 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1,
        visible: true,
        interactive: true
      },
      {
        id: '2',
        type: 'widget',
        position: { x: -1.5, y: 1, z: -1.5 },
        rotation: { x: 0, y: 45, z: 0 },
        scale: 0.8,
        visible: true,
        interactive: true
      },
      {
        id: '3',
        type: 'notification',
        position: { x: 1.5, y: 2, z: -1 },
        rotation: { x: 0, y: -30, z: 0 },
        scale: 0.6,
        visible: true,
        interactive: false
      }
    ];

    setArObjects(initialObjects);
    
    dispatch(addNotification({
      title: 'AR Mode Activated',
      message: 'Augmented reality interface is now active',
      type: 'success',
    }));
  };

  const initializeVR = () => {
    dispatch(addNotification({
      title: 'VR Mode Activated',
      message: 'Virtual reality environment is loading...',
      type: 'info',
    }));

    // Simulate VR environment loading
    setTimeout(() => {
      dispatch(addNotification({
        title: 'VR Environment Ready',
        message: 'You can now interact with the virtual dashboard',
        type: 'success',
      }));
    }, 3000);
  };

  const toggleARObject = (objectId: string) => {
    setArObjects(prev => prev.map(obj => 
      obj.id === objectId 
        ? { ...obj, visible: !obj.visible }
        : obj
    ));
  };

  const switchVREnvironment = (environmentId: string) => {
    setVrEnvironments(prev => prev.map(env => ({
      ...env,
      active: env.id === environmentId
    })));

    dispatch(addNotification({
      title: 'VR Environment Changed',
      message: `Switched to ${vrEnvironments.find(e => e.id === environmentId)?.name}`,
      type: 'info',
    }));
  };

  const getObjectIcon = (type: string) => {
    switch (type) {
      case 'chart': return <Layers className="h-4 w-4 text-blue-500" />;
      case 'widget': return <Monitor className="h-4 w-4 text-green-500" />;
      case 'notification': return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'menu': return <Hand className="h-4 w-4 text-purple-500" />;
      default: return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AR/VR Control Header */}
      <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Glasses className="h-5 w-5 text-purple-500" />
            AR/VR Interface Control
            <Badge variant="outline" className="ml-2">
              {deviceConnected ? (
                <>
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                  Device Connected
                </>
              ) : (
                'No Device'
              )}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-blue-500" />
                <Label htmlFor="ar-mode">Augmented Reality</Label>
              </div>
              <Switch
                id="ar-mode"
                checked={isAREnabled}
                onCheckedChange={setIsAREnabled}
                disabled={!deviceConnected}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-purple-500" />
                <Label htmlFor="vr-mode">Virtual Reality</Label>
              </div>
              <Switch
                id="vr-mode"
                checked={isVREnabled}
                onCheckedChange={setIsVREnabled}
                disabled={!deviceConnected}
              />
            </div>
          </div>

          {!deviceConnected && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                No AR/VR device detected. Please connect a compatible device to enable immersive features.
              </p>
            </div>
          )}

          {deviceConnected && (
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{headsetStatus.battery}%</div>
                <div className="text-xs text-muted-foreground">Battery</div>
                <Progress value={headsetStatus.battery} className="mt-1 [&>div]:bg-green-500" />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{headsetStatus.fps} FPS</div>
                <div className="text-xs text-muted-foreground">Frame Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">{headsetStatus.latency}ms</div>
                <div className="text-xs text-muted-foreground">Latency</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{headsetStatus.temperature}°C</div>
                <div className="text-xs text-muted-foreground">Temperature</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="ar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ar">AR Objects</TabsTrigger>
          <TabsTrigger value="vr">VR Environments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="ar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-500" />
                AR Objects Management
                <Badge variant="outline" className="ml-2">
                  {arObjects.filter(obj => obj.visible).length} Visible
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {arObjects.map((object) => (
                  <div key={object.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getObjectIcon(object.type)}
                        <span className="font-medium capitalize">{object.type} Object</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={object.visible ? 'default' : 'secondary'}>
                          {object.visible ? 'Visible' : 'Hidden'}
                        </Badge>
                        <Switch
                          checked={object.visible}
                          onCheckedChange={() => toggleARObject(object.id)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Position:</span>
                        <p className="font-mono text-xs">
                          X: {object.position.x}, Y: {object.position.y}, Z: {object.position.z}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rotation:</span>
                        <p className="font-mono text-xs">
                          X: {object.rotation.x}°, Y: {object.rotation.y}°, Z: {object.rotation.z}°
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Scale:</span>
                        <p className="font-mono text-xs">{object.scale}x</p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button className="w-full" variant="outline">
                  <Layers className="mr-2 h-4 w-4" />
                  Add New AR Object
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-purple-500" />
                VR Environments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vrEnvironments.map((environment) => (
                  <div key={environment.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{environment.name}</h3>
                        <p className="text-sm text-muted-foreground">{environment.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={environment.active ? 'default' : 'outline'}>
                          {environment.active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => switchVREnvironment(environment.id)}
                          disabled={environment.active}
                        >
                          {environment.active ? 'Current' : 'Switch'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button className="w-full" variant="outline">
                  <Glasses className="mr-2 h-4 w-4" />
                  Create Custom Environment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Field of View</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">90°</span>
                    <Progress value={75} className="flex-1" />
                    <span className="text-sm">120°</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Render Quality</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Low</span>
                    <Progress value={80} className="flex-1" />
                    <span className="text-sm">Ultra</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Refresh Rate</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">60Hz</span>
                    <Progress value={90} className="flex-1" />
                    <span className="text-sm">120Hz</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interaction Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Hand Tracking</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Eye Tracking</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Voice Commands</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Haptic Feedback</Label>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Interaction Distance</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">0.5m</span>
                    <Progress value={60} className="flex-1" />
                    <span className="text-sm">3m</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}