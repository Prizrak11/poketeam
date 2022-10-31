import { ModalsTypes } from 'context/reducer'
import { useMoveSearch } from 'hooks/search'
import { GiFist } from 'react-icons/gi'
import SearchModal from './SearchModal'
import styles from './SearchModal.module.css'

const MoveSearchModal = (): JSX.Element => {
  return (
    <SearchModal type={ModalsTypes.moveSearch} searchHook={useMoveSearch} placeholder='Search for a Pokemon move'>
      <>
        <h1>Select a move</h1>
        <GiFist className={styles.icon} />
      </>
    </SearchModal>
  )
}

export default MoveSearchModal
