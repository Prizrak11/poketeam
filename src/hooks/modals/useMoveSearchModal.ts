import useSearchModal, { useSearchModalReturn } from './useSearchModal'
import { ModalActions } from 'context/modals/modalsReducer'

const useMoveSearchModal = (): useSearchModalReturn => useSearchModal({ type: ModalActions.HANDLE_MOVE_SEARCH_MODAL })

export default useMoveSearchModal
