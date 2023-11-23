import { searchFuncType } from 'hooks/modals/useSearchModal'

export interface ModalsState {
  pokemonSearch: { state: boolean, action?: searchFuncType }
  moveSearch: { state: boolean, action?: searchFuncType }
}

export enum ModalActions {
  HANDLE_POKEMON_SEARCH_MODAL = 'search-for-specific-pokemon',
  HANDLE_MOVE_SEARCH_MODAL = 'search-for-specific-move',
}

export const initialModalsState: ModalsState = {
  pokemonSearch: { state: false },
  moveSearch: { state: false }
}

type ValueOf<T> = T[keyof T]
export interface ModalAction {
  type: string
  payload: ValueOf<ModalsState>
}

export const mapActionsToState: Record<ModalActions, keyof ModalsState> = {
  [ModalActions.HANDLE_POKEMON_SEARCH_MODAL]: 'pokemonSearch',
  [ModalActions.HANDLE_MOVE_SEARCH_MODAL]: 'moveSearch'
}

export function modalsReducer (state: ModalsState, action: ModalAction): ModalsState {
  const { type, payload } = action

  switch (type) {
    case ModalActions.HANDLE_POKEMON_SEARCH_MODAL:
      return { ...state, pokemonSearch: payload }
    case ModalActions.HANDLE_MOVE_SEARCH_MODAL:
      return { ...state, moveSearch: payload }
    default: return state
  }
}
