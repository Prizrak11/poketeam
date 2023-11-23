import { pokemonTypesNames } from './pokemonTypes'

export interface TypeRelationsAPI {
  damage_relations: {
    ['double_damage_from']: [{ name: pokemonTypesNames }]
    ['double_damage_to']: [{ name: pokemonTypesNames }]
    ['half_damage_from']: [{ name: pokemonTypesNames }]
    ['half_damage_to']: [{ name: pokemonTypesNames }]
    ['no_damage_from']: [{ name: pokemonTypesNames }]
    ['no_damage_to']: [{ name: pokemonTypesNames }]
  }
  name: string
}

export type weaknessByType = {
  [T in pokemonTypesNames]: { to: number, from: number }
}

export const initialWeaknessByTpe = Object
  .values(pokemonTypesNames)
  .reduce((last, current) => ({ ...last, [current]: { to: 1, from: 1 } }), {}) as weaknessByType

export const unifyTypeRelations = (types: TypeRelationsAPI[]): weaknessByType => {
  const typeRelations: weaknessByType = structuredClone(initialWeaknessByTpe)

  types.forEach(({ damage_relations: dR }) => {
    dR.double_damage_to?.forEach(({ name }) => { typeRelations[name].to *= 2 })
    dR.double_damage_from?.forEach(({ name }) => { typeRelations[name].from *= 2 })
    dR.half_damage_to?.forEach(({ name }) => { typeRelations[name].to *= 0.5 })
    dR.half_damage_from?.forEach(({ name }) => { typeRelations[name].from *= 0.5 })
    dR.no_damage_to?.forEach(({ name }) => { typeRelations[name].to *= 0 })
    dR.no_damage_from?.forEach(({ name }) => { typeRelations[name].from *= 0 })
  })

  return typeRelations
}
