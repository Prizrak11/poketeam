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
  const sanitized: Abilitie = {
    name: '',
    shortEffect: ''
  }

  sanitized.name = abilitie.name
  console.log('filtered', abilitie.effect_entries.find((entrie) => entrie.language.name === 'en'))
  sanitized.shortEffect = abilitie.effect_entries.find((entrie) => entrie.language.name === 'en')?.short_effect ?? abilitie.name

  return sanitized
}
