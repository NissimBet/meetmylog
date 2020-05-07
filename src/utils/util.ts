/**
 * Function that partitions an array into 2 arrays, where the first array contains elements where the predicate @param compareFunc returns true
 * @param arr array of data, that is going to be split
 * @param compareFunc function on which to separate the data
 */
export function partitionArray<T>(
  arr: Array<T> = [],
  compareFunc: (data: T) => boolean
): [Array<T>, Array<T>] {
  const trueish: Array<T> = [];
  const falseish: Array<T> = [];

  arr.forEach(val => {
    if (compareFunc(val)) {
      trueish.push(val);
    } else {
      falseish.push(val);
    }
  });

  return [trueish, falseish];
}
