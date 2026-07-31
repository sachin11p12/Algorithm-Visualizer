import { create } from 'zustand';
import { AlgorithmKey, AlgorithmStep } from '../lib/types';
import { generateRandomArray, parseCustomArray } from '../lib/utils';
import { generateBubbleSortSteps } from '../lib/algorithms/bubbleSort';
import { generateSelectionSortSteps } from '../lib/algorithms/selectionSort';
import { generateInsertionSortSteps } from '../lib/algorithms/insertionSort';
import { generateMergeSortSteps } from '../lib/algorithms/mergeSort';
import { generateQuickSortSteps } from '../lib/algorithms/quickSort';
import { generateHeapSortSteps } from '../lib/algorithms/heapSort';
import { generateLinearSearchSteps } from '../lib/algorithms/linearSearch';
import { generateBinarySearchSteps } from '../lib/algorithms/binarySearch';

export type SpeedMultiplier = 0.25 | 0.5 | 1 | 2 | 4;

interface VisualizerState {
  algorithm: AlgorithmKey;
  array: number[];
  arraySize: number;
  searchTarget: number;
  speed: SpeedMultiplier;
  steps: AlgorithmStep[];
  currentStepIdx: number;
  isPlaying: boolean;
  isFinished: boolean;
  startTime: number | null;
  elapsedTime: number; // in milliseconds
  isCustomModalOpen: boolean;

  // Actions
  setAlgorithm: (key: AlgorithmKey) => void;
  setArraySize: (size: number) => void;
  setSearchTarget: (target: number) => void;
  setSpeed: (speed: SpeedMultiplier) => void;
  setCustomArray: (input: string) => boolean;
  regenerateArray: () => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  tick: () => void;
  setIsCustomModalOpen: (open: boolean) => void;
}

function computeSteps(algorithm: AlgorithmKey, array: number[], target: number): AlgorithmStep[] {
  switch (algorithm) {
    case 'bubble-sort':
      return generateBubbleSortSteps(array);
    case 'selection-sort':
      return generateSelectionSortSteps(array);
    case 'insertion-sort':
      return generateInsertionSortSteps(array);
    case 'merge-sort':
      return generateMergeSortSteps(array);
    case 'quick-sort':
      return generateQuickSortSteps(array);
    case 'heap-sort':
      return generateHeapSortSteps(array);
    case 'linear-search':
      return generateLinearSearchSteps(array, target);
    case 'binary-search':
      return generateBinarySearchSteps(array, target);
    default:
      return generateBubbleSortSteps(array);
  }
}

// Deterministic default array to prevent Next.js SSR vs Client Hydration Mismatches
const DEFAULT_INITIAL_ARRAY = [45, 20, 75, 30, 85, 50, 15, 60, 95, 40, 65, 25, 80, 10, 55];

