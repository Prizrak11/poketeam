import { pokemonSearchList } from '../../services/pokemonSearchList'
import { sanitizePokemon } from 'utils/sanitizePokemon'
import { fuzzyFilter } from 'utils/levenshtein'
import useSearch from './useSearch'

const usePokemonSearch = useSearch({
  getter: pokemonSearchList,
  filter: (pokemons, query) => {
    const sanitizedQuery = sanitizePokemon(query)

    if (sanitizedQuery === '') return []

    return fuzzyFilter(pokemons, sanitizedQuery, 0.3, (pokemon) => pokemon.name)
  }
})

export default usePokemonSearch
