import Tooltip from 'components/Tooltip/Tooltip'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import { FC } from 'react'
import { FiTarget } from 'react-icons/fi'
import { IoIosClose } from 'react-icons/io'
import { TbArrowBigUpLine } from 'react-icons/tb'
import { PokemonMove } from 'types/moves'
import styles from './MoveCard.module.css'
import MoveProp from './MoveProp'

interface AttackerMoveCardProps {
  move: PokemonMove
  open?: boolean
  power: number
  remove?: (move: PokemonMove) => void
}

const AttackerMoveCard: FC<AttackerMoveCardProps> = ({ move, open = false, power, remove }): JSX.Element => {
  const sectionClass = `
    ${styles.container}
    ${open ? styles.open : ''}
    `

  return (
    <section className={sectionClass}>
      <div className={styles.background} />
      {remove != null && <button className={styles.removeBtn} onClick={() => remove(move)}><IoIosClose /></button>}
      <div className={styles.badge}>
        <TypeBadge
          type={move.type}
          big={open}
          tooltip={move.type.name}
          stab={Boolean(move.stab > 1)}
        />
      </div>
      <Tooltip content={!open ? move?.effect : undefined}>
        <p className={styles.title}>{move.name}</p>
      </Tooltip>
      <section className={styles.info}>
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

export default AttackerMoveCard
