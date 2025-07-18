'use client';

import { useState, useEffect } from 'react';
import { Sparkles, FileText, Image, Video, Music, Code, Wand2, Download, Copy, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface GeneratedContent {
  id: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'code';
  title: string;
  content: string;
  prompt: string;
  timestamp: number;
  quality: number;
  model: string;
}

const mockGeneratedContent: GeneratedContent[] = [
  {
    id: '1',
    type: 'text',
    title: 'Product Description - Wireless Headphones',
    content: 'Experience premium audio quality with our state-of-the-art wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and crystal-clear sound reproduction. Perfect for music enthusiasts, professionals, and anyone who values exceptional audio performance.',
    prompt: 'Write a compelling product description for wireless headphones',
    timestamp: Date.now() - 300000,
    quality: 94,
    model: 'GPT-4'
  },
  {
    id: '2',
    type: 'code',
    title: 'React Component - Product Card',
    content: `import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

export function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />
        <h3 className="font-semibold mt-2">{name}</h3>
        <p className="text-lg font-bold text-primary">\${price}</p>
      </CardContent>
    </Card>
  );
}`,
    prompt: 'Generate a React component for a product card',
    timestamp: Date.now() - 600000,
    quality: 96,
    model: 'CodeLlama'
  }
];

export function AIContentGenerator() {
  const [generatedContent, setGeneratedContent] = useState(mockGeneratedContent);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [contentType, setContentType] = useState<'text' | 'image' | 'video' | 'audio' | 'code'>('text');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const dispatch = useAppDispatch();

  const generateContent = async () => {
    if (!currentPrompt.trim()) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate AI generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate generation time
    setTimeout(() => {
      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        type: contentType,
        title: `Generated ${contentType} - ${new Date().toLocaleTimeString()}`,
        content: generateMockContent(contentType, currentPrompt),
        prompt: currentPrompt,
        timestamp: Date.now(),
        quality: Math.floor(Math.random() * 20) + 80,
        model: selectedModel
      };

      setGeneratedContent(prev => [newContent, ...prev]);
      setIsGenerating(false);
      setGenerationProgress(0);
      setCurrentPrompt('');

      dispatch(addNotification({
        title: 'Content Generated',
        message: `AI has generated new ${contentType} content`,
        type: 'success',
      }));
    }, 3000);
  };

  const generateMockContent = (type: string, prompt: string): string => {
    switch (type) {
      case 'text':
        return `This is AI-generated text content based on your prompt: "${prompt}". The content would be professionally written, engaging, and tailored to your specific requirements. It would include relevant keywords, proper structure, and compelling language that resonates with your target audience.`;
      
      case 'code':
        return `// AI-Generated Code for: ${prompt}
import React, { useState, useEffect } from 'react';

export function GeneratedComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch data or perform initialization
    fetchData();
  }, []);
  
  const fetchData = async () => {
    // Implementation based on prompt
    console.log('Generated based on: ${prompt}');
  };
  
  return (
    <div className="generated-component">
      <h2>AI Generated Component</h2>
      {/* Component content based on prompt */}
    </div>
  );
}`;
      
      case 'image':
        return `[AI-Generated Image Description]
Style: Photorealistic
Dimensions: 1024x1024
Prompt: ${prompt}
Generated using DALL-E 3 with enhanced quality settings`;
      
      case 'video':
        return `[AI-Generated Video Description]
Duration: 30 seconds
Resolution: 1080p
Style: Professional
Prompt: ${prompt}
Generated using advanced video synthesis AI`;
      
      case 'audio':
        return `[AI-Generated Audio Description]
Duration: 60 seconds
Quality: 44.1kHz, 16-bit
Style: Professional voiceover
Prompt: ${prompt}
Generated using neural voice synthesis`;
      
      default:
        return 'Generated content would appear here';
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    dispatch(addNotification({
      title: 'Copied to Clipboard',
      message: 'Content has been copied to your clipboard',
      type: 'success',
    }));
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'image': return <Image className="h-4 w-4 text-green-500" />;
      case 'video': return <Video className="h-4 w-4 text-purple-500" />;
      case 'audio': return <Music className="h-4 w-4 text-yellow-500" />;
      case 'code': return <Code className="h-4 w-4 text-red-500" />;
      default: return <Sparkles className="h-4 w-4 text-gray-500" />;
    }
  };

  const getModelBadgeColor = (model: string) => {
    switch (model) {
      case 'gpt-4': return 'bg-blue-100 text-blue-700';
      case 'claude-3': return 'bg-purple-100 text-purple-700';
      case 'dall-e-3': return 'bg-green-100 text-green-700';
      case 'codellama': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Content Generator Header */}
      <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-500" />
            AI Content Generator
            <Badge variant="outline" className="ml-2">
              <Sparkles className="h-3 w-3 mr-1" />
              Multi-Modal AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="content-type">Content Type</Label>
              <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">📝 Text Content</SelectItem>
                  <SelectItem value="code">💻 Code Generation</SelectItem>
                  <SelectItem value="image">🎨 Image Creation</SelectItem>
                  <SelectItem value="video">🎬 Video Generation</SelectItem>
                  <SelectItem value="audio">🎵 Audio Synthesis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ai-model">AI Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4 (Text)</SelectItem>
                  <SelectItem value="claude-3">Claude-3 (Advanced)</SelectItem>
                  <SelectItem value="dall-e-3">DALL-E 3 (Images)</SelectItem>
                  <SelectItem value="codellama">CodeLlama (Code)</SelectItem>
                  <SelectItem value="whisper">Whisper (Audio)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">AI Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Describe what you want the AI to generate..."
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Generating content...</span>
                <span className="text-sm text-muted-foreground">{generationProgress.toFixed(0)}%</span>
              </div>
              <Progress value={generationProgress} className="[&>div]:bg-purple-500" />
            </div>
          )}

          <Button 
            onClick={generateContent} 
            disabled={!currentPrompt.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content Library */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Generated Content Library
                <Badge variant="outline" className="ml-2">
                  {generatedContent.length} Items
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedContent.map((content) => (
                  <div key={content.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getContentIcon(content.type)}
                        <span className="font-medium">{content.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getModelBadgeColor(content.model)}>
                          {content.model}
                        </Badge>
                        <Badge variant="outline">
                          {content.quality}% quality
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Prompt:</strong> {content.prompt}
                      </p>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                          {content.content.length > 200 
                            ? content.content.substring(0, 200) + '...' 
                            : content.content
                          }
                        </pre>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Generated {new Date(content.timestamp).toLocaleString()}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(content.content)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Text Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedContent.filter(c => c.type === 'text').map((content) => (
                  <div key={content.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{content.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{content.prompt}</p>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm">{content.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedContent.filter(c => c.type === 'code').map((content) => (
                  <div key={content.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{content.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{content.prompt}</p>
                    <div className="bg-gray-900 p-3 rounded-md overflow-x-auto">
                      <pre className="text-sm text-green-400 font-mono">
                        <code>{content.content}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {generatedContent.filter(c => ['image', 'video', 'audio'].includes(c.type)).map((content) => (
                  <div key={content.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {getContentIcon(content.type)}
                      <h3 className="font-medium">{content.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{content.prompt}</p>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm">{content.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}