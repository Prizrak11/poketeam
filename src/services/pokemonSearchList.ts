import { POKE_API } from './../consts'
export interface pokemonSearchType {
  name: string
}

export const pokemonSearchList = async (): Promise<pokemonSearchType[]> => {
  return await new Promise((resolve, reject) => {
    fetch(`${POKE_API}pokemon-species/?limit=2000`)
      .then(async data => await data.json())
      .then(({ results }) => resolve(results))
      .catch(reject)
  })
}
