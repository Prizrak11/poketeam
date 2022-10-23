import { pokemonSearchType } from 'services/pokemonSearchList'
import { Pokemon } from 'types/pokemon'
import { useState } from 'react'
import { getPokemon } from 'services/getPokemon'
import { useAppContext } from 'context/AppContext'
import { Actions } from 'context/reducer'

interface usePokemonRes {
  pokemonTeam: Pokemon[]
  loading: boolean
  error: boolean
  addPokemonToTeam: (pokemon: pokemonSearchType) => void
}

const usePokemon = (): usePokemonRes => {
  const { state: { pokemonTeam }, dispatch } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getPokemonFromApi = async (name: string): Promise<Pokemon | undefined> => {
    setLoading(true)
    let pokemon
    try {
      pokemon = await getPokemon(name)
    } catch (error) {
      setError(Boolean(error))
    }

    setLoading(false)
    return pokemon
  }

  const teamWithBlankSpaces: Pokemon[] = [...pokemonTeam, ...Array(6 - pokemonTeam.length)]

  const addPokemonToTeam = (pokemon: pokemonSearchType): void => {
    getPokemonFromApi(pokemon.name)
      .then(pokemon => dispatch({ type: Actions.SET_POKEMON, payload: pokemon }))
      .catch(setError)
  }

  return {
    pokemonTeam: teamWithBlankSpaces,
    loading,
    error,
    addPokemonToTeam
  }
}

export default usePokemon
