import { useEffect, useState } from 'react'
import { searchItemAPI } from 'types/searchItem'
import { useDebouncedCallback } from 'use-debounce'
import { sanitizePokemon } from 'utils/sanitizePokemon'

export interface useSearchReturn {
  list: searchItemAPI[] | undefined
  handleInputChange: (query: string) => void
  isLoading: boolean
}

interface useSearchProps {
  getter: () => Promise<searchItemAPI[]>
  filter: (arr: searchItemAPI[], query: string) => searchItemAPI[]
}

const useSearch = ({ getter, filter }: useSearchProps): useSearchReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState<searchItemAPI[]>()
  const [list, setList] = useState<searchItemAPI[]>()

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
