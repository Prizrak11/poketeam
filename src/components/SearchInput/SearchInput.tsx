import { useState, useRef, forwardRef, useImperativeHandle, useEffect, useCallback, KeyboardEventHandler } from 'react'
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

  const scrollToRef = (num: number): void => {
    buttonArr.current.at(num)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const clickOption = (query: searchItemAPI): void => {
    onOptionClick(query)
    clearInput()
  }

  const focusClose = (): void => {
    const closeButton = document.querySelector('[data-close-modal]') as HTMLElement
    closeButton?.focus()
  }

  useEffect(() => {
    setKeyFocus(0)
    scrollToRef(0)
  }, [list])

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback((evt) => {
    if (list == null) return

    if (evt.key === 'Tab' && evt.shiftKey && keyFocus === 0) {
      evt.preventDefault()
      focusClose()
      return
    }

    if (evt.key === 'Tab' && !evt.shiftKey && keyFocus === list.length - 1) {
      evt.preventDefault()
      return
    }

    if (evt.key === 'ArrowUp' || (evt.key === 'Tab' && evt.shiftKey)) {
      evt.preventDefault()
      setKeyFocus(key => {
        const newKey = key > 0 ? key - 1 : 0
        scrollToRef(newKey)
        return newKey
      })
      return
    }

    if (evt.key === 'ArrowDown' || evt.key === 'Tab') {
      evt.preventDefault()
      setKeyFocus(key => {
        const newKey = key < list.length - 1 ? key + 1 : list.length - 1
        scrollToRef(newKey)
        return newKey
      })
      return
    }

    if (evt.key === 'Enter') {
      evt.preventDefault()
      if (list[keyFocus] != null) {
        clickOption(list[keyFocus])
      }
    }
  }, [list, keyFocus])

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
        aria-autocomplete='list'
        aria-expanded={list != null && list.length > 0}
        aria-controls='search-suggestions'
        onKeyDown={handleKeyDown}
      />
      <div className={styles.suggestions} role='listbox' id='search-suggestions' tabIndex={-1}>
        {
          list?.map((option, id) => {
            const focus = keyFocus === id
            const fStyles = focus ? styles.focus : undefined

            return (
              <button
                role='option'
                aria-selected={focus}
                onMouseOver={() => setKeyFocus(id)}
                ref={ref => { buttonArr.current[id] = ref }}
                key={id}
                className={fStyles}
                onClick={() => clickOption(option)}
                tabIndex={-1}
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
