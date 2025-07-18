'use client';

import { useState, useEffect } from 'react';
import { Palette, Save, RotateCcw, Eye, Download, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface ColorTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

interface ModuleColors {
  [key: string]: {
    background: string;
    text: string;
    accent: string;
    enabled: boolean;
  };
}

const defaultThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'Default',
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#06B6D4',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#E5E7EB'
    }
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#06B6D4',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      border: '#374151'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    colors: {
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      accent: '#10B981',
      background: '#F0F9FF',
      surface: '#E0F2FE',
      text: '#0C4A6E',
      textSecondary: '#0369A1',
      border: '#7DD3FC'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: {
      primary: '#F59E0B',
      secondary: '#EF4444',
      accent: '#EC4899',
      background: '#FFFBEB',
      surface: '#FEF3C7',
      text: '#92400E',
      textSecondary: '#D97706',
      border: '#FCD34D'
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#34D399',
      background: '#F0FDF4',
      surface: '#DCFCE7',
      text: '#064E3B',
      textSecondary: '#047857',
      border: '#86EFAC'
    }
  }
];

const adminModules = [
  { id: 'dashboard', name: 'Dashboard', icon: '📊' },
  { id: 'users', name: 'User Management', icon: '👥' },
  { id: 'products', name: 'Product Management', icon: '📦' },
  { id: 'orders', name: 'Order Management', icon: '🛒' },
  { id: 'analytics', name: 'Analytics', icon: '📈' },
  { id: 'settings', name: 'Settings', icon: '⚙️' },
  { id: 'ai-insights', name: 'AI Insights', icon: '🧠' },
  { id: 'automation', name: 'Automation', icon: '🤖' },
  { id: 'collaboration', name: 'Collaboration', icon: '👥' },
  { id: '3d-visualization', name: '3D Visualization', icon: '🎯' },
  { id: 'blockchain', name: 'Blockchain', icon: '🔗' },
  { id: 'voice-control', name: 'Voice Control', icon: '🎤' },
  { id: 'ar-vr', name: 'AR/VR Interface', icon: '🥽' },
  { id: 'music', name: 'Music Player', icon: '🎵' }
];

