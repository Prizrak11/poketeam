import { pokemonTypesNames } from './pokemonTypes'
export interface PokemonAPI {
  name: string
  types: Array<{ slot: number, type: { name: pokemonTypesNames, url: string } }>
  order: number
  sprites: {
    front_default: string
    other: { home: { front_default: string } }
    versions: {
      ['generation-v']: {
        ['black-white']: {
          animated: { front_default: string }
        }
      }
    }
  }
}

export interface Pokemon {
  name: string
  types: pokemonTypesNames[]
  number: number
  sprite: string
}

export const transformApiToPokemon = (pokemon: PokemonAPI): Pokemon => {
  const formattedPokemon = {
    name: 'unknown',
    types: [pokemonTypesNames.UNKNOWN],
    number: 9999999,
    sprite: ''
  }

  formattedPokemon.name = pokemon.name
  formattedPokemon.types = pokemon.types.map(({ type }) => type.name)
  formattedPokemon.number = pokemon.order
  formattedPokemon.sprite =
    pokemon.sprites.other.home.front_default ??
    pokemon.sprites.versions['generation-v']['black-white'].animated.front_default ??
    pokemon.sprites.front_default

  return formattedPokemon
}
