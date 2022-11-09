import { KeyboardEventHandler, useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react'
import styles from './SearchInput.module.css'
import Spinner from 'components/Spinner/Spinner'
import { useSearchReturn } from 'hooks/search/useSearch'
import { searchFuncType } from 'hooks/modals/useSearchModal'
import { searchItemAPI } from 'types/searchItem'

interface searchInputProps {
  onOptionClick: searchFuncType
  searchHook: () => useSearchReturn
  placeholder: string
  className?: string
}

export interface SearchInputElement {
  clearInput: () => void
}

const SearchInput = forwardRef<SearchInputElement, searchInputProps>(({
  onOptionClick,
  searchHook,
  placeholder,
  className
}, forwardedRef): JSX.Element => {
  const { list, handleInputChange, isLoading, inputValue, clearInput } = searchHook()
  const [keyFocus, setKeyFocus] = useState<number>(0)
  const buttonArr = useRef<Array<HTMLButtonElement | null>>([])

  const scrollToRef = (num:number):void => {
    buttonArr.current.at(num)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  

  const clickOption = (query: searchItemAPI) => {
    onOptionClick(query)
    clearInput()
  }

  useEffect(()=> {
    setKeyFocus(0)
    scrollToRef(0)
  }, [list])

  const handleArrows: KeyboardEventHandler<HTMLInputElement> = evt => {
    if (list == null) return

    if (evt.key === 'ArrowUp' && keyFocus > 0) setKeyFocus(key => key - 1)
    if (evt.key === 'ArrowDown' && keyFocus < list.length - 1) setKeyFocus(key => key + 1)
    if (evt.key === 'Enter') clickOption(list[keyFocus])

    if (keyFocus !== 0) scrollToRef(keyFocus - 1)
  }

  useImperativeHandle(forwardedRef, () => ({ clearInput }))

  if (isLoading) return <Spinner />
  return (
    <div className={`${styles.search} ${className ?? ''}`}>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={styles.input}
        autoFocus
        onKeyUp={handleArrows}
      />
      <div className={styles.suggestions}>
        {
          list?.map((option, id) => {
            const focus = keyFocus === id
            const fStyles = focus ? styles.focus : undefined

            return (
              <button
                onMouseOver={() => setKeyFocus(id)}
                ref={ref => { buttonArr.current[id] = ref }}
                key={id}
                className={fStyles}
                onClick={() => clickOption(option)}
              >{option.name}
              </button>
            )
          })
        }
      </div>
    </div>
  )
})

export default SearchInput
