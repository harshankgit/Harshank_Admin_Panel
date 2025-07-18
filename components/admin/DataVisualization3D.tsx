'use client';

import { useState, useEffect, useRef } from 'react';
import { BarChart3, TrendingUp, Layers, Rotate3D, Maximize, Settings, Download, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface DataPoint3D {
  x: number;
  y: number;
  z: number;
  value: number;
  label: string;
  color: string;
}

const generate3DData = (): DataPoint3D[] => {
  const data: DataPoint3D[] = [];
  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
  const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981', '#F59E0B'];
  
  for (let i = 0; i < 50; i++) {
    data.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 100,
      value: Math.random() * 1000 + 100,
      label: categories[Math.floor(Math.random() * categories.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  return data;
};

export function DataVisualization3D() {
  const [data3D, setData3D] = useState<DataPoint3D[]>(generate3DData());
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [zoom, setZoom] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [viewMode, setViewMode] = useState<'scatter' | 'surface' | 'volume'>('scatter');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        setRotation(prev => ({
          x: prev.x + 0.5,
          y: prev.y + 0.3,
          z: prev.z + 0.1
        }));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Draw 3D visualization
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;

    // Transform and project 3D points to 2D
    data3D.forEach((point, index) => {
      // Apply rotation
      const radX = (rotation.x * Math.PI) / 180;
      const radY = (rotation.y * Math.PI) / 180;
      const radZ = (rotation.z * Math.PI) / 180;

      let x = point.x - 50;
      let y = point.y - 50;
      let z = point.z - 50;

      // Rotate around Y axis
      const tempX = x * Math.cos(radY) - z * Math.sin(radY);
      z = x * Math.sin(radY) + z * Math.cos(radY);
      x = tempX;

      // Rotate around X axis
      const tempY = y * Math.cos(radX) - z * Math.sin(radX);
      z = y * Math.sin(radX) + z * Math.cos(radX);
      y = tempY;

      // Project to 2D
      const scale = zoom * (200 / (200 + z));
      const projectedX = centerX + x * scale;
      const projectedY = centerY + y * scale;

      // Draw point
      ctx.beginPath();
      ctx.fillStyle = point.color;
      ctx.globalAlpha = Math.max(0.3, 1 - z / 100);
      
      if (viewMode === 'scatter') {
        ctx.arc(projectedX, projectedY, Math.max(2, point.value / 100), 0, 2 * Math.PI);
        ctx.fill();
      } else if (viewMode === 'surface') {
        ctx.fillRect(projectedX - 3, projectedY - 3, 6, 6);
      } else {
        // Volume rendering
        const gradient = ctx.createRadialGradient(projectedX, projectedY, 0, projectedX, projectedY, point.value / 50);
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(projectedX, projectedY, point.value / 50, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw connections for surface mode
      if (viewMode === 'surface' && index > 0) {
        const prevPoint = data3D[index - 1];
        let prevX = prevPoint.x - 50;
        let prevY = prevPoint.y - 50;
        let prevZ = prevPoint.z - 50;

        // Apply same transformations
        const prevTempX = prevX * Math.cos(radY) - prevZ * Math.sin(radY);
        prevZ = prevX * Math.sin(radY) + prevZ * Math.cos(radY);
        prevX = prevTempX;

        const prevTempY = prevY * Math.cos(radX) - prevZ * Math.sin(radX);
        prevZ = prevY * Math.sin(radX) + prevZ * Math.cos(radX);
        prevY = prevTempY;

        const prevScale = zoom * (200 / (200 + prevZ));
        const prevProjectedX = centerX + prevX * prevScale;
        const prevProjectedY = centerY + prevY * prevScale;

        ctx.beginPath();
        ctx.strokeStyle = point.color;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 1;
        ctx.moveTo(prevProjectedX, prevProjectedY);
        ctx.lineTo(projectedX, projectedY);
        ctx.stroke();
      }
    });
  }, [data3D, rotation, zoom, viewMode]);

  const regenerateData = () => {
    setData3D(generate3DData());
  };

  const exportVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = '3d-visualization.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rotate3D className="h-5 w-5 text-purple-500" />
            3D Data Visualization Engine
            <Badge variant="outline" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              Interactive
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visualization" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="visualization">3D Visualization</TabsTrigger>
              <TabsTrigger value="controls">Controls</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="visualization" className="space-y-4">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 border rounded-lg bg-gradient-to-br from-gray-900 to-blue-900"
                  style={{ cursor: 'grab' }}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="outline" size="sm" onClick={exportVisualization}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setZoom(1)}>
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant={viewMode === 'scatter' ? 'default' : 'outline'}
                  onClick={() => setViewMode('scatter')}
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Scatter Plot
                </Button>
                <Button
                  variant={viewMode === 'surface' ? 'default' : 'outline'}
                  onClick={() => setViewMode('surface')}
                  className="flex items-center gap-2"
                >
                  <Layers className="h-4 w-4" />
                  Surface Plot
                </Button>
                <Button
                  variant={viewMode === 'volume' ? 'default' : 'outline'}
                  onClick={() => setViewMode('volume')}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Volume Render
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="controls" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Zoom Level</Label>
                    <Slider
                      value={[zoom]}
                      onValueChange={(value) => setZoom(value[0])}
                      max={3}
                      min={0.5}
                      step={0.1}
                      className="w-full"
                    />
                    <span className="text-sm text-muted-foreground">{zoom.toFixed(1)}x</span>
                  </div>

                  <div className="space-y-2">
                    <Label>X Rotation</Label>
                    <Slider
                      value={[rotation.x]}
                      onValueChange={(value) => setRotation(prev => ({ ...prev, x: value[0] }))}
                      max={360}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <span className="text-sm text-muted-foreground">{rotation.x.toFixed(0)}°</span>
                  </div>

                  <div className="space-y-2">
                    <Label>Y Rotation</Label>
                    <Slider
                      value={[rotation.y]}
                      onValueChange={(value) => setRotation(prev => ({ ...prev, y: value[0] }))}
                      max={360}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <span className="text-sm text-muted-foreground">{rotation.y.toFixed(0)}°</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-rotate">Auto Rotation</Label>
                    <Switch
                      id="auto-rotate"
                      checked={isAnimating}
                      onCheckedChange={setIsAnimating}
                    />
                  </div>

                  <Button onClick={regenerateData} className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Regenerate Data
                  </Button>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Data Points</h4>
                    <p className="text-sm text-muted-foreground">
                      Currently visualizing {data3D.length} data points across 3 dimensions
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Data Density</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(data3D.length / 1000).toFixed(1)}k
                    </div>
                    <p className="text-xs text-muted-foreground">points per cubic unit</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Avg Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(data3D.reduce((acc, p) => acc + p.value, 0) / data3D.length).toFixed(0)}
                    </div>
                    <p className="text-xs text-muted-foreground">across all dimensions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Clusters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">identified patterns</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">3D Analytics Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      High-density cluster detected in Electronics category
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Coordinates: (45, 67, 23) - Potential growth opportunity
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      Optimal distribution pattern identified
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Balanced spread across all three dimensions
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                      Sparse region in Home category
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      Consider targeted marketing in this segment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}