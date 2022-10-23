import { Pokemon } from 'types/pokemon'

export interface AppState {
  pokemonTeam: Pokemon[]
}

export enum Actions {
  SET_POKEMON = 'set-pokemon'
}

export const initialState = {
  pokemonTeam: []
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
    default: return state
  }
}
