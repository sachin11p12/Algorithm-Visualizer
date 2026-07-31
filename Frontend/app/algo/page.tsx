'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Info } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ALGORITHM_DATA } from '@/lib/algorithmData';
import { AlgorithmKey } from '@/lib/types';
import { cn } from '@/lib/utils';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface AlgoItem {
  key: AlgorithmKey;
  difficulty: Difficulty;
}

const SORTING_ALGOS: AlgoItem[] = [
  { key: 'bubble-sort', difficulty: 'Easy' },
  { key: 'selection-sort', difficulty: 'Easy' },
  { key: 'insertion-sort', difficulty: 'Easy' },
  { key: 'merge-sort', difficulty: 'Medium' },
  { key: 'quick-sort', difficulty: 'Medium' },
  { key: 'heap-sort', difficulty: 'Hard' },
];

const SEARCHING_ALGOS: AlgoItem[] = [
  { key: 'linear-search', difficulty: 'Easy' },
  { key: 'binary-search', difficulty: 'Medium' },
];

const difficultyStyle: Record<Difficulty, string> = {
  Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30',
  Hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30',
};

function ExactAlgorithmCard({
  algorithmKey,
  difficulty,
  category,
}: {
  algorithmKey: AlgorithmKey;
  difficulty: Difficulty;
  category: 'sorting' | 'searching';
}) {
  const info = ALGORITHM_DATA[algorithmKey];
  const href = `/${category}/${algorithmKey}`;

  return (
    <Link
      href={href}
      className="group flex flex-col justify-between glass-card bg-card/60 border border-border/50 rounded-2xl p-6 min-h-[215px] hover:border-primary/70 hover:-translate-y-1.5 hover:shadow-[0_14px_35px_-8px_rgba(168,85,247,0.22)] transition-all duration-300 ease-out"
    >
      {/* Top Header Row */}
      <div className="space-y-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
            {info.name}
          </h3>
          <span
            className={cn(
              'text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0',
              difficultyStyle[difficulty]
            )}
          >
            {difficulty}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 min-h-[58px]">
          {info.description}
        </p>
      </div>

      {/* Bottom Footer Row */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/40 capitalize">
          {info.category === 'sorting' ? 'Sorting' : 'Searching'}
        </span>
        <span className="flex items-center space-x-1 text-xs font-bold text-primary group-hover:text-primary/80 transition-colors">
          <span>Visualize</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

export default function AlgoPage() {
  const [showInfoPopover, setShowInfoPopover] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Header view="home" />

      <div className="flex-1 px-6 lg:px-12 py-10 max-w-[1180px] mx-auto w-full space-y-10">
        {/* Page Hero */}
        <div className="space-y-2 pt-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Algorithm Visualizer
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-2xl leading-relaxed">
            Master Algorithms Faster with Step-by-Step Visual Execution and Real-Time Insights.
          </p>
        </div>

        {/* ── Array Data Structure Container ── */}
        <div className="w-full glass-card bg-card/80 border border-border/60 rounded-2xl shadow-sm space-y-0">
          {/* Main Array Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-muted/20 relative">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 rounded-lg bg-primary/15 text-primary">
                <ChevronRight className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-foreground tracking-tight">Array</h2>
            </div>

            {/* Info Button & Popover */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowInfoPopover(true)}
                onMouseLeave={() => setShowInfoPopover(false)}
                onClick={() => setShowInfoPopover((prev) => !prev)}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                aria-label="Array Info"
              >
                <Info className="w-5 h-5" />
              </button>

              {/* Hover Popover */}
              {showInfoPopover && (
                <div
                  onMouseEnter={() => setShowInfoPopover(true)}
                  onMouseLeave={() => setShowInfoPopover(false)}
                  className="absolute right-0 top-10 z-50 w-80 sm:w-96 p-5 glass-card bg-card/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl text-left space-y-4 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="space-y-1.5">
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                      <strong className="font-bold text-foreground">About:</strong> An array is a data structure that stores multiple values of the same type in a single variable. Each value is stored at a specific index, starting from 0.
                    </p>
                  </div>

                  {/* Representation */}
                  <div className="space-y-2.5 pt-2 border-t border-border/40">
                    <h4 className="text-xs font-bold text-foreground">Representation:</h4>
                    <div className="flex items-center justify-start gap-2.5 pt-1">
                      {[
                        { val: 10, idx: '[0]' },
                        { val: 20, idx: '[1]' },
                        { val: 30, idx: '[2]' },
                        { val: 40, idx: '[3]' },
                      ].map(({ val, idx }) => (
                        <div key={idx} className="flex flex-col items-center gap-1.5">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-600 dark:bg-blue-500 text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-lg shadow-blue-500/25">
                            {val}
                          </div>
                          <span className="font-mono text-[11px] text-muted-foreground font-semibold">{idx}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Container Content Body */}
          <div className="p-6 space-y-10">
            {/* Sorting Algorithms Section */}
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground tracking-tight">Sorting Algorithms</h3>
                <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">
                  {SORTING_ALGOS.length} Algorithms
                </span>
              </div>

              {/* 3-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SORTING_ALGOS.map(({ key, difficulty }) => (
                  <ExactAlgorithmCard
                    key={key}
                    algorithmKey={key}
                    difficulty={difficulty}
                    category="sorting"
                  />
                ))}
              </div>
            </section>

            {/* Searching Algorithms Section */}
            <section className="space-y-5 pt-4 border-t border-border/40">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground tracking-tight">Searching Algorithms</h3>
                <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">
                  {SEARCHING_ALGOS.length} Algorithms
                </span>
              </div>

              {/* 3-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SEARCHING_ALGOS.map(({ key, difficulty }) => (
                  <ExactAlgorithmCard
                    key={key}
                    algorithmKey={key}
                    difficulty={difficulty}
                    category="searching"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
