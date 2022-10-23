export enum pokemonTypesNames {
  NORMAL = 'normal',
  FIGHTING = 'fighting',
  FLYING = 'flying',
  POISON = 'poison',
  GROUND = 'ground',
  ROCK = 'rock',
  BUG = 'bug',
  GHOST = 'ghost',
  STEEL = 'steel',
  FIRE = 'fire',
  WATER = 'water',
  GRASS = 'grass',
  ELECTRIC = 'electric',
  PSYCHIC = 'psychic',
  ICE = 'ice',
  DRAGON = 'dragon',
  DARK = 'dark',
  FAIRY = 'fairy',
  UNKNOWN = 'unknown',
  SHADOW = 'shadow'
}

interface IpokemonTypes {
  get: <T extends pokemonTypesNames>(
    status: T
  ) => {
    name: string
    color: string
  }
}

export const pokemonTypes = new Map([
  [pokemonTypesNames.NORMAL, { name: 'Normal', color: '#9EAFA2' }],
  [pokemonTypesNames.FIGHTING, { name: 'Fighting', color: '#fc6464' }],
  [pokemonTypesNames.FLYING, { name: 'Flying', color: '#b0acff' }],
  [pokemonTypesNames.POISON, { name: 'Poison', color: '#d182ff' }],
  [pokemonTypesNames.GROUND, { name: 'Ground', color: '#cc8f72' }],
  [pokemonTypesNames.ROCK, { name: 'Rock', color: '#ccb372' }],
  [pokemonTypesNames.BUG, { name: 'Bug', color: '#8fcc72' }],
  [pokemonTypesNames.GHOST, { name: 'Ghost', color: '#9272cc' }],
  [pokemonTypesNames.STEEL, { name: 'Steel', color: '#E4E7D4' }],
  [pokemonTypesNames.FIRE, { name: 'Fire', color: '#FFBB67' }],
  [pokemonTypesNames.WATER, { name: 'Water', color: '#AFCBFF' }],
  [pokemonTypesNames.GRASS, { name: 'Grass', color: '#86f3a1' }],
  [pokemonTypesNames.ELECTRIC, { name: 'Electric', color: '#FFDF82' }],
  [pokemonTypesNames.PSYCHIC, { name: 'Psychic', color: '#cc72b4' }],
  [pokemonTypesNames.ICE, { name: 'Ice', color: '#91cec9' }],
  [pokemonTypesNames.DRAGON, { name: 'Dragon', color: '#907eca' }],
  [pokemonTypesNames.DARK, { name: 'Dark', color: '#46434f' }],
  [pokemonTypesNames.FAIRY, { name: 'Fairy', color: '#e0a0ea' }],
  [pokemonTypesNames.UNKNOWN, { name: 'Unknown', color: '#9EAFA2' }],
  [pokemonTypesNames.SHADOW, { name: 'Shadow', color: '#2b2121' }]
]) as IpokemonTypes
