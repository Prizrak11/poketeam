import { useState } from 'react'
import { useAppContext } from 'context/AppContext'
import { Pokemon } from 'types/pokemon'
import { getMove } from 'services/getMoves'
import { PokemonMove } from 'types/moves'
import { Actions } from 'context/reducer'
import { searchItemAPI } from 'types/searchItem'
import { addStab } from 'utils/pokemonMoves'

interface IUseMove {
  loading: boolean
  addMoveToPokemon: (move: searchItemAPI, pokemon: Pokemon) => void
  removeMoveFromPokemon: (move: PokemonMove, pokemon: Pokemon) => void
  addMoveToAttacker: (move: searchItemAPI) => void
  removeMoveFromAttacker: (move: PokemonMove) => void
}

const useMove = (): IUseMove => {
  const { state: { pokemonTeam, attacker }, dispatch } = useAppContext()
  const [loading, setLoading] = useState(false)

  const getMoveFromApi = async (move: searchItemAPI): Promise<PokemonMove> => {
    setLoading(true)
    return await getMove(move)
      .then(move => move)
      .finally(() => setLoading(false))
  }

  const addMoveToPokemon = (move: searchItemAPI, pokemon: Pokemon): void => {
    const selectedPokemon = pokemonTeam.find(({ id }) => id === pokemon.id)
    if (selectedPokemon == null) throw new Error('Pokemon not found')

    getMoveFromApi(move)
      .then(move => dispatch({ type: Actions.SET_POKEMON_MOVE, payload: { pokemon, move: addStab(move, pokemon) } }))
      .catch((error: Error) => { throw new Error(`Failed to load move ${pokemon.name}: ${error.message}`) })
  }

  const removeMoveFromPokemon = (move: PokemonMove, pokemon: Pokemon): void => {
    const selectedPokemon = pokemonTeam.find(({ id }) => id === pokemon.id)
    if (selectedPokemon == null) throw new Error('Pokemon not found')

    const filtered = pokemon.moves.filter(({ name }) => name !== move.name)

    dispatch({ type: Actions.CHANGE_POKEMON_MOVES, payload: { pokemon, moves: filtered } })
  }

  const addMoveToAttacker = (move: searchItemAPI): void => {
    if (attacker == null) throw new Error('There is no attacker defined')

    getMoveFromApi(move)
      .then(move => dispatch({ type: Actions.SET_ATTACKER_MOVE, payload: { move: addStab(move, attacker) } }))
      .catch((error: Error) => { throw new Error(`Failed to load move to ${attacker.name}: ${error.message}`) })
  }

  const removeMoveFromAttacker = (move: PokemonMove): void => {
    if (attacker == null) throw new Error('There is no attacker defined')

    const filtered = attacker.moves.filter(({ name }) => name !== move.name)

    dispatch({ type: Actions.CHANGE_ATTACKER_MOVES, payload: { moves: filtered } })
  }

  return {
    addMoveToPokemon,
    removeMoveFromPokemon,
    addMoveToAttacker,
    removeMoveFromAttacker,
    loading
  }
}

export default useMove
