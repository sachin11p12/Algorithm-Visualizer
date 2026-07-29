'use client';

import React, { useState } from 'react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';
import { AlgorithmKey } from '@/lib/types';
import { Search, BarChart2, SearchCode, ChevronRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { algorithm, setAlgorithm } = useVisualizerStore();
  const [filterQuery, setFilterQuery] = useState('');

  const sortingAlgos: AlgorithmKey[] = [
    'bubble-sort',
    'selection-sort',
    'insertion-sort',
    'merge-sort',
    'quick-sort',
    'heap-sort',
  ];

  const searchingAlgos: AlgorithmKey[] = ['linear-search', 'binary-search'];

  const filterMatches = (key: AlgorithmKey) => {
    if (!filterQuery.trim()) return true;
    const item = ALGORITHM_DATA[key];
    return item.name.toLowerCase().includes(filterQuery.toLowerCase());
  };

  const handleSelect = (key: AlgorithmKey) => {
    setAlgorithm(key);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 lg:top-[61px] left-0 z-50 lg:z-30 w-72 h-screen lg:h-[calc(100vh-61px)] glass-panel border-r border-border/40 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="space-y-5">
          {/* Header & Filter input */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>Algorithm Explorer</span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search algorithms..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-secondary/60 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Group 1: Sorting Algorithms */}
          <div>
            <div className="flex items-center space-x-2 px-2 py-1 mb-2 text-xs font-bold text-foreground uppercase tracking-wider">
              <BarChart2 className="w-4 h-4 text-indigo-500" />
              <span>Sorting</span>
            </div>
            <div className="space-y-1">
              {sortingAlgos.filter(filterMatches).map((key) => {
                const info = ALGORITHM_DATA[key];
                const isActive = algorithm === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group',
                      isActive
                        ? 'bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 scale-[1.02]'
                        : 'hover:bg-muted/70 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span>{info.name}</span>
                    <ChevronRight
                      className={cn(
                        'w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5',
                        isActive ? 'text-primary-foreground opacity-100' : 'opacity-0 group-hover:opacity-100'
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Searching Algorithms */}
          <div>
            <div className="flex items-center space-x-2 px-2 py-1 mb-2 text-xs font-bold text-foreground uppercase tracking-wider">
              <SearchCode className="w-4 h-4 text-emerald-500" />
              <span>Searching</span>
            </div>
            <div className="space-y-1">
              {searchingAlgos.filter(filterMatches).map((key) => {
                const info = ALGORITHM_DATA[key];
                const isActive = algorithm === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group',
                      isActive
                        ? 'bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 scale-[1.02]'
                        : 'hover:bg-muted/70 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span>{info.name}</span>
                    <ChevronRight
                      className={cn(
                        'w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5',
                        isActive ? 'text-primary-foreground opacity-100' : 'opacity-0 group-hover:opacity-100'
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-border/40 text-[11px] text-muted-foreground space-y-1 text-center">
          <p className="font-semibold text-foreground">Interactive Engine</p>
          <p>Real-time execution & step playback</p>
        </div>
      </aside>
    </>
  );
};
