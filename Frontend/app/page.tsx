'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { VisualizerCanvas } from '@/components/visualizer/VisualizerCanvas';
import { ControlPanel } from '@/components/visualizer/ControlPanel';
import { PseudocodePanel } from '@/components/visualizer/PseudocodePanel';
import { StatsPanel } from '@/components/visualizer/StatsPanel';
import { AlgorithmDetails } from '@/components/visualizer/AlgorithmDetails';
import { CustomArrayModal } from '@/components/visualizer/CustomArrayModal';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation Header */}
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Explorer Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 lg:p-8 space-y-6 overflow-x-hidden">
          {/* Top Live Stats Counters */}
          <StatsPanel />

          {/* Interactive Visualizer Canvas */}
          <VisualizerCanvas />

          {/* Interactive Control Panel */}
          <ControlPanel />

          {/* Bottom Grid: Pseudocode & Algorithm Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PseudocodePanel />
            <AlgorithmDetails />
          </div>
        </main>
      </div>

      {/* Custom Input Modal */}
      <CustomArrayModal />
    </div>
  );
}
