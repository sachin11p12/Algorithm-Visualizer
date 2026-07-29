import { AlgorithmStep } from '../types';

export function generateBinarySearchSteps(initialArray: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  // Binary search requires sorted array
  const arr = [...initialArray].sort((a, b) => a - b);
  let comparisons = 0;

  steps.push({
    array: [...arr],
    highlights: {},
    line: 0,
    comparisons: 0,
    swaps: 0,
    description: `Array sorted for Binary Search. Target value is ${target}.`,
  });

  let low = 0;
  let high = arr.length - 1;

  steps.push({
    array: [...arr],
    highlights: { searchRange: [low, high] },
    line: 1,
    comparisons: 0,
    swaps: 0,
    description: `Initial search interval [${low}..${high}].`,
  });

  let found = false;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;

    steps.push({
      array: [...arr],
      highlights: { searchRange: [low, high], selected: [mid], comparing: [mid] },
      line: 3,
      comparisons,
      swaps: 0,
      description: `Calculated mid index = ${mid} (val: ${arr[mid]}). Interval is [${low}..${high}].`,
    });

    if (arr[mid] === target) {
      found = true;
      steps.push({
        array: [...arr],
        highlights: { foundIndex: mid, sorted: [mid] },
        line: 4,
        comparisons,
        swaps: 0,
        description: `Target ${target} FOUND at mid index ${mid}!`,
      });
      break;
    } else if (arr[mid] < target) {
      steps.push({
        array: [...arr],
        highlights: { searchRange: [mid + 1, high] },
        line: 6,
        comparisons,
        swaps: 0,
        description: `${arr[mid]} < ${target}. Searching right half [${mid + 1}..${high}].`,
      });
      low = mid + 1;
    } else {
      steps.push({
        array: [...arr],
        highlights: { searchRange: [low, mid - 1] },
        line: 8,
        comparisons,
        swaps: 0,
        description: `${arr[mid]} > ${target}. Searching left half [${low}..${mid - 1}].`,
      });
      high = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      array: [...arr],
      highlights: {},
      line: 9,
      comparisons,
      swaps: 0,
      description: `Target ${target} NOT found in array. Search interval became empty.`,
    });
  }

  return steps;
}
