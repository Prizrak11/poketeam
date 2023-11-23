import { sanitizePokemon } from 'utils/sanitizePokemon'
import useSearch from './useSearch'
import { moveSearchList } from 'services/moveSearchList'

const useMoveSearch = useSearch({
  getter: moveSearchList,
  filter: (moves, query) => {
    return moves.filter(({ name }) => {
      return name.includes(sanitizePokemon(query))
    })
  }
})

export default useMoveSearch
