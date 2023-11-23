import NormalIcon from 'static/Normal_Type_Icon.svg'
import BugIcon from 'static/Bug_Type_Icon.svg'
import DarkIcon from 'static/Dark_Type_Icon.svg'
import DragonIcon from 'static/Dragon_Type_Icon.svg'
import ElectricIcon from 'static/Electric_Type_Icon.svg'
import FairyIcon from 'static/Fairy_Type_Icon.svg'
import FightIcon from 'static/Fighting_Type_Icon.svg'
import FireIcon from 'static/Fire_Type_Icon.svg'
import FlyingIcon from 'static/Flying_Type_Icon.svg'
import GhostIcon from 'static/Ghost_Type_Icon.svg'
import GrassIcon from 'static/Grass_Type_Icon.svg'
import GroundIcon from 'static/Ground_Type_Icon.svg'
import IceIcon from 'static/Ice_Type_Icon.svg'
import PoisonIcon from 'static/Poison_Type_Icon.svg'
import PsychicIcon from 'static/Psychic_Type_Icon.svg'
import RockIcon from 'static/Rock_Type_Icon.svg'
import SteelIcon from 'static/Steel_Type_Icon.svg'
import WaterIcon from 'static/Water_Type_Icon.svg'

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
  FAIRY = 'fairy'
}

export interface PokemonType {
  name: pokemonTypesNames
  color: string
  icon: string
}

interface IPokemonTypes {
  get: <T extends pokemonTypesNames>(
    status: T
  ) => PokemonType
}

export const pokemonTypes = new Map([
  [pokemonTypesNames.NORMAL, { name: pokemonTypesNames.NORMAL, color: '#818993', icon: NormalIcon }],
  [pokemonTypesNames.FIGHTING, { name: pokemonTypesNames.FIGHTING, color: '#D51558', icon: FightIcon }],
  [pokemonTypesNames.FLYING, { name: pokemonTypesNames.FLYING, color: '#789ADD', icon: FlyingIcon }],
  [pokemonTypesNames.POISON, { name: pokemonTypesNames.POISON, color: '#A64CC5', icon: PoisonIcon }],
  [pokemonTypesNames.GROUND, { name: pokemonTypesNames.GROUND, color: '#E15C27', icon: GroundIcon }],
  [pokemonTypesNames.ROCK, { name: pokemonTypesNames.ROCK, color: '#BDA975', icon: RockIcon }],
  [pokemonTypesNames.BUG, { name: pokemonTypesNames.BUG, color: '#74BC04', icon: BugIcon }],
  [pokemonTypesNames.GHOST, { name: pokemonTypesNames.GHOST, color: '#38509D', icon: GhostIcon }],
  [pokemonTypesNames.STEEL, { name: pokemonTypesNames.STEEL, color: '#4A7C92', icon: SteelIcon }],
  [pokemonTypesNames.FIRE, { name: pokemonTypesNames.FIRE, color: '#FC8531', icon: FireIcon }],
  [pokemonTypesNames.WATER, { name: pokemonTypesNames.WATER, color: '#2A7FD5', icon: WaterIcon }],
  [pokemonTypesNames.GRASS, { name: pokemonTypesNames.GRASS, color: '#2EB939', icon: GrassIcon }],
  [pokemonTypesNames.ELECTRIC, { name: pokemonTypesNames.ELECTRIC, color: '#F9CB09', icon: ElectricIcon }],
  [pokemonTypesNames.PSYCHIC, { name: pokemonTypesNames.PSYCHIC, color: '#FC4C63', icon: PsychicIcon }],
  [pokemonTypesNames.ICE, { name: pokemonTypesNames.ICE, color: '#40CAB4', icon: IceIcon }],
  [pokemonTypesNames.DRAGON, { name: pokemonTypesNames.DRAGON, color: '#0B58BF', icon: DragonIcon }],
  [pokemonTypesNames.DARK, { name: pokemonTypesNames.DARK, color: '#484054', icon: DarkIcon }],
  [pokemonTypesNames.FAIRY, { name: pokemonTypesNames.FAIRY, color: '#F76EE7', icon: FairyIcon }]
]) as IPokemonTypes
