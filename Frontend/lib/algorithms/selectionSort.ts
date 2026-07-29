import { AlgorithmStep } from '../types';

export function generateSelectionSortSteps(initialArray: number[]): AlgorithmStep[] {
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
    description: 'Starting Selection Sort.',
  });

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    steps.push({
      array: [...arr],
      highlights: { selected: [minIndex], sorted: [...sortedIndices] },
      line: 3,
      comparisons,
      swaps,
      description: `Assuming minimum element is at index ${i} (val: ${arr[i]}).`,
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        highlights: { comparing: [j, minIndex], selected: [minIndex], sorted: [...sortedIndices] },
        line: 5,
        comparisons,
        swaps,
        description: `Comparing element at index ${j} (${arr[j]}) with current minimum at index ${minIndex} (${arr[minIndex]}).`,
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        steps.push({
          array: [...arr],
          highlights: { selected: [minIndex], sorted: [...sortedIndices] },
          line: 6,
          comparisons,
          swaps,
          description: `Found new minimum at index ${minIndex} (val: ${arr[minIndex]}).`,
        });
      }
    }

    if (minIndex !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      steps.push({
        array: [...arr],
        highlights: { swapping: [i, minIndex], sorted: [...sortedIndices] },
        line: 8,
        comparisons,
        swaps,
        description: `Swapped element at index ${i} with new minimum at index ${minIndex}.`,
      });
    }

    sortedIndices.push(i);
  }

  sortedIndices.push(n - 1);

  steps.push({
    array: [...arr],
    highlights: { sorted: Array.from({ length: n }, (_, k) => k) },
    line: 9,
    comparisons,
    swaps,
    description: 'Selection Sort complete.',
  });

  return steps;
}
