import TypeBadge from 'components/TypeBadge/TypeBadge'
import useAttacker from 'hooks/useAttacker'
import { FC } from 'react'
import { FaFistRaised } from 'react-icons/fa'
import { FiTarget } from 'react-icons/fi'
import { TbArrowBigUpLine } from 'react-icons/tb'
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
    if (move.stab > 1 && attacker == null) return `${type.name} has STAB`
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
      <div className={styles.background} />
      <ReactTooltip className={styles.tooltip} />
      <div className={styles.badge} data-tip={getTip(move.type, attacker, weak)}>
        <TypeBadge type={move.type} weak={{ to: weak * move.stab }} big={open} stab={Boolean(move.stab > 1)} />
      </div>
      <p className={styles.title}>{move.name}</p>
      <section className={styles.info}>
        {
          move.power != null && (
            <div data-tip='Power' className={styles.value}>
              <FaFistRaised />
              <p>{move.power}</p>
            </div>
          )
        }
        {
          move.accuracy != null && (
            <div data-tip='Accuracy' className={styles.value}>
              <FiTarget />
              <p>{move.accuracy}</p>
            </div>
          )
        }
        {
          move.priority != null && move.priority !== 0 && (
            <div data-tip='Priority' className={styles.value}>
              <TbArrowBigUpLine />
              <p>{move.priority}</p>
            </div>
          )
        }
      </section>
    </section>
  )
}

export default MoveCard
