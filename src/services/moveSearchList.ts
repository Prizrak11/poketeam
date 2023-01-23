import { searchItemAPI, sanitizeItem } from 'types/searchItem'
import { POKE_API } from '../consts'
import { getMoveList, setMoveList } from 'data/movesList'

export const moveSearchList = async (): Promise<searchItemAPI[]> => {
  const currentMoves = getMoveList()

  return await new Promise((resolve, reject) => {
    if (currentMoves != null) return resolve(currentMoves)

    fetch(`${POKE_API}move?limit=2000&lang=es`)
      .then(async data => await data.json())
      .then(({ results }) => results.map(sanitizeItem))
      .then((results: searchItemAPI[]) => {
        setMoveList(results)
        resolve(results)
      })
      .catch(reject)
  })
}
