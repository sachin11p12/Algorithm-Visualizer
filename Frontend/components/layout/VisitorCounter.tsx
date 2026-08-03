'use client';

import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    async function updateVisitorCount() {
      const STORAGE_KEY = 'real_portfolio_visitor_count';
      const HAS_VISITED_KEY = 'real_portfolio_has_visited';

      let currentCount = 1;

      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          currentCount = parseInt(stored, 10);
        }

        const hasVisited = sessionStorage.getItem(HAS_VISITED_KEY);
        const action = !hasVisited ? 'up' : 'current';

        // Real Global Counter API for sachin11p12 portfolio
        const apiRes = await fetch(`https://api.counterapi.dev/v1/sachin11p12-portfolio/visits/${action}`);

        if (apiRes.ok) {
          const data = await apiRes.json();
          if (data && typeof data.count === 'number') {
            currentCount = data.count;
          }
        } else if (!hasVisited) {
          currentCount += 1;
        }

        if (!hasVisited) {
          sessionStorage.setItem(HAS_VISITED_KEY, 'true');
          localStorage.setItem(STORAGE_KEY, currentCount.toString());
        }
      } catch (e) {
        // Fallback to local storage if API unreachable
      }

      setVisitorCount(currentCount);
    }

    updateVisitorCount();
  }, []);

  if (!mounted) return null;

  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border/50 text-xs font-semibold shadow-sm select-none">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <Users className="w-3.5 h-3.5 text-primary" />
      <span className="text-muted-foreground">Visitors:</span>
      <span className="text-foreground font-mono font-bold">
        {visitorCount !== null ? visitorCount.toLocaleString() : '...'}
      </span>
    </div>
  );
};
