import { FC } from 'react'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import styles from './PokeCard.module.css'
import PokeCardContainer, { CardContainerProps } from './PokeCardContainer'
import useAttacker from 'hooks/useAttacker'
import Spinner from 'components/Spinner/Spinner'
import { Pokemon } from 'types/pokemon'
import { pokemonTypes, pokemonTypesNames } from 'types/pokemonTypes'

type PokeCardProps = Omit<CardContainerProps, 'children' | 'className'>

const PokeCard: FC<PokeCardProps> = (props): JSX.Element => {
  const { attacker, loading } = useAttacker()
  const { pokemon } = props

  const getTip = (type: pokemonTypesNames, attacker?: Pokemon, from?: number): string => {
    if (attacker == null || from == null || from === 1) return type
    if (from === 0) return `${attacker?.name} doesn't affect ${type}`
    return `${attacker?.name} hits x${from} to ${type}`
  }

  const typeColor = pokemonTypes.get(pokemon.types[0]).color

  if (loading) return <Spinner />
  return (
    <PokeCardContainer {...props} className={styles.card}>
      <>
        <p className={styles.number} style={{ color: typeColor }}>{pokemon.number}</p>
        <img src={pokemon.sprite} className={styles.sprite} />
        <section className={styles.content}>
          <h1>{pokemon.name}</h1>
          <div className={styles.types}>
            {pokemon.types.map((type, id) => {
              const from = attacker?.weaknessByType[type].to
              return (
                <div key={id} data-tip={getTip(type, attacker, from)}>
                  <TypeBadge type={type} weak={{ from }} />
                </div>
              )
            })}
          </div>
        </section>
      </>
    </PokeCardContainer>
  )
}

export default PokeCard
