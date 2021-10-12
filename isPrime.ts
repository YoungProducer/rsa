export const power = (a: number, n: number, p: number) => {
  // Initialize result
  let res = 1;
       
  // Update 'a' if 'a' >= p
  a = a % p;
   
  while (n > 0)
  {
      // If n is odd, multiply 'a' with result
      if ((n & 1) == 1)
          res = (res * a) % p;
   
      // n must be even now
      n = n >> 1; // n = n/2
      a = (a * a) % p;
  }
  return res;
}
   
// If n is prime, then always returns true,
// If n is composite than returns false with
// high probability Higher value of k increases
// probability of correct result.
export const isPrime = (n: number, k: number) => {
  // Corner cases
  if (n <= 1 || n == 4) return false;
  if (n <= 3) return true;
      
  // Try k times
  while (k > 0)
  {
    // Pick a random number in [2..n-2]   
    // Above corner cases make sure that n > 4
    let a = Math.floor(Math.random()* (n-1 - 2) + 2);
    
    // Fermat's little theorem
    if (power(a, n - 1, n) != 1)
        return false;
    
    k--;
  }
    
  return true;
}
