import { AlgorithmStep } from '../types';

export function generateHeapSortSteps(initialArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  steps.push({
    array: [...arr],
    highlights: {},
    line: 0,
    comparisons: 0,
    swaps: 0,
    description: 'Starting Heap Sort.',
  });

  function heapify(size: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    steps.push({
      array: [...arr],
      highlights: { selected: [i], sorted: [...sortedIndices] },
      line: 10,
      comparisons,
      swaps,
      description: `Heapifying subtree rooted at index ${i} (val: ${arr[i]}).`,
    });

    if (left < size) {
      comparisons++;
      steps.push({
        array: [...arr],
        highlights: { comparing: [left, largest], selected: [i], sorted: [...sortedIndices] },
        line: 11,
        comparisons,
        swaps,
        description: `Comparing left child at index ${left} (${arr[left]}) with root (${arr[largest]}).`,
      });
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      comparisons++;
      steps.push({
        array: [...arr],
        highlights: { comparing: [right, largest], selected: [i], sorted: [...sortedIndices] },
        line: 12,
        comparisons,
        swaps,
        description: `Comparing right child at index ${right} (${arr[right]}) with largest element (${arr[largest]}).`,
      });
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      steps.push({
        array: [...arr],
        highlights: { swapping: [i, largest], sorted: [...sortedIndices] },
        line: 13,
        comparisons,
        swaps,
        description: `Swapped index ${i} with largest child at index ${largest}.`,
      });

      heapify(size, largest);
    }
  }

  // Build Max-Heap
  steps.push({
    array: [...arr],
    highlights: {},
    line: 2,
    comparisons,
    swaps,
    description: 'Building Max-Heap from input array.',
  });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    swaps++;
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    sortedIndices.push(i);

    steps.push({
      array: [...arr],
      highlights: { swapping: [0, i], sorted: [...sortedIndices] },
      line: 5,
      comparisons,
      swaps,
      description: `Moved max element ${arr[i]} from root (0) to end of heap (index ${i}).`,
    });

    heapify(i, 0);
  }

  sortedIndices.push(0);

  steps.push({
    array: [...arr],
    highlights: { sorted: Array.from({ length: n }, (_, k) => k) },
    line: 7,
    comparisons,
    swaps,
    description: 'Heap Sort complete.',
  });

  return steps;
}
