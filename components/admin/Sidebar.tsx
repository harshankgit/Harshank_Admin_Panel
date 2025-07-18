'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  Brain,
  Zap,
  TrendingUp,
  Bot,
  Users2,
  Rotate3D,
  Link2,
  Wand2,
  Mic,
  Hand,
  Glasses,
  Activity,
  Music,
  Code,
  Heart,
  Car,
  Video
} from 'lucide-react';
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toggleSidebar } from '@/store/slices/uiSlice';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Advanced Analytics', href: '/admin/advanced-analytics', icon: TrendingUp },
  { name: 'AI Insights', href: '/admin/ai-insights', icon: Brain },
  { name: 'Automation', href: '/admin/automation', icon: Bot },
  { name: 'Real-Time Collaboration', href: '/admin/collaboration', icon: Users2 },
  { name: '3D Visualization', href: '/admin/3d-visualization', icon: Rotate3D },
  { name: 'Blockchain Integration', href: '/admin/blockchain', icon: Link2 },
  { name: 'AI Content Generator', href: '/admin/ai-content', icon: Wand2 },
  { name: 'Voice Control', href: '/admin/voice-control', icon: Mic },
  { name: 'Gesture Control', href: '/admin/gesture-control', icon: Hand },
  { name: 'AR/VR Interface', href: '/admin/ar-vr', icon: Glasses },
  { name: 'Neural Network', href: '/admin/neural-network', icon: Activity },
  { name: 'Music Player', href: '/admin/music', icon: Music },
  { name: 'Color Customizer', href: '/admin/color-customizer', icon: Palette },
  { name: '3D Car Studio', href: '/admin/car-customizer', icon: Car },
  { name: 'Video Editor', href: '/admin/video-editor', icon: Video },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Profile', href: '/admin/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <div className={cn('flex items-center gap-2', sidebarCollapsed && 'justify-center')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Shield className="h-4 w-4" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Admin Pro
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleSidebar())}
            className="h-8 w-8 p-0"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-accent hover:text-accent-foreground group transform hover:scale-105 hover:shadow-md',
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'text-muted-foreground hover:text-foreground',
                  sidebarCollapsed && 'justify-center px-2'
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0 transition-all duration-300",
                  !sidebarCollapsed && "group-hover:scale-110",
                  isActive && "drop-shadow-lg"
                )} />
                {!sidebarCollapsed && (
                  <span className="truncate font-medium">{item.name}</span>
                )}
                {isActive && !sidebarCollapsed && (
                  <div className="ml-auto">
                    <Zap className="h-3 w-3 text-yellow-300 drop-shadow-lg" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-border space-y-3">
            {/* Creator Attribution */}
            <div className="p-3 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Code className="h-4 w-4 text-indigo-600" />
                  <Heart className="h-3 w-3 text-pink-500 animate-pulse" />
                </div>
                <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Created with passion
                </span>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Designed & Developed by
                </p>
                <p className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Harshank Kanungo
                </p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <div className="h-1 w-1 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="h-1 w-1 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-1 w-1 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>

            {/* AI Powered Badge */}
            <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">AI Powered</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Revolutionary admin panel with cutting-edge interactive features
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}