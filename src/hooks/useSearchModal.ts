import { Actions } from 'context/reducer'
import { useAppContext } from 'context/AppContext'
import { searchItemAPI } from 'types/searchItem'

export type searchFuncType = (query: searchItemAPI) => void

interface IsearchModal {
  isOpen: boolean
  searchAction: searchFuncType
  openModal: (action?: searchFuncType) => void
  closeModal: () => void
}

const useSearchModal = (): IsearchModal => {
  const { state: { searchModal }, dispatch } = useAppContext()

  const isOpen = searchModal.state

  const searchAction = (searchModal.action != null) ? searchModal.action : function () {}

  const openModal = (action?: searchFuncType): void => {
    dispatch({ type: Actions.HANDLE_SEARCH_MODAL, payload: { state: true, action } })
  }

  const closeModal = (): void => {
    dispatch({ type: Actions.HANDLE_SEARCH_MODAL, payload: { state: false } })
  }

  return {
    isOpen,
    searchAction,
    openModal,
    closeModal
  }
}

export default useSearchModal
