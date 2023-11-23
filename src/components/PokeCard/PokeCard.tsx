import { FC, useEffect, useState } from 'react'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import styles from './PokeCard.module.css'
import PokeCardContainer, { CardContainerProps } from './PokeCardContainer'
import useAttacker from 'hooks/useAttacker'
import Spinner from 'components/Spinner/Spinner'
import PokemonMoves from 'components/PokemonMoves/PokemonMoves'
import { getTypeTip } from 'utils/tooltip'
import { getStrength } from 'utils/pokemon'

interface PokeCardProps extends Omit<CardContainerProps, 'children' | 'className'> {
  open?: boolean
  editable?: boolean
}

const PokeCard: FC<PokeCardProps> = (props): JSX.Element => {
  const { attacker, loading } = useAttacker()
  const { pokemon, open = false, editable = false } = props
  const [typesTooltip, setTypesTooltip] = useState<string[]>()

  useEffect(() => {
    const tooltips = pokemon.types.map(type => {
      const from = getStrength(attacker, type)
      return getTypeTip(type, attacker, from)
    })

    setTypesTooltip(tooltips)
  }, [attacker, open, pokemon.types])

  const typeColor = pokemon.types[0].color

  if (loading || pokemon == null || typesTooltip == null) return <Spinner />
  return (
    <PokeCardContainer {...props} className={`${styles.card} ${open ? styles.open : ''}`}>
      <>
        <p className={styles.number} style={{ color: typeColor }}>{pokemon.number}</p>
        <img src={pokemon.sprite} className={styles.sprite} />
        <section className={styles.content}>
          <h1>{pokemon.name}</h1>
          <div className={styles.types}>
            {pokemon.types.map((type, id) => {
              const from = getStrength(attacker, type)

              return (
                <TypeBadge tooltip={typesTooltip[id]} key={id} type={type} weak={{ from }} big={open} />
              )
            })}
          </div>
        </section>
        {(pokemon.moves.length > 0 || open) && <PokemonMoves editable={editable} pokemon={pokemon} open={open} />}
      </>
    </PokeCardContainer>
  )
}

export default PokeCard
