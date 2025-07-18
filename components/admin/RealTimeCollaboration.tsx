'use client';

import { useState, useEffect } from 'react';
import { Users, MessageCircle, Video, Share2, Eye, Edit, TextCursor as Cursor, Zap, Crown, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface CollaborativeUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy';
  role: 'admin' | 'editor' | 'viewer';
  currentPage: string;
  cursor: { x: number; y: number };
  isTyping: boolean;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: number;
  type: 'text' | 'system' | 'ai';
}

const mockUsers: CollaborativeUser[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'online',
    role: 'admin',
    currentPage: '/admin/analytics',
    cursor: { x: 450, y: 200 },
    isTyping: false
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'online',
    role: 'editor',
    currentPage: '/admin/products',
    cursor: { x: 320, y: 150 },
    isTyping: true
  },
  {
    id: '3',
    name: 'Emma Thompson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'away',
    role: 'viewer',
    currentPage: '/admin/orders',
    cursor: { x: 600, y: 300 },
    isTyping: false
  }
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Chen',
    message: 'Just updated the Q4 revenue projections - looking great! 📈',
    timestamp: Date.now() - 300000,
    type: 'text'
  },
  {
    id: '2',
    userId: 'ai',
    userName: 'AI Assistant',
    message: 'Detected unusual spike in mobile traffic. Investigating potential causes...',
    timestamp: Date.now() - 180000,
    type: 'ai'
  },
  {
    id: '3',
    userId: '2',
    userName: 'Marcus Rodriguez',
    message: 'Can someone review the new product listings? Need approval for launch.',
    timestamp: Date.now() - 120000,
    type: 'text'
  }
];

export function RealTimeCollaboration() {
  const [activeUsers, setActiveUsers] = useState(mockUsers);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [sharedCursors, setSharedCursors] = useState<{ [key: string]: { x: number; y: number } }>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Simulate real-time cursor movements
    const interval = setInterval(() => {
      setActiveUsers(prev => prev.map(user => ({
        ...user,
        cursor: {
          x: Math.max(0, Math.min(window.innerWidth, user.cursor.x + (Math.random() - 0.5) * 100)),
          y: Math.max(0, Math.min(window.innerHeight, user.cursor.y + (Math.random() - 0.5) * 50))
        },
        isTyping: Math.random() > 0.8
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current',
      userName: 'You',
      message: newMessage,
      timestamp: Date.now(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    dispatch(addNotification({
      title: 'Message Sent',
      message: 'Your message was sent to the team',
      type: 'success',
    }));
  };

  const startVideoCall = () => {
    setIsVideoCallActive(true);
    dispatch(addNotification({
      title: 'Video Call Started',
      message: 'Team video call initiated',
      type: 'info',
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-3 w-3 text-yellow-500" />;
      case 'editor': return <Edit className="h-3 w-3 text-blue-500" />;
      case 'viewer': return <Eye className="h-3 w-3 text-gray-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Users Bar */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Live Collaboration
            <Badge variant="outline" className="ml-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
              {activeUsers.filter(u => u.status === 'online').length} Online
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {activeUsers.map((user) => (
                <div key={user.id} className="relative">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`}>
                    {getRoleIcon(user.role)}
                  </div>
                  {user.isTyping && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      typing...
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={startVideoCall}
                className={isVideoCallActive ? 'bg-green-100 text-green-700' : ''}
              >
                <Video className="mr-2 h-4 w-4" />
                {isVideoCallActive ? 'In Call' : 'Start Call'}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share Screen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Real-time Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Live Activity Feed
              <Badge variant="secondary" className="ml-2">Real-time</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{user.name}</span>
                        {getRoleIcon(user.role)}
                        <Badge variant="outline" className="text-xs">
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Viewing: {user.currentPage}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Cursor className="h-3 w-3 text-blue-500" />
                      <span className="text-xs text-muted-foreground">
                        {user.cursor.x}, {user.cursor.y}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Team Chat */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-500" />
              Team Chat
              <Badge variant="outline" className="ml-2">
                {messages.length} messages
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-60">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {message.type === 'ai' ? '🤖' : message.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-xs">{message.userName}</span>
                        {message.type === 'ai' && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="h-2 w-2 mr-1" />
                            AI
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shared Cursors Overlay */}
      {activeUsers.map((user) => (
        <div
          key={user.id}
          className="fixed pointer-events-none z-50 transition-all duration-200"
          style={{
            left: user.cursor.x,
            top: user.cursor.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="flex items-center gap-1">
            <Cursor className="h-4 w-4 text-blue-500" />
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {user.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}