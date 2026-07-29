import { AlgorithmStep } from '../types';

export function generateInsertionSortSteps(initialArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    array: [...arr],
    highlights: { sorted: [0] },
    line: 0,
    comparisons: 0,
    swaps: 0,
    description: 'Starting Insertion Sort. Element at index 0 is trivially sorted.',
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      highlights: { selected: [i], sorted: Array.from({ length: i }, (_, k) => k) },
      line: 2,
      comparisons,
      swaps,
      description: `Selected key ${key} at index ${i} to insert into sorted sub-array.`,
    });

    while (j >= 0) {
      comparisons++;
      steps.push({
        array: [...arr],
        highlights: {
          comparing: [j, j + 1],
          selected: [j + 1],
          sorted: Array.from({ length: i }, (_, k) => k),
        },
        line: 4,
        comparisons,
        swaps,
        description: `Comparing element at index ${j} (${arr[j]}) with key (${key}).`,
      });

      if (arr[j] > key) {
        swaps++;
        arr[j + 1] = arr[j];

        steps.push({
          array: [...arr],
          highlights: {
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => k),
          },
          line: 5,
          comparisons,
          swaps,
          description: `Shifted element ${arr[j]} right from index ${j} to ${j + 1}.`,
        });
        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      highlights: {
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
      },
      line: 7,
      comparisons,
      swaps,
      description: `Inserted key ${key} into position ${j + 1}.`,
    });
  }

  steps.push({
    array: [...arr],
    highlights: { sorted: Array.from({ length: n }, (_, k) => k) },
    line: 8,
    comparisons,
    swaps,
    description: 'Insertion Sort complete.',
  });

  return steps;
}
