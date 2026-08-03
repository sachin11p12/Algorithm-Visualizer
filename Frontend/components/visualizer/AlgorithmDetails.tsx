'use client';

import React from 'react';
import { Info, ShieldCheck, Cpu, Lightbulb, ListOrdered } from 'lucide-react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';

export const AlgorithmDetails: React.FC = () => {
  const { algorithm } = useVisualizerStore();
  const info = ALGORITHM_DATA[algorithm];

  return (
    <div className="w-full glass-card rounded-2xl p-5 lg:p-6 space-y-6">
      {/* Title & Category Badge */}
      <div className="space-y-3 border-b border-border/40 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground flex items-center space-x-2">
            <Info className="w-5 h-5 text-primary" />
            <span>{info.name} Theory & Concept</span>
          </h2>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
            {info.category}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {info.description}
        </p>
      </div>

      {/* Step-by-Step Logic: How It Works */}
      {info.howItWorks && info.howItWorks.length > 0 && (
        <div className="space-y-3 border-b border-border/40 pb-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center space-x-2">
            <ListOrdered className="w-4 h-4 text-blue-500" />
            <span>Step-by-Step Logic</span>
          </h3>
          <ol className="space-y-2 text-xs sm:text-sm">
            {info.howItWorks.map((step, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-muted-foreground">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-foreground/90 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Practical Guidance: When To Use */}
      {info.whenToUse && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
          <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
            <Lightbulb className="w-4 h-4" />
            <span>When To Use</span>
          </div>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
            {info.whenToUse}
          </p>
        </div>
      )}

      {/* Complexities Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Best Case */}
        <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Best Case</p>
          <p className="text-sm font-extrabold text-emerald-500 font-mono">{info.bestTime}</p>
        </div>

        {/* Average Case */}
        <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Avg Case</p>
          <p className="text-sm font-extrabold text-amber-500 font-mono">{info.avgTime}</p>
        </div>

        {/* Worst Case */}
        <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Worst Case</p>
          <p className="text-sm font-extrabold text-rose-500 font-mono">{info.worstTime}</p>
        </div>

        {/* Space Complexity */}
        <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Space Complexity</p>
          <p className="text-sm font-extrabold text-indigo-500 font-mono">{info.spaceComplexity}</p>
        </div>
      </div>

      {/* Attributes Badges */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold pt-1">
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/40">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Stability:</span>
          <span className={info.stable ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'}>
            {info.stable ? 'Stable' : 'Unstable'}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/40">
          <Cpu className="w-4 h-4 text-purple-500" />
          <span className="text-muted-foreground">In-Place:</span>
          <span className={info.inPlace ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'}>
            {info.inPlace ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  );
};
