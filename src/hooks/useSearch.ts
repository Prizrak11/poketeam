import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { sanitizePokemon } from 'utils/sanitizePokemon'

export interface useSearchReturn<T> {
  list: T[] | undefined
  handleInputChange: (query: string) => void
  isLoading: boolean
}

interface useSearchProps<T> {
  getter: () => Promise<T[]>
  filter: (arr: T[], query: string) => T[]
}

const useSearch = <T>({ getter, filter }: useSearchProps<T>): useSearchReturn<T> => {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState<T[]>()
  const [list, setList] = useState<T[]>()

  const getListFromApi = (): void => {
    setIsLoading(true)
    getter()
      .then(setSearch)
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getListFromApi()
  }, [])

  const handleChange = (query: string): void => {
    if (search == null) return

    if (sanitizePokemon(query) === '') {
      setList([])
      return
    }

    const filtered = filter(search, query)
    setList(filtered)
  }

  const debounceHandleChange = useDebouncedCallback(handleChange, 500)

  return {
    list,
    handleInputChange: debounceHandleChange,
    isLoading
  }
}

export default useSearch
