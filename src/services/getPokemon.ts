import { TypeRelations } from './../types/types'
import { Abilitie } from './../types/abilities'
import { transformApiToPokemon, Pokemon, PokemonAPI } from 'types/pokemon'
import { POKE_API } from '../consts'
import { getAbilitieInfo } from './getAbilitie'
import { getTypeRelations } from './getTypeRelations'

const getAbilities = async (pokemon: PokemonAPI): Promise<Abilitie[]> => {
  return await Promise.all(pokemon.abilities.map(async ({ ability }) => await getAbilitieInfo(ability.url)))
}

const getRelations = async (pokemon: PokemonAPI): Promise<TypeRelations[]> => {
  return await Promise.all(pokemon.types.map(async ({ type }) => await getTypeRelations(type.name)))
}

export const getPokemon = async (name: string): Promise<Pokemon> => {
  return await new Promise((resolve, reject) => {
    fetch(`${POKE_API}pokemon/${name}`)
      .then(async data => await data.json())
      .then(async (pokemon: PokemonAPI) => {
        const sanitized = transformApiToPokemon(pokemon)

        sanitized.abilities = await getAbilities(pokemon)
        sanitized.typesRelations = await getRelations(pokemon)
        resolve(sanitized)
      })
      .catch(reject)
  })
}
