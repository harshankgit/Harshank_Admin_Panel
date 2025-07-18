'use client';

import { useState, useEffect, useRef } from 'react';
import { Hand, Eye, Zap, Target, RotateCcw, Move, ZoomIn, ZoomOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface GestureEvent {
  id: string;
  type: 'swipe' | 'pinch' | 'rotate' | 'tap' | 'hold' | 'point';
  direction?: 'up' | 'down' | 'left' | 'right';
  confidence: number;
  timestamp: number;
  action: string;
}

interface HandPosition {
  x: number;
  y: number;
  z: number;
  confidence: number;
}

export function GestureControl() {
  const [isGestureEnabled, setIsGestureEnabled] = useState(false);
  const [isEyeTrackingEnabled, setIsEyeTrackingEnabled] = useState(false);
  const [gestureEvents, setGestureEvents] = useState<GestureEvent[]>([]);
  const [handPosition, setHandPosition] = useState<HandPosition>({ x: 0, y: 0, z: 0, confidence: 0 });
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isGestureEnabled) {
      startGestureTracking();
    } else {
      stopGestureTracking();
    }
  }, [isGestureEnabled]);

  useEffect(() => {
    if (isEyeTrackingEnabled) {
      startEyeTracking();
    } else {
      stopEyeTracking();
    }
  }, [isEyeTrackingEnabled]);

  const startGestureTracking = async () => {
    try {
      // Simulate camera access and gesture recognition
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Simulate gesture detection
      const gestureInterval = setInterval(() => {
        if (Math.random() > 0.8) {
          const gestures = ['swipe', 'pinch', 'rotate', 'tap', 'hold'] as const;
          const directions = ['up', 'down', 'left', 'right'] as const;
          const gestureType = gestures[Math.floor(Math.random() * gestures.length)];
          
          const newGesture: GestureEvent = {
            id: Date.now().toString(),
            type: gestureType,
            direction: gestureType === 'swipe' ? directions[Math.floor(Math.random() * directions.length)] : undefined,
            confidence: Math.random() * 20 + 80,
            timestamp: Date.now(),
            action: getGestureAction(gestureType)
          };

          setGestureEvents(prev => [newGesture, ...prev.slice(0, 9)]);
          executeGestureAction(newGesture);
        }

        // Update hand position
        setHandPosition({
          x: Math.random() * 100,
          y: Math.random() * 100,
          z: Math.random() * 50,
          confidence: Math.random() * 30 + 70
        });
      }, 2000);

      return () => {
        clearInterval(gestureInterval);
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
      dispatch(addNotification({
        title: 'Camera Access Error',
        message: 'Unable to access camera for gesture tracking',
        type: 'error',
      }));
    }
  };

  const stopGestureTracking = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setHandPosition({ x: 0, y: 0, z: 0, confidence: 0 });
  };

  const startEyeTracking = () => {
    const eyeInterval = setInterval(() => {
      setEyePosition({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }, 100);

    return () => clearInterval(eyeInterval);
  };

  const stopEyeTracking = () => {
    setEyePosition({ x: 0, y: 0 });
  };

  const getGestureAction = (gestureType: string): string => {
    switch (gestureType) {
      case 'swipe': return 'Navigate between pages';
      case 'pinch': return 'Zoom in/out';
      case 'rotate': return 'Rotate 3D visualization';
      case 'tap': return 'Select element';
      case 'hold': return 'Open context menu';
      case 'point': return 'Hover over element';
      default: return 'Unknown action';
    }
  };

  const executeGestureAction = (gesture: GestureEvent) => {
    dispatch(addNotification({
      title: 'Gesture Detected',
      message: `${gesture.type} gesture executed: ${gesture.action}`,
      type: 'info',
    }));
  };

  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationProgress(0);

    const calibrationInterval = setInterval(() => {
      setCalibrationProgress(prev => {
        if (prev >= 100) {
          clearInterval(calibrationInterval);
          setIsCalibrating(false);
          dispatch(addNotification({
            title: 'Calibration Complete',
            message: 'Gesture and eye tracking calibrated successfully',
            type: 'success',
          }));
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  const getGestureIcon = (type: string) => {
    switch (type) {
      case 'swipe': return <Move className="h-4 w-4 text-blue-500" />;
      case 'pinch': return <ZoomIn className="h-4 w-4 text-green-500" />;
      case 'rotate': return <RotateCcw className="h-4 w-4 text-purple-500" />;
      case 'tap': return <Target className="h-4 w-4 text-yellow-500" />;
      case 'hold': return <Hand className="h-4 w-4 text-red-500" />;
      default: return <Zap className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Gesture Control Header */}
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hand className="h-5 w-5 text-green-500" />
            Gesture & Eye Tracking Control
            <Badge variant="outline" className="ml-2">
              {isGestureEnabled || isEyeTrackingEnabled ? (
                <>
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                  Active
                </>
              ) : (
                'Inactive'
              )}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hand className="h-4 w-4 text-green-500" />
                <Label htmlFor="gesture-control">Gesture Control</Label>
              </div>
              <Switch
                id="gesture-control"
                checked={isGestureEnabled}
                onCheckedChange={setIsGestureEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-500" />
                <Label htmlFor="eye-tracking">Eye Tracking</Label>
              </div>
              <Switch
                id="eye-tracking"
                checked={isEyeTrackingEnabled}
                onCheckedChange={setIsEyeTrackingEnabled}
              />
            </div>
          </div>

          {(isGestureEnabled || isEyeTrackingEnabled) && (
            <div className="space-y-4">
              <Button
                onClick={startCalibration}
                disabled={isCalibrating}
                className="w-full"
              >
                {isCalibrating ? 'Calibrating...' : 'Calibrate Tracking'}
              </Button>

              {isCalibrating && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Calibration Progress</span>
                    <span className="text-sm text-muted-foreground">{calibrationProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={calibrationProgress} className="[&>div]:bg-green-500" />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Live Camera Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              Live Tracking Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-48 bg-gray-900 rounded-lg object-cover"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-48 pointer-events-none"
              />
              
              {/* Hand Position Overlay */}
              {isGestureEnabled && handPosition.confidence > 0 && (
                <div
                  className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg transition-all duration-100"
                  style={{
                    left: `${handPosition.x}%`,
                    top: `${handPosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {handPosition.confidence.toFixed(0)}%
                  </div>
                </div>
              )}

              {/* Eye Position Overlay */}
              {isEyeTrackingEnabled && (
                <div
                  className="absolute w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg transition-all duration-100"
                  style={{
                    left: `${eyePosition.x}%`,
                    top: `${eyePosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Hand Position:</span>
                <p className="font-mono">
                  X: {handPosition.x.toFixed(0)}, Y: {handPosition.y.toFixed(0)}, Z: {handPosition.z.toFixed(0)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Eye Gaze:</span>
                <p className="font-mono">
                  X: {eyePosition.x.toFixed(0)}, Y: {eyePosition.y.toFixed(0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gesture Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Detected Gestures
              <Badge variant="outline" className="ml-2">
                {gestureEvents.length} Events
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {gestureEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getGestureIcon(event.type)}
                      <span className="font-medium text-sm capitalize">
                        {event.type} {event.direction && `(${event.direction})`}
                      </span>
                    </div>
                    <Badge variant="outline">
                      {event.confidence.toFixed(0)}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}

              {gestureEvents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Hand className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No gestures detected</p>
                  <p className="text-xs">Enable gesture control to see events</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gesture Commands Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Gesture Commands Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Navigation Gestures</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Move className="h-3 w-3 text-blue-500" />
                  <span>Swipe Left/Right - Navigate pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-3 w-3 text-yellow-500" />
                  <span>Point & Tap - Select elements</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hand className="h-3 w-3 text-red-500" />
                  <span>Hold - Open context menu</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Visualization Controls</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <ZoomIn className="h-3 w-3 text-green-500" />
                  <span>Pinch In/Out - Zoom charts</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-3 w-3 text-purple-500" />
                  <span>Rotate - 3D model rotation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Move className="h-3 w-3 text-blue-500" />
                  <span>Swipe Up/Down - Scroll content</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Eye Tracking</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Eye className="h-3 w-3 text-blue-500" />
                  <span>Gaze - Auto-scroll content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-3 w-3 text-blue-500" />
                  <span>Blink - Confirm selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-3 w-3 text-blue-500" />
                  <span>Focus - Highlight elements</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}