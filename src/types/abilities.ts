export interface AbilitieAPI {
  effect_entries: [
    {
      short_effect: string
      language: {
        name: string
      }
    }
  ]
  name: string
}

export interface Abilitie {
  name: string
  shortEffect: string
}

export const transformApiToAbilitie = (abilitie: AbilitieAPI): Abilitie => {
  const { name, effect_entries: effects } = abilitie

  return {
    name,
    shortEffect: effects.find(({ language }) => language.name === 'en')?.short_effect ?? name
  }
}
