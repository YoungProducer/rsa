import { gcd } from "./gcd";

/**
 * Returns all euler numbers
 */
export const euler = (a: number) => {
  const numbers: number[] = [];

  for (let i = 0; i < a; i++) {
    if (gcd(a, i) === 1) {
      numbers.push(i);
    }
  }

  return numbers;
};