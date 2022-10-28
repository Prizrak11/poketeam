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

export interface TypeRelations {
  name: string
  relations: relations
}

export type weaknessByType = {
  [T in pokemonTypesNames]: { to: number, from: number }
}

export const initialWeaknewssByTpe: weaknessByType = {
  [pokemonTypesNames.NORMAL]: { to: 1, from: 1 },
  [pokemonTypesNames.FIGHTING]: { to: 1, from: 1 },
  [pokemonTypesNames.FLYING]: { to: 1, from: 1 },
  [pokemonTypesNames.POISON]: { to: 1, from: 1 },
  [pokemonTypesNames.GROUND]: { to: 1, from: 1 },
  [pokemonTypesNames.ROCK]: { to: 1, from: 1 },
  [pokemonTypesNames.BUG]: { to: 1, from: 1 },
  [pokemonTypesNames.GHOST]: { to: 1, from: 1 },
  [pokemonTypesNames.STEEL]: { to: 1, from: 1 },
  [pokemonTypesNames.FIRE]: { to: 1, from: 1 },
  [pokemonTypesNames.WATER]: { to: 1, from: 1 },
  [pokemonTypesNames.GRASS]: { to: 1, from: 1 },
  [pokemonTypesNames.ELECTRIC]: { to: 1, from: 1 },
  [pokemonTypesNames.PSYCHIC]: { to: 1, from: 1 },
  [pokemonTypesNames.ICE]: { to: 1, from: 1 },
  [pokemonTypesNames.DRAGON]: { to: 1, from: 1 },
  [pokemonTypesNames.DARK]: { to: 1, from: 1 },
  [pokemonTypesNames.FAIRY]: { to: 1, from: 1 }
}

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
    typeRelations[type as pokemonTypesNames].to = Array.isArray(to) ? to.reduce((a, b) => a * b) : to
    typeRelations[type as pokemonTypesNames].from = Array.isArray(from) ? from.reduce((a, b) => a * b) : from
  })

  return Object.freeze(typeRelations) as weaknessByType
}

export const transformApiToTypeRelation = (type: TypeRelationsAPI): TypeRelations => {
  const sanitized: TypeRelations = { name: '', relations: {} }

  const { damage_relations: DmgR } = type

  sanitized.name = type.name
  sanitized.relations = {
    doubleTo: DmgR.double_damage_to.length > 0 ? DmgR.double_damage_to : undefined,
    doubleFrom: DmgR.double_damage_from.length > 0 ? DmgR.double_damage_from : undefined,
    halfTo: DmgR.half_damage_to.length > 0 ? DmgR.half_damage_to : undefined,
    halfFrom: DmgR.half_damage_from.length > 0 ? DmgR.half_damage_from : undefined,
    nullTo: DmgR.no_damage_to.length > 0 ? DmgR.no_damage_to : undefined,
    nullFrom: DmgR.no_damage_from.length > 0 ? DmgR.no_damage_from : undefined
  }

  return sanitized
}
