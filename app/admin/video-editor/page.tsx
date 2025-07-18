"use client";

import { useState, useRef, useEffect } from "react";
import {
  Video,
  Play,
  Pause,
  Download,
  Upload,
  Scissors,
  Volume2,
  VolumeX,
  RotateCcw,
  Zap,
  Wand2,
  Settings,
  Eye,
  Share2,
  Music,
  Type,
  Palette,
  Layers,
  Clock,
  Sparkles,
  Car,
  Camera,
  Film,
  Edit3,
  Save,
  Trash2,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/useRedux";
import { addNotification } from "@/store/slices/notificationsSlice";

interface VideoProject {
  id: string;
  title: string;
  description: string;
  duration: number;
  resolution: string;
  fps: number;
  style: string;
  music: string;
  effects: string[];
  thumbnail: string;
  status: "draft" | "generating" | "ready" | "exported";
  createdAt: number;
}

interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  duration: number;
  style: string;
  thumbnail: string;
  category: "luxury" | "sports" | "electric" | "classic" | "commercial";
}

const videoTemplates: VideoTemplate[] = [
  {
    id: "1",
    name: "Luxury Showcase",
    description: "Premium car reveal with cinematic transitions",
    duration: 30,
    style: "cinematic",
    thumbnail:
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "luxury",
  },
  {
    id: "2",
    name: "Sports Car Action",
    description: "High-energy sports car with dynamic effects",
    duration: 15,
    style: "dynamic",
    thumbnail:
      "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "sports",
  },
  {
    id: "3",
    name: "Electric Future",
    description: "Modern electric vehicle with tech aesthetics",
    duration: 20,
    style: "futuristic",
    thumbnail:
      "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "electric",
  },
  {
    id: "4",
    name: "Classic Elegance",
    description: "Vintage car with retro styling and effects",
    duration: 25,
    style: "vintage",
    thumbnail:
      "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "classic",
  },
];

const musicTracks = [
  {
    id: "1",
    name: "Epic Cinematic",
    genre: "Orchestral",
    duration: 120,
    mood: "dramatic",
  },
  {
    id: "2",
    name: "Electronic Pulse",
    genre: "Electronic",
    duration: 90,
    mood: "energetic",
  },
  {
    id: "3",
    name: "Luxury Ambient",
    genre: "Ambient",
    duration: 180,
    mood: "sophisticated",
  },
  {
    id: "4",
    name: "Rock Drive",
    genre: "Rock",
    duration: 150,
    mood: "powerful",
  },
];

const videoEffects = [
  { id: "1", name: "Slow Motion", description: "Dramatic slow-motion effects" },
  {
    id: "2",
    name: "Light Trails",
    description: "Dynamic light trail animations",
  },
  {
    id: "3",
    name: "Particle Effects",
    description: "Sparkling particle overlays",
  },
  {
    id: "4",
    name: "Color Grading",
    description: "Professional color correction",
  },
  { id: "5", name: "Motion Blur", description: "Speed and movement blur" },
  { id: "6", name: "Lens Flares", description: "Cinematic lens flare effects" },
];

