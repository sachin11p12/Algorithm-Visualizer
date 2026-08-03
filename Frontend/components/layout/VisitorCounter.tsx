'use client';

import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    async function updateVisitorCount() {
      const STORAGE_KEY = 'algo_vis_visitor_count';
      const HAS_VISITED_KEY = 'algo_vis_has_visited';

      let count = 1284; // Base seed count

      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          count = parseInt(stored, 10);
        }

        const hasVisited = sessionStorage.getItem(HAS_VISITED_KEY);
        if (!hasVisited) {
          count += 1;
          sessionStorage.setItem(HAS_VISITED_KEY, 'true');
          localStorage.setItem(STORAGE_KEY, count.toString());
        }

        // Optional API hit
        const apiRes = await fetch('https://api.counterapi.dev/v1/sachin11p12-algo-vis/visitors/up');
        if (apiRes.ok) {
          const data = await apiRes.json();
          if (data && typeof data.count === 'number') {
            count = Math.max(data.count + 1200, count);
          }
        }
      } catch (e) {
        // Fallback to stored count
      }

      setVisitorCount(count);
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
