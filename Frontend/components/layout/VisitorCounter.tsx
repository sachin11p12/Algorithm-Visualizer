'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users } from 'lucide-react';

export const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    async function updateVisitorCount() {
      const STORAGE_KEY = 'real_portfolio_visitor_count';
      let currentCount = 1;

      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          currentCount = parseInt(stored, 10);
        }

        // Always increment global count on every page view
        const apiRes = await fetch('https://api.counterapi.dev/v1/sachin11p12-portfolio/visits/up', {
          cache: 'no-store',
        });

        if (apiRes.ok) {
          const data = await apiRes.json();
          if (data && typeof data.count === 'number') {
            currentCount = data.count;
            localStorage.setItem(STORAGE_KEY, currentCount.toString());
          }
        } else {
          currentCount += 1;
          localStorage.setItem(STORAGE_KEY, currentCount.toString());
        }
      } catch (e) {
        // Fallback to local storage increment if API is unreachable/blocked
        currentCount += 1;
        localStorage.setItem(STORAGE_KEY, currentCount.toString());
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
      <span className="text-muted-foreground">Total Views:</span>
      <span className="text-foreground font-mono font-bold">
        {visitorCount !== null ? visitorCount.toLocaleString() : '...'}
      </span>
    </div>
  );
};

