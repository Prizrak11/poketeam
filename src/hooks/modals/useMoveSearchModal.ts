import { ModalsTypes } from 'context/reducer'
import useSearchModal, { useSearchModalReturn } from './useSearchModal'

const useMoveSearchModal = (): useSearchModalReturn => useSearchModal({ type: ModalsTypes.moveSearch })

export default useMoveSearchModal
