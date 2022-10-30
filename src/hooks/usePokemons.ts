import { Pokemon } from 'types/pokemon'
import { useState } from 'react'
import { getPokemon } from 'services/getPokemon'
import { useAppContext } from 'context/AppContext'
import { Actions } from 'context/reducer'
import { searchItemAPI } from 'types/searchItem'

interface usePokemonRes {
  pokemonTeam: Pokemon[]
  loading: boolean
  addPokemonToTeamFromApi: (pokemon: searchItemAPI) => void
  removePokemonFromTeam: (pokemon: Pokemon) => void
}

const usePokemon = (): usePokemonRes => {
  const { state: { pokemonTeam }, dispatch } = useAppContext()
  const [loading, setLoading] = useState(false)

  const getPokemonFromApi = async (pokemon: searchItemAPI): Promise<Pokemon | undefined> => {
    setLoading(true)
    return await getPokemon(pokemon)
      .then(pokemon => pokemon)
      .finally(() => setLoading(false))
  }

  const teamWithBlankSpaces: Pokemon[] = [...pokemonTeam, ...Array(6 - pokemonTeam.length)]

  const addPokemonToTeamFromApi = (pokemon: searchItemAPI): void => {
    getPokemonFromApi(pokemon)
      .then(pokemon => dispatch({ type: Actions.SET_POKEMON, payload: pokemon }))
      .catch((error: Error) => { throw new Error(`Failed to load pokemon ${pokemon.name}: ${error.message}`) })
  }

  const removePokemonFromTeam = (pokemon: Pokemon): void => {
    const filtered = pokemonTeam.filter(({ id }) => id !== pokemon.id)
    dispatch({ type: Actions.CHANGE_POKEMON_TEAM, payload: filtered })
  }

  return {
    pokemonTeam: teamWithBlankSpaces,
    loading,
    addPokemonToTeamFromApi,
    removePokemonFromTeam
  }
}

export default usePokemon
