'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Car, 
  Palette, 
  Settings, 
  RotateCcw, 
  Play, 
  Pause, 
  Camera, 
  Download, 
  Share2,
  Zap,
  Eye,
  Maximize,
  Volume2,
  VolumeX,
  Sparkles,
  Star,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface CarModel {
  id: string;
  name: string;
  brand: string;
  category: 'luxury' | 'sports' | 'suv' | 'electric' | 'classic';
  price: number;
  image: string;
  colors: string[];
  features: string[];
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
  };
}

interface CustomizationOptions {
  color: string;
  wheels: string;
  interior: string;
  accessories: string[];
  performance: {
    engine: string;
    suspension: string;
    brakes: string;
  };
}

const carModels: CarModel[] = [
  {
    id: 'lamborghini-huracan',
    name: 'Huracán',
    brand: 'Lamborghini',
    category: 'luxury',
    price: 248000,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: ['#FF6B35', '#1E3A8A', '#000000', '#FFFFFF', '#DC2626', '#059669'],
    features: ['V10 Engine', 'All-Wheel Drive', 'Carbon Fiber Body', 'Premium Interior'],
    specs: {
      engine: 'V10 5.2L',
      power: '630 HP',
      acceleration: '0-60 mph in 2.9s',
      topSpeed: '202 mph'
    }
  },
  {
    id: 'ferrari-488',
    name: '488 GTB',
    brand: 'Ferrari',
    category: 'sports',
    price: 330000,
    image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: ['#DC2626', '#000000', '#FBBF24', '#FFFFFF', '#1E40AF', '#059669'],
    features: ['Twin-Turbo V8', 'Rear-Wheel Drive', 'Active Aerodynamics', 'Racing Seats'],
    specs: {
      engine: 'V8 3.9L Twin-Turbo',
      power: '661 HP',
      acceleration: '0-60 mph in 3.0s',
      topSpeed: '205 mph'
    }
  },
  {
    id: 'porsche-911',
    name: '911 Turbo S',
    brand: 'Porsche',
    category: 'sports',
    price: 207000,
    image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: ['#1E40AF', '#000000', '#FFFFFF', '#DC2626', '#F59E0B', '#6B7280'],
    features: ['Twin-Turbo Flat-6', 'All-Wheel Drive', 'PASM Suspension', 'Sport Chrono'],
    specs: {
      engine: 'Flat-6 3.8L Twin-Turbo',
      power: '640 HP',
      acceleration: '0-60 mph in 2.6s',
      topSpeed: '205 mph'
    }
  },
  {
    id: 'tesla-model-s',
    name: 'Model S Plaid',
    brand: 'Tesla',
    category: 'electric',
    price: 135000,
    image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: ['#000000', '#FFFFFF', '#1E40AF', '#DC2626', '#6B7280'],
    features: ['Tri-Motor', 'Autopilot', '400+ Mile Range', 'Ludicrous Mode'],
    specs: {
      engine: 'Tri-Motor Electric',
      power: '1020 HP',
      acceleration: '0-60 mph in 1.99s',
      topSpeed: '200 mph'
    }
  },
  {
    id: 'mclaren-720s',
    name: '720S',
    brand: 'McLaren',
    category: 'luxury',
    price: 299000,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: ['#F97316', '#000000', '#FFFFFF', '#1E40AF', '#DC2626', '#10B981'],
    features: ['Twin-Turbo V8', 'Carbon Fiber Monocoque', 'Active Suspension', 'Dihedral Doors'],
    specs: {
      engine: 'V8 4.0L Twin-Turbo',
      power: '710 HP',
      acceleration: '0-60 mph in 2.8s',
      topSpeed: '212 mph'
    }
  },
  {
    id: 'aston-martin-db11',
    name: 'DB11',
    brand: 'Aston Martin',
    category: 'luxury',
    price: 205000,
    image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800',
    colors: ['#1E3A8A', '#000000', '#FFFFFF', '#DC2626', '#059669', '#6B7280'],
    features: ['Twin-Turbo V8', 'Rear-Wheel Drive', 'Luxury Interior', 'Adaptive Dampers'],
    specs: {
      engine: 'V8 4.0L Twin-Turbo',
      power: '503 HP',
      acceleration: '0-60 mph in 3.9s',
      topSpeed: '187 mph'
    }
  }
];

