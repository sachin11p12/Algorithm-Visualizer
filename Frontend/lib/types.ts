export type AlgorithmCategory = 'sorting' | 'searching';

export type AlgorithmKey =
  | 'bubble-sort'
  | 'selection-sort'
  | 'insertion-sort'
  | 'merge-sort'
  | 'quick-sort'
  | 'heap-sort'
  | 'linear-search'
  | 'binary-search';

export interface StepHighlights {
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  selected?: number[]; // Pivot element or target candidate
  searchRange?: [number, number]; // [low, high] for binary search or active window
  foundIndex?: number;
}

export interface AlgorithmStep {
  array: number[];
  highlights: StepHighlights;
  line: number;
  comparisons: number;
  swaps: number;
  description: string;
}

export interface AlgorithmInfo {
  key: AlgorithmKey;
  name: string;
  category: AlgorithmCategory;
  bestTime: string;
  avgTime: string;
  worstTime: string;
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
  description: string;
  pseudocode: string[];
}
