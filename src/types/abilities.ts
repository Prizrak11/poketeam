export interface EffectsAPI {
  short_effect: string
  language: {
    name: string
  }
}

export interface AbilitieAPI {
  effect_entries: EffectsAPI[]
  name: string
}

export interface PokemonAbilitie {
  name: string
  shortEffect: string
}

export const transformApiToAbilitie = (abilitie: AbilitieAPI): PokemonAbilitie => {
  const { name, effect_entries: effects } = abilitie

  return {
    name,
    shortEffect: effects.find(({ language }) => language.name === 'en')?.short_effect ?? name
  }
}
