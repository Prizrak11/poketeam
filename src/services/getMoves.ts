import { fromApiToMove, PokemonMove } from 'types/moves'
import { searchItemAPI } from 'types/searchItem'

export const getMove = async (move: searchItemAPI): Promise<PokemonMove> => {
  return await new Promise((resolve, reject) => {
    fetch(move.url)
      .then(async data => await data.json())
      .then(move => {
        resolve(fromApiToMove(move))
      })
      .catch(reject)
  })
}
