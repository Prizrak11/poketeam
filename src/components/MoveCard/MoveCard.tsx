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
import MoveProp from './MoveProp'

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

  return (
    <section className={sectionClass}>
      <div className={styles.background} />
      {remove != null && <button className={styles.removeBtn} onClick={() => remove(move)}><IoIosClose /></button>}
      <div className={styles.badge}>
        <TypeBadge
          type={move.type}
          weak={{ to: weak * move.stab }}
          big={open}
          tooltip={getMoveTip(move, attacker)}
          stab={Boolean(move.stab > 1)}
        />
      </div>
      <Tooltip content={!open ? move?.effect : undefined}>
        <p className={styles.title}>{move.name}</p>
      </Tooltip>
      <section className={styles.info}>
        {
          move.power != null && (
            <MoveProp
              content={power !== move.power ? `~${power}%` : `${move.power}`}
              tooltip={getPowerTip()}
              icon={<FaFistRaised />}
              className={power >= 100 && attacker != null ? styles.ko : ''}
            />
          )
        }
        {
          move.accuracy != null && (
            <MoveProp content={`${move.accuracy}`} tooltip='Accuracy' icon={<FiTarget />} />
          )
        }
        {
          move.priority != null && move.priority !== 0 && (
            <MoveProp content={`${move.priority}`} tooltip='Priority' icon={<TbArrowBigUpLine />} />
          )
        }
      </section>
      {open && <p className={styles.description}>{move.effect}</p>}
    </section>
  )
}

export default MoveCard
