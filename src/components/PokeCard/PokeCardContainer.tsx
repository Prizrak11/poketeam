import TooltipMenu from 'components/Tooltip/TooltipMenu'
import { FC } from 'react'
import { Pokemon } from 'types/pokemon'
import styles from './PokeCard.module.css'

export interface MenuItem {
  label: string
  action: () => void
  error?: boolean
}

export interface CardContainerProps {
  pokemon: Pokemon
  menu: MenuItem[]
  children: JSX.Element
  className?: string
}

const PokeCardContainer: FC<CardContainerProps> = ({ pokemon, menu, className, children }): JSX.Element => {
  const typeColor = pokemon.types.length === 1
    ? pokemon.types[0].color
    : `linear-gradient(45deg,  
          ${pokemon.types[0].color} 50%,
          ${pokemon.types[1].color} 100%)`

  className = className ?? ''

  return (
    <div className={`${className}`}>
      {(menu != null) && <TooltipMenu menu={menu} className={styles.menu} />}
      <div style={{ background: typeColor }} className={styles.background} />
      {children}
    </div>
  )
}

export default PokeCardContainer
