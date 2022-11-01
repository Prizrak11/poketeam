import { EffectsAPI } from './abilities'
import { Pokemon } from './pokemon'
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
  stab: number
  power: number
  pp: number
  priority: number
  effect: string | undefined
}

export const addStab = (move: PokemonMove, pokemon: Pokemon): PokemonMove => {
  const types = pokemon.types.map(({ name }) => name)

  if (types.includes(move.type.name)) return { ...move, stab: 1.5 }

  return move
}

export const fromApiToMove = (move: MoveAPI): PokemonMove => {
  const { name, type, effect_entries: effectsAPI } = move

  return {
    ...move,
    stab: 1,
    name: name.replaceAll('-', ' '),
    type: pokemonTypes.get(type.name),
    effect: effectsAPI.find(({ language }) => language.name === 'en')?.short_effect
  }
}
