import { FC } from 'react'
import { pokemonTypes, pokemonTypesNames } from 'types/pokemonTypes'
import styles from './TypeBadge.module.css'

interface BadgeProps {
  type: pokemonTypesNames
}

const TypeBadge: FC<BadgeProps> = ({ type }): JSX.Element => {
  const { color, name } = pokemonTypes.get(type)

  return (
    <div style={{ backgroundColor: color, color }} className={styles.badge}>
      <span>{name}</span>
    </div>
  )
}

export default TypeBadge
