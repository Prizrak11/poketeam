import { ChangeEvent, KeyboardEventHandler, useState, useRef, FC } from 'react'
import styles from './SearchInput.module.css'
import Spinner from 'components/Spinner/Spinner'
import { useSearchReturn } from 'hooks/useSearch'
import { searchFuncType } from 'hooks/useSearchModal'

interface searchInputProps {
  onOptionClick: searchFuncType
  searchHook: () => useSearchReturn
  placeholder: string
}

const SearchInput: FC<searchInputProps> = ({ onOptionClick, searchHook, placeholder }): JSX.Element => {
  const { list, handleInputChange, isLoading } = searchHook()
  const [keyFocus, setKeyFocus] = useState<number>(0)
  const buttonArr = useRef<Array<HTMLButtonElement | null>>([])

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => { handleInputChange(evt.target.value) }

  const handleArrows: KeyboardEventHandler<HTMLInputElement> = evt => {
    if (list == null) return

    if (evt.key === 'ArrowUp' && keyFocus > 0) setKeyFocus(key => key - 1)
    if (evt.key === 'ArrowDown' && keyFocus < list.length - 1) setKeyFocus(key => key + 1)
    if (evt.key === 'Enter') onOptionClick(list[keyFocus])

    if (keyFocus !== 0) buttonArr.current.at(keyFocus - 1)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  if (isLoading) return <Spinner />
  return (
    <div className={styles.search}>
      <input
        type='text'
        onChange={handleChange}
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
                onClick={() => onOptionClick(option)}
              >{option.name}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default SearchInput
