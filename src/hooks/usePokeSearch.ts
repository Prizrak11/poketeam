import { pokemonSearchList, pokemonSearchType } from './../services/pokemonSearchList'
import { sanitizePokemon } from 'utils/sanitizePokemon'
import useSearch, { useSearchReturn } from './useSearch'

const usePokeSearch = (): useSearchReturn<pokemonSearchType> => useSearch({
  getter: pokemonSearchList,
  filter: (pokemons, query) => {
    return pokemons.filter(({ name }) => {
      return name.includes(sanitizePokemon(query))
    })
  }
})

export default usePokeSearch
