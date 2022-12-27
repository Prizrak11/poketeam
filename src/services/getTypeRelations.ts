import { POKE_API } from 'consts'
import { TypeRelationsAPI } from 'types/types'
import { getRelationByName, setRelations } from '../data/relations'
import { pokemonTypesNames } from '../types/pokemonTypes'

export const getTypeRelations = async (name: pokemonTypesNames): Promise<TypeRelationsAPI> => {
  const currentRelations = getRelationByName(name)

  return await new Promise((resolve, reject) => {
    if (currentRelations != null) resolve(currentRelations)

    fetch(`${POKE_API}type/${name}`)
      .then(async data => await data.json())
      .then((relations: TypeRelationsAPI) => {
        setRelations(relations, name)
        resolve(relations)
      })
      .catch(reject)
  })
}
