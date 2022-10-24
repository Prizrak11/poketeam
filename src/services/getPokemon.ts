import { Abilitie } from './../types/abilities'
import { transformApiToPokemon, Pokemon, PokemonAPI } from 'types/pokemon'
import { POKE_API } from '../consts'
import { getAbilitieInfo } from './getAbilitie'

const getAbilities = async (pokemon: PokemonAPI): Promise<Abilitie[]> => {
  return await Promise.all(pokemon.abilities.map(async ({ ability }) => await getAbilitieInfo(ability.url)))
}

export const getPokemon = async (name: string): Promise<Pokemon> => {
  return await new Promise((resolve, reject) => {
    fetch(`${POKE_API}pokemon/${name}`)
      .then(async data => await data.json())
      .then(async (pokemon: PokemonAPI) => {
        const abilities = await getAbilities(pokemon)
        const sanitized = transformApiToPokemon(pokemon)

        sanitized.abilities = abilities
        resolve(sanitized)
      })
      .catch(reject)
  })
}
