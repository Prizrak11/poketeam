import Tooltip from 'components/Tooltip/Tooltip'
import { FC } from 'react'
import { PokemonType } from 'types/pokemonTypes'
import styles from './TypeBadge.module.css'

interface BadgeProps {
  type: PokemonType
  weak?: { from?: number, to?: number }
  big?: boolean
  stab?: boolean
  tooltip?: string
}

const TypeBadge: FC<BadgeProps> = ({ type, weak, tooltip, big = false, stab = false }): JSX.Element => {
  const { color, name, icon } = type

  const COLORS = {
    highest: '#1A8828',
    high: '#64AD62',
    mid: 'gray',
    low: '#9f3737',
    lowest: '#bf4040'
  }

  const effectivenessColor: { [key: number]: string[] } = {
    6: [COLORS.highest, COLORS.lowest],
    4: [COLORS.highest, COLORS.lowest],
    3: [COLORS.high, COLORS.low],
    2: [COLORS.high, COLORS.low],
    1.5: [COLORS.high, COLORS.low],
    0: [COLORS.mid, COLORS.mid],
    0.75: [COLORS.low, COLORS.high],
    0.5: [COLORS.low, COLORS.high],
    0.375: [COLORS.lowest, COLORS.highest],
    0.25: [COLORS.lowest, COLORS.highest]
  }

  const side = (value: number, invert?: boolean): string => {
    return invert == null ? effectivenessColor[value]?.[0] : effectivenessColor[value]?.[1]
  }

  const removeCero = (number: number): string => {
    const numberText = number.toString()

    if (numberText === '0') return numberText
    if (numberText.includes('0')) return numberText.substring(1, 3)
    return numberText
  }

  return (
    <Tooltip content={tooltip}>
      <div style={{ color }} className={`${styles.badge} ${big ? styles.big : ''}`}>
        <div style={{ backgroundColor: color }} className={styles.background} />
        {
          big ? <p>{name}</p> : <img src={icon} alt={name} className={styles.icon} />
        }
        {
          stab && <p className={styles.stab}>S</p>
        }
        {
          (weak?.from != null) && (weak.from !== 1) &&
            <span className={styles.weak} style={{ backgroundColor: side(weak.from, true) }}>
              {removeCero(weak.from)}
            </span>
        }
        {
          (weak?.to != null) && (weak.to !== 1) &&
            <span className={styles.strength} style={{ backgroundColor: side(weak.to) }}>
              {removeCero(weak.to)}
            </span>
        }
      </div>
    </Tooltip>
  )
}

export default TypeBadge
