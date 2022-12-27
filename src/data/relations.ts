import { TypeRelationsAPI } from 'types/types'
import { pokemonTypesNames } from '../types/pokemonTypes'

type TypeRelationsLocal = {
  [T in pokemonTypesNames]: TypeRelationsAPI
}

const localKey = 'relationTypes'

const setLocal = (data: string): void => localStorage.setItem(localKey, data)

const getLocal = (): string | null => localStorage.getItem(localKey)

export const getRelations = (): TypeRelationsLocal | null => {
  const localRelations = getLocal()
  if (localRelations == null) {
    setLocal(JSON.stringify({}))
    return null
  }

  return JSON.parse(localRelations)
}

export const getRelationByName = (name: pokemonTypesNames): TypeRelationsAPI | null => {
  const relations = getRelations()

  return relations?.[name] ?? null
}

export const setRelations = (relations: TypeRelationsAPI, relationName: string): void => {
  const currentRelations = getRelations()

  setLocal(
    JSON.stringify({ ...currentRelations, [relationName]: relations })
  )
}
