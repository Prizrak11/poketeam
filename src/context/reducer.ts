import { searchFuncType } from 'hooks/useSearchModal'
import { Pokemon } from 'types/pokemon'

export interface AppState {
  pokemonTeam: Pokemon[]
  searchModal: { state: boolean, action?: searchFuncType }
  attacker?: Pokemon
}

export enum Actions {
  SET_POKEMON = 'set-pokemon',
  CHANGE_POKEMON_TEAM = 'change-pokemon-team',
  SET_ATTACKER = 'set-attacker',
  HANDLE_SEARCH_MODAL = 'handle-search-modal',
  SET_POKEMON_MOVE = 'set-pokemon-move',
  CHANGE_POKEMON_MOVE = 'change-pokemon-move'
}

export const initialState: AppState = {
  pokemonTeam: [],
  searchModal: { state: false },
  attacker: undefined
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
    case Actions.CHANGE_POKEMON_TEAM:
      return { ...state, pokemonTeam: payload }
    case Actions.SET_ATTACKER:
      return { ...state, attacker: payload }
    case Actions.SET_POKEMON_MOVE:
      return {
        ...state,
        pokemonTeam: [
          ...state.pokemonTeam.filter(({ id }) => id !== payload.pokemon.id),
          { ...payload.pokemon, moves: [...payload.pokemon.moves, payload.move] }
        ]
      }
    case Actions.HANDLE_SEARCH_MODAL:
      return { ...state, searchModal: payload }
    default: return state
  }
}
