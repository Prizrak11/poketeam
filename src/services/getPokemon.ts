import { TypeRelationsAPI, unifyTypeRelations } from 'types/types'
import { PokemonAbility } from './../types/abilities'
import { transformApiToPokemon, Pokemon, PokemonAPI } from 'types/pokemon'
import { POKE_API } from '../consts'
import { getAbilityInfo } from './getAbility'
import { getTypeRelations } from './getTypeRelations'
import { searchItemAPI } from 'types/searchItem'

const getAbilities = async (pokemon: PokemonAPI): Promise<PokemonAbility[]> => {
  return await Promise.all(pokemon.abilities.map(async ({ ability }) => await getAbilityInfo(ability.url)))
}

const getRelations = async (pokemon: PokemonAPI): Promise<TypeRelationsAPI[]> => {
  return await Promise.all(pokemon.types.map(async ({ type }) => await getTypeRelations(type.name)))
}

export const getPokemon = async (pokemon: searchItemAPI): Promise<Pokemon> => {
  return await new Promise((resolve, reject) => {
    fetch(`${POKE_API}pokemon/${pokemon.name}`)
      .then(async data => await data.json())
      .then(async (pokemon: PokemonAPI) => {
        const sanitized = transformApiToPokemon(pokemon)

        sanitized.abilities = await getAbilities(pokemon)
        sanitized.weaknessByType = unifyTypeRelations(await getRelations(pokemon))
        resolve(sanitized)
      })
      .catch(reject)
  })
}