export default function VideoEditorPage() {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [currentProject, setCurrentProject] = useState<VideoProject | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedTemplate, setSelectedTemplate] =
    useState<VideoTemplate | null>(null);
  const [videoSettings, setVideoSettings] = useState({
    title: "",
    description: "",
    duration: 30,
    resolution: "1920x1080",
    fps: 60,
    style: "cinematic",
    music: "",
    effects: [] as string[],
    carModel: "",
    carColor: "#FF0000",
    environment: "studio",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            completeVideoGeneration();
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const generateVideo = () => {
    if (!videoSettings.title.trim()) {
      dispatch(
        addNotification({
          title: "Missing Information",
          message: "Please enter a video title",
          type: "error",
        })
      );
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    dispatch(
      addNotification({
        title: "Video Generation Started",
        message: "AI is creating your car video...",
        type: "info",
      })
    );
  };

  const completeVideoGeneration = () => {
    const newProject: VideoProject = {
      id: Date.now().toString(),
      title: videoSettings.title,
      description: videoSettings.description,
      duration: videoSettings.duration,
      resolution: videoSettings.resolution,
      fps: videoSettings.fps,
      style: videoSettings.style,
      music: videoSettings.music,
      effects: videoSettings.effects,
      thumbnail:
        selectedTemplate?.thumbnail ||
        "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "ready",
      createdAt: Date.now(),
    };

    setProjects((prev) => [newProject, ...prev]);
    setCurrentProject(newProject);

    dispatch(
      addNotification({
        title: "Video Generated Successfully",
        message: `"${videoSettings.title}" is ready for preview and export`,
        type: "success",
      })
    );
  };

  const exportVideo = (project: VideoProject) => {
    dispatch(
      addNotification({
        title: "Export Started",
        message: `Exporting "${project.title}" in ${project.resolution}`,
        type: "info",
      })
    );

    // Simulate export process
    setTimeout(() => {
      dispatch(
        addNotification({
          title: "Export Complete",
          message: `"${project.title}" has been exported successfully`,
          type: "success",
        })
      );
    }, 3000);
  };

  const toggleEffect = (effectId: string) => {
    setVideoSettings((prev) => ({
      ...prev,
      effects: prev.effects.includes(effectId)
        ? prev.effects.filter((id) => id !== effectId)
        : [...prev.effects, effectId],
    }));
  };

  const selectTemplate = (template: VideoTemplate) => {
    setSelectedTemplate(template);
    setVideoSettings((prev) => ({
      ...prev,
      duration: template.duration,
      style: template.style,
    }));
  };

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            AI Car Video Editor
          </h1>
          <p className="text-muted-foreground">
            Create stunning car reels and promotional videos with AI-powered
            editing tools
          </p>
        </div>

        <Tabs defaultValue="create" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create">Create Video</TabsTrigger>
            <TabsTrigger value="editor">Video Editor</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Video Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-purple-500" />
                    AI Video Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Video Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., 2024 Luxury Sports Car Showcase"
                      value={videoSettings.title}
                      onChange={(e) =>
                        setVideoSettings((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your car video concept..."
                      value={videoSettings.description}
                      onChange={(e) =>
                        setVideoSettings((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Duration (seconds)</Label>
                      <Slider
                        value={[videoSettings.duration]}
                        onValueChange={(value) =>
                          setVideoSettings((prev) => ({
                            ...prev,
                            duration: value[0],
                          }))
                        }
                        max={60}
                        min={10}
                        step={5}
                      />
                      <span className="text-sm text-muted-foreground">
                        {videoSettings.duration}s
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Label>Resolution</Label>
                      <Select
                        value={videoSettings.resolution}
                        onValueChange={(value) =>
                          setVideoSettings((prev) => ({
                            ...prev,
                            resolution: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1920x1080">
                            1080p (1920x1080)
                          </SelectItem>
                          <SelectItem value="2560x1440">
                            1440p (2560x1440)
                          </SelectItem>
                          <SelectItem value="3840x2160">
                            4K (3840x2160)
                          </SelectItem>
                          <SelectItem value="1080x1920">
                            Vertical (1080x1920)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Car Model</Label>
                    <Input
                      placeholder="e.g., Lamborghini Huracán, Tesla Model S"
                      value={videoSettings.carModel}
                      onChange={(e) =>
                        setVideoSettings((prev) => ({
                          ...prev,
                          carModel: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Car Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={videoSettings.carColor}
                          onChange={(e) =>
                            setVideoSettings((prev) => ({
                              ...prev,
                              carColor: e.target.value,
                            }))
                          }
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={videoSettings.carColor}
                          onChange={(e) =>
                            setVideoSettings((prev) => ({
                              ...prev,
                              carColor: e.target.value,
                            }))
                          }
                          placeholder="#FF0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Environment</Label>
                      <Select
                        value={videoSettings.environment}
                        onValueChange={(value) =>
                          setVideoSettings((prev) => ({
                            ...prev,
                            environment: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="city">City Street</SelectItem>
                          <SelectItem value="highway">Highway</SelectItem>
                          <SelectItem value="track">Race Track</SelectItem>
                          <SelectItem value="garage">Luxury Garage</SelectItem>
                          <SelectItem value="nature">
                            Nature/Mountains
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Video Style</Label>
                    <Select
                      value={videoSettings.style}
                      onValueChange={(value) =>
                        setVideoSettings((prev) => ({ ...prev, style: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cinematic">Cinematic</SelectItem>
                        <SelectItem value="dynamic">Dynamic/Sporty</SelectItem>
                        <SelectItem value="luxury">Luxury/Premium</SelectItem>
                        <SelectItem value="futuristic">
                          Futuristic/Tech
                        </SelectItem>
                        <SelectItem value="vintage">Vintage/Classic</SelectItem>
                        <SelectItem value="commercial">
                          Commercial/Ad
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Generating Video...
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {generationProgress.toFixed(0)}%
                        </span>
                      </div>
                      <Progress
                        value={generationProgress}
                        className="[&>div]:bg-purple-500"
                      />
                      <p className="text-xs text-muted-foreground">
                        AI is creating your car video with advanced rendering...
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={generateVideo}
                    disabled={isGenerating || !videoSettings.title.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate AI Video
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Music & Effects */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5 text-green-500" />
                    Audio & Effects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Background Music</Label>
                    <Select
                      value={videoSettings.music}
                      onValueChange={(value) =>
                        setVideoSettings((prev) => ({ ...prev, music: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select music track" />
                      </SelectTrigger>
                      <SelectContent>
                        {musicTracks.map((track) => (
                          <SelectItem key={track.id} value={track.id}>
                            {track.name} - {track.genre} ({track.duration}s)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Visual Effects</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {videoEffects.map((effect) => (
                        <div
                          key={effect.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <span className="font-medium text-sm">
                              {effect.name}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {effect.description}
                            </p>
                          </div>
                          <Switch
                            checked={videoSettings.effects.includes(effect.id)}
                            onCheckedChange={() => toggleEffect(effect.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">AI Enhancement</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto Color Correction</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Smart Transitions</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dynamic Camera Angles</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="editor" className="space-y-6">
            {currentProject ? (
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Video Preview */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Film className="h-5 w-5 text-blue-500" />
                          {currentProject.title}
                        </span>
                        <Badge variant="outline">
                          {currentProject.resolution}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                          <img
                            src={currentProject.thumbnail}
                            alt={currentProject.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                              onClick={() => setIsPlaying(!isPlaying)}
                              size="lg"
                              className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                            >
                              {isPlaying ? (
                                <Pause className="h-8 w-8" />
                              ) : (
                                <Play className="h-8 w-8" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Video Controls */}
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              0:00
                            </span>
                            <Progress
                              value={
                                (currentTime / currentProject.duration) * 100
                              }
                              className="flex-1"
                            />
                            <span className="text-sm text-muted-foreground">
                              {currentProject.duration}s
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsPlaying(!isPlaying)}
                              >
                                {isPlaying ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              <Button variant="outline" size="sm">
                                <Scissors className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMuted(!isMuted)}
                              >
                                {isMuted ? (
                                  <VolumeX className="h-4 w-4" />
                                ) : (
                                  <Volume2 className="h-4 w-4" />
                                )}
                              </Button>
                              <Slider
                                value={[isMuted ? 0 : volume]}
                                onValueChange={(value) => setVolume(value[0])}
                                max={100}
                                className="w-20"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Editing Tools */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Edit3 className="h-5 w-5 text-purple-500" />
                        Quick Edit
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Type className="mr-2 h-4 w-4" />
                        Add Text Overlay
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Palette className="mr-2 h-4 w-4" />
                        Color Correction
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Layers className="mr-2 h-4 w-4" />
                        Add Transitions
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Music className="mr-2 h-4 w-4" />
                        Change Music
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Adjust Timing
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Export Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label>Export Quality</Label>
                        <Select defaultValue="high">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">
                              High Quality (Large file)
                            </SelectItem>
                            <SelectItem value="medium">
                              Medium Quality (Balanced)
                            </SelectItem>
                            <SelectItem value="low">
                              Low Quality (Small file)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Format</Label>
                        <Select defaultValue="mp4">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mp4">
                              MP4 (Recommended)
                            </SelectItem>
                            <SelectItem value="mov">MOV (Apple)</SelectItem>
                            <SelectItem value="avi">AVI (Windows)</SelectItem>
                            <SelectItem value="webm">WebM (Web)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={() => exportVideo(currentProject)}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Video
                      </Button>

                      <Button variant="outline" className="w-full">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Preview
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Video className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Video Selected
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Create a new video or select an existing project to start
                    editing
                  </p>
                  <Button
                    onClick={() => {
                      const createButton = document.querySelector(
                        '[value="create"]'
                      ) as HTMLElement | null;
                      createButton?.click();
                    }}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Create New Video
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Video Projects</h2>
              <Badge variant="outline">{projects.length} Projects</Badge>
            </div>

            {projects.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="relative mb-3">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Badge
                          className="absolute top-2 right-2"
                          variant={
                            project.status === "ready" ? "default" : "secondary"
                          }
                        >
                          {project.status}
                        </Badge>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {project.duration}s
                        </div>
                      </div>

                      <h3 className="font-semibold mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentProject(project)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => exportVideo(project)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteProject(project.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Car className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Projects Yet
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Start creating amazing car videos with our AI-powered editor
                  </p>
                  <Button
                    onClick={() => {
                      const createBtn = document.querySelector(
                        '[value="create"]'
                      ) as HTMLElement | null;
                      createBtn?.click();
                    }}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Create First Video
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Video Templates</h2>
              <Badge variant="outline">{videoTemplates.length} Templates</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {videoTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer hover:shadow-lg transition-all ${
                    selectedTemplate?.id === template.id
                      ? "ring-2 ring-purple-500"
                      : ""
                  }`}
                  onClick={() => selectTemplate(template)}
                >
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-2 right-2 capitalize">
                        {template.category}
                      </Badge>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {template.duration}s
                      </div>
                    </div>

                    <h3 className="font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.description}
                    </p>

                    <Button
                      size="sm"
                      className="w-full"
                      variant={
                        selectedTemplate?.id === template.id
                          ? "default"
                          : "outline"
                      }
                    >
                      {selectedTemplate?.id === template.id
                        ? "Selected"
                        : "Use Template"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
