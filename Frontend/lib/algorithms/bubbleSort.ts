import { AlgorithmStep } from '../types';

export function generateBubbleSortSteps(initialArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  // Initial step
  steps.push({
    array: [...arr],
    highlights: {},
    line: 0,
    comparisons: 0,
    swaps: 0,
    description: 'Initial state of array. Starting Bubble Sort.',
  });

  steps.push({
    array: [...arr],
    highlights: {},
    line: 1,
    comparisons: 0,
    swaps: 0,
    description: `Array length is ${n}.`,
  });

  for (let i = 0; i < n; i++) {
    let swapped = false;
    steps.push({
      array: [...arr],
      highlights: { sorted: [...sortedIndices] },
      line: 3,
      comparisons,
      swaps,
      description: `Pass ${i + 1}: Setting swapped = false.`,
    });

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        highlights: { comparing: [j, j + 1], sorted: [...sortedIndices] },
        line: 5,
        comparisons,
        swaps,
        description: `Comparing elements at index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]}).`,
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        steps.push({
          array: [...arr],
          highlights: { swapping: [j, j + 1], sorted: [...sortedIndices] },
          line: 6,
          comparisons,
          swaps,
          description: `Swapped ${arr[j + 1]} and ${arr[j]} because ${arr[j + 1]} > ${arr[j]}.`,
        });
      }
    }

    // After each pass, the last element of the unsorted segment is in its correct position
    sortedIndices.push(n - i - 1);

    if (!swapped) {
      steps.push({
        array: [...arr],
        highlights: { sorted: Array.from({ length: n }, (_, k) => k) },
        line: 8,
        comparisons,
        swaps,
        description: 'No swaps occurred during this pass. Array is fully sorted!',
      });
      break;
    }
  }

  // Final step
  steps.push({
    array: [...arr],
    highlights: { sorted: Array.from({ length: n }, (_, k) => k) },
    line: 9,
    comparisons,
    swaps,
    description: 'Bubble Sort complete.',
  });

  return steps;
}
