'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Music, Radio, Mic, Headphones, Zap, Heart, Download, Share2, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  genre: string;
  mood: string;
  energy: number;
  cover: string;
  audioUrl: string;
  liked: boolean;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
  cover: string;
  mood: string;
  totalDuration: number;
}

const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Focus Flow',
    artist: 'Ambient Collective',
    album: 'Productivity Sounds',
    duration: 240,
    genre: 'Ambient',
    mood: 'Focus',
    energy: 30,
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: '/audio/focus-flow.mp3',
    liked: true
  },
  {
    id: '2',
    title: 'Creative Boost',
    artist: 'Neural Beats',
    album: 'Brain Enhancement',
    duration: 180,
    genre: 'Electronic',
    mood: 'Creative',
    energy: 70,
    cover: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: '/audio/creative-boost.mp3',
    liked: false
  },
  {
    id: '3',
    title: 'Deep Work',
    artist: 'Concentration Station',
    album: 'Work Rhythms',
    duration: 300,
    genre: 'Lo-Fi',
    mood: 'Concentration',
    energy: 40,
    cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: '/audio/deep-work.mp3',
    liked: true
  },
  {
    id: '4',
    title: 'Energy Surge',
    artist: 'Motivation Masters',
    album: 'Power Hour',
    duration: 210,
    genre: 'Upbeat',
    mood: 'Energetic',
    energy: 90,
    cover: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: '/audio/energy-surge.mp3',
    liked: false
  }
];

const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Focus Mode',
    description: 'Perfect background music for deep work and concentration',
    tracks: mockTracks.filter(t => t.mood === 'Focus' || t.mood === 'Concentration'),
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    mood: 'Focus',
    totalDuration: 540
  },
  {
    id: '2',
    name: 'Creative Flow',
    description: 'Inspiring tracks to boost creativity and innovation',
    tracks: mockTracks.filter(t => t.mood === 'Creative'),
    cover: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    mood: 'Creative',
    totalDuration: 180
  },
  {
    id: '3',
    name: 'Energy Boost',
    description: 'High-energy tracks to keep you motivated throughout the day',
    tracks: mockTracks.filter(t => t.energy > 60),
    cover: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400',
    mood: 'Energetic',
    totalDuration: 390
  }
];

