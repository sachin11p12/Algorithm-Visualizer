'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Info } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ALGORITHM_DATA } from '@/lib/algorithmData';
import { AlgorithmKey } from '@/lib/types';
import { cn } from '@/lib/utils';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

const ALGORITHM_CATEGORIES: {
  title: string;
  category: 'sorting' | 'searching';
  algorithms: { key: AlgorithmKey; difficulty: Difficulty }[];
}[] = [
  {
    title: 'Sorting Algorithms',
    category: 'sorting',
    algorithms: [
      { key: 'bubble-sort', difficulty: 'Easy' },
      { key: 'selection-sort', difficulty: 'Easy' },
      { key: 'insertion-sort', difficulty: 'Easy' },
      { key: 'merge-sort', difficulty: 'Medium' },
      { key: 'quick-sort', difficulty: 'Medium' },
      { key: 'heap-sort', difficulty: 'Hard' },
    ],
  },
  {
    title: 'Searching Algorithms',
    category: 'searching',
    algorithms: [
      { key: 'linear-search', difficulty: 'Easy' },
      { key: 'binary-search', difficulty: 'Medium' },
    ],
  },
];

const difficultyStyle: Record<Difficulty, string> = {
  Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30',
  Hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30',
};

// Array Algorithms Selection Card matching user design specification
function ArrayAlgorithmsCard() {
  const searchingAlgos: { key: AlgorithmKey; name: string }[] = [
    { key: 'linear-search', name: 'Linear Search' },
    { key: 'binary-search', name: 'Binary Search' },
  ];

  const sortingAlgos: { key: AlgorithmKey; name: string }[] = [
    { key: 'bubble-sort', name: 'Bubble Sort' },
    { key: 'selection-sort', name: 'Selection Sort' },
    { key: 'insertion-sort', name: 'Insertion Sort' },
    { key: 'merge-sort', name: 'Merge Sort' },
    { key: 'quick-sort', name: 'Quick Sort' },
    { key: 'heap-sort', name: 'Heap Sort' },
  ];

  return (
    <div className="w-full glass-card bg-card/80 border border-border/60 rounded-2xl shadow-sm overflow-hidden">
      {/* Card Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-muted/20">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <ChevronRight className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-foreground tracking-tight">Array</h2>
        </div>
        <div className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" title="Array Data Structure Algorithms">
          <Info className="w-4.5 h-4.5" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 space-y-7">
        {/* Searching Section */}
        <div className="space-y-3.5">
          <div className="flex items-center space-x-2">
            <span className="w-1 h-4 bg-blue-600 dark:bg-blue-500 rounded-full inline-block" />
            <h3 className="text-sm font-bold text-foreground">Searching</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {searchingAlgos.map(({ key, name }) => (
              <Link
                key={key}
                href={`/searching/${key}`}
                className="group flex items-center justify-between min-w-[165px] px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 hover:bg-secondary hover:border-blue-500/50 transition-all duration-200 shadow-sm"
              >
                <span className="text-xs font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {name}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/70 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all ml-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Sorting Section */}
        <div className="space-y-3.5">
          <div className="flex items-center space-x-2">
            <span className="w-1 h-4 bg-blue-600 dark:bg-blue-500 rounded-full inline-block" />
            <h3 className="text-sm font-bold text-foreground">Sorting</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {sortingAlgos.map(({ key, name }) => (
              <Link
                key={key}
                href={`/sorting/${key}`}
                className="group flex items-center justify-between min-w-[165px] px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 hover:bg-secondary hover:border-blue-500/50 transition-all duration-200 shadow-sm"
              >
                <span className="text-xs font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {name}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/70 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all ml-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AlgorithmCard({
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
    <div className="group flex flex-col justify-between glass-card bg-card/60 border border-border/50 rounded-2xl p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      {/* Card Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
            {info.name}
          </h3>
          <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0', difficultyStyle[difficulty])}>
            {difficulty}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {info.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/40">
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/40 capitalize">
          {info.category}
        </span>
        <Link
          href={href}
          className="flex items-center space-x-1.5 text-xs font-semibold text-primary hover:text-primary-foreground hover:bg-primary px-3.5 py-1.5 rounded-lg transition-all duration-200 shadow-sm"
        >
          <span>Visualize</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function AlgoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Header view="home" />

      <div className="flex-1 px-6 lg:px-12 py-10 max-w-[1280px] mx-auto w-full space-y-12">
        {/* Hero */}
        <div className="space-y-2 pt-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Algorithm Visualizer
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-2xl leading-relaxed">
            Master Algorithms Faster with Step-by-Step Visual Execution and Real-Time Insights.
          </p>
        </div>

        {/* ── Array Algorithms Card Component ── */}
        <ArrayAlgorithmsCard />

        {/* Algorithm Category Sections */}
        {ALGORITHM_CATEGORIES.map((section) => (
          <section key={section.title} className="space-y-5">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground tracking-tight">{section.title}</h2>
              <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg">
                {section.algorithms.length} Algorithms
              </span>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {section.algorithms.map(({ key, difficulty }) => (
                <AlgorithmCard
                  key={key}
                  algorithmKey={key}
                  difficulty={difficulty}
                  category={section.category}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}
