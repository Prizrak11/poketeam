import { FC } from 'react'
import { PokemonType } from 'types/pokemonTypes'
import styles from './TypeBadge.module.css'

interface BadgeProps {
  type: PokemonType
  weak?: { from?: number, to?: number }
  big?: boolean
  stab?: boolean
}

const TypeBadge: FC<BadgeProps> = ({ type, weak, big = false, stab = false }): JSX.Element => {
  const { color, name, icon } = type

  const effectiveNessColor: { [key: number]: string[] } = {
    6: ['#1A8828', '#bf4040'],
    4: ['#1A8828', '#bf4040'],
    3: ['#64AD62', '#963232'],
    2: ['#64AD62', '#963232'],
    1.5: ['#64AD62', '#963232'],
    0: ['gray', 'gray'],
    0.75: ['#9f3737', '#64AD62'],
    0.5: ['#9f3737', '#64AD62'],
    0.375: ['#bf4040', '#1A8828'],
    0.25: ['#bf4040', '#1A8828']
  }

  const side = (value: number, invert?: boolean): string => {
    if (value === 0) return 'gray'
    return invert == null ? effectiveNessColor[value]?.[0] : effectiveNessColor[value]?.[1]
  }

  const removeCero = (number: number): string => {
    const numberText = number.toString()

    if (numberText === '0') return numberText
    if (numberText.includes('0')) return numberText.slice(1)
    return numberText
  }

  return (
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
  )
}

export default TypeBadge
