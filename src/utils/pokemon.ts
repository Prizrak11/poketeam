import { PokemonType } from 'types/pokemonTypes'
import { Pokemon } from 'types/pokemon'

export const getWeak = (pokemon: Pokemon | undefined, type: PokemonType): number => {
  return pokemon?.weaknessByType[type.name].from ?? 1
}

export const getStength = (pokemon: Pokemon | undefined, type: PokemonType): number => {
  return pokemon?.weaknessByType[type.name].to ?? 1
}
