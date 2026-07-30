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
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ view = 'home' }) => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { algorithm } = useVisualizerStore();
  const currentAlgo = ALGORITHM_DATA[algorithm];

  const isVisualizer = pathname !== '/';

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-border/40 px-6 lg:px-12 py-3.5 transition-colors duration-300">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="p-1.5 bg-primary/10 text-primary rounded-lg ring-1 ring-primary/20 shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight">
            <span className="text-foreground">Algorithm</span>
            <span className="text-primary"> Visualizer</span>
          </span>
        </Link>

        {/* Right */}
        <div className="flex items-center space-x-3">
          {/* Active algorithm badge (when in visualizer) */}
          {isVisualizer && currentAlgo && (
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-secondary/80 border border-border/50 text-xs font-medium">
              <span className="text-muted-foreground">Viewing:</span>
              <span className="font-semibold text-foreground">{currentAlgo.name}</span>
            </div>
          )}

          {/* Home button when in visualizer */}
          {isVisualizer && (
            <Link
              href="/"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/40 text-xs font-semibold text-foreground transition-all shadow-sm"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/40 text-foreground transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
