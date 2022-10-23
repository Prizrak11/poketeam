import { Pokemon } from 'types/pokemon'
import { useEffect, useState } from 'react'
import { getPokemon } from 'services/getPokemon'

interface usePokemonRes {
  pokemon: Pokemon | undefined
  loading: boolean
  error: boolean
}

const usePokemon = (): usePokemonRes => {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    getPokemon('lunala')
      .then(setPokemon)
      .catch(setError)
      .finally(() => { setLoading(false) })
  }, [])

  return {
    pokemon, loading, error
  }
}

export default usePokemon
