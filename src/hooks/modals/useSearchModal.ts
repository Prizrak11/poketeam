import { searchItemAPI } from 'types/searchItem'
import { ModalActions, mapActionsToState } from 'context/modals/modalsReducer'
import { useModalContext } from 'context/modals/ModalContext'

export type searchFuncType = (query: searchItemAPI) => void

export interface useSearchModalReturn {
  isOpen: boolean
  searchAction: searchFuncType
  openModal: (action?: searchFuncType) => void
  closeModal: () => void
}

interface useSearchProps {
  type: ModalActions
}

const useSearchModal = ({ type }: useSearchProps): useSearchModalReturn => {
  const { state, dispatch } = useModalContext()
  const searchModal = state[mapActionsToState[type]]

  const isOpen = searchModal.state

  const searchAction = (searchModal.action != null) ? searchModal.action : function () {}

  const openModal = (action?: searchFuncType): void => {
    dispatch({ type, payload: { state: true, action } })
  }

  const closeModal = (): void => {
    dispatch({ type, payload: { state: false } })
  }

  return {
    isOpen,
    searchAction,
    openModal,
    closeModal
  }
}

export default useSearchModal
