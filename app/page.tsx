'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { initializeAuth } from '@/store/slices/authSlice';
import { Loader2, Code, Heart, Sparkles } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized) {
      if (isAuthenticated) {
        router.push('/admin');
      } else {
        router.push('/auth/login');
      }
    }
  }, [isAuthenticated, isInitialized, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center space-y-6 p-8">
        {/* Loading Animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping opacity-20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-10 animation-delay-200"></div>
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-4 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <Loader2 className="h-8 w-8 animate-spin text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
            AI Admin Pro
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 animate-bounce" />
            Loading intelligent dashboard...
          </p>
        </div>

        {/* Creator Attribution */}
        <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-purple-200/50 dark:border-purple-800/50 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Code className="h-4 w-4 text-purple-600 animate-bounce" />
            <Heart className="h-3 w-3 text-pink-500 animate-pulse hover:animate-ping" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Crafted with passion
            </span>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Designed & Developed by
            </p>
            <p className="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-600 transition-all duration-500">
              Harshank Kanungo
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <div className="h-1 w-1 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="h-1 w-1 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-1 w-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
          <div className="p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm transform hover:scale-105 hover:bg-white/40 transition-all duration-300 cursor-pointer">
            <div className="text-xs font-medium text-purple-600">AI Powered</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Smart Analytics</div>
          </div>
          <div className="p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm transform hover:scale-105 hover:bg-white/40 transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.1s' }}>
            <div className="text-xs font-medium text-pink-600">Real-time</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Collaboration</div>
          </div>
          <div className="p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm transform hover:scale-105 hover:bg-white/40 transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.2s' }}>
            <div className="text-xs font-medium text-indigo-600">Voice Control</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Hands-free</div>
          </div>
          <div className="p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm transform hover:scale-105 hover:bg-white/40 transition-all duration-300 cursor-pointer" style={{ animationDelay: '0.3s' }}>
            <div className="text-xs font-medium text-blue-600">3D Visualization</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Interactive</div>
          </div>
        </div>
      </div>
    </div>
  );
}