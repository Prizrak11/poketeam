import useSearchModal, { useSearchModalReturn } from './useSearchModal'
import { ModalActions } from 'context/modals/modalsReducer'

const usePokemonSearchModal = (): useSearchModalReturn => useSearchModal({ type: ModalActions.HANDLE_POKEMON_SEARCH_MODAL })

export default usePokemonSearchModal
