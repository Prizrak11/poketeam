import { ModalsTypes } from 'context/reducer'
import { usePokemonSearch } from 'hooks/search'
import SearchModal from './SearchModal'
import styles from './SearchModal.module.css'

const PokemonSearchModal = (): JSX.Element => {
  return (
    <SearchModal type={ModalsTypes.pokemonSearch} searchHook={usePokemonSearch} placeholder='Search for a pokemon'>
      <>
        <h1>Who's that Pokemon</h1>
        <span className={styles.icon}>?</span>
      </>
    </SearchModal>
  )
}

export default PokemonSearchModal
