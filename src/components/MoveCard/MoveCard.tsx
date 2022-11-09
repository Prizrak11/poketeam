import TypeBadge from 'components/TypeBadge/TypeBadge'
import useAttacker from 'hooks/useAttacker'
import useTooltip from 'hooks/useTooltip'
import { FC, useEffect, useState } from 'react'
import { FaFistRaised } from 'react-icons/fa'
import { FiTarget } from 'react-icons/fi'
import { TbArrowBigUpLine } from 'react-icons/tb'
import { PokemonMove } from 'types/moves'
import { getWeak } from 'utils/pokemon'
import { getMoveTip } from 'utils/tooltip'
import styles from './MoveCard.module.css'

interface MoveCardProps {
  move: PokemonMove
  open?: boolean
  power: number
}

const MoveCard: FC<MoveCardProps> = ({ move, open = false, power }): JSX.Element => {
  const { attacker } = useAttacker()
  const weak = getWeak(attacker, move.type)

  const [badgeTooltip, setBadgeTooltip] = useState(getMoveTip(move, power, attacker))
  const { ref: effectRef, update: updateEffect } = useTooltip(move.effect ?? move.name)
  const { ref: powerRef, update: updatePower } = useTooltip(String(move.power))
  const { ref: accuracyRef } = useTooltip('Accuracy')
  const { ref: priorityRef } = useTooltip('Priority')

  const sectionClass = `
    ${styles.container} 
    ${open ? styles.open : ''}
    ${String(weak * move.stab).length > 1 ? styles.weak : ''}
    `

  const hasStab = power !== 0 ? Boolean(move.stab > 1) : false
  const weakType = power !== 0 ? weak * move.stab : 1

  useEffect(() => {
    setBadgeTooltip(getMoveTip(move, power, attacker))
    updateEffect((!open && move?.effect != null) ? move.effect : null)
    updatePower(
      power === move.power || attacker == null
        ? 'Power'
        : `${power >= 100 ? 'KO' : ''} ${power}% of ${attacker?.name} life`
    )
  }, [move, power, open])

  return (
    <section className={sectionClass}>
      <div className={styles.background} />
      <div className={styles.badge}>
        <TypeBadge
          type={move.type}
          weak={{ to: weakType }}
          tooltip={badgeTooltip}
          big={open}
          stab={hasStab}
        />
      </div>
      <p ref={effectRef} className={styles.title}>{move.name}</p>
      <section className={styles.info}>
        {
          move.power != null && (
            <div ref={powerRef} className={`${styles.value} ${power >= 100 ? styles.ko : ''}`}>
              <FaFistRaised />
              <p>{power !== move.power ? `~${power}%` : move.power}</p>
            </div>
          )
        }
        {
          move.accuracy != null && (
            <div ref={accuracyRef} className={styles.value}>
              <FiTarget />
              <p>{move.accuracy}</p>
            </div>
          )
        }
        {
          move.priority != null && move.priority !== 0 && (
            <div ref={priorityRef} className={styles.value}>
              <TbArrowBigUpLine />
              <p>{move.priority}</p>
            </div>
          )
        }
      </section>
      {open && <p className={styles.description}>{move.effect}</p>}
    </section>
  )
}

export default MoveCard
