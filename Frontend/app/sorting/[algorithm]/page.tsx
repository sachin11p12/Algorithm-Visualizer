import VisualizerPageContent from '@/components/visualizer/VisualizerPageContent';

export function generateStaticParams() {
  return [
    { algorithm: 'bubble-sort' },
    { algorithm: 'selection-sort' },
    { algorithm: 'insertion-sort' },
    { algorithm: 'merge-sort' },
    { algorithm: 'quick-sort' },
    { algorithm: 'heap-sort' },
  ];
}

export default function SortingAlgorithmPage() {
  return <VisualizerPageContent category="sorting" />;
}

