'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Code2, Cpu, Rocket } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PortfolioHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Header view="home" />

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col justify-center max-w-[1280px] mx-auto px-6 lg:px-12 py-16 w-full space-y-12">
        {/* Intro Tag & Title */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Full-Stack Developer & Algorithm Enthusiast</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-tight">
            Building High-Performance Web Apps & Visual Systems.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
            Hi, I&apos;m <span className="text-primary font-bold">Sachin Tiwari</span>. I specialize in React, Next.js, TypeScript, and interactive algorithmic visualizers. Explore my interactive algorithm studio below!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/algo"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center space-x-2 scale-100 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Algo Visualizer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="mailto:Sachin11p12@gmail.com"
              className="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground font-semibold text-sm transition-all"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/40">
          <div className="p-6 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Interactive Visualizer</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Step-by-step 60 FPS animated playback of sorting and searching algorithms with custom inputs.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Pseudocode Engine</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Line-by-line syntax-highlighted code execution sync with real-time comparison counters.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Modern Architecture</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Built using Next.js 15 App Router, React 19, TypeScript, Zustand, and Framer Motion.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
