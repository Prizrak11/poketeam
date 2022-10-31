import { searchItemAPI } from 'types/searchItem'
import { POKE_API } from '../consts'

export const moveSearchList = async (): Promise<searchItemAPI[]> => {
  const localKey = 'moveList'

  return await new Promise((resolve, reject) => {
    const localList = localStorage.getItem(localKey)
    if (localList != null) {
      resolve(JSON.parse(localList))
    } else {
      fetch(`${POKE_API}move?limit=2000&lang=es`)
        .then(async data => await data.json())
        .then(({ results }) => {
          localStorage.setItem(localKey, JSON.stringify(results))
          resolve(results)
        })
        .catch(reject)
    }
  })
}
