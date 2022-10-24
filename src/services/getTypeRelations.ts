import { POKE_API } from 'consts'
import { TypeRelations, TypeRelationsAPI, transformApiToTypeRelation } from 'types/types'

export const getTypeRelations = async (name: string): Promise<TypeRelations> => {
  const localKey = 'relationTypes'
  const localRelations = localStorage.getItem(localKey)
  if (localRelations == null) localStorage.setItem(localKey, JSON.stringify({}))

  const currentRelations = localRelations != null ? JSON.parse(localRelations) : {}

  return await new Promise((resolve, reject) => {
    if (currentRelations[name] != null) {
      resolve(currentRelations[name])
    } else {
      fetch(`${POKE_API}type/${name}`)
        .then(async data => await data.json())
        .then((type: TypeRelationsAPI) => {
          const relations = transformApiToTypeRelation(type)
          localStorage.setItem(localKey, JSON.stringify({ ...currentRelations, [name]: relations }))

          resolve(relations)
        })
        .catch(reject)
    }
  })
}
