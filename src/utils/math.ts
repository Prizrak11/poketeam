export const getFraction = (decimal: number): string => {
  let denominator
  for (denominator = 1; (decimal * denominator) % 1 !== 0; denominator++);
  return denominator !== 1
    ? `${decimal * denominator}/${denominator}`
    : decimal.toString()
}
