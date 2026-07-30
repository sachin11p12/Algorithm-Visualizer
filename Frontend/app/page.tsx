'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { VisualizerCanvas } from '@/components/visualizer/VisualizerCanvas';
import { ControlPanel } from '@/components/visualizer/ControlPanel';
import { PseudocodePanel } from '@/components/visualizer/PseudocodePanel';
import { StatsPanel } from '@/components/visualizer/StatsPanel';
import { AlgorithmDetails } from '@/components/visualizer/AlgorithmDetails';
import { CustomArrayModal } from '@/components/visualizer/CustomArrayModal';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';
import { AlgorithmKey } from '@/lib/types';
import { cn } from '@/lib/utils';

type View = 'home' | 'visualizer';
type Difficulty = 'Easy' | 'Medium' | 'Hard';

const ALGORITHM_CATEGORIES: {
  title: string;
  algorithms: { key: AlgorithmKey; difficulty: Difficulty }[];
}[] = [
  {
    title: 'Sorting Algorithms',
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
    algorithms: [
      { key: 'linear-search', difficulty: 'Easy' },
      { key: 'binary-search', difficulty: 'Medium' },
    ],
  },
];

const difficultyStyle: Record<Difficulty, string> = {
  Easy: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  Hard: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
};

function AlgorithmCard({
  algorithmKey,
  difficulty,
  onVisualize,
}: {
  algorithmKey: AlgorithmKey;
  difficulty: Difficulty;
  onVisualize: (key: AlgorithmKey) => void;
}) {
  const info = ALGORITHM_DATA[algorithmKey];
  const categoryLabel = info.category.charAt(0).toUpperCase() + info.category.slice(1);

  return (
    <div className="group flex flex-col justify-between bg-[#131316] dark:bg-[#111114] border border-white/8 rounded-2xl p-5 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] transition-all duration-300">
      {/* Card Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-bold text-white leading-snug">{info.name}</h3>
          <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0', difficultyStyle[difficulty])}>
            {difficulty}
          </span>
        </div>
        <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-3">
          {info.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/8">
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/10">
          {categoryLabel}
        </span>
        <button
          onClick={() => onVisualize(algorithmKey)}
          className="flex items-center space-x-1.5 text-[13px] font-semibold text-blue-400 hover:text-white bg-blue-600/0 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-all duration-200"
        >
          <span>Visualize</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function HomePage({ onVisualize }: { onVisualize: (key: AlgorithmKey) => void }) {
  return (
    <div className="flex-1 px-6 lg:px-12 py-10 max-w-[1280px] mx-auto w-full space-y-12">
      {/* Hero */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight">Algorithm Visualizer</h1>
        <p className="text-[15px] text-gray-400">
          Interactive visualizations to help you understand how algorithms work step-by-step.
        </p>
      </div>

      {/* Algorithm Category Sections */}
      {ALGORITHM_CATEGORIES.map((category) => (
        <section key={category.title} className="space-y-5">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{category.title}</h2>
            <button className="text-[13px] font-semibold px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
              View All
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.algorithms.map(({ key, difficulty }) => (
              <AlgorithmCard
                key={key}
                algorithmKey={key}
                difficulty={difficulty}
                onVisualize={onVisualize}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function VisualizerPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex-1 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 p-4 lg:p-8 space-y-6 overflow-x-hidden max-w-[1280px] mx-auto w-full">
        <StatsPanel />
        <VisualizerCanvas />
        <ControlPanel />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PseudocodePanel />
          <AlgorithmDetails />
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<View>('home');
  const { setAlgorithm } = useVisualizerStore();

  const handleVisualize = (key: AlgorithmKey) => {
    setAlgorithm(key);
    setView('visualizer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d10] dark:bg-[#0d0d10]">
      <Header
        view={view}
        onNavigateHome={() => setView('home')}
      />

      {/* Breadcrumb when in visualizer */}
      {view === 'visualizer' && (
        <div className="px-6 lg:px-12 py-2 max-w-[1280px] mx-auto w-full">
          <div className="flex items-center space-x-1.5 text-[13px] text-gray-500">
            <button onClick={() => setView('home')} className="hover:text-white transition-colors">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-300 font-medium">Visualizer</span>
          </div>
        </div>
      )}

      {view === 'home' ? (
        <HomePage onVisualize={handleVisualize} />
      ) : (
        <VisualizerPage />
      )}

      <Footer />
      <CustomArrayModal />
    </div>
  );
}
