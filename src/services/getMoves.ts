import { fromApiToMove, MoveAPI, PokemonMove } from 'types/moves'
import { searchItemAPI } from 'types/searchItem'
import { POKE_API } from '../consts'

export const getMove = async (move: searchItemAPI): Promise<PokemonMove> => {
  return await new Promise((resolve, reject) => {
    fetch(`${POKE_API}move/${move.name}`)
      .then(async data => await data.json())
      .then((move: MoveAPI) => {
        resolve(fromApiToMove(move))
      })
      .catch(reject)
  })
}
