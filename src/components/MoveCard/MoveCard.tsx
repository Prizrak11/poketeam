import TypeBadge from 'components/TypeBadge/TypeBadge'
import useAttacker from 'hooks/useAttacker'
import { FC } from 'react'
import ReactTooltip from 'react-tooltip'
import { PokemonMove } from 'types/moves'
import { Pokemon } from 'types/pokemon'
import { PokemonType } from 'types/pokemonTypes'
import styles from './MoveCard.module.css'

interface MoveCardProps {
  move: PokemonMove
  open?: boolean
}

const MoveCard: FC<MoveCardProps> = ({ move, open = false }): JSX.Element => {
  const { attacker } = useAttacker()

  const weak = attacker?.weaknessByType[move.type.name].from ?? 1

  const getTip = (type: PokemonType, attacker?: Pokemon, to?: number): string => {
    if (open && (to == null || to === 1)) return ''
    if (move.stab > 1 && to === null) return `${type.name} has STAB`
    if (attacker == null || to == null || to === 1) return type.name
    if (to === 0) return `${type.name} doesn't affect ${attacker?.name} `
    if (move.stab > 1) return `${type.name} has STAB and hits x${to} to ${attacker?.name}`
    return `${type.name} hits x${to} to ${attacker?.name}`
  }

  const sectionClass = `
    ${styles.container} 
    ${open ? styles.open : ''}
    ${String(weak * move.stab).length > 1 ? styles.weak : ''}
    `

  return (
    <section className={sectionClass}>
      <ReactTooltip className={styles.tooltip} />
      <div data-tip={getTip(move.type, attacker, weak)}>
        <TypeBadge type={move.type} weak={{ to: weak * move.stab }} big={open} stab={Boolean(move.stab > 1)} />
      </div>
      <p className={styles.title}>{move.name}</p>
    </section>
  )
}

export default MoveCard
