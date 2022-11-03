import { PokemonType, pokemonTypes } from 'types/pokemonTypes'
import { initialWeaknewssByTpe, weaknessByType } from './types'
import { PokemonAbilitie } from './abilities'
import { pokemonTypesNames } from './pokemonTypes'
import { PokemonMove } from './moves'

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
  id: string
  name: string
  types: PokemonType[]
  number: number
  sprite: string
  speed: number
  hp: number
  attack: number
  specialAttack: number
  defense: number
  specialDefense: number
  abilities: PokemonAbilitie[]
  weaknessByType: weaknessByType
  moves: PokemonMove[]
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
    id: crypto.randomUUID(),
    types: types.map(({ type }) => pokemonTypes.get(type.name)),
    number: order,
    hp: getStat(stats, 'hp'),
    speed: getStat(stats, 'speed'),
    attack: getStat(stats, 'attack'),
    specialAttack: getStat(stats, 'special-attack'),
    defense: getStat(stats, 'defense'),
    specialDefense: getStat(stats, 'special-defense'),
    sprite: getSprites(sprites),
    abilities: [],
    weaknessByType: structuredClone(initialWeaknewssByTpe),
    moves: []
  }
}
