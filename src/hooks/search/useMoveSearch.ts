import { sanitizePokemon } from 'utils/sanitizePokemon'
import { fuzzyFilter } from 'utils/levenshtein'
import useSearch from './useSearch'
import { moveSearchList } from 'services/moveSearchList'

const useMoveSearch = useSearch({
  getter: moveSearchList,
  filter: (moves, query) => {
    const sanitizedQuery = sanitizePokemon(query)

    if (sanitizedQuery === '') return []

    return fuzzyFilter(moves, sanitizedQuery, 0.3, (move) => move.name)
  }
})

export default useMoveSearch
