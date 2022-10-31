import { EffectsAPI } from './abilities'
import { PokemonType, pokemonTypes, pokemonTypesNames } from './pokemonTypes'

export interface MoveAPI {
  accuracy: number
  type: { name: pokemonTypesNames }
  name: string
  power: number
  pp: number
  priority: number
  effect_entries: EffectsAPI[]
}

export interface PokemonMove {
  accuracy: number
  type: PokemonType
  name: string
  power: number
  pp: number
  priority: number
  effect: string | undefined
}

export const fromApiToMove = (move: MoveAPI): PokemonMove => {
  const { type, effect_entries: effectsAPI } = move

  return {
    ...move,
    type: pokemonTypes.get(type.name),
    effect: effectsAPI.find(({ language }) => language.name === 'en')?.short_effect
  }
}
