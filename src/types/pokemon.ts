import { initialWeaknewssByTpe, TypeRelations, weaknessByType } from './types'
import { Abilitie } from './abilities'
import { pokemonTypesNames } from './pokemonTypes'

export interface PokemonAPI {
  name: string
  types: Array<{ slot: number, type: { name: pokemonTypesNames, url: string } }>
  order: number
  abilities: [
    {
      ability: { name: string, url: string }
    }
  ]
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
  abilities: Abilitie[]
  typesRelations: TypeRelations[]
  weaknessByType: weaknessByType
}

export const transformApiToPokemon = (pokemon: PokemonAPI): Pokemon => {
  const formattedPokemon: Pokemon = {
    name: 'unknown',
    types: [pokemonTypesNames.UNKNOWN],
    number: 9999999,
    sprite: '',
    abilities: [],
    typesRelations: [],
    weaknessByType: structuredClone(initialWeaknewssByTpe)
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
