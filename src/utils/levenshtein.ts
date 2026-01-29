/**
 * Calculates the Levenshtein distance between two strings.
 * This is the minimum number of single-character edits (insertions, deletions or substitutions) required to change one string into the other.
 */
export const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = []
  const len1 = str1.length
  const len2 = str2.length

  if (len1 === 0) return len2
  if (len2 === 0) return len1

  // Initialize the first row and column of the matrix
  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        )
      }
    }
  }

  return matrix[len2][len1]
}

/**
 * Calculates similarity score between two strings based on Levenshtein distance.
 * Returns a value between 0 and 1, where 1 means exact match.
 */
export const calculateSimilarity = (str1: string, str2: string): number => {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase())
  const maxLength = Math.max(str1.length, str2.length)

  if (maxLength === 0) return 1

  return (maxLength - distance) / maxLength
}

/**
 * Filters an array of items based on fuzzy string matching using Levenshtein distance.
 * Items are sorted by similarity score (highest first).
 *
 * @param items Array of items to filter
 * @param query Search query
 * @param threshold Minimum similarity score (0-1) to include in results
 * @param getItemName Function to extract the searchable name from each item
 * @returns Filtered and sorted array of items
 */
export const fuzzyFilter = <T>(
  items: T[],
  query: string,
  threshold: number = 0.4,
  getItemName: (item: T) => string = (item) => (item as any).name
): T[] => {
  if (query.trim() === '') return []

  const queryLower = query.toLowerCase()

  // First, check for exact matches or partial matches
  const exactMatches = items.filter(item =>
    getItemName(item).toLowerCase().includes(queryLower)
  )

  if (exactMatches.length > 0) {
    return exactMatches
  }

  // If no exact matches, use fuzzy matching
  const fuzzyMatches = items
    .map(item => {
      const similarity = calculateSimilarity(queryLower, getItemName(item))
      return { item, similarity }
    })
    .filter(({ similarity }) => similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .map(({ item }) => item)

  return fuzzyMatches
}
