/*
   Utilities 
*/

export function nonNullish<T>(
    value: T | null | undefined
  ): value is T {
    return !!value;
  }

