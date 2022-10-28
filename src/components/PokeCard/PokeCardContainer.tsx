import { FC } from 'react'
import { Pokemon } from 'types/pokemon'
import styles from './PokeCard.module.css'

export interface CardContainerProps {
  pokemon: Pokemon
  remove?: (pokemon: Pokemon) => void
  children: JSX.Element
  className?: string
}

const PokeCardContainer: FC<CardContainerProps> = ({ pokemon, remove, className, children }): JSX.Element => {
  const typeColor = pokemon.types.length === 1
    ? pokemon.types[0].color
    : `linear-gradient(45deg,  
          ${pokemon.types[0].color} 50%,
          ${pokemon.types[1].color} 100%)`

  className = className ?? ''

  return (
    <div className={`${className}`}>
      {(remove != null) && <div onClick={() => remove(pokemon)} className={styles.removeBtn}>X</div>}
      <div style={{ background: typeColor }} className={styles.background} />
      {children}
    </div>
  )
}

export default PokeCardContainer
