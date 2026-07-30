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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 lg:top-[57px] left-0 z-50 lg:z-30 w-64 h-screen lg:h-[calc(100vh-57px)] bg-[#0d0d10] border-r border-white/8 p-4 flex flex-col gap-5 transition-transform duration-300 ease-in-out overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Filter */}
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3 px-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Algorithm Explorer</span>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search algorithms..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-[13px] rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Sorting Group */}
        <div>
          <div className="flex items-center space-x-2 px-1 mb-2">
            <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Sorting</span>
          </div>
          <div className="space-y-0.5">
            {sortingAlgos.filter(filterMatches).map((key) => {
              const active = isActive(key);
              return (
                <Link
                  key={key}
                  href={getHref(key)}
                  onClick={onClose}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-[13px] font-medium transition-all',
                    active
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
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
            <SearchCode className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Searching</span>
          </div>
          <div className="space-y-0.5">
            {searchingAlgos.filter(filterMatches).map((key) => {
              const active = isActive(key);
              return (
                <Link
                  key={key}
                  href={getHref(key)}
                  onClick={onClose}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-[13px] font-medium transition-all',
                    active
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {ALGORITHM_DATA[key].name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-auto pt-4 border-t border-white/8 text-center text-[11px] text-gray-600">
          <p>More algorithms coming soon</p>
        </div>
      </aside>
    </>
  );
};
