'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Sparkles, Menu, X, Cpu } from 'lucide-react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { theme, setTheme } = useTheme();
  const { algorithm } = useVisualizerStore();
  const currentAlgo = ALGORITHM_DATA[algorithm];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-border/40 px-4 lg:px-8 py-3 transition-colors duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Section: Mobile Menu & Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 lg:hidden transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 text-primary rounded-xl ring-1 ring-primary/20 shadow-inner">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  AlgoVisualizer
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Modern Algorithm Engine & Pseudocode Visualizer
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Active Algorithm Badge & Theme Toggle */}
        <div className="flex items-center space-x-3">
          {currentAlgo && (
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-muted/60 border border-border/50 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-muted-foreground">Active:</span>
              <span className="font-semibold text-foreground">{currentAlgo.name}</span>
              <span className="px-1.5 py-0.5 rounded bg-primary/15 text-primary text-[10px] font-bold uppercase">
                {currentAlgo.category}
              </span>
            </div>
          )}

          {/* Theme Toggle Button */}
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
