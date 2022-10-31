import { ChangeEvent, useEffect, useState } from 'react'
import { searchItemAPI } from 'types/searchItem'
import { useDebouncedCallback } from 'use-debounce'
import { sanitizePokemon } from 'utils/sanitizePokemon'

export interface useSearchReturn {
  list: searchItemAPI[] | undefined
  handleInputChange: (evt: ChangeEvent<HTMLInputElement>) => void
  inputValue: string
  isLoading: boolean
  clearInput: () => void
}

interface useSearchProps {
  getter: () => Promise<searchItemAPI[]>
  filter: (arr: searchItemAPI[], query: string) => searchItemAPI[]
}

const useSearch = ({ getter, filter }: useSearchProps): useSearchReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState<searchItemAPI[]>()
  const [inputValue, setInputValue] = useState<string>('')
  const [list, setList] = useState<searchItemAPI[]>()

  const getListFromApi = (): void => {
    setIsLoading(true)
    getter()
      .then(setSearch)
      .finally(() => setIsLoading(false))
  }

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>): void => { setInputValue(evt.target.value) }

  const clearInput = (): void => setInputValue('')

  useEffect(() => {
    debounceHandleChange(inputValue)
  }, [inputValue])

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
    handleInputChange,
    inputValue,
    isLoading,
    clearInput
  }
}

export default useSearch
