import { FC, MouseEvent } from 'react'
import PokeSearch, { pokeSearchFunc } from 'components/PokeSearch/PokeSearch'
import useSearchModal from 'hooks/useSearchModal'
import styles from './SearchModal.module.css'

const SearchModal: FC = (): JSX.Element => {
  const { isOpen, closeModal, searchAction } = useSearchModal()

  const stopClose = (evt: MouseEvent): void => evt.stopPropagation()

  const onSearch: pokeSearchFunc = pokemon => {
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
        <PokeSearch onPokemonClick={onSearch} />
      </div>
    </div>
  )
}

export default SearchModal
