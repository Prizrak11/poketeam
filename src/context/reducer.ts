import { pokeSearchFunc } from 'components/PokeSearch/PokeSearch'
import { Pokemon } from 'types/pokemon'

export interface AppState {
  pokemonTeam: Pokemon[]
  searchModal: { state: boolean, action?: pokeSearchFunc }
}

export enum Actions {
  SET_POKEMON = 'set-pokemon',
  HANDLE_SEARCH_MODAL = 'handle-search-modal'
}

export const initialState: AppState = {
  pokemonTeam: [],
  searchModal: { state: false }
}

export interface ActionType {
  type: string
  payload?: any
}

export const reducer = (state: AppState, action: ActionType): AppState => {
  const { type, payload } = action

  switch (type) {
    case Actions.SET_POKEMON:
      return { ...state, pokemonTeam: [...state.pokemonTeam, payload] }
    case Actions.HANDLE_SEARCH_MODAL:
      return { ...state, searchModal: payload }
    default: return state
  }
}
