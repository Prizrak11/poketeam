import { pokeSearchFunc } from './../components/PokeSearch/PokeSearch'
import { Actions } from 'context/reducer'
import { useAppContext } from 'context/AppContext'
import { pokemonSearchType } from 'services/pokemonSearchList'

interface IsearchModal {
  isOpen: boolean
  searchAction: pokeSearchFunc
  openModal: (action?: pokeSearchFunc) => void
  closeModal: () => void
}

const useSearchModal = (): IsearchModal => {
  const { state: { searchModal }, dispatch } = useAppContext()

  const isOpen = searchModal.state

  const searchAction = (searchModal.action != null) ? searchModal.action : function () {}

  const openModal = (action?: (pokemon: pokemonSearchType) => void): void => {
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
