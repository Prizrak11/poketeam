import { transformApiToPokemon, Pokemon, PokemonAPI } from 'types/pokemon'
import { POKE_API } from '../consts'

export const getPokemon = async (name: string): Promise<Pokemon> => {
  return await new Promise((resolve, reject) => {
    fetch(`${POKE_API}pokemon/${name}`)
      .then(async data => await data.json())
      .then((pokemon: PokemonAPI) => resolve(transformApiToPokemon(pokemon)))
      .catch(reject)
  })
}
