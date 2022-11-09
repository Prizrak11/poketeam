import { PokemonMove } from 'types/moves'
import { PokemonType } from 'types/pokemonTypes'
import { Pokemon } from 'types/pokemon'
import { getWeak } from './pokemon'

interface AffectTip {
  value: number
  from: string
  to?: string
  stab?: number
}

const affectTip = ({ value, from, to, stab }: AffectTip): string => {
  if (value === 0) return `${from} doesn't affect ${to != null ? to : ''}`
  if (stab != null && stab > 1) return `${from} has STAB and hits x${value}${to != null ? ` to ${to}` : ''}`
  return `${from} hits x${value}${to != null ? ` to ${to}` : ''}`
}

export const getTypeTip = (type: PokemonType, attacker?: Pokemon, value?: number): string => {
  if (attacker == null || value == null || value === 1) return type.name
  return affectTip({
    value,
    from: type.name,
    to: attacker.name
  })
}

export const getMoveTip = (move: PokemonMove, power: number, attacker?: Pokemon): string => {
  const value = getWeak(attacker, move.type)
  const { type, stab } = move

  if (stab > 1 && (attacker == null && move.power === power)) return `${type.name} has STAB`
  if (attacker == null || value == null || power === 0) return type.name
  return affectTip({
    value,
    from: type.name,
    to: attacker.name,
    stab
  })
}
