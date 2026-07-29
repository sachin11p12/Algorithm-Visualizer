'use client';

import React, { useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Shuffle,
  Sliders,
  Zap,
  Edit3,
  Plus,
  Minus,
} from 'lucide-react';
import { useVisualizerStore, SpeedMultiplier } from '@/store/useVisualizerStore';
import { cn } from '@/lib/utils';

export const ControlPanel: React.FC = () => {
  const {
    isPlaying,
    isFinished,
    currentStepIdx,
    steps,
    speed,
    arraySize,
    play,
    pause,
    resume,
    stepForward,
    stepBackward,
    reset,
    regenerateArray,
    setArraySize,
    setSpeed,
    setIsCustomModalOpen,
    tick,
  } = useVisualizerStore();

  // Animation Interval Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      const intervalMs = Math.max(Math.round(400 / speed), 50);
      timer = setInterval(() => {
        tick();
      }, intervalMs);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, speed, tick]);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keybindings if active element is an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) pause();
        else play();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        stepForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        stepBackward();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, play, pause, stepForward, stepBackward, reset]);

  const speedOptions: SpeedMultiplier[] = [0.25, 0.5, 1, 2, 4];

  return (
    <div className="w-full glass-card rounded-2xl p-4 lg:p-6 space-y-6">
      {/* Top Row: Playback & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Play / Pause / Step Controls */}
        <div className="flex items-center space-x-2">
          {/* Step Backward */}
          <button
            onClick={stepBackward}
            disabled={currentStepIdx === 0 || isPlaying}
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            title="Step Backward (Left Arrow)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={() => {
              if (isPlaying) pause();
              else if (currentStepIdx > 0 && !isFinished) resume();
              else play();
            }}
            className={cn(
              'px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 scale-100 active:scale-95',
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/30'
            )}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{currentStepIdx > 0 && !isFinished ? 'Resume' : 'Start'}</span>
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={stepForward}
            disabled={currentStepIdx >= steps.length - 1 || isPlaying}
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            title="Step Forward (Right Arrow)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            title="Reset Array (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Array Generation Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={regenerateArray}
            disabled={isPlaying}
            className="px-3.5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/40 text-xs font-semibold text-foreground flex items-center space-x-2 disabled:opacity-50 transition-all shadow-sm"
          >
            <Shuffle className="w-3.5 h-3.5 text-primary" />
            <span>Random Array</span>
          </button>

          <button
            onClick={() => setIsCustomModalOpen(true)}
            disabled={isPlaying}
            className="px-3.5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/40 text-xs font-semibold text-foreground flex items-center space-x-2 disabled:opacity-50 transition-all shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Custom Input</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Sliders & Speed Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/40">
        {/* Array Size Slider & Manual +/- Controls */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span className="flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              <span>Array Size:</span>
            </span>
            <span className="font-bold text-foreground">{arraySize} elements</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setArraySize(Math.max(5, arraySize - 1))}
              disabled={isPlaying || arraySize <= 5}
              className="p-1.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
              title="Decrease Array Size (-1)"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <input
              type="range"
              min={5}
              max={50}
              value={arraySize}
              disabled={isPlaying}
              onChange={(e) => setArraySize(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-secondary rounded-lg cursor-pointer disabled:opacity-50"
            />

            <button
              onClick={() => setArraySize(Math.min(50, arraySize + 1))}
              disabled={isPlaying || arraySize >= 50}
              className="p-1.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
              title="Increase Array Size (+1)"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Animation Speed Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span className="flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Animation Speed:</span>
            </span>
            <span className="font-bold text-foreground">{speed}x</span>
          </div>

          <div className="flex items-center space-x-1 bg-secondary/60 p-1 rounded-xl border border-border/40">
            {speedOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={cn(
                  'flex-1 py-1 text-xs font-bold rounded-lg transition-all',
                  speed === s
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
