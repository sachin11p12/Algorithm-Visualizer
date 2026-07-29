import { AlgorithmStep } from '../types';

export function generateQuickSortSteps(initialArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...initialArray];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  steps.push({
    array: [...arr],
    highlights: {},
    line: 0,
    comparisons: 0,
    swaps: 0,
    description: 'Starting Quick Sort.',
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    steps.push({
      array: [...arr],
      highlights: { selected: [high], searchRange: [low, high], sorted: [...sortedIndices] },
      line: 8,
      comparisons,
      swaps,
      description: `Chosen pivot element ${pivot} at index ${high}.`,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({
        array: [...arr],
        highlights: {
          comparing: [j, high],
          selected: [high],
          searchRange: [low, high],
          sorted: [...sortedIndices],
        },
        line: 11,
        comparisons,
        swaps,
        description: `Comparing element at index ${j} (${arr[j]}) with pivot (${pivot}).`,
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          swaps++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          steps.push({
            array: [...arr],
            highlights: {
              swapping: [i, j],
              selected: [high],
              searchRange: [low, high],
              sorted: [...sortedIndices],
            },
            line: 12,
            comparisons,
            swaps,
            description: `Swapped index ${i} (${arr[i]}) with index ${j} (${arr[j]}) as element < pivot.`,
          });
        }
      }
    }

    swaps++;
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    const pivotFinalIndex = i + 1;
    sortedIndices.push(pivotFinalIndex);

    steps.push({
      array: [...arr],
      highlights: {
        swapping: [pivotFinalIndex, high],
        sorted: [...sortedIndices],
      },
      line: 13,
      comparisons,
      swaps,
      description: `Placed pivot ${pivot} into its correct sorted position at index ${pivotFinalIndex}.`,
    });

    return pivotFinalIndex;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      steps.push({
        array: [...arr],
        highlights: { searchRange: [low, high], sorted: [...sortedIndices] },
        line: 1,
        comparisons,
        swaps,
        description: `Sub-array range [${low}..${high}].`,
      });

      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sortedIndices.push(low);
    }
  }

  quickSortHelper(0, arr.length - 1);

  steps.push({
    array: [...arr],
    highlights: { sorted: Array.from({ length: arr.length }, (_, k) => k) },
    line: 4,
    comparisons,
    swaps,
    description: 'Quick Sort complete.',
  });

  return steps;
}
