'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { VisualizerCanvas } from '@/components/visualizer/VisualizerCanvas';
import { ControlPanel } from '@/components/visualizer/ControlPanel';
import { PseudocodePanel } from '@/components/visualizer/PseudocodePanel';
import { StatsPanel } from '@/components/visualizer/StatsPanel';
import { AlgorithmDetails } from '@/components/visualizer/AlgorithmDetails';
import { CustomArrayModal } from '@/components/visualizer/CustomArrayModal';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { ALGORITHM_DATA } from '@/lib/algorithmData';
import { AlgorithmKey } from '@/lib/types';

interface VisualizerPageContentProps {
  category: 'sorting' | 'searching';
}

export default function VisualizerPageContent({ category }: VisualizerPageContentProps) {
  const params = useParams();
  const algorithmSlug = params.algorithm as string;
  const algorithmKey = algorithmSlug as AlgorithmKey;

  const { setAlgorithm } = useVisualizerStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Validate the algorithm belongs to this category
  const algoInfo = ALGORITHM_DATA[algorithmKey];
  const isValid = algoInfo && algoInfo.category === category;

  useEffect(() => {
    if (isValid) {
      setAlgorithm(algorithmKey);
    }
  }, [algorithmKey, isValid, setAlgorithm]);

  if (!isValid) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground items-center justify-center">
        <p className="text-xl font-bold mb-2">Algorithm not found</p>
        <Link href="/" className="text-primary hover:underline text-sm">← Back to Home</Link>
      </div>
    );
  }

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Header view="visualizer" />

      {/* Breadcrumb */}
      <div className="px-6 lg:px-12 py-2.5 border-b border-border/40 bg-card/30">
        <div className="max-w-[1280px] mx-auto flex items-center space-x-1.5 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/algo" className="hover:text-foreground transition-colors">Algo Visualizer</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-semibold">{algoInfo.name}</span>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 space-y-6 overflow-x-hidden">
          <div className="max-w-[1280px] mx-auto w-full space-y-6">
            <StatsPanel />
            <VisualizerCanvas />
            <ControlPanel />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PseudocodePanel />
              <AlgorithmDetails />
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <CustomArrayModal />
    </div>
  );
}
