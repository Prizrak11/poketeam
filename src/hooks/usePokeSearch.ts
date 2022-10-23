import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { pokemonSearchList } from './../services/pokemonSearchList'
import { pokemonSearchType } from 'services/pokemonSearchList'
import { sanitizePokemon } from 'utils/sanitizePokemon'

interface IusePokeSearch {
  pokemonList: pokemonSearchType[] | undefined
  handleInputChange: (query: string) => void
  isLoading: boolean
}

interface pokeSearchProps {
  filters?: string[]
}

const usePokeSearch = ({ filters }: pokeSearchProps = {}): IusePokeSearch => {
  const [isLoading, setIsLoading] = useState(false)
  const [pokemonSearch, setPokemonSearch] = useState<pokemonSearchType[]>()
  const [pokemonList, setPokemonList] = useState<pokemonSearchType[]>()

  useEffect(() => {
    setIsLoading(true)
    pokemonSearchList()
      .then(setPokemonSearch)
      .finally(() => setIsLoading(false))
  }, [])

  const handleChange = (query: string): void => {
    if (pokemonSearch == null) return

    if (sanitizePokemon(query) === '') {
      setPokemonList([])
      return
    }

    const filtered = pokemonSearch.filter(({ name }) => {
      const isQuery = name.includes(sanitizePokemon(query))
      const isNotFiltered = (filters != null) ? !filters.includes(name) : true

      return isQuery && isNotFiltered
    })
    setPokemonList(filtered)
  }

  const debounceHandleChange = useDebouncedCallback(handleChange, 500)

  return {
    pokemonList,
    handleInputChange: debounceHandleChange,
    isLoading
  }
}

export default usePokeSearch
