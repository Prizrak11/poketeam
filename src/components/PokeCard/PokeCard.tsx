import { FC } from 'react'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import styles from './PokeCard.module.css'
import PokeCardContainer, { CardContainerProps } from './PokeCardContainer'
import useAttacker from 'hooks/useAttacker'
import Spinner from 'components/Spinner/Spinner'
import { Pokemon } from 'types/pokemon'
import { PokemonType } from 'types/pokemonTypes'
import ReactToolTip from 'react-tooltip'
import PokemonMoves from 'components/PokemonMoves/PokemonMoves'

interface PokeCardProps extends Omit<CardContainerProps, 'children' | 'className'> {
  open?: boolean
}

const PokeCard: FC<PokeCardProps> = (props): JSX.Element => {
  const { attacker, loading } = useAttacker()
  const { pokemon, open = false } = props

  const getTip = (type: PokemonType, attacker?: Pokemon, from?: number): string => {
    if (open && (from == null || from === 1)) return ''
    if (attacker == null || from == null || from === 1) return type.name
    if (from === 0) return `${attacker?.name} doesn't affect ${type.name}`
    return `${attacker?.name} hits x${from} to ${type.name}`
  }

  const typeColor = pokemon.types[0].color

  if (loading) return <Spinner />
  return (
    <PokeCardContainer {...props} className={`${styles.card} ${open ? styles.open : ''}`}>
      <>
        <ReactToolTip className={styles.tooltip} id='tooltip' />
        <p className={styles.number} style={{ color: typeColor }}>{pokemon.number}</p>
        <img src={pokemon.sprite} className={styles.sprite} />
        <section className={styles.content}>
          <h1>{pokemon.name}</h1>
          <div className={styles.types}>
            {pokemon.types.map((type, id) => {
              const from = attacker?.weaknessByType[type.name].to
              return (
                <div key={id} data-tip={getTip(type, attacker, from)} data-for='tooltip'>
                  <TypeBadge type={type} weak={{ from }} big={open} />
                </div>
              )
            })}
          </div>
        </section>
        {(pokemon.moves.length > 0 || open) && <PokemonMoves pokemon={pokemon} open={open} />}
      </>
    </PokeCardContainer>
  )
}

export default PokeCard
