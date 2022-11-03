export const getFraction = (decimal: number): string => {
  let denominator
  for (denominator = 1; (decimal * denominator) % 1 !== 0; denominator++);
  return denominator !== 1
    ? `${decimal * denominator}/${denominator}`
    : decimal.toString()
}

export const multiplyArray = (value: number[] | number): number => Array.isArray(value) ? value.reduce((a, b) => a * b) : value

export const average = (arr: number[]): number => arr.reduce((a, b) => a + b) / arr.length
