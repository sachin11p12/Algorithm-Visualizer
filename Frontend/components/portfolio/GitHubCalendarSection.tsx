'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { RefreshCw } from 'lucide-react';

export const GitHubCalendarSection: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [streakSourceIdx, setStreakSourceIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const streakTheme = theme === 'dark' ? 'dark' : 'default';

  // Resilient fallback endpoints for GitHub Streak Stats
  const streakSources = [
    `https://streak-stats.demolab.com/?user=sachin11p12&theme=${streakTheme}&hide_border=true`,
    `https://github-readme-streak-stats.herokuapp.com/?user=sachin11p12&theme=${streakTheme}&hide_border=true`,
    `https://github-readme-stats.vercel.app/api?username=sachin11p12&show_icons=true&theme=${streakTheme}&hide_border=true`,
  ];

  const currentStreakUrl = streakSources[streakSourceIdx] || streakSources[0];

  const handleStreakError = () => {
    if (streakSourceIdx < streakSources.length - 1) {
      setStreakSourceIdx((prev) => prev + 1);
    }
  };

  return (
    <section id="github" className="pt-2">
      {/* ── Official GitHub Streak Stats Card ── */}
      <div className="w-full glass-card bg-card/70 border border-border/60 rounded-2xl p-4 sm:p-6 shadow-sm overflow-hidden flex justify-center items-center">
        {mounted ? (
          <div className="w-full flex justify-center items-center overflow-x-auto py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={currentStreakUrl}
              src={currentStreakUrl}
              alt="sachin11p12's GitHub Streak Stats"
              className="w-full max-w-[800px] h-auto min-w-[480px] rounded-xl transition-all"
              onError={handleStreakError}
            />
          </div>
        ) : (
          <div className="h-[150px] w-full flex items-center justify-center text-xs text-muted-foreground space-x-2">
            <RefreshCw className="w-4 h-4 animate-spin text-primary" />
            <span>Loading GitHub streak stats...</span>
          </div>
        )}
      </div>
    </section>
  );
};
