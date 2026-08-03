'use client';

import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Flame, GitCommit, Code2, Calendar } from 'lucide-react';

export const GitHubCalendarSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Primary brand purple color hex for GitHub contribution chart SVG
  const primaryColorHex = '9333ea';
  const calendarSvgUrl = `https://ghchart.rshah.org/${primaryColorHex}/sachin11p12`;

  return (
    <section id="github" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <Github className="w-3.5 h-3.5" />
            <span>Open Source & Activity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            GitHub Contributions
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Daily commit history and continuous software development activity for{' '}
            <span className="text-foreground font-bold">@sachin11p12</span>.
          </p>
        </div>

        <a
          href="https://github.com/sachin11p12"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground transition-all shadow-sm self-start sm:self-auto group"
        >
          <Github className="w-4 h-4 text-primary" />
          <span>Visit GitHub Profile</span>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Contribution Calendar Glass Card */}
      <div className="w-full glass-card bg-card/70 border border-border/60 rounded-2xl p-6 lg:p-8 space-y-6 shadow-sm overflow-hidden">
        {/* Calendar Heatmap Container */}
        <div className="w-full overflow-x-auto pb-2 flex flex-col justify-center items-center select-none space-y-4">
          {mounted ? (
            <div className="w-full max-w-[850px] overflow-x-auto flex justify-center items-center py-2 bg-secondary/30 rounded-xl p-4 border border-border/40">
              {!imageError ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={calendarSvgUrl}
                  alt="sachin11p12's GitHub Contribution Calendar"
                  className="w-full max-w-full h-auto min-w-[650px] filter dark:invert-[0.12] transition-all"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground py-6">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    Contribution data active on{' '}
                    <a
                      href="https://github.com/sachin11p12"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      github.com/sachin11p12
                    </a>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-[140px] w-full flex items-center justify-center text-xs text-muted-foreground">
              Loading contribution activity...
            </div>
          )}
        </div>

        {/* Quick Stats Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/40">
          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-secondary/40 border border-border/40">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <GitCommit className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase">Version Control</p>
              <p className="text-xs font-extrabold text-foreground">Git & GitHub Workflow</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-secondary/40 border border-border/40">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase">Activity Streak</p>
              <p className="text-xs font-extrabold text-foreground">Active Daily Committer</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-secondary/40 border border-border/40">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase">Public Repositories</p>
              <p className="text-xs font-extrabold text-foreground">Full-Stack & DSA Projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
