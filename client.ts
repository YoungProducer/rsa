import { power } from "./isPrime";
import { generatePrimeNumber, getFieldElement, processEuler } from "./generate";
import { getRandomInt } from "./getRandomInt";
import { binpow } from "./binpow";
import { inverse } from "./inverse";

export class ClientRSA {
  private p: number;
  private q: number;
  private n: number;
  private e: number;
  private inversedElement: number;

  constructor() {
    this.p = generatePrimeNumber();
    this.q = generatePrimeNumber();

    this.n = this.p * this.q;

    const { inversedElement, e } = processEuler((this.p - 1) * (this.q - 1));

    this.e = e;
    this.inversedElement = inversedElement;
  }

  encode = (message: string) => {
    const result: number[] = [];

    for (let i = 0, length = message.length; i < length; i++) {
      const charCode = message.charCodeAt(i);

      const encodedChar = power(charCode, this.e, this.n);

      result.push(encodedChar);
    }

    return result;
  }

  decode = (message: number[]) => {
    return message.map(encodedChar => {
      const decodedChar = power(encodedChar, this.inversedElement, this.n);

      const symbol = String.fromCharCode(decodedChar);

      return symbol;
    }).join('');
  }
}

export class ClientEG {
  private p: number;
  private a: number;
  private k: number;
  private y: number;
  private sessionKey: number;

  constructor() {
    this.p = generatePrimeNumber();
    this.a = getFieldElement(this.p);
    this.k = getRandomInt(1, this.p - 1);
    this.y = power(this.a, this.k, this.p);
    this.sessionKey = getRandomInt(10, 100);
  }

  encode = (message: string) => {
    const C1 = power(this.a, this.sessionKey, this.p);
    
    const result: number[] = [];

    for (let i = 0, length = message.length; i < length; i++) {
      const charCode = message.charCodeAt(i);

      const encodedChar = binpow(this.y, this.sessionKey) * charCode % this.p;

      result.push(encodedChar);
    }

    return { C1, message: result };
  }

  decode = (c1: number, message: number[]) => {
    const inversedC1 = inverse(power(c1, this.k, this.p), this.p);

    return message.map(encodedChar => {
      const decodedChar = inversedC1 * encodedChar % this.p;
      return String.fromCharCode(decodedChar);
    }).join('');
  }
}