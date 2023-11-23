import { searchItemAPI, sanitizeItem } from 'types/searchItem'
import { POKE_API } from '../consts'
import { getMoveList, setMoveList } from 'data/movesList'

export const moveSearchList = async ({ signal }: AbortController): Promise<searchItemAPI[]> => {
  const currentMoves = getMoveList()
  if (currentMoves != null) return currentMoves

  const apiData = await fetch(`${POKE_API}move?limit=2000&lang=es`, { signal })
  const { results } = await apiData.json()
  const parsedMoves: searchItemAPI[] = results.map(sanitizeItem)

  setMoveList(parsedMoves)
  return parsedMoves
}
