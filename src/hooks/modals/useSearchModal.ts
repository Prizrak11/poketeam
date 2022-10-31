import { ModalsTypes } from '../../context/reducer'
import { Actions } from 'context/reducer'
import { useAppContext } from 'context/AppContext'
import { searchItemAPI } from 'types/searchItem'

export type searchFuncType = (query: searchItemAPI) => void

export interface useSearchModalReturn {
  isOpen: boolean
  searchAction: searchFuncType
  openModal: (action?: searchFuncType) => void
  closeModal: () => void
}

interface useSearchProps {
  type: ModalsTypes
}

const useSearchModal = ({ type }: useSearchProps): useSearchModalReturn => {
  const { state: { searchModal }, dispatch } = useAppContext()

  const isOpen = searchModal.state[type]

  const searchAction = (searchModal.action != null) ? searchModal.action : function () {}

  const openModal = (action?: searchFuncType): void => {
    dispatch({ type: Actions.HANDLE_SEARCH_MODAL, payload: { state: { [type]: true }, action } })
  }

  const closeModal = (): void => {
    dispatch({ type: Actions.HANDLE_SEARCH_MODAL, payload: { state: { [type]: false } } })
  }

  return {
    isOpen,
    searchAction,
    openModal,
    closeModal
  }
}

export default useSearchModal
