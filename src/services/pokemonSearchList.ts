import { POKE_API } from './../consts'
export interface pokemonSearchType {
  name: string
}

export const pokemonSearchList = async (): Promise<pokemonSearchType[]> => {
  const localKey = 'pokemonList'

  return await new Promise((resolve, reject) => {
    const localList = localStorage.getItem(localKey)
    if (localList != null) {
      resolve(JSON.parse(localList))
    } else {
      fetch(`${POKE_API}pokemon-species/?limit=2000`)
        .then(async data => await data.json())
        .then(({ results }) => {
          localStorage.setItem(localKey, JSON.stringify(results))
          resolve(results)
        })
        .catch(reject)
    }
  })
}
