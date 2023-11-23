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
}

const useMove = (): IUseMove => {
  const { state: { pokemonTeam }, dispatch } = useAppContext()
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

  return {
    addMoveToPokemon,
    removeMoveFromPokemon,
    loading
  }
}

export default useMove
