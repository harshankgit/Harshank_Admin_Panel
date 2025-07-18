'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Brain, Zap, MessageSquare, Settings, Play, Pause } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  confidence: number;
  timestamp: number;
  executed: boolean;
}

interface VoiceProfile {
  userId: string;
  name: string;
  voicePrint: number[];
  accuracy: number;
  commandsLearned: number;
}

export function VoiceControlCenter() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState<VoiceCommand[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [aiResponse, setAiResponse] = useState('');
  const [voiceProfile, setVoiceProfile] = useState<VoiceProfile>({
    userId: '1',
    name: 'Admin User',
    voicePrint: Array.from({length: 20}, () => Math.random()),
    accuracy: 94.7,
    commandsLearned: 156
  });
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isHandsFreeMode, setIsHandsFreeMode] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dispatch = useAppDispatch();

  const predefinedCommands = [
    { trigger: 'show dashboard', action: 'Navigate to dashboard', route: '/admin' },
    { trigger: 'open analytics', action: 'Open analytics page', route: '/admin/analytics' },
    { trigger: 'create new user', action: 'Open user creation form', route: '/admin/users' },
    { trigger: 'generate report', action: 'Generate analytics report', route: '/admin/analytics' },
    { trigger: 'start video call', action: 'Initiate team video call', route: '/admin/collaboration' },
    { trigger: 'deploy contract', action: 'Deploy smart contract', route: '/admin/blockchain' },
    { trigger: 'analyze data', action: 'Run AI data analysis', route: '/admin/ai-insights' },
    { trigger: 'backup system', action: 'Initiate system backup', route: '/admin/settings' }
  ];

  useEffect(() => {
    if (isListening) {
      startVoiceRecognition();
    } else {
      stopVoiceRecognition();
    }
  }, [isListening]);

  useEffect(() => {
    // Simulate voice level monitoring
    if (isListening) {
      const interval = setInterval(() => {
        setVoiceLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  const startVoiceRecognition = () => {
    // Simulate voice recognition
    const mockCommands = [
      'Show me the analytics dashboard',
      'Create a new product listing',
      'Generate sales report for this month',
      'Open user management panel',
      'Start AI analysis on customer data'
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const command = mockCommands[Math.floor(Math.random() * mockCommands.length)];
        setCurrentCommand(command);
        
        setTimeout(() => {
          processVoiceCommand(command);
          setCurrentCommand('');
        }, 1500);
      }
    }, 3000);

    return () => clearInterval(interval);
  };

  const stopVoiceRecognition = () => {
    setCurrentCommand('');
    setVoiceLevel(0);
  };

  const processVoiceCommand = (command: string) => {
    const newCommand: VoiceCommand = {
      id: Date.now().toString(),
      command,
      action: determineAction(command),
      confidence: Math.random() * 20 + 80,
      timestamp: Date.now(),
      executed: true
    };

    setVoiceCommands(prev => [newCommand, ...prev.slice(0, 9)]);
    
    // Generate AI response
    const responses = [
      `Executing "${command}" - Opening the requested section now.`,
      `Command understood. Processing "${command}" with 95% confidence.`,
      `Voice command recognized. Navigating to the appropriate dashboard.`,
      `AI Assistant: I've processed your request for "${command}".`,
      `Command executed successfully. Is there anything else you need?`
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    setAiResponse(response);
    
    if (isVoiceEnabled) {
      speakResponse(response);
    }

    dispatch(addNotification({
      title: 'Voice Command Executed',
      message: `"${command}" processed successfully`,
      type: 'success',
    }));
  };

  const determineAction = (command: string): string => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('analytics') || lowerCommand.includes('dashboard')) {
      return 'Navigate to Analytics Dashboard';
    } else if (lowerCommand.includes('user') || lowerCommand.includes('create')) {
      return 'Open User Management';
    } else if (lowerCommand.includes('report') || lowerCommand.includes('generate')) {
      return 'Generate Analytics Report';
    } else if (lowerCommand.includes('product')) {
      return 'Open Product Management';
    } else if (lowerCommand.includes('ai') || lowerCommand.includes('analysis')) {
      return 'Run AI Analysis';
    } else {
      return 'Execute Custom Command';
    }
  };

  const speakResponse = (text: string) => {
    setIsSpeaking(true);
    
    // Simulate speech synthesis
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const toggleHandsFreeMode = () => {
    setIsHandsFreeMode(!isHandsFreeMode);
    if (!isHandsFreeMode) {
      setIsListening(true);
      dispatch(addNotification({
        title: 'Hands-Free Mode Activated',
        message: 'Voice control is now always listening',
        type: 'info',
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Voice Control Header */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-blue-500" />
            Voice Control Center
            <Badge variant="outline" className="ml-2">
              {isListening ? (
                <>
                  <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                  Listening
                </>
              ) : (
                'Standby'
              )}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={toggleListening}
                variant={isListening ? 'destructive' : 'default'}
                size="lg"
                className="relative"
              >
                {isListening ? (
                  <>
                    <MicOff className="mr-2 h-5 w-5" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-5 w-5" />
                    Start Listening
                  </>
                )}
                {isListening && (
                  <div className="absolute inset-0 bg-red-500 opacity-20 rounded-md animate-pulse"></div>
                )}
              </Button>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="hands-free">Hands-Free Mode</Label>
                <Switch
                  id="hands-free"
                  checked={isHandsFreeMode}
                  onCheckedChange={toggleHandsFreeMode}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="voice-response">Voice Response</Label>
                <Switch
                  id="voice-response"
                  checked={isVoiceEnabled}
                  onCheckedChange={setIsVoiceEnabled}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isSpeaking ? <Volume2 className="h-4 w-4 text-green-500" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
              <span className="text-sm text-muted-foreground">
                {isSpeaking ? 'Speaking...' : 'Silent'}
              </span>
            </div>
          </div>

          {isListening && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Voice Level</span>
                <span className="text-sm text-muted-foreground">{voiceLevel.toFixed(0)}%</span>
              </div>
              <Progress value={voiceLevel} className="[&>div]:bg-blue-500" />
            </div>
          )}

          {currentCommand && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-500 animate-pulse" />
                <span className="font-medium text-blue-700 dark:text-blue-300">Processing Command:</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">"{currentCommand}"</p>
            </div>
          )}

          {aiResponse && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-green-500" />
                <span className="font-medium text-green-700 dark:text-green-300">AI Response:</span>
                {isSpeaking && <Volume2 className="h-4 w-4 text-green-500 animate-pulse" />}
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">{aiResponse}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Voice Commands History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Recent Voice Commands
              <Badge variant="outline" className="ml-2">
                {voiceCommands.length} Commands
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {voiceCommands.map((cmd) => (
                <div key={cmd.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{cmd.command}</span>
                    <Badge variant={cmd.executed ? 'default' : 'secondary'}>
                      {cmd.confidence.toFixed(0)}% confidence
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{cmd.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(cmd.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
              
              {voiceCommands.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Mic className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No voice commands yet</p>
                  <p className="text-xs">Start listening to see commands here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Voice Profile & Training */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Voice Profile & Training
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Voice Recognition Accuracy</span>
                <span className="text-sm">{voiceProfile.accuracy}%</span>
              </div>
              <Progress value={voiceProfile.accuracy} className="[&>div]:bg-purple-500" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Commands Learned</span>
                <span className="text-sm">{voiceProfile.commandsLearned}</span>
              </div>
              <Progress value={(voiceProfile.commandsLearned / 200) * 100} className="[&>div]:bg-blue-500" />
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Available Commands:</h4>
              <div className="space-y-1">
                {predefinedCommands.slice(0, 5).map((cmd, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    • "{cmd.trigger}" → {cmd.action}
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Train Voice Model
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Voice Commands */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Voice Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-4">
            {predefinedCommands.slice(0, 8).map((cmd, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => processVoiceCommand(cmd.trigger)}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium text-xs">"{cmd.trigger}"</div>
                  <div className="text-xs text-muted-foreground">{cmd.action}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}