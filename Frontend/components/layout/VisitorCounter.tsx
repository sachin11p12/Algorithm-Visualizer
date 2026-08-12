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
      let currentCount: number | null = null;

      // Read local storage baseline if available
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = parseInt(stored, 10);
          if (!isNaN(parsed)) currentCount = parsed;
        }
      } catch (e) {
        // LocalStorage access restricted
      }

      // Try Primary Counter API (using timestamp query param to avoid CORS header preflight issues across Safari/Edge/Firefox)
      try {
        const timestamp = Date.now();
        const apiRes = await fetch(`https://api.counterapi.dev/v1/sachin11p12-portfolio/visits/up?t=${timestamp}`);

        if (apiRes.ok) {
          const data = await apiRes.json();
          if (data && typeof data.count === 'number' && data.count > 0) {
            currentCount = data.count;
            try {
              if (currentCount !== null) {
                localStorage.setItem(STORAGE_KEY, currentCount.toString());
              }
            } catch (e) {}
            setVisitorCount(currentCount);
            return;
          }
        }
      } catch (e) {
        console.warn('CounterAPI unreachable or blocked by browser ad-blocker:', e);
      }

      // Backup read if fetch /up failed
      try {
        const backupRes = await fetch(`https://api.counterapi.dev/v1/sachin11p12-portfolio/visits/current?t=${Date.now()}`);
        if (backupRes.ok) {
          const data = await backupRes.json();
          if (data && typeof data.count === 'number' && data.count > 0) {
            currentCount = data.count;
            try {
              if (currentCount !== null) {
                localStorage.setItem(STORAGE_KEY, currentCount.toString());
              }
            } catch (e) {}
            setVisitorCount(currentCount);
            return;
          }
        }
      } catch (e) {
        // Backup fetch blocked
      }

      // Fallback if network or adblocker completely blocked API calls
      if (currentCount !== null) {
        currentCount += 1;
      } else {
        currentCount = 1;
      }

      try {
        if (currentCount !== null) {
          localStorage.setItem(STORAGE_KEY, currentCount.toString());
        }
      } catch (e) {}

      setVisitorCount(currentCount);
    }

    updateVisitorCount();
  }, []);

  return null;
};


