import { getPokemons, setPokemons } from 'data/pokemons'
import { searchItemAPI } from 'types/searchItem'
import { POKE_API } from '../consts'

export const pokemonSearchList = async (): Promise<searchItemAPI[]> => {
  const currentPokemons = getPokemons()

  return await new Promise((resolve, reject) => {
    if (currentPokemons != null) return resolve(currentPokemons)

    fetch(`${POKE_API}pokemon-species/?limit=2000`)
      .then(async data => await data.json())
      .then(({ results }) => {
        setPokemons(results)
        resolve(results)
      })
      .catch(reject)
  })
}
