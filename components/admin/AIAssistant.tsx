'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, MicOff, Sparkles, Brain, Zap, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
  suggestions?: string[];
  insights?: {
    type: 'trend' | 'alert' | 'recommendation';
    data: any;
  };
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI business intelligence assistant. I can provide real-time insights, predictive analytics, automated recommendations, and help optimize your business operations. What would you like to explore?',
      timestamp: Date.now(),
      suggestions: [
        'Predict next month sales',
        'Analyze customer churn risk',
        'Optimize inventory levels',
        'Generate growth strategy'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userInput: string) => {
    const responses = [
      {
        content: '📈 **Predictive Analysis**: Based on current trends, I predict a 34% increase in sales next month. Key drivers: seasonal demand (+18%), new product launches (+12%), and improved conversion rates (+4%). Recommended actions: Increase inventory for top 3 products, launch targeted campaigns for high-value customers.',
        suggestions: ['Show detailed forecast', 'Create action plan', 'Set up alerts'],
        insights: {
          type: 'trend' as const,
          data: { prediction: '+34%', confidence: 89, timeframe: '30 days' }
        }
      },
      {
        content: '⚠️ **Churn Risk Alert**: I\'ve identified 23 customers at high risk of churning (85% probability). Common patterns: decreased engagement (-45%), longer time between purchases (+12 days), reduced order values (-28%). Immediate intervention recommended.',
        suggestions: ['View at-risk customers', 'Create retention campaign', 'Send personalized offers'],
        insights: {
          type: 'alert' as const,
          data: { riskLevel: 'high', customers: 23, probability: 85 }
        }
      },
      {
        content: '🎯 **Smart Recommendation**: Optimize your inventory by reducing Coffee Maker stock by 15% and increasing Wireless Headphones by 40%. This will improve cash flow by $12,400 and reduce storage costs by 8%. AI confidence: 92%.',
        suggestions: ['Apply recommendations', 'View detailed analysis', 'Schedule auto-optimization'],
        insights: {
          type: 'recommendation' as const,
          data: { impact: '$12,400', confidence: 92, timeToImplement: '2 days' }
        }
      },
      {
        content: '🚀 **Growth Strategy**: I\'ve analyzed your data and identified 3 high-impact opportunities: 1) Target customers aged 25-35 with premium products (+$8,200 potential revenue), 2) Expand to mobile-first marketing (+15% reach), 3) Implement dynamic pricing (+7% margin improvement).',
        suggestions: ['Implement strategy', 'Show ROI projections', 'Create implementation timeline'],
        insights: {
          type: 'recommendation' as const,
          data: { opportunities: 3, potentialRevenue: '$8,200', timeframe: '90 days' }
        }
      }
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI processing with realistic delay
    setTimeout(() => {
      const response = generateAIResponse(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: Date.now(),
        suggestions: response.suggestions,
        insights: response.insights,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);

      dispatch(addNotification({
        title: 'AI Insights Ready',
        message: 'New business intelligence insights generated',
        type: 'success',
      }));
    }, 2500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setInput('Show me predictive analytics for next quarter');
        setIsListening(false);
      }, 3000);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'recommendation':
        return <Target className="h-4 w-4 text-blue-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 animate-pulse">
            <Brain className="h-8 w-8" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl h-[700px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl">AI Business Intelligence</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    GPT-4 Powered
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    Real-time Analysis
                  </Badge>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl p-4 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border'
                      }`}
                    >
                      <div className="prose prose-sm max-w-none">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                        {message.insights && (
                          <div className="flex items-center gap-1">
                            {getInsightIcon(message.insights.type)}
                            <span className="text-xs opacity-70 capitalize">
                              {message.insights.type}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {message.suggestions && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs opacity-70 font-medium">Quick Actions:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-7 bg-white/10 hover:bg-white/20 border-white/20"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                        <span className="text-sm">AI is analyzing your data...</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            <div className="border-t pt-4 mt-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg p-4">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about sales predictions, customer insights, optimization strategies..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-white dark:bg-gray-800"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleVoiceInput}
                  className={`${isListening ? 'bg-red-100 text-red-600 animate-pulse' : ''} transition-all`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button 
                  onClick={handleSend} 
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by advanced AI • Real-time business intelligence • Predictive analytics
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}