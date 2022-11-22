import Tooltip from 'components/Tooltip/Tooltip'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import useAttacker from 'hooks/useAttacker'
import { FC } from 'react'
import { FaFistRaised } from 'react-icons/fa'
import { FiTarget } from 'react-icons/fi'
import { IoIosClose } from 'react-icons/io'
import { TbArrowBigUpLine } from 'react-icons/tb'
import { PokemonMove } from 'types/moves'
import { getWeak } from 'utils/pokemon'
import { getMoveTip } from 'utils/tooltip'
import styles from './MoveCard.module.css'

interface MoveCardProps {
  move: PokemonMove
  open?: boolean
  power: number
  remove?: (move: PokemonMove) => void
}

const MoveCard: FC<MoveCardProps> = ({ move, open = false, power, remove }): JSX.Element => {
  const { attacker } = useAttacker()
  const weak = getWeak(attacker, move.type)

  const sectionClass = `
    ${styles.container} 
    ${open ? styles.open : ''}
    ${String(weak * move.stab).length > 1 ? styles.weak : ''}
    `

  const getPowerTip = (): string => power === move.power || attacker == null
    ? 'Power'
    : `${power >= 100 ? 'KO' : ''} ${power}% of ${attacker?.name} life`

  const getEffectTip = (): string | undefined => (!open && move?.effect != null) ? move.effect : undefined

  return (
    <section className={sectionClass}>
      <div className={styles.background} />
      {remove != null && <button className={styles.removeBtn} onClick={() => remove(move)}><IoIosClose /></button>}
      <div className={styles.badge}>
        <TypeBadge
          type={move.type}
          weak={{ to: weak * move.stab }}
          big={open}
          tooltip={getMoveTip(move, power, attacker)}
          stab={Boolean(move.stab > 1)}
        />
      </div>
      <Tooltip content={getEffectTip()}>
        <p className={styles.title}>{move.name}</p>
      </Tooltip>
      <section className={styles.info}>
        {
          move.power != null && (
            <Tooltip content={getPowerTip()}>
              <div className={`${styles.value} ${power >= 100 && attacker != null ? styles.ko : ''}`}>
                <FaFistRaised />
                <p>{power !== move.power ? `~${power}%` : move.power}</p>
              </div>
            </Tooltip>
          )
        }
        {
          move.accuracy != null && (
            <Tooltip content='Accuracy'>
              <div className={styles.value}>
                <FiTarget />
                <p>{move.accuracy}</p>
              </div>
            </Tooltip>
          )
        }
        {
          move.priority != null && move.priority !== 0 && (
            <Tooltip content='Priority'>
              <div className={styles.value}>
                <TbArrowBigUpLine />
                <p>+{move.priority}</p>
              </div>
            </Tooltip>
          )
        }
      </section>
      {open && <p className={styles.description}>{move.effect}</p>}
    </section>
  )
}

export default MoveCard