export const useVisualizerStore = create<VisualizerState>((set, get) => {
  const initialSize = DEFAULT_INITIAL_ARRAY.length;
  const initialArray = [...DEFAULT_INITIAL_ARRAY];
  const initialAlgorithm: AlgorithmKey = 'bubble-sort';
  const initialTarget = 45;
  const initialSteps = computeSteps(initialAlgorithm, initialArray, initialTarget);

  return {
    algorithm: initialAlgorithm,
    array: initialArray,
    arraySize: initialSize,
    searchTarget: initialTarget,
    speed: 1,
    steps: initialSteps,
    currentStepIdx: 0,
    isPlaying: false,
    isFinished: false,
    startTime: null,
    elapsedTime: 0,
    isCustomModalOpen: false,

    setAlgorithm: (key: AlgorithmKey) => {
      const { array, searchTarget } = get();
      const newSteps = computeSteps(key, array, searchTarget);
      set({
        algorithm: key,
        steps: newSteps,
        currentStepIdx: 0,
        isPlaying: false,
        isFinished: false,
        elapsedTime: 0,
      });
    },

    setArraySize: (size: number) => {
      const newArray = generateRandomArray(size, 10, 100);
      const { algorithm, searchTarget } = get();
      const newTarget = newArray.includes(searchTarget) ? searchTarget : newArray[0] || 45;
      const newSteps = computeSteps(algorithm, newArray, newTarget);

      set({
        arraySize: size,
        array: newArray,
        searchTarget: newTarget,
        steps: newSteps,
        currentStepIdx: 0,
        isPlaying: false,
        isFinished: false,
        elapsedTime: 0,
      });
    },

    setSearchTarget: (target: number) => {
      const { algorithm, array } = get();
      const newSteps = computeSteps(algorithm, array, target);
      set({
        searchTarget: target,
        steps: newSteps,
        currentStepIdx: 0,
        isPlaying: false,
        isFinished: false,
        elapsedTime: 0,
      });
    },

    setSpeed: (speed: SpeedMultiplier) => {
      set({ speed });
    },

    setCustomArray: (input: string) => {
      const parsed = parseCustomArray(input);
      if (!parsed) return false;
      const { algorithm, searchTarget } = get();
      const newTarget = parsed.includes(searchTarget) ? searchTarget : parsed[0] || 45;
      const newSteps = computeSteps(algorithm, parsed, newTarget);

      set({
        array: parsed,
        arraySize: parsed.length,
        searchTarget: newTarget,
        steps: newSteps,
        currentStepIdx: 0,
        isPlaying: false,
        isFinished: false,
        elapsedTime: 0,
        isCustomModalOpen: false,
      });
      return true;
      
    },

    regenerateArray: () => {
      const { arraySize, algorithm, searchTarget } = get();
      const newArray = generateRandomArray(arraySize, 10, 100);
      const newTarget = newArray.includes(searchTarget) ? searchTarget : newArray[0] || 45;
      const newSteps = computeSteps(algorithm, newArray, newTarget);

      set({
        array: newArray,
        searchTarget: newTarget,
        steps: newSteps,
        currentStepIdx: 0,
        isPlaying: false,
        isFinished: false,
        elapsedTime: 0,
      });
    },

    play: () => {
      const { currentStepIdx, steps } = get();
      if (currentStepIdx >= steps.length - 1) {
        set({ currentStepIdx: 0, isPlaying: true, isFinished: false, startTime: Date.now() });
      } else {
        set({ isPlaying: true, startTime: Date.now() });
      }
    },

    pause: () => {
      set({ isPlaying: false });
    },

    resume: () => {
      set({ isPlaying: true });
    },

    stepForward: () => {
      const { currentStepIdx, steps } = get();
      if (currentStepIdx < steps.length - 1) {
        const nextIdx = currentStepIdx + 1;
        set({
          currentStepIdx: nextIdx,
          isFinished: nextIdx === steps.length - 1,
        });
      }
    },

    stepBackward: () => {
      const { currentStepIdx } = get();
      if (currentStepIdx > 0) {
        set({
          currentStepIdx: currentStepIdx - 1,
          isPlaying: false,
          isFinished: false,
        });
      }
    },

    reset: () => {
      set({
        currentStepIdx: 0,
        isPlaying: false,
        isFinished: false,
        elapsedTime: 0,
      });
    },

    tick: () => {
      const { currentStepIdx, steps, isPlaying, speed } = get();
      if (!isPlaying) return;

      if (currentStepIdx < steps.length - 1) {
        const nextIdx = currentStepIdx + 1;
        set((state) => ({
          currentStepIdx: nextIdx,
          isFinished: nextIdx === steps.length - 1,
          isPlaying: nextIdx < steps.length - 1,
          elapsedTime: state.elapsedTime + Math.round(200 / speed),
        }));
      } else {
        set({ isPlaying: false, isFinished: true });
      }
    },
    setIsCustomModalOpen: (open: boolean) => {
      set({ isCustomModalOpen: open });
    },
  };
});
