'use client';

import React from 'react';
import { Code, ArrowRight } from 'lucide-react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';
import { cn } from '@/lib/utils';

export const PseudocodePanel: React.FC = () => {
  const { algorithm, steps, currentStepIdx } = useVisualizerStore();
  const algoInfo = ALGORITHM_DATA[algorithm];
  const currentStep = steps[currentStepIdx] || { line: 0 };
  const activeLine = currentStep.line;

  return (
    <div className="w-full glass-card rounded-2xl p-4 lg:p-5 flex flex-col space-y-3">
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-2">
        <Code className="w-4 h-4 text-indigo-500" />
        <span>Pseudocode Execution</span>
      </div>

      <div className="font-mono text-xs space-y-1 overflow-x-auto p-2 bg-muted/40 rounded-xl border border-border/40 max-h-[280px]">
        {algoInfo.pseudocode.map((lineText, idx) => {
          const isActive = idx === activeLine;
          return (
            <div
              key={idx}
              className={cn(
                'flex items-center space-x-2 px-2.5 py-1 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary/20 text-primary font-bold border border-primary/40 shadow-sm'
                  : 'text-muted-foreground hover:bg-muted/60'
              )}
            >
              <span className="w-6 text-[10px] text-muted-foreground/60 select-none text-right">
                {idx + 1}
              </span>
              <div className="w-3">
                {isActive && <ArrowRight className="w-3 h-3 text-primary animate-pulse" />}
              </div>
              <pre className="whitespace-pre tracking-wide font-medium">{lineText}</pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};
