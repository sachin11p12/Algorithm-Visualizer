import { AlgorithmStep } from '../types';

export function generateMergeSortSteps(initialArray: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...initialArray];
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    array: [...arr],
    highlights: {},
    line: 0,
    comparisons: 0,
    swaps: 0,
    description: 'Starting Merge Sort.',
  });

  function merge(left: number, mid: number, right: number) {
    const leftSub = arr.slice(left, mid + 1);
    const rightSub = arr.slice(mid + 1, right + 1);

    steps.push({
      array: [...arr],
      highlights: { searchRange: [left, right] },
      line: 8,
      comparisons,
      swaps,
      description: `Merging subarray [${left}..${mid}] (${leftSub.join(', ')}) and [${mid + 1}..${right}] (${rightSub.join(', ')}).`,
    });

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftSub.length && j < rightSub.length) {
      comparisons++;
      steps.push({
        array: [...arr],
        highlights: {
          comparing: [left + i, mid + 1 + j],
          searchRange: [left, right],
        },
        line: 10,
        comparisons,
        swaps,
        description: `Comparing left element ${leftSub[i]} and right element ${rightSub[j]}.`,
      });

      if (leftSub[i] <= rightSub[j]) {
        arr[k] = leftSub[i];
        i++;
      } else {
        arr[k] = rightSub[j];
        j++;
      }
      swaps++;
      steps.push({
        array: [...arr],
        highlights: {
          swapping: [k],
          searchRange: [left, right],
        },
        line: 11,
        comparisons,
        swaps,
        description: `Placed element ${arr[k]} into position ${k}.`,
      });
      k++;
    }

    while (i < leftSub.length) {
      arr[k] = leftSub[i];
      swaps++;
      steps.push({
        array: [...arr],
        highlights: { swapping: [k], searchRange: [left, right] },
        line: 12,
        comparisons,
        swaps,
        description: `Placed remaining left element ${arr[k]} into position ${k}.`,
      });
      i++;
      k++;
    }

    while (j < rightSub.length) {
      arr[k] = rightSub[j];
      swaps++;
      steps.push({
        array: [...arr],
        highlights: { swapping: [k], searchRange: [left, right] },
        line: 12,
        comparisons,
        swaps,
        description: `Placed remaining right element ${arr[k]} into position ${k}.`,
      });
      j++;
      k++;
    }
  }

  function mergeSortHelper(left: number, right: number) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    steps.push({
      array: [...arr],
      highlights: { searchRange: [left, right], selected: [mid] },
      line: 2,
      comparisons,
      swaps,
      description: `Dividing array segment [${left}..${right}] at mid index ${mid}.`,
    });

    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSortHelper(0, arr.length - 1);

  steps.push({
    array: [...arr],
    highlights: { sorted: Array.from({ length: arr.length }, (_, k) => k) },
    line: 5,
    comparisons,
    swaps,
    description: 'Merge Sort complete.',
  });

  return steps;
}
