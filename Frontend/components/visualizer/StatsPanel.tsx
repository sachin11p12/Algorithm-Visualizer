'use client';

import React from 'react';
import { Activity, ArrowRightLeft, Clock, CheckCircle2 } from 'lucide-react';
import { useVisualizerStore } from '@/store/useVisualizerStore';

export const StatsPanel: React.FC = () => {
  const { steps, currentStepIdx, elapsedTime } = useVisualizerStore();
  const currentStep = steps[currentStepIdx] || { comparisons: 0, swaps: 0 };
  const totalSteps = steps.length;
  const progressPercent = totalSteps > 1 ? Math.round((currentStepIdx / (totalSteps - 1)) * 100) : 0;
  
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* Metric 1: Comparisons */}
      <div className="glass-card rounded-xl p-3 flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase">Comparisons</p>
          <p className="text-base font-extrabold text-foreground">{currentStep.comparisons}</p>
        </div>
      </div>

      {/* Metric 2: Swaps */}
      <div className="glass-card rounded-xl p-3 flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20">
          <ArrowRightLeft className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase">Swaps / Shifts</p>
          <p className="text-base font-extrabold text-foreground">{currentStep.swaps}</p>
        </div>
      </div>

      {/* Metric 3: Time Elapsed */}
      <div className="glass-card rounded-xl p-3 flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase">Elapsed Time</p>
          <p className="text-base font-extrabold text-foreground">{elapsedTime} ms</p>
        </div>
      </div>

      {/* Metric 4: Steps Progress */}
      <div className="glass-card rounded-xl p-3 flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase">Progress</p>
          <p className="text-base font-extrabold text-foreground">
            {currentStepIdx + 1} / {totalSteps} ({progressPercent}%)  
          </p>
        </div>
      </div>
    </div>
  );
};
