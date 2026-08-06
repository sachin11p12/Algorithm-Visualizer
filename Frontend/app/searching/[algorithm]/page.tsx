import VisualizerPageContent from '@/components/visualizer/VisualizerPageContent';

export function generateStaticParams() {
  return [
    { algorithm: 'linear-search' },
    { algorithm: 'binary-search' },
  ];
}

export default function SearchingAlgorithmPage() {
  return <VisualizerPageContent category="searching" />;
}

