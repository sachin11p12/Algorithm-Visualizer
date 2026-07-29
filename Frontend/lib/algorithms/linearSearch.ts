import { AlgorithmStep } from '../types';

export function generateLinearSearchSteps(initialArray: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let comparisons = 0;

  steps.push({
    array: [...arr],
    highlights: {},
    line: 0,
    comparisons: 0,
    swaps: 0,
    description: `Starting Linear Search for target value ${target}.`,
  });

  steps.push({
    array: [...arr],
    highlights: {},
    line: 1,
    comparisons: 0,
    swaps: 0,
    description: `Array size is ${n}.`,
  });

  let found = false;
  for (let i = 0; i < n; i++) {
    comparisons++;
    steps.push({
      array: [...arr],
      highlights: { comparing: [i], selected: [i] },
      line: 3,
      comparisons,
      swaps: 0,
      description: `Checking index ${i}: Is element ${arr[i]} equal to target ${target}?`,
    });

    if (arr[i] === target) {
      found = true;
      steps.push({
        array: [...arr],
        highlights: { foundIndex: i, sorted: [i] },
        line: 4,
        comparisons,
        swaps: 0,
        description: `Target ${target} FOUND at index ${i}!`,
      });
      break;
    }
  }

  if (!found) {
    steps.push({
      array: [...arr],
      highlights: {},
      line: 5,
      comparisons,
      swaps: 0,
      description: `Target ${target} was NOT found in the array after checking all ${n} elements.`,
    });
  }

  return steps;
}
