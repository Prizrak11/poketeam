import { multiplyArray } from './../utils/math'
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

interface relations {
  doubleTo?: [{ name: pokemonTypesNames }]
  doubleFrom?: [{ name: pokemonTypesNames }]
  halfTo?: [{ name: pokemonTypesNames }]
  halfFrom?: [{ name: pokemonTypesNames }]
  nullTo?: [{ name: pokemonTypesNames }]
  nullFrom?: [{ name: pokemonTypesNames }]
}

export interface TypeRelations { name: string, relations: relations}

export type weaknessByType = {
  [T in pokemonTypesNames]: { to: number, from: number }
}

export const initialWeaknewssByTpe = Object
  .values(pokemonTypesNames)
  .reduce((last, current) => ({ ...last, [current]: { to: 1, from: 1 } }), {}) as weaknessByType

export const unifyTypeRelations = (types: TypeRelations[]): weaknessByType => {
  const typeRelations = structuredClone(initialWeaknewssByTpe) as {
    [T in pokemonTypesNames]: { to: number | number[], from: number | number[] }
  }

  const addToType = (type: pokemonTypesNames, value: number, side: 'to' | 'from'): void => {
    const current = typeRelations[type][side]
    if (typeof current === 'number') typeRelations[type][side] = [current, value]
    if (Array.isArray(current)) typeRelations[type][side] = [...current, value]
  }

  types.forEach(({ relations }) => {
    relations.doubleTo?.forEach(({ name }) => addToType(name, 2, 'to'))
    relations.doubleFrom?.forEach(({ name }) => addToType(name, 2, 'from'))
    relations.halfTo?.forEach(({ name }) => addToType(name, 0.5, 'to'))
    relations.halfFrom?.forEach(({ name }) => addToType(name, 0.5, 'from'))
    relations.nullTo?.forEach(({ name }) => addToType(name, 0, 'to'))
    relations.nullFrom?.forEach(({ name }) => addToType(name, 0, 'from'))
  })

  Object.entries(typeRelations).forEach(([type, { to, from }]) => {
    typeRelations[type as pokemonTypesNames].to = multiplyArray(to)
    typeRelations[type as pokemonTypesNames].from = multiplyArray(from)
  })

  return typeRelations as weaknessByType
}

export const transformApiToTypeRelation = (type: TypeRelationsAPI): TypeRelations => {
  const { name, damage_relations: DmgR } = type

  return {
    name,
    relations: {
      doubleTo: DmgR.double_damage_to.length > 0 ? DmgR.double_damage_to : undefined,
      doubleFrom: DmgR.double_damage_from.length > 0 ? DmgR.double_damage_from : undefined,
      halfTo: DmgR.half_damage_to.length > 0 ? DmgR.half_damage_to : undefined,
      halfFrom: DmgR.half_damage_from.length > 0 ? DmgR.half_damage_from : undefined,
      nullTo: DmgR.no_damage_to.length > 0 ? DmgR.no_damage_to : undefined,
      nullFrom: DmgR.no_damage_from.length > 0 ? DmgR.no_damage_from : undefined
    }
  }
}
