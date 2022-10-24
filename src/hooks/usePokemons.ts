import { pokemonSearchType } from 'services/pokemonSearchList'
import { Pokemon } from 'types/pokemon'
import { useState } from 'react'
import { getPokemon } from 'services/getPokemon'
import { useAppContext } from 'context/AppContext'
import { Actions } from 'context/reducer'

interface usePokemonRes {
  pokemonTeam: Pokemon[]
  loading: boolean
  addPokemonToTeam: (pokemon: pokemonSearchType) => void
}

const usePokemon = (): usePokemonRes => {
  const { state: { pokemonTeam }, dispatch } = useAppContext()
  const [loading, setLoading] = useState(false)

  const getPokemonFromApi = async (name: string): Promise<Pokemon | undefined> => {
    setLoading(true)
    return await getPokemon(name)
      .then(pokemon => pokemon)
      .finally(() => setLoading(false))
  }

  const teamWithBlankSpaces: Pokemon[] = [...pokemonTeam, ...Array(6 - pokemonTeam.length)]

  const addPokemonToTeam = (pokemon: pokemonSearchType): void => {
    getPokemonFromApi(pokemon.name)
      .then(pokemon => dispatch({ type: Actions.SET_POKEMON, payload: pokemon }))
      .catch((error: Error) => { throw new Error(`Failed to load pokemon ${pokemon.name}: ${error.message}`) })
  }

  return {
    pokemonTeam: teamWithBlankSpaces,
    loading,
    addPokemonToTeam
  }
}

export default usePokemon
