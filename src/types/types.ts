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

export interface TypeRelations {
  name: string
  relations: {
    doubleTo?: [{ name: pokemonTypesNames }]
    doubleFrom?: [{ name: pokemonTypesNames }]
    halfTo?: [{ name: pokemonTypesNames }]
    halfFrom?: [{ name: pokemonTypesNames }]
    nullTo?: [{ name: pokemonTypesNames }]
    nullFrom?: [{ name: pokemonTypesNames }]
  }
}

export const transformApiToTypeRelation = (type: TypeRelationsAPI): TypeRelations => {
  const sanitized: TypeRelations = {
    name: '',
    relations: {
    }
  }

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
