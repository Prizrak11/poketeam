import { getPokemons, setPokemons } from 'data/pokemons'
import { searchItemAPI } from 'types/searchItem'
import { POKE_API } from '../consts'

export const pokemonSearchList = async ({ signal }: AbortController): Promise<searchItemAPI[]> => {
  const currentPokemons = getPokemons()

  if (currentPokemons != null) return currentPokemons

  const apiData = await fetch(`${POKE_API}pokemon-species/?limit=2000`, { signal })
  const { results } = await apiData.json()

  setPokemons(results)
  return results
}
