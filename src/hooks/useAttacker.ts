import { Pokemon } from 'types/pokemon'
import { useState } from 'react'
import { getPokemon } from 'services/getPokemon'
import { useAppContext } from 'context/AppContext'
import { Actions } from 'context/reducer'
import { searchItemAPI } from 'types/searchItem'

interface IuseAttacker {
  attacker: Pokemon | undefined
  loading: boolean
  addPokemonToEnemyFromApi: (pokemon: searchItemAPI) => void
  removePokemonEnemy: () => void
}

const useAttacker = (): IuseAttacker => {
  const { state: { attacker }, dispatch } = useAppContext()
  const [loading, setLoading] = useState(false)

  const getPokemonFromApi = async (pokemon: searchItemAPI): Promise<Pokemon | undefined> => {
    setLoading(true)
    return await getPokemon(pokemon)
      .then(pokemon => pokemon)
      .finally(() => setLoading(false))
  }

  const addPokemonToEnemyFromApi = (pokemon: searchItemAPI): void => {
    getPokemonFromApi(pokemon)
      .then(pokemon => dispatch({ type: Actions.SET_ATTACKER, payload: pokemon }))
      .catch((error: Error) => { throw new Error(`Failed to load pokemon ${pokemon.name}: ${error.message}`) })
  }

  const removePokemonEnemy = (): void => {
    dispatch({ type: Actions.SET_ATTACKER, payload: undefined })
  }

  return {
    attacker,
    loading,
    addPokemonToEnemyFromApi,
    removePokemonEnemy
  }
}

export default useAttacker
