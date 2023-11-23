export interface EffectsAPI {
  short_effect: string
  language: {
    name: string
  }
}

export interface AbilityAPI {
  effect_entries: EffectsAPI[]
  name: string
}

export interface PokemonAbility {
  name: string
  shortEffect: string
}

export const transformApiToAbility = (ability: AbilityAPI): PokemonAbility => {
  const { name, effect_entries: effects } = ability

  return {
    name,
    shortEffect: effects.find(({ language }) => language.name === 'en')?.short_effect ?? name
  }
}