export function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(mockPlaylists[0]);
  const [tracks, setTracks] = useState(mockTracks);
  const [playlists, setPlaylists] = useState(mockPlaylists);
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(32).fill(0));
  const [isRecording, setIsRecording] = useState(false);
  const [aiMoodDetection, setAiMoodDetection] = useState('Focused');
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Simulate audio visualizer
    if (isPlaying) {
      const interval = setInterval(() => {
        setVisualizerData(prev => prev.map(() => Math.random() * 100));
        setCurrentTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    // AI mood detection simulation
    const moodInterval = setInterval(() => {
      const moods = ['Focused', 'Creative', 'Energetic', 'Relaxed', 'Motivated'];
      setAiMoodDetection(moods[Math.floor(Math.random() * moods.length)]);
    }, 10000);
    return () => clearInterval(moodInterval);
  }, []);

  useEffect(() => {
    drawVisualizer();
  }, [visualizerData]);

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.offsetHeight);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Draw visualizer bars
    const barWidth = canvas.offsetWidth / visualizerData.length;
    visualizerData.forEach((value, index) => {
      const barHeight = (value / 100) * canvas.offsetHeight * 0.8;
      const x = index * barWidth;
      const y = canvas.offsetHeight - barHeight;

      const barGradient = ctx.createLinearGradient(0, y, 0, canvas.offsetHeight);
      barGradient.addColorStop(0, '#8B5CF6');
      barGradient.addColorStop(0.5, '#EC4899');
      barGradient.addColorStop(1, '#06B6D4');

      ctx.fillStyle = barGradient;
      ctx.fillRect(x, y, barWidth - 2, barHeight);

      // Add glow effect
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = 10;
      ctx.fillRect(x, y, barWidth - 2, barHeight);
      ctx.shadowBlur = 0;
    });
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    dispatch(addNotification({
      title: isPlaying ? 'Music Paused' : 'Music Playing',
      message: currentTrack ? `${currentTrack.title} by ${currentTrack.artist}` : 'No track selected',
      type: 'info',
    }));
  };

  const nextTrack = () => {
    if (!currentPlaylist) return;
    const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.tracks.length;
    setCurrentTrack(currentPlaylist.tracks[nextIndex]);
    setCurrentTime(0);
  };

  const previousTrack = () => {
    if (!currentPlaylist) return;
    const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = currentIndex === 0 ? currentPlaylist.tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(currentPlaylist.tracks[prevIndex]);
    setCurrentTime(0);
  };

  const toggleLike = (trackId: string) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, liked: !track.liked } : track
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
    dispatch(addNotification({
      title: 'Voice Recording Started',
      message: 'Recording ambient sounds for AI music generation',
      type: 'info',
    }));

    setTimeout(() => {
      setIsRecording(false);
      dispatch(addNotification({
        title: 'AI Music Generated',
        message: 'New ambient track created based on your environment',
        type: 'success',
      }));
    }, 5000);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Focus': return 'text-blue-500';
      case 'Creative': return 'text-purple-500';
      case 'Energetic': return 'text-red-500';
      case 'Relaxed': return 'text-green-500';
      case 'Motivated': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Music Player Header */}
      <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-purple-500" />
            AI-Powered Music Player
            <Badge variant="outline" className="ml-2">
              {isPlaying ? (
                <>
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                  Playing
                </>
              ) : (
                'Paused'
              )}
            </Badge>
            <Badge variant="secondary" className={`ml-2 ${getMoodColor(aiMoodDetection)}`}>
              <Zap className="h-3 w-3 mr-1" />
              {aiMoodDetection}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Audio Visualizer */}
          <canvas
            ref={canvasRef}
            className="w-full h-24 rounded-lg border"
            style={{ background: 'linear-gradient(45deg, #1a1a2e, #16213e)' }}
          />

          {/* Current Track Info */}
          {currentTrack && (
            <div className="flex items-center gap-4">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-16 h-16 rounded-lg object-cover shadow-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{currentTrack.title}</h3>
                <p className="text-muted-foreground">{currentTrack.artist} • {currentTrack.album}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{currentTrack.genre}</Badge>
                  <Badge variant="outline" className="text-xs">{currentTrack.mood}</Badge>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">Energy:</span>
                    <Progress value={currentTrack.energy} className="w-12 h-1" />
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleLike(currentTrack.id)}
                className={currentTrack.liked ? 'text-red-500' : ''}
              >
                <Heart className={`h-4 w-4 ${currentTrack.liked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{currentTrack ? formatTime(currentTrack.duration) : '0:00'}</span>
            </div>
            <Progress 
              value={currentTrack ? (currentTime / currentTrack.duration) * 100 : 0} 
              className="cursor-pointer"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffled(!isShuffled)}
              className={isShuffled ? 'text-purple-500' : ''}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={previousTrack}>
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={togglePlay}
              size="lg"
              className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={nextTrack}>
              <SkipForward className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRepeatMode(repeatMode === 'none' ? 'all' : repeatMode === 'all' ? 'one' : 'none')}
              className={repeatMode !== 'none' ? 'text-purple-500' : ''}
            >
              <Repeat className="h-4 w-4" />
              {repeatMode === 'one' && <span className="text-xs ml-1">1</span>}
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={(value) => {
                setVolume(value[0]);
                setIsMuted(false);
              }}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-8">{isMuted ? 0 : volume}</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="playlists" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="tracks">All Tracks</TabsTrigger>
          <TabsTrigger value="radio">AI Radio</TabsTrigger>
          <TabsTrigger value="generator">AI Generator</TabsTrigger>
          <TabsTrigger value="ambient">Ambient</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {playlists.map((playlist) => (
              <Card key={playlist.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold">{playlist.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{playlist.tracks.length} tracks</Badge>
                    <span className="text-xs text-muted-foreground">{formatTime(playlist.totalDuration)}</span>
                  </div>
                  <Button
                    className="w-full mt-3"
                    onClick={() => {
                      setCurrentPlaylist(playlist);
                      setCurrentTrack(playlist.tracks[0]);
                      setIsPlaying(true);
                    }}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Play Playlist
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tracks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Tracks</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="space-y-2">
                  {tracks.map((track) => (
                    <div
                      key={track.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                        currentTrack?.id === track.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setCurrentTrack(track)}
                    >
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">{track.artist}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{track.mood}</Badge>
                        <span className="text-sm text-muted-foreground">{formatTime(track.duration)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(track.id);
                          }}
                          className={track.liked ? 'text-red-500' : ''}
                        >
                          <Heart className={`h-4 w-4 ${track.liked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="radio" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-blue-500" />
                  AI Radio Stations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Focus FM', description: 'AI-curated focus music', listeners: '1.2K' },
                  { name: 'Creative Waves', description: 'Inspiration for creators', listeners: '856' },
                  { name: 'Energy Boost', description: 'High-energy motivation', listeners: '2.1K' },
                  { name: 'Ambient Space', description: 'Peaceful background sounds', listeners: '743' }
                ].map((station, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{station.name}</h4>
                      <p className="text-sm text-muted-foreground">{station.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{station.listeners} listening</Badge>
                      <Button size="sm">
                        <Radio className="h-3 w-3 mr-1" />
                        Listen
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-purple-500" />
                  Personalized Stations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <h4 className="font-medium">Your AI Mix</h4>
                  <p className="text-sm text-muted-foreground">Based on your listening habits</p>
                  <Button size="sm" className="mt-2 w-full">
                    <Play className="h-3 w-3 mr-1" />
                    Play My Mix
                  </Button>
                </div>
                
                <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                  <h4 className="font-medium">Mood Radio</h4>
                  <p className="text-sm text-muted-foreground">Adapts to your current mood: {aiMoodDetection}</p>
                  <Button size="sm" className="mt-2 w-full">
                    <Zap className="h-3 w-3 mr-1" />
                    Start Mood Radio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="generator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-green-500" />
                AI Music Generator
                <Badge variant="outline" className="ml-2">
                  {isRecording ? (
                    <>
                      <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                      Recording
                    </>
                  ) : (
                    'Ready'
                  )}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">Generate Music From:</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={startRecording}
                      disabled={isRecording}
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Record Environment Sounds
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Music className="mr-2 h-4 w-4" />
                      Hum a Melody
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="mr-2 h-4 w-4" />
                      Current Mood ({aiMoodDetection})
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="mr-2 h-4 w-4" />
                      Work Activity Pattern
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Generated Tracks:</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'AI Ambient #1', duration: '3:24', mood: 'Calm' },
                      { name: 'Focus Beat #2', duration: '4:12', mood: 'Focus' },
                      { name: 'Creative Flow #3', duration: '2:58', mood: 'Creative' }
                    ].map((track, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <span className="font-medium text-sm">{track.name}</span>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{track.duration}</span>
                            <Badge variant="outline" className="text-xs">{track.mood}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {isRecording && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-red-700 dark:text-red-300">Recording ambient sounds...</span>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    AI is analyzing your environment to generate personalized background music
                  </p>
                  <Progress value={60} className="mt-2 [&>div]:bg-red-500" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ambient" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Nature Sounds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Rain on Window', icon: '🌧️', playing: false },
                  { name: 'Ocean Waves', icon: '🌊', playing: true },
                  { name: 'Forest Birds', icon: '🐦', playing: false },
                  { name: 'Crackling Fire', icon: '🔥', playing: false }
                ].map((sound, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{sound.icon}</span>
                      <span className="font-medium">{sound.name}</span>
                    </div>
                    <Button size="sm" variant={sound.playing ? 'default' : 'outline'}>
                      {sound.playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>White Noise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Pink Noise', frequency: '1/f', playing: false },
                  { name: 'Brown Noise', frequency: '1/f²', playing: false },
                  { name: 'White Noise', frequency: 'Full spectrum', playing: false },
                  { name: 'Café Ambience', frequency: 'Mixed', playing: true }
                ].map((noise, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">{noise.name}</span>
                      <p className="text-xs text-muted-foreground">{noise.frequency}</p>
                    </div>
                    <Button size="sm" variant={noise.playing ? 'default' : 'outline'}>
                      {noise.playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}