export function ColorCustomizer() {
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(defaultThemes[0]);
  const [customTheme, setCustomTheme] = useState<ColorTheme>(defaultThemes[0]);
  const [moduleColors, setModuleColors] = useState<ModuleColors>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [savedThemes, setSavedThemes] = useState<ColorTheme[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize module colors
    const initialModuleColors: ModuleColors = {};
    adminModules.forEach(module => {
      initialModuleColors[module.id] = {
        background: selectedTheme.colors.surface,
        text: selectedTheme.colors.text,
        accent: selectedTheme.colors.primary,
        enabled: false
      };
    });
    setModuleColors(initialModuleColors);
  }, [selectedTheme]);

  const handleThemeSelect = (theme: ColorTheme) => {
    setSelectedTheme(theme);
    setCustomTheme({ ...theme });
  };

  const handleColorChange = (colorKey: string, value: string) => {
    setCustomTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      }
    }));
  };

  const handleModuleColorChange = (moduleId: string, colorType: string, value: string) => {
    setModuleColors(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [colorType]: value
      }
    }));
  };

  const toggleModuleCustomization = (moduleId: string) => {
    setModuleColors(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        enabled: !prev[moduleId].enabled
      }
    }));
  };

  const applyTheme = () => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    
    // Apply global theme colors
    root.style.setProperty('--color-primary', customTheme.colors.primary);
    root.style.setProperty('--color-secondary', customTheme.colors.secondary);
    root.style.setProperty('--color-accent', customTheme.colors.accent);
    root.style.setProperty('--color-background', customTheme.colors.background);
    root.style.setProperty('--color-surface', customTheme.colors.surface);
    root.style.setProperty('--color-text', customTheme.colors.text);
    root.style.setProperty('--color-text-secondary', customTheme.colors.textSecondary);
    root.style.setProperty('--color-border', customTheme.colors.border);

    // Apply module-specific colors
    Object.entries(moduleColors).forEach(([moduleId, colors]) => {
      if (colors.enabled) {
        root.style.setProperty(`--color-${moduleId}-bg`, colors.background);
        root.style.setProperty(`--color-${moduleId}-text`, colors.text);
        root.style.setProperty(`--color-${moduleId}-accent`, colors.accent);
      }
    });

    dispatch(addNotification({
      title: 'Theme Applied',
      message: 'Color customizations have been applied successfully',
      type: 'success',
    }));
  };

  const saveTheme = () => {
    const newTheme: ColorTheme = {
      ...customTheme,
      id: `custom-${Date.now()}`,
      name: `Custom Theme ${savedThemes.length + 1}`
    };
    
    setSavedThemes(prev => [...prev, newTheme]);
    
    dispatch(addNotification({
      title: 'Theme Saved',
      message: `Theme "${newTheme.name}" has been saved`,
      type: 'success',
    }));
  };

  const resetToDefault = () => {
    setCustomTheme(defaultThemes[0]);
    setSelectedTheme(defaultThemes[0]);
    
    // Reset module colors
    const resetModuleColors: ModuleColors = {};
    adminModules.forEach(module => {
      resetModuleColors[module.id] = {
        background: defaultThemes[0].colors.surface,
        text: defaultThemes[0].colors.text,
        accent: defaultThemes[0].colors.primary,
        enabled: false
      };
    });
    setModuleColors(resetModuleColors);

    dispatch(addNotification({
      title: 'Theme Reset',
      message: 'All colors have been reset to default',
      type: 'info',
    }));
  };

  const exportTheme = () => {
    const themeData = {
      theme: customTheme,
      moduleColors: moduleColors
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const themeData = JSON.parse(e.target?.result as string);
        setCustomTheme(themeData.theme);
        setModuleColors(themeData.moduleColors || {});
        
        dispatch(addNotification({
          title: 'Theme Imported',
          message: 'Theme has been imported successfully',
          type: 'success',
        }));
      } catch (error) {
        dispatch(addNotification({
          title: 'Import Failed',
          message: 'Invalid theme file format',
          type: 'error',
        }));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-purple-500" />
            Color Customization System
            <Badge variant="outline" className="ml-2">
              Advanced Theming
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={applyTheme} className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Save className="mr-2 h-4 w-4" />
                Apply Theme
              </Button>
              <Button onClick={saveTheme} variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Theme
              </Button>
              <Button onClick={resetToDefault} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="preview-mode">Preview Mode</Label>
              <Switch
                id="preview-mode"
                checked={isPreviewMode}
                onCheckedChange={setIsPreviewMode}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={exportTheme} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={importTheme}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="themes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="themes">Preset Themes</TabsTrigger>
          <TabsTrigger value="global">Global Colors</TabsTrigger>
          <TabsTrigger value="modules">Module Colors</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="themes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preset Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[...defaultThemes, ...savedThemes].map((theme) => (
                  <div
                    key={theme.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTheme.id === theme.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleThemeSelect(theme)}
                  >
                    <h3 className="font-medium mb-3">{theme.name}</h3>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div
                        className="h-8 rounded"
                        style={{ backgroundColor: theme.colors.primary }}
                        title="Primary"
                      />
                      <div
                        className="h-8 rounded"
                        style={{ backgroundColor: theme.colors.secondary }}
                        title="Secondary"
                      />
                      <div
                        className="h-8 rounded"
                        style={{ backgroundColor: theme.colors.accent }}
                        title="Accent"
                      />
                      <div
                        className="h-8 rounded border"
                        style={{ backgroundColor: theme.colors.background }}
                        title="Background"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant={selectedTheme.id === theme.id ? 'default' : 'outline'}>
                        {selectedTheme.id === theme.id ? 'Selected' : 'Select'}
                      </Badge>
                      {theme.id.startsWith('custom-') && (
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Color Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium">Primary Colors</h3>
                  {Object.entries(customTheme.colors).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                      <div className="flex gap-2">
                        <Input
                          id={key}
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Surface & Text Colors</h3>
                  {Object.entries(customTheme.colors).slice(4).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                      <div className="flex gap-2">
                        <Input
                          id={key}
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Module-Specific Colors</CardTitle>
              <p className="text-sm text-muted-foreground">
                Customize colors for individual admin modules and pages
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminModules.map((module) => (
                  <div key={module.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{module.icon}</span>
                        <span className="font-medium">{module.name}</span>
                      </div>
                      <Switch
                        checked={moduleColors[module.id]?.enabled || false}
                        onCheckedChange={() => toggleModuleCustomization(module.id)}
                      />
                    </div>

                    {moduleColors[module.id]?.enabled && (
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label>Background Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={moduleColors[module.id]?.background || '#FFFFFF'}
                              onChange={(e) => handleModuleColorChange(module.id, 'background', e.target.value)}
                              className="w-16 h-10 p-1 border rounded"
                            />
                            <Input
                              value={moduleColors[module.id]?.background || '#FFFFFF'}
                              onChange={(e) => handleModuleColorChange(module.id, 'background', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Text Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={moduleColors[module.id]?.text || '#000000'}
                              onChange={(e) => handleModuleColorChange(module.id, 'text', e.target.value)}
                              className="w-16 h-10 p-1 border rounded"
                            />
                            <Input
                              value={moduleColors[module.id]?.text || '#000000'}
                              onChange={(e) => handleModuleColorChange(module.id, 'text', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Accent Color</Label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={moduleColors[module.id]?.accent || '#8B5CF6'}
                              onChange={(e) => handleModuleColorChange(module.id, 'accent', e.target.value)}
                              className="w-16 h-10 p-1 border rounded"
                            />
                            <Input
                              value={moduleColors[module.id]?.accent || '#8B5CF6'}
                              onChange={(e) => handleModuleColorChange(module.id, 'accent', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Global Theme Preview */}
                <div className="p-6 rounded-lg border" style={{
                  backgroundColor: customTheme.colors.background,
                  color: customTheme.colors.text,
                  borderColor: customTheme.colors.border
                }}>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: customTheme.colors.text }}>
                    Global Theme Preview
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-lg" style={{ backgroundColor: customTheme.colors.surface }}>
                      <div className="w-full h-3 rounded mb-2" style={{ backgroundColor: customTheme.colors.primary }}></div>
                      <p className="text-sm" style={{ color: customTheme.colors.textSecondary }}>Primary Color</p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: customTheme.colors.surface }}>
                      <div className="w-full h-3 rounded mb-2" style={{ backgroundColor: customTheme.colors.secondary }}></div>
                      <p className="text-sm" style={{ color: customTheme.colors.textSecondary }}>Secondary Color</p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: customTheme.colors.surface }}>
                      <div className="w-full h-3 rounded mb-2" style={{ backgroundColor: customTheme.colors.accent }}></div>
                      <p className="text-sm" style={{ color: customTheme.colors.textSecondary }}>Accent Color</p>
                    </div>
                  </div>
                </div>

                {/* Module Previews */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Module Color Previews</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {adminModules.filter(module => moduleColors[module.id]?.enabled).map((module) => (
                      <div
                        key={module.id}
                        className="p-4 rounded-lg border"
                        style={{
                          backgroundColor: moduleColors[module.id]?.background,
                          color: moduleColors[module.id]?.text,
                          borderColor: moduleColors[module.id]?.accent
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">{module.icon}</span>
                          <span className="font-medium">{module.name}</span>
                        </div>
                        <div className="space-y-2">
                          <div 
                            className="w-full h-2 rounded"
                            style={{ backgroundColor: moduleColors[module.id]?.accent }}
                          ></div>
                          <p className="text-sm opacity-75">
                            This is how the {module.name} module will look with your custom colors.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}