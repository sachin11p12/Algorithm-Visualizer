'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Home, Cpu } from 'lucide-react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';

interface HeaderProps {
  view?: 'home' | 'visualizer';
  // Legacy prop kept for compatibility, not used anymore
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ view = 'home' }) => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { algorithm } = useVisualizerStore();
  const currentAlgo = ALGORITHM_DATA[algorithm];

  const isVisualizer = pathname !== '/';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0d10]/95 backdrop-blur-md border-b border-white/8 px-6 lg:px-12 py-3.5">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="p-1.5 bg-blue-600/20 text-blue-400 rounded-lg ring-1 ring-blue-500/30">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-black text-lg tracking-tight">
            <span className="text-white">Algorithm</span>
            <span className="text-blue-400"> Visualizer</span>
          </span>
        </Link>

        {/* Right */}
        <div className="flex items-center space-x-3">
          {/* Active algorithm badge (when in visualizer) */}
          {isVisualizer && currentAlgo && (
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[13px]">
              <span className="text-gray-400">Viewing:</span>
              <span className="font-semibold text-white">{currentAlgo.name}</span>
            </div>
          )}

          {/* Home button when in visualizer */}
          {isVisualizer && (
            <Link
              href="/"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[13px] font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all duration-200"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
