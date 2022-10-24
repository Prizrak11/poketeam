import { FC } from 'react'
import { pokemonTypes } from 'types/pokemonTypes'
import { Pokemon } from 'types/pokemon'
import styles from './PokeCard.module.css'

export interface CardContainerProps {
  pokemon: Pokemon
  remove?: (pokemon: Pokemon) => void
  children: JSX.Element
  className?: string
}

const PokeCardContainer: FC<CardContainerProps> = ({ pokemon, remove, className, children }): JSX.Element => {
  const typeColor = pokemonTypes.get(pokemon.types[0]).color

  className = className ?? ''

  return (
    <div className={`${className}`}>
      {(remove != null) && <div onClick={() => remove(pokemon)} className={styles.removeBtn}>X</div>}
      <div style={{ backgroundColor: typeColor }} className={styles.background} />
      {children}
    </div>
  )
}

export default PokeCardContainer
