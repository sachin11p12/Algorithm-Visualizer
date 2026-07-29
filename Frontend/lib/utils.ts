import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a random array of integers within range
 */
export function generateRandomArray(size: number, min = 10, max = 100): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

/**
 * Parse string of comma or space separated numbers into an array
 */
export function parseCustomArray(input: string): number[] | null {
  const clean = input.trim().replace(/,/g, " ");
  if (!clean) return null;
  const parts = clean.split(/\s+/);
  const nums = parts.map((p) => Number(p)).filter((n) => !isNaN(n) && n > 0 && n <= 200);
  if (nums.length < 2 || nums.length > 50) return null;
  return nums;
}
