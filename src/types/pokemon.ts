import { PokemonType, pokemonTypes } from 'types/pokemonTypes'
import { initialWeaknewssByTpe, weaknessByType } from './types'
import { PokemonAbilitie } from './abilities'
import { pokemonTypesNames } from './pokemonTypes'

interface APISprites {
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

interface APIAbilitie {ability: { name: string, url: string }}

export interface APIType { slot: number, type: { name: pokemonTypesNames, url: string } }

interface APIStat { base_stat: number, stat: { name: string } }

export interface PokemonAPI {
  name: string
  types: APIType[]
  order: number
  abilities: APIAbilitie[]
  sprites: APISprites
  stats: APIStat[]
}

export interface Pokemon {
  name: string
  types: PokemonType[]
  number: number
  sprite: string
  speed: number
  abilities: PokemonAbilitie[]
  weaknessByType: weaknessByType
}

const getSprites = (sprites: APISprites): string => {
  const { other, versions, front_default: frontDefault } = sprites

  return other.home.front_default ??
    versions['generation-v']['black-white'].animated.front_default ??
    frontDefault
}

const getStat = (stats: APIStat[], name: string): number =>
  stats.filter(({ stat }) => stat.name === name).at(0)?.base_stat ?? 0

export const transformApiToPokemon = (pokemon: PokemonAPI): Pokemon => {
  const { name, types, order, stats, sprites } = pokemon

  return {
    name,
    types: types.map(({ type }) => pokemonTypes.get(type.name)),
    number: order,
    speed: getStat(stats, 'speed'),
    sprite: getSprites(sprites),
    abilities: [],
    weaknessByType: structuredClone(initialWeaknewssByTpe)
  }
}