const wheelOptions = [
  { id: 'sport', name: 'Sport Wheels', price: 2500 },
  { id: 'racing', name: 'Racing Wheels', price: 4500 },
  { id: 'luxury', name: 'Luxury Wheels', price: 3500 },
  { id: 'carbon', name: 'Carbon Fiber Wheels', price: 8500 }
];

const interiorOptions = [
  { id: 'standard', name: 'Standard Interior', price: 0 },
  { id: 'premium', name: 'Premium Leather', price: 5000 },
  { id: 'carbon', name: 'Carbon Fiber Trim', price: 8000 },
  { id: 'alcantara', name: 'Alcantara Sport', price: 6500 }
];

export function CarCustomizer3D() {
  const [selectedCar, setSelectedCar] = useState<CarModel>(carModels[0]);
  const [customization, setCustomization] = useState<CustomizationOptions>({
    color: carModels[0].colors[0],
    wheels: 'sport',
    interior: 'standard',
    accessories: [],
    performance: {
      engine: 'standard',
      suspension: 'standard',
      brakes: 'standard'
    }
  });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [viewMode, setViewMode] = useState<'exterior' | 'interior' | 'engine'>('exterior');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAutoRotating) {
      const animate = () => {
        setRotation(prev => ({
          x: prev.x + 0.2 * animationSpeed,
          y: prev.y + 0.5 * animationSpeed,
          z: prev.z + 0.1 * animationSpeed
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
  }, [isAutoRotating, animationSpeed]);

  useEffect(() => {
    draw3DCar();
  }, [selectedCar, customization, rotation, zoom, viewMode]);

  const draw3DCar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    gradient.addColorStop(0, '#0F172A');
    gradient.addColorStop(0.5, '#1E293B');
    gradient.addColorStop(1, '#334155');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Draw environment reflections
    drawEnvironment(ctx, canvas.offsetWidth, canvas.offsetHeight);

    // Draw car with 3D effect
    drawCar3D(ctx, canvas.offsetWidth, canvas.offsetHeight);

    // Draw lighting effects
    drawLighting(ctx, canvas.offsetWidth, canvas.offsetHeight);

    // Draw particles for premium effect
    drawParticles(ctx, canvas.offsetWidth, canvas.offsetHeight);
  };

  const drawEnvironment = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw floor reflection
    const floorGradient = ctx.createLinearGradient(0, height * 0.7, 0, height);
    floorGradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
    floorGradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
    ctx.fillStyle = floorGradient;
    ctx.fillRect(0, height * 0.7, width, height * 0.3);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, height * 0.7);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
  };

  const drawCar3D = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const carWidth = 300 * zoom;
    const carHeight = 120 * zoom;

    // Apply rotation transformations
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation.y * Math.PI) / 180);
    ctx.scale(1 + Math.sin((rotation.x * Math.PI) / 180) * 0.1, 1);

    // Draw car shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(-carWidth/2, carHeight/2 + 20, carWidth, 20);

    // Draw car body with selected color
    const bodyGradient = ctx.createLinearGradient(-carWidth/2, -carHeight/2, carWidth/2, carHeight/2);
    bodyGradient.addColorStop(0, customization.color);
    bodyGradient.addColorStop(0.5, adjustBrightness(customization.color, 20));
    bodyGradient.addColorStop(1, adjustBrightness(customization.color, -20));
    
    ctx.fillStyle = bodyGradient;
    ctx.fillRect(-carWidth/2, -carHeight/2, carWidth, carHeight);

    // Draw car details based on view mode
    if (viewMode === 'exterior') {
      drawExteriorDetails(ctx, carWidth, carHeight);
    } else if (viewMode === 'interior') {
      drawInteriorDetails(ctx, carWidth, carHeight);
    } else if (viewMode === 'engine') {
      drawEngineDetails(ctx, carWidth, carHeight);
    }

    // Draw wheels
    drawWheels(ctx, carWidth, carHeight);

    // Draw reflections and highlights
    drawReflections(ctx, carWidth, carHeight);

    ctx.restore();
  };

  const drawExteriorDetails = (ctx: CanvasRenderingContext2D, carWidth: number, carHeight: number) => {
    // Draw windows
    ctx.fillStyle = 'rgba(100, 149, 237, 0.8)';
    ctx.fillRect(-carWidth/3, -carHeight/3, carWidth/1.5, carHeight/4);

    // Draw headlights
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-carWidth/2 + 20, -carHeight/4, 15, 0, 2 * Math.PI);
    ctx.arc(-carWidth/2 + 20, carHeight/4, 15, 0, 2 * Math.PI);
    ctx.fill();

    // Draw taillights
    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.arc(carWidth/2 - 20, -carHeight/4, 12, 0, 2 * Math.PI);
    ctx.arc(carWidth/2 - 20, carHeight/4, 12, 0, 2 * Math.PI);
    ctx.fill();

    // Draw door lines
    ctx.strokeStyle = adjustBrightness(customization.color, -30);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-carWidth/4, -carHeight/2);
    ctx.lineTo(-carWidth/4, carHeight/2);
    ctx.moveTo(carWidth/4, -carHeight/2);
    ctx.lineTo(carWidth/4, carHeight/2);
    ctx.stroke();
  };

  const drawInteriorDetails = (ctx: CanvasRenderingContext2D, carWidth: number, carHeight: number) => {
    // Draw dashboard
    ctx.fillStyle = '#2D3748';
    ctx.fillRect(-carWidth/2 + 40, -carHeight/3, carWidth - 80, carHeight/6);

    // Draw seats
    ctx.fillStyle = getInteriorColor();
    ctx.fillRect(-carWidth/3, -carHeight/6, carWidth/8, carHeight/3);
    ctx.fillRect(carWidth/6, -carHeight/6, carWidth/8, carHeight/3);

    // Draw steering wheel
    ctx.strokeStyle = '#1A202C';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(-carWidth/3, 0, 25, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const drawEngineDetails = (ctx: CanvasRenderingContext2D, carWidth: number, carHeight: number) => {
    // Draw engine block
    ctx.fillStyle = '#4A5568';
    ctx.fillRect(-carWidth/4, -carHeight/4, carWidth/2, carHeight/2);

    // Draw engine components
    ctx.fillStyle = '#E53E3E';
    ctx.fillRect(-carWidth/6, -carHeight/6, carWidth/12, carHeight/3);
    ctx.fillRect(carWidth/12, -carHeight/6, carWidth/12, carHeight/3);

    // Draw pipes and wires
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-carWidth/4, 0);
    ctx.lineTo(carWidth/4, 0);
    ctx.moveTo(0, -carHeight/4);
    ctx.lineTo(0, carHeight/4);
    ctx.stroke();
  };

  const drawWheels = (ctx: CanvasRenderingContext2D, carWidth: number, carHeight: number) => {
    const wheelRadius = 30;
    const wheelColor = getWheelColor();

    // Front wheels
    ctx.fillStyle = wheelColor;
    ctx.beginPath();
    ctx.arc(-carWidth/3, carHeight/2 + 10, wheelRadius, 0, 2 * Math.PI);
    ctx.arc(-carWidth/3, -carHeight/2 - 10, wheelRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Rear wheels
    ctx.beginPath();
    ctx.arc(carWidth/3, carHeight/2 + 10, wheelRadius, 0, 2 * Math.PI);
    ctx.arc(carWidth/3, -carHeight/2 - 10, wheelRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Wheel rims
    ctx.strokeStyle = '#C0C0C0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-carWidth/3, carHeight/2 + 10, wheelRadius - 5, 0, 2 * Math.PI);
    ctx.arc(-carWidth/3, -carHeight/2 - 10, wheelRadius - 5, 0, 2 * Math.PI);
    ctx.arc(carWidth/3, carHeight/2 + 10, wheelRadius - 5, 0, 2 * Math.PI);
    ctx.arc(carWidth/3, -carHeight/2 - 10, wheelRadius - 5, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const drawReflections = (ctx: CanvasRenderingContext2D, carWidth: number, carHeight: number) => {
    // Draw highlight reflection
    const highlightGradient = ctx.createLinearGradient(-carWidth/2, -carHeight/2, -carWidth/4, -carHeight/4);
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlightGradient;
    ctx.fillRect(-carWidth/2, -carHeight/2, carWidth/3, carHeight/6);
  };

  const drawLighting = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw ambient lighting
    const lightGradient = ctx.createRadialGradient(width/2, height/3, 0, width/2, height/3, width/2);
    lightGradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
    lightGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = lightGradient;
    ctx.fillRect(0, 0, width, height);
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw floating particles for premium effect
    for (let i = 0; i < 20; i++) {
      const x = (Math.sin(Date.now() * 0.001 + i) * width/4) + width/2;
      const y = (Math.cos(Date.now() * 0.0015 + i) * height/4) + height/2;
      const size = Math.sin(Date.now() * 0.002 + i) * 2 + 2;
      
      ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + Math.sin(Date.now() * 0.003 + i) * 0.2})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const adjustBrightness = (color: string, amount: number): string => {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const getWheelColor = (): string => {
    switch (customization.wheels) {
      case 'sport': return '#C0C0C0';
      case 'racing': return '#FFD700';
      case 'luxury': return '#2D3748';
      case 'carbon': return '#1A202C';
      default: return '#C0C0C0';
    }
  };

  const getInteriorColor = (): string => {
    switch (customization.interior) {
      case 'standard': return '#4A5568';
      case 'premium': return '#8B4513';
      case 'carbon': return '#1A202C';
      case 'alcantara': return '#2D3748';
      default: return '#4A5568';
    }
  };

  const handleCarSelect = (car: CarModel) => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    // Simulate loading with progress
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setIsLoading(false);
          setSelectedCar(car);
          setCustomization(prev => ({ ...prev, color: car.colors[0] }));
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    if (soundEnabled) {
      // Simulate engine sound notification
      dispatch(addNotification({
        title: 'Car Model Loaded',
        message: `${car.brand} ${car.name} is ready for customization`,
        type: 'success',
      }));
    }
  };

  const handleColorChange = (color: string) => {
    setCustomization(prev => ({ ...prev, color }));
    if (soundEnabled) {
      dispatch(addNotification({
        title: 'Color Updated',
        message: 'Car color has been changed',
        type: 'info',
      }));
    }
  };

  const calculateTotalPrice = (): number => {
    let total = selectedCar.price;
    
    const wheelPrice = wheelOptions.find(w => w.id === customization.wheels)?.price || 0;
    const interiorPrice = interiorOptions.find(i => i.id === customization.interior)?.price || 0;
    
    return total + wheelPrice + interiorPrice;
  };

  const handlePurchase = () => {
    dispatch(addNotification({
      title: 'Purchase Initiated',
      message: `${selectedCar.brand} ${selectedCar.name} added to cart - $${calculateTotalPrice().toLocaleString()}`,
      type: 'success',
    }));
  };

  const takeScreenshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${selectedCar.brand}-${selectedCar.name}-customization.png`;
    link.href = canvas.toDataURL();
    link.click();

    dispatch(addNotification({
      title: 'Screenshot Saved',
      message: 'Car customization screenshot downloaded',
      type: 'success',
    }));
  };

  return (
    <div className="space-y-6">
      {/* 3D Viewer Header */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-blue-500" />
            3D Car Visualization Studio
            <Badge variant="outline" className="ml-2">
              <Sparkles className="h-3 w-3 mr-1" />
              Premium Experience
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                variant={isAutoRotating ? 'default' : 'outline'}
              >
                {isAutoRotating ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isAutoRotating ? 'Pause' : 'Rotate'}
              </Button>
              
              <Button onClick={takeScreenshot} variant="outline">
                <Camera className="mr-2 h-4 w-4" />
                Screenshot
              </Button>
              
              <Button onClick={() => setIsFullscreen(!isFullscreen)} variant="outline">
                <Maximize className="mr-2 h-4 w-4" />
                Fullscreen
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="sound">Sound</Label>
                <Switch
                  id="sound"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </div>
              
              <div className="flex items-center gap-2">
                <Label>Speed:</Label>
                <Slider
                  value={[animationSpeed]}
                  onValueChange={(value) => setAnimationSpeed(value[0])}
                  max={3}
                  min={0.1}
                  step={0.1}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">{animationSpeed}x</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* 3D Viewer */}
        <div className="lg:col-span-3">
          <Card className="relative overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className={`w-full transition-all duration-300 ${
                    isFullscreen ? 'h-screen' : 'h-96 lg:h-[600px]'
                  }`}
                  style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)' }}
                />
                
                {isLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p className="text-lg font-medium">Loading {selectedCar.brand} {selectedCar.name}...</p>
                      <Progress value={loadingProgress} className="w-64 mt-2 mx-auto" />
                      <p className="text-sm mt-2">{loadingProgress.toFixed(0)}%</p>
                    </div>
                  </div>
                )}

                {/* View Mode Selector */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {['exterior', 'interior', 'engine'].map((mode) => (
                    <Button
                      key={mode}
                      variant={viewMode === mode ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode(mode as any)}
                      className="capitalize"
                    >
                      {mode}
                    </Button>
                  ))}
                </div>

                {/* Car Info Overlay */}
                <div className="absolute top-4 right-4 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="font-bold text-lg">{selectedCar.brand}</h3>
                  <p className="text-sm opacity-90">{selectedCar.name}</p>
                  <p className="text-xl font-bold mt-2">${calculateTotalPrice().toLocaleString()}</p>
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-white">Zoom</Label>
                      <Slider
                        value={[zoom]}
                        onValueChange={(value) => setZoom(value[0])}
                        max={2}
                        min={0.5}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Rotation X</Label>
                      <Slider
                        value={[rotation.x]}
                        onValueChange={(value) => setRotation(prev => ({ ...prev, x: value[0] }))}
                        max={360}
                        min={0}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Rotation Y</Label>
                      <Slider
                        value={[rotation.y]}
                        onValueChange={(value) => setRotation(prev => ({ ...prev, y: value[0] }))}
                        max={360}
                        min={0}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customization Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Customization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="models" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="models">Models</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="options">Options</TabsTrigger>
                </TabsList>

                <TabsContent value="models" className="space-y-4">
                  <div className="space-y-3">
                    {carModels.map((car) => (
                      <div
                        key={car.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedCar.id === car.id 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => handleCarSelect(car)}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={car.image}
                            alt={`${car.brand} ${car.name}`}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{car.brand}</h4>
                            <p className="text-sm text-muted-foreground">{car.name}</p>
                            <p className="text-sm font-bold">${car.price.toLocaleString()}</p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {car.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="colors" className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Body Color</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {selectedCar.colors.map((color) => (
                        <button
                          key={color}
                          className={`w-full h-12 rounded-lg border-2 transition-all ${
                            customization.color === color 
                              ? 'border-blue-500 scale-105' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="options" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Wheels</Label>
                      <div className="space-y-2 mt-2">
                        {wheelOptions.map((wheel) => (
                          <div
                            key={wheel.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              customization.wheels === wheel.id 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                : 'hover:border-gray-300'
                            }`}
                            onClick={() => setCustomization(prev => ({ ...prev, wheels: wheel.id }))}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{wheel.name}</span>
                              <span className="text-sm">+${wheel.price.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Interior</Label>
                      <div className="space-y-2 mt-2">
                        {interiorOptions.map((interior) => (
                          <div
                            key={interior.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              customization.interior === interior.id 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                : 'hover:border-gray-300'
                            }`}
                            onClick={() => setCustomization(prev => ({ ...prev, interior: interior.id }))}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{interior.name}</span>
                              <span className="text-sm">
                                {interior.price === 0 ? 'Included' : `+$${interior.price.toLocaleString()}`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Car Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(selectedCar.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Purchase Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Price</span>
                  <span>${selectedCar.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customizations</span>
                  <span>+${(calculateTotalPrice() - selectedCar.price).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${calculateTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button onClick={handlePurchase} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Save Configuration
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Design
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}