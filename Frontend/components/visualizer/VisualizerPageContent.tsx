'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const algorithmSlug = params.algorithm as string;
  const algorithmKey = algorithmSlug as AlgorithmKey;

  const { setAlgorithm, algorithm } = useVisualizerStore();
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
      <div className="min-h-screen flex flex-col bg-[#0d0d10] items-center justify-center text-white">
        <p className="text-xl font-bold mb-2">Algorithm not found</p>
        <Link href="/" className="text-blue-400 hover:underline text-sm">← Back to Home</Link>
      </div>
    );
  }

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d10]">
      <Header view="visualizer" />

      {/* Breadcrumb */}
      <div className="px-6 lg:px-12 py-2.5 border-b border-white/8">
        <div className="max-w-[1280px] mx-auto flex items-center space-x-1.5 text-[13px] text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/" className="hover:text-white transition-colors capitalize">{categoryLabel}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-300 font-medium">{algoInfo.name}</span>
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
