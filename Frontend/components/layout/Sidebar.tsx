'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, BarChart2, SearchCode, Layers } from 'lucide-react';
import { ALGORITHM_DATA } from '@/lib/algorithmData';
import { AlgorithmKey } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sortingAlgos: AlgorithmKey[] = [
  'bubble-sort',
  'selection-sort',
  'insertion-sort',
  'merge-sort',
  'quick-sort',
  'heap-sort',
];

const searchingAlgos: AlgorithmKey[] = ['linear-search', 'binary-search'];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [filterQuery, setFilterQuery] = useState('');

  const filterMatches = (key: AlgorithmKey) => {
    if (!filterQuery.trim()) return true;
    return ALGORITHM_DATA[key].name.toLowerCase().includes(filterQuery.toLowerCase());
  };

  const getHref = (key: AlgorithmKey) => {
    const info = ALGORITHM_DATA[key];
    return `/${info.category}/${key}`;
  };

  const isActive = (key: AlgorithmKey) => {
    return pathname === getHref(key);
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

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 lg:top-[61px] left-0 z-50 lg:z-30 w-64 h-screen lg:h-[calc(100vh-61px)] glass-panel border-r border-border/40 p-4 flex flex-col gap-5 transition-transform duration-300 ease-in-out overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Filter */}
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>Algorithm Explorer</span>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search algorithms..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-secondary/60 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Sorting Group */}
        <div>
          <div className="flex items-center space-x-2 px-1 mb-2">
            <BarChart2 className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Sorting</span>
          </div>
          <div className="space-y-1">
            {sortingAlgos.filter(filterMatches).map((key) => {
              const active = isActive(key);
              return (
                <Link
                  key={key}
                  href={getHref(key)}
                  onClick={onClose}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-all',
                    active
                      ? 'bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 scale-[1.02]'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                  )}
                >
                  {ALGORITHM_DATA[key].name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Searching Group */}
        <div>
          <div className="flex items-center space-x-2 px-1 mb-2">
            <SearchCode className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Searching</span>
          </div>
          <div className="space-y-1">
            {searchingAlgos.filter(filterMatches).map((key) => {
              const active = isActive(key);
              return (
                <Link
                  key={key}
                  href={getHref(key)}
                  onClick={onClose}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-all',
                    active
                      ? 'bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 scale-[1.02]'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                  )}
                >
                  {ALGORITHM_DATA[key].name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-auto pt-4 border-t border-border/40 text-center text-[11px] text-muted-foreground">
          <p>More algorithms coming soon</p>
        </div>
      </aside>
    </>
  );
};
