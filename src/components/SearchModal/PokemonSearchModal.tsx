import { usePokemonSearch } from 'hooks/search'
import SearchModal from './SearchModal'
import styles from './SearchModal.module.css'
import { ModalActions } from 'context/modals/modalsReducer'

const PokemonSearchModal = (): JSX.Element => {
  return (
    <SearchModal type={ModalActions.HANDLE_POKEMON_SEARCH_MODAL} searchHook={usePokemonSearch} placeholder='Search for a pokemon'>
      <>
        <h1>Who's that Pokemon</h1>
        <span className={styles.icon}>?</span>
      </>
    </SearchModal>
  )
}

export default PokemonSearchModal
