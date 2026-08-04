'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, Activity } from 'lucide-react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';
import { AlgorithmKey } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const allAlgos: AlgorithmKey[] = [
  'bubble-sort',
  'selection-sort',
  'insertion-sort',
  'merge-sort',
  'quick-sort',
  'heap-sort',
  'linear-search',
  'binary-search',
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { steps, currentStepIdx, isPlaying, isFinished, algorithm } = useVisualizerStore();

  const activeLogRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to active log item
  useEffect(() => {
    if (activeLogRef.current && scrollContainerRef.current) {
      activeLogRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentStepIdx]);

  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = e.target.value as AlgorithmKey;
    const info = ALGORITHM_DATA[selectedKey];
    if (info) {
      router.push(`/${info.category}/${selectedKey}`);
    }
  };

  const currentAlgoName = ALGORITHM_DATA[algorithm]?.name || 'Algorithm';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Execution Logs Left Sidebar Window */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 lg:top-[61px] left-0 z-50 lg:z-30 w-72 sm:w-80 h-screen lg:h-[calc(100vh-61px)] glass-panel border-r border-border/40 p-4 flex flex-col gap-3 transition-transform duration-300 ease-in-out bg-card/50 backdrop-blur-md',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Top Header & Algo Selector */}
        <div className="space-y-3 pb-3 border-b border-border/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Terminal className="w-4 h-4 text-primary" />
              <span>Execution Logs</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>{isPlaying ? 'RUNNING' : isFinished ? 'FINISHED' : 'READY'}</span>
            </div>
          </div>

          {/* Quick Algorithm Switcher Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Select Algorithm
            </label>
            <select
              value={algorithm}
              onChange={handleAlgorithmChange}
              className="w-full px-3 py-2 text-xs rounded-xl bg-secondary/80 border border-border/60 text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
            >
              <optgroup label="Sorting Algorithms">
                {allAlgos
                  .filter((key) => ALGORITHM_DATA[key].category === 'sorting')
                  .map((key) => (
                    <option key={key} value={key}>
                      {ALGORITHM_DATA[key].name}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Searching Algorithms">
                {allAlgos
                  .filter((key) => ALGORITHM_DATA[key].category === 'searching')
                  .map((key) => (
                    <option key={key} value={key}>
                      {ALGORITHM_DATA[key].name}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>

          {/* Step Progress Tracker */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground pt-1">
            <span>Step Execution</span>
            <span className="font-mono text-foreground font-bold">
              {steps.length > 0 ? `${currentStepIdx + 1} / ${steps.length}` : '0 / 0'}
            </span>
          </div>
        </div>

        {/* Scrollable Logs Window */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar text-xs"
        >
          {steps.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground space-y-2">
              <Activity className="w-6 h-6 mx-auto text-muted-foreground/50" />
              <p className="text-xs">No execution logs generated yet.</p>
            </div>
          ) : (
            steps.map((step, index) => {
              const isActive = index === currentStepIdx;
              const isPast = index < currentStepIdx;

              // Determine action badge type
              let badgeColor = 'bg-blue-500/10 text-blue-500 border-blue-500/20';
              let actionLabel = 'STEP';

              if (step.description.toLowerCase().includes('swap')) {
                badgeColor = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
                actionLabel = 'SWAP';
              } else if (step.description.toLowerCase().includes('sorted') || step.description.toLowerCase().includes('found')) {
                badgeColor = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
                actionLabel = 'SUCCESS';
              } else if (step.description.toLowerCase().includes('compare') || step.description.toLowerCase().includes('checking')) {
                badgeColor = 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
                actionLabel = 'COMPARE';
              }

              return (
                <div
                  key={index}
                  ref={isActive ? activeLogRef : null}
                  onClick={() => useVisualizerStore.setState({ currentStepIdx: index })}
                  className={cn(
                    'p-3 rounded-xl border transition-all cursor-pointer select-none space-y-1.5',
                    isActive
                      ? 'bg-primary/10 border-primary shadow-sm shadow-primary/20 ring-1 ring-primary/30'
                      : isPast
                      ? 'bg-card/40 border-border/30 opacity-75 hover:opacity-100 hover:bg-card/70'
                      : 'bg-card/20 border-border/20 opacity-50 hover:opacity-80'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-muted-foreground">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider',
                        badgeColor
                      )}
                    >
                      {actionLabel}
                    </span>
                  </div>

                  <p
                    className={cn(
                      'text-[11px] leading-relaxed',
                      isActive ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-border/40 text-center text-[10px] text-muted-foreground font-semibold flex items-center justify-between">
          <span>Click log to jump</span>
          <span className="font-mono text-primary">{currentAlgoName}</span>
        </div>
      </aside>
    </>
  );
};
