'use client';

import React, { useState } from 'react';
import { X, Check, HelpCircle, Target } from 'lucide-react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';

export const CustomArrayModal: React.FC = () => {
  const {
    isCustomModalOpen,
    setIsCustomModalOpen,
    setCustomArray,
    array,
    algorithm,
    searchTarget,
    setSearchTarget,
  } = useVisualizerStore();

  const [inputVal, setInputVal] = useState(array.join(', '));
  const [targetInput, setTargetInput] = useState(searchTarget.toString());
  const [error, setError] = useState<string | null>(null);

  const algoInfo = ALGORITHM_DATA[algorithm];
  const isSearchAlgo = algoInfo.category === 'searching';

  if (!isCustomModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = setCustomArray(inputVal);
    if (!success) {
      setError('Invalid array input! Please enter between 2 and 50 numbers (1-200), separated by commas or spaces.');
      return;
    }

    if (isSearchAlgo) {
      const numTarget = Number(targetInput);
      if (!isNaN(numTarget)) {
        setSearchTarget(numTarget);
      }
    }

    setIsCustomModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md glass-card bg-card p-6 rounded-2xl border border-border shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <h3 className="text-base font-bold text-foreground">Custom Input Configuration</h3>
          <button
            onClick={() => setIsCustomModalOpen(false)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Custom Array Numbers Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Array Elements (Comma or space separated):</span>
              <span className="text-[10px] text-muted-foreground">Range: 1-200</span>
            </label>
            <textarea
              rows={3}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. 15, 42, 8, 23, 90, 67"
              className="w-full p-3 text-xs rounded-xl bg-secondary/60 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
            />
          </div>

          {/* Search Target Input if Searching algorithm */}
          {isSearchAlgo && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center space-x-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-500" />
                <span>Search Target Value:</span>
              </label>
              <input
                type="number"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-secondary/60 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
              />
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCustomModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-muted/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center space-x-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Input</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
