'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';
import { Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export const VisualizerCanvas: React.FC = () => {
  const { steps, currentStepIdx, algorithm, searchTarget, speed } = useVisualizerStore();

  const currentStep = steps[currentStepIdx] || {
    array: [],
    highlights: {},
    description: '',
  };

  const { array, highlights, description } = currentStep;
  const currentAlgo = ALGORITHM_DATA[algorithm];
  const maxVal = Math.max(...array, 1);

  // Helper to resolve bar color class & status
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

  // Dynamic animation duration matched to step execution speed
  const animDuration = Math.max(0.22 / speed, 0.08);

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
      <div className="relative w-full h-[280px] sm:h-[340px] flex items-end justify-center gap-1.5 sm:gap-2 px-2 pt-10 pb-10">
        {array.map((value, idx) => {
          const status = getBarStatus(idx);
          // Calculate proportional height relative to max element value (6% min, 100% max)
          const heightPercent = Math.max(Math.round((value / maxVal) * 100), 6);
          const inRange = isIndexInSearchRange(idx);
          const isActiveAction = status === 'comparing' || status === 'swapping' || status === 'found';

          let bgClass = 'bg-primary/75 border-primary/40';
          let shadowClass = '';

          if (status === 'found') {
            bgClass = 'bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-400 border-emerald-300';
            shadowClass = 'shadow-[0_0_25px_rgba(16,185,129,0.7)] z-20';
          } else if (status === 'swapping') {
            bgClass = 'bg-gradient-to-t from-rose-600 via-pink-600 to-rose-400 border-rose-300';
            shadowClass = 'shadow-[0_0_25px_rgba(244,63,94,0.8)] z-20';
          } else if (status === 'comparing') {
            bgClass = 'bg-gradient-to-t from-amber-500 via-amber-400 to-yellow-300 border-amber-200';
            shadowClass = 'shadow-[0_0_20px_rgba(245,158,11,0.7)] z-20';
          } else if (status === 'selected') {
            bgClass = 'bg-gradient-to-t from-purple-600 via-indigo-600 to-purple-400 border-purple-300';
            shadowClass = 'shadow-[0_0_20px_rgba(168,85,247,0.7)] z-20';
          } else if (status === 'sorted') {
            bgClass = 'bg-gradient-to-t from-emerald-600/80 to-teal-400/80 border-emerald-400/50';
          }

          const scaleVal = status === 'swapping' || status === 'found' ? 1.08 : status === 'comparing' ? 1.05 : 1;

          return (
            <motion.div
              key={idx}
              layout
              initial={false}
              animate={{
                height: `${heightPercent}%`,
                scale: scaleVal,
              }}
              transition={{
                height: { type: 'spring', stiffness: 300, damping: 25, duration: animDuration },
                scale: { duration: 0.15 },
                layout: { type: 'spring', stiffness: 350, damping: 28 },
              }}
              className={cn(
                'relative flex items-start justify-center rounded-t-lg border shadow-sm group select-none transition-colors duration-200',
                bgClass,
                shadowClass,
                inRange && status === 'default' && 'ring-2 ring-sky-400/60 bg-sky-500/40'
              )}
              style={{
                width: `${Math.max(100 / array.length - 1, 1.8)}%`,
                minWidth: array.length > 30 ? '10px' : '20px',
                maxWidth: '52px',
              }}
            >
              {/* Floating Value Label Above Bar */}
              <motion.div
                key={`val-${idx}`}
                initial={false}
                animate={{ scale: isActiveAction ? 1.25 : 1 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'absolute -top-7 font-extrabold whitespace-nowrap z-30 select-none pointer-events-none transition-colors duration-150',
                  isActiveAction
                    ? 'text-xs sm:text-sm font-black text-foreground drop-shadow-md'
                    : 'text-[10px] sm:text-xs text-foreground/90 font-bold'
                )}
              >
                {value}
              </motion.div>

              {/* Array Index Badge Below Bar */}
              <div className="absolute -bottom-8 flex items-center justify-center pointer-events-none">
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded-md font-mono text-[9px] sm:text-[11px] font-bold border transition-all duration-150 shadow-sm select-none',
                    isActiveAction
                      ? 'bg-primary text-primary-foreground border-primary scale-110'
                      : 'bg-secondary/90 text-muted-foreground border-border/60 hover:text-foreground'
                  )}
                >
                  {idx}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Visualizer Color Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 border-t border-border/40 text-xs">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-primary/70 border border-primary/40" />
          <span className="text-muted-foreground">Default</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          <span className="text-muted-foreground font-medium">Comparing</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
          <span className="text-muted-foreground font-medium">Swapping / Shift</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-500 border border-purple-300" />
          <span className="text-muted-foreground font-medium">Selected / Pivot</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-muted-foreground font-medium">Sorted / Found</span>
        </div>
      </div>
    </div>
  );
};
