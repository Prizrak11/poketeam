import { pokemonSearchList } from '../../services/pokemonSearchList'
import { sanitizePokemon } from 'utils/sanitizePokemon'
import useSearch, { useSearchReturn } from './useSearch'

const usePokemonSearch = (): useSearchReturn => useSearch({
  getter: pokemonSearchList,
  filter: (pokemons, query) => {
    return pokemons.filter(({ name }) => {
      return name.includes(sanitizePokemon(query))
    })
  }
})

export default usePokemonSearch
