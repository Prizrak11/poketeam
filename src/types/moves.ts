import { EffectsAPI } from './abilities'
import { PokemonType, pokemonTypes, pokemonTypesNames } from './pokemonTypes'

export enum DamageClass {
  STATUS = 'status',
  PHYSICAL = 'physical',
  SPECIAL = 'special'
}

export interface MoveAPI {
  accuracy: number
  type: { name: pokemonTypesNames }
  name: string
  power: number
  pp: number
  priority: number
  effect_chance: number
  effect_entries: EffectsAPI[]
  damage_class: { name: DamageClass }
}

export interface PokemonMove {
  accuracy: number
  type: PokemonType
  name: string
  classType: DamageClass
  stab: number
  power: number
  pp: number
  priority: number
  effect: string | undefined
}

export const fromApiToMove = (move: MoveAPI): PokemonMove => {
  const { name, type, effect_entries: effectsAPI, effect_chance: chance, damage_class: classAPI } = move

  return {
    ...move,
    stab: 1,
    classType: classAPI.name,
    name: name.replaceAll('-', ' '),
    type: pokemonTypes.get(type.name),
    effect: effectsAPI
      .find(({ language }) => language.name === 'en')?.short_effect
      .replaceAll('$effect_chance%', `${chance}%`)
  }
}
