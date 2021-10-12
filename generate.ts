import { inverse } from "./inverse";
import { euler } from "./euler";
import { getRandomInt } from "./getRandomInt";
import { isPrime } from "./isPrime";
import { gcd } from "./gcd";

const getFermatRoots = () => {
  const roots = process.env.FERMAT_ROOTS.split(',');

  return roots.map(Number);
}

const getLimits = () => {
  const min = Number(process.env.PRIME_MIN);
  const max = Number(process.env.PRIME_MAX);

  return { min, max };
}

export const generatePrimeNumber = () => {
  const roots = getFermatRoots();
  const limits = getLimits();
  
  return generate(roots, limits);
}

const generate = (roots: number[], limits: ReturnType<typeof getLimits>): number => {
  let number = getRandomInt(limits.min, limits.max);

  let rootIndex = 0;

  while (rootIndex < roots.length) {
    if (!isPrime(number, roots[rootIndex])) {
      number = getRandomInt(limits.min, limits.max);
      rootIndex = 0;
    }

    rootIndex++;
  }

  return number;
}

export const getFieldElement = (eulerValue: number) => {
  let e = undefined;

  while (e === undefined) {
    const res = getRandomInt(2, eulerValue - 1);

    if (gcd(res, eulerValue) === 1) e = res;
  }

  return e;
}

export const processEuler = (eulerValue: number) => {
  const e = getFieldElement(eulerValue);

  const inv = inverse(e, eulerValue);

  return { inversedElement: inv, e };
}