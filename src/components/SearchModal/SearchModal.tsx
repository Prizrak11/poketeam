import { FC, MouseEvent } from 'react'
import SearchInput from 'components/SearchInput/SearchInput'
import useSearchModal, { searchFuncType } from 'hooks/useSearchModal'
import styles from './SearchModal.module.css'
import usePokeSearch from 'hooks/usePokeSearch'

const SearchModal: FC = (): JSX.Element => {
  const { isOpen, closeModal, searchAction } = useSearchModal()

  const stopClose = (evt: MouseEvent): void => evt.stopPropagation()

  const onSearch: searchFuncType = pokemon => {
    closeModal()
    searchAction(pokemon)
  }

  if (!isOpen) return <></>
  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.content} onClick={stopClose}>
        <div className={styles.background} />
        <h1>Who's that Pokemon</h1>
        <span className={styles.icon}>?</span>
        <SearchInput
          onOptionClick={onSearch}
          searchHook={usePokeSearch}
          placeholder='Search for a pokemon'
        />
      </div>
    </div>
  )
}

export default SearchModal
