import { pokemonSearchList } from '../../services/pokemonSearchList'
import { sanitizePokemon } from 'utils/sanitizePokemon'
import useSearch from './useSearch'

const usePokemonSearch = useSearch({
  getter: pokemonSearchList,
  filter: (pokemons, query) => {
    return pokemons.filter(({ name }) => {
      return name.includes(sanitizePokemon(query))
    })
  }
})

export default usePokemonSearch
