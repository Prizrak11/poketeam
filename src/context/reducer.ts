import { Pokemon } from 'types/pokemon'

export interface AppState {
  pokemonTeam: Pokemon[]
  attacker?: Pokemon
}

export enum Actions {
  SET_POKEMON = 'set-pokemon',
  CHANGE_POKEMON_TEAM = 'change-pokemon-team',
  SET_ATTACKER = 'set-attacker',
  SET_POKEMON_MOVE = 'set-pokemon-move',
  CHANGE_POKEMON_MOVES = 'change-pokemon-moves',
  SET_ATTACKER_MOVE = 'set-attacker-move',
  CHANGE_ATTACKER_MOVES = 'change-attacker-moves',
}

export const initialState: AppState = {
  pokemonTeam: [],
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
        pokemonTeam: state.pokemonTeam.map(pokemon => {
          if (pokemon.id !== payload.pokemon.id) return pokemon
          return { ...pokemon, moves: [...pokemon.moves, payload.move] }
        })
      }
    case Actions.CHANGE_POKEMON_MOVES:
      return {
        ...state,
        pokemonTeam: state.pokemonTeam.map(pokemon => {
          if (pokemon.id !== payload.pokemon.id) return pokemon
          return { ...pokemon, moves: payload.moves }
        })
      }
    case Actions.SET_ATTACKER_MOVE:
      if (state.attacker == null) return state

      return {
        ...state,
        attacker: { ...state.attacker, moves: [...state.attacker.moves, payload.move] }
      }
    case Actions.CHANGE_ATTACKER_MOVES:
      if (state.attacker == null) return state

      return {
        ...state,
        attacker: { ...state.attacker, moves: payload.moves }
      }
    default: return state
  }
}
