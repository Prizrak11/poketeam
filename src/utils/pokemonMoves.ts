import { DamageClass, PokemonMove } from 'types/moves'
import { Pokemon } from 'types/pokemon'
import { average } from './math'

export const addStab = (move: PokemonMove, pokemon: Pokemon): PokemonMove => {
  const types = pokemon.types.map(({ name }) => name)

  if (types.includes(move.type.name)) return { ...move, stab: 1.5 }

  return move
}

const adjustStatToLevel = (stat: number, level: number): number => Math.floor((2 * stat) * level / 100 + 5)

const adjustHpToLevel = (hp: number, level: number): number => Math.floor((2 * hp) * level / 100 + level + 10)

const percentageDamageOfLife = (damage: number, life: number): number => Math.floor(damage * 100 / life)

export const calculatePower = (move: PokemonMove, pokemon: Pokemon, attacker?: Pokemon): number => {
  const { type: { name: type }, classType } = move

  if (attacker == null) return move.power

  const LEVEL = 100
  const MIN_ATK_MULTIPLIER = 0.85
  const MAX_ATK_MULTIPLIER = 1

  const typeEffectiveness = attacker.weaknessByType[type].from

  let [attack, defense] = classType === DamageClass.PHYSICAL
    ? [pokemon.attack, attacker.defense]
    : [pokemon.specialAttack, attacker.specialDefense]

  attack = adjustStatToLevel(attack, LEVEL)
  defense = adjustStatToLevel(defense, LEVEL)

  const attackerHp = adjustHpToLevel(attacker.hp, LEVEL)

  const base = Math.floor(Math.floor(Math.floor(2 * LEVEL / 5 + 2) * move.power * attack / defense) / 50) + 2
  const damage = Math.floor(base * move.stab * typeEffectiveness)

  const minDamage = percentageDamageOfLife(damage, attackerHp) * MIN_ATK_MULTIPLIER
  const maxDamage = percentageDamageOfLife(damage, attackerHp) * MAX_ATK_MULTIPLIER

  return Math.floor(average([minDamage, maxDamage]))
}
