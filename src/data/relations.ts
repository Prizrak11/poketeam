import { TypeRelationsAPI } from 'types/types'
import { pokemonTypesNames } from 'types/pokemonTypes'
import { useLocalData } from './useLocalData'

type TypeRelationsLocal = {
  [T in pokemonTypesNames]: TypeRelationsAPI
}

const { getData, setData } = useLocalData<TypeRelationsLocal>('relationTypes')

export const getRelationByName = (name: pokemonTypesNames): TypeRelationsAPI | null => {
  const relations = getData()

  return relations?.[name] ?? null
}

export const setRelations = (relations: TypeRelationsAPI, relationName: pokemonTypesNames): void => {
  setData({ [relationName]: relations })
}
