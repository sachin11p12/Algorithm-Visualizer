'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const VisualizerCanvas: React.FC = () => {
  const { steps, currentStepIdx, algorithm, searchTarget } = useVisualizerStore();

  const currentStep = steps[currentStepIdx] || {
    array: [],
    highlights: {},
    description: '',
  };

  const { array, highlights, description } = currentStep;
  const currentAlgo = ALGORITHM_DATA[algorithm];
  const maxVal = Math.max(...array, 1);

  // Helper to resolve bar color class & inline styling
  const getBarStatus = (index: number) => {
    if (highlights.foundIndex === index) return 'found';
    if (highlights.swapping?.includes(index)) return 'swapping';
    if (highlights.comparing?.includes(index)) return 'comparing';
    if (highlights.selected?.includes(index)) return 'selected';
    if (highlights.sorted?.includes(index)) return 'sorted';
    return 'default';
  };

  const isIndexInSearchRange = (index: number) => {
    if (!highlights.searchRange) return false;
    const [low, high] = highlights.searchRange;
    return index >= low && index <= high;
  };

  return (
    <div className="w-full glass-card rounded-2xl p-4 lg:p-6 flex flex-col justify-between space-y-6 min-h-[380px] sm:min-h-[440px]">
      {/* Top Banner: Description Log */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-muted/40 border border-border/40 px-4 py-3 rounded-xl">
        <div className="flex items-center space-x-2.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <p className="text-xs sm:text-sm font-medium text-foreground tracking-wide">
            {description || 'Ready to start visualization.'}
          </p>
        </div>

        {currentAlgo.category === 'searching' && (
          <div className="flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-lg">
            <Target className="w-3.5 h-3.5" />
            <span>Target: {searchTarget}</span>
          </div>
        )}
      </div>

      {/* Main Array Bar Container */}
      <div className="relative flex-1 w-full flex items-end justify-center gap-1 sm:gap-2 px-2 pt-8 pb-4 min-h-[220px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          {array.map((value, idx) => {
            const status = getBarStatus(idx);
            const heightPercent = Math.max((value / maxVal) * 100, 8);
            const inRange = isIndexInSearchRange(idx);

            let bgClass = 'bg-primary/70 border-primary/30';
            let textClass = 'text-primary-foreground';
            let shadowClass = '';

            if (status === 'found') {
              bgClass = 'bg-gradient-to-t from-emerald-600 to-emerald-400 border-emerald-300';
              shadowClass = 'shadow-[0_0_20px_rgba(16,185,129,0.6)] z-10 scale-105';
            } else if (status === 'swapping') {
              bgClass = 'bg-gradient-to-t from-rose-600 to-pink-500 border-rose-300';
              shadowClass = 'shadow-[0_0_20px_rgba(244,63,94,0.6)] z-10 scale-105';
            } else if (status === 'comparing') {
              bgClass = 'bg-gradient-to-t from-amber-500 to-yellow-400 border-amber-300';
              shadowClass = 'shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10';
            } else if (status === 'selected') {
              bgClass = 'bg-gradient-to-t from-purple-600 to-indigo-500 border-purple-300';
              shadowClass = 'shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10';
            } else if (status === 'sorted') {
              bgClass = 'bg-gradient-to-t from-emerald-500/80 to-teal-400/80 border-emerald-400/50';
            }

            return (
              <motion.div
                key={`${idx}-${value}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={cn(
                  'relative flex flex-col items-center justify-end rounded-t-lg transition-colors border group',
                  bgClass,
                  shadowClass,
                  inRange && status === 'default' && 'ring-2 ring-sky-400/50 bg-sky-500/30'
                )}
                style={{
                  height: `${heightPercent}%`,
                  width: `${Math.max(100 / array.length - 1, 1.5)}%`,
                  minWidth: array.length > 30 ? '8px' : '16px',
                  maxWidth: '48px',
                }}
              >
                {/* Bar Value Label */}
                <span
                  className={cn(
                    'text-[10px] sm:text-xs font-bold mb-1 transition-transform group-hover:scale-110',
                    array.length > 35 ? 'hidden sm:block text-[8px]' : '',
                    textClass
                  )}
                >
                  {value}
                </span>

                {/* Index label underneath bar */}
                <span className="absolute -bottom-6 text-[9px] sm:text-[11px] font-medium text-muted-foreground">
                  {idx}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Visualizer Color Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 border-t border-border/40 text-xs">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-primary/70 border border-primary/40" />
          <span className="text-muted-foreground">Default</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
          <span className="text-muted-foreground">Swapping / Shift</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-500 border border-purple-300" />
          <span className="text-muted-foreground">Selected / Pivot</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-muted-foreground">Sorted / Found</span>
        </div>
      </div>
    </div>
  );
};
