export const binpow = (a: number, b: number) =>  {
  let res = 1;
  while (b > 0) {
      if (b & 1)
          res = res * a;
      a = a * a;
      b >>= 1;
  }
  return res;
